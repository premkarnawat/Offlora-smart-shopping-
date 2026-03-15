'use server'

import { prisma } from './prisma'
import { headers } from 'next/headers'
import bcrypt from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import slugify from 'slugify'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'change-me-in-production')

// ─── AFFILIATE CLICK TRACKING ────────────────────────────────────────────────

export async function trackAffiliateClick(productId: string) {
  const headersList = headers()
  try {
    await prisma.affiliateClick.create({
      data: {
        productId,
        ip: headersList.get('x-forwarded-for')?.split(',')[0] || null,
        userAgent: headersList.get('user-agent') || null,
        referer: headersList.get('referer') || null,
      },
    })
  } catch {
    // Non-critical — don't block redirect
  }
}

// ─── AUTH ────────────────────────────────────────────────────────────────────

export async function adminLogin(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return { success: false, error: 'Invalid credentials' }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) return { success: false, error: 'Invalid credentials' }

  const token = await new SignJWT({ userId: user.id, role: user.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(JWT_SECRET)

  cookies().set('offlora-admin', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })

  return { success: true }
}

export async function adminLogout() {
  cookies().delete('offlora-admin')
}

export async function verifyAdminSession() {
  const token = cookies().get('offlora-admin')?.value
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as { userId: string; role: string }
  } catch {
    return null
  }
}

// ─── IMAGE HELPERS ────────────────────────────────────────────────────────────
// Images are uploaded to UploadedImage table via /api/images/upload.
// When creating/updating a product we copy the data into ProductImage rows.
// In edit mode, images already in ProductImage keep their id and are retained as-is.

type ImageInput = {
  imageId: string       // either UploadedImage.id (new) or ProductImage.id (existing/retained)
  alt?: string
  isPrimary: boolean
  isExisting?: boolean  // true when the image is already a ProductImage record
}

async function buildProductImageData(images: ImageInput[]) {
  const newImages = images.filter((i) => !i.isExisting)
  const existingImages = images.filter((i) => i.isExisting)

  let createdData: any[] = []

  if (newImages.length > 0) {
    const uploaded = await prisma.uploadedImage.findMany({
      where: { id: { in: newImages.map((i) => i.imageId) } },
      select: { id: true, data: true, mimeType: true, filename: true, size: true },
    })
    const uploadedMap = new Map(uploaded.map((u) => [u.id, u]))

    createdData = newImages
      .filter((img) => uploadedMap.has(img.imageId))
      .map((img) => {
        const u = uploadedMap.get(img.imageId)!
        return {
          data: u.data,
          mimeType: u.mimeType,
          filename: u.filename,
          size: u.size,
          alt: img.alt || '',
          isPrimary: img.isPrimary,
        }
      })
  }

  return { createdData, retainedIds: existingImages.map((i) => i.imageId) }
}

// ─── PRODUCT ACTIONS ─────────────────────────────────────────────────────────

export async function createProduct(data: {
  title: string
  description: string
  shortDesc: string
  pros: string[]
  cons: string[]
  rating: number
  reviewCount: number
  affiliateLink: string
  videoUrl?: string
  isFeatured: boolean
  isTopRated: boolean
  isPublished: boolean
  brandId: string
  categoryId: string
  images: ImageInput[]
}) {
  const session = await verifyAdminSession()
  if (!session) throw new Error('Unauthorized')

  const { images, ...rest } = data

  // Generate a unique slug
  let slug = slugify(data.title, { lower: true, strict: true })
  const existing = await prisma.product.findUnique({ where: { slug } })
  if (existing) slug = `${slug}-${Date.now()}`

  const imageData = await buildProductImageData(images)

  return prisma.product.create({
    data: {
      ...rest,
      slug,
      images: { create: imageData },
    },
  })
}

export async function updateProduct(
  id: string,
  data: {
    title?: string
    description?: string
    shortDesc?: string
    pros?: string[]
    cons?: string[]
    rating?: number
    reviewCount?: number
    affiliateLink?: string
    videoUrl?: string
    isFeatured?: boolean
    isTopRated?: boolean
    isPublished?: boolean
    brandId?: string
    categoryId?: string
    images?: ImageInput[]
  }
) {
  const session = await verifyAdminSession()
  if (!session) throw new Error('Unauthorized')

  const { images, ...rest } = data

  let imageOps = {}
  if (images && images.length > 0) {
    const { createdData, retainedIds } = await buildProductImageData(images)

    // Delete only images that are NOT being retained
    imageOps = {
      images: {
        deleteMany: retainedIds.length > 0 ? { id: { notIn: retainedIds } } : {},
        ...(createdData.length > 0 ? { create: createdData } : {}),
      },
    }

    // Update alt/isPrimary on retained images
    const retainedInputs = images.filter((i) => i.isExisting)
    for (const img of retainedInputs) {
      await prisma.productImage.update({
        where: { id: img.imageId },
        data: { alt: img.alt || '', isPrimary: img.isPrimary },
      })
    }
  }

  return prisma.product.update({
    where: { id },
    data: { ...rest, ...imageOps },
  })
}

export async function deleteProduct(id: string) {
  const session = await verifyAdminSession()
  if (!session) throw new Error('Unauthorized')
  return prisma.product.delete({ where: { id } })
}

// ─── BLOG ACTIONS ────────────────────────────────────────────────────────────

export async function createBlog(data: {
  title: string
  content: string
  excerpt: string
  coverImageId?: string
  coverImageUrl?: string   // ignored — only id matters
  tags: string[]
  readTime: number
  author: string
  isPublished: boolean
  isFeatured: boolean
  productIds?: string[]
}) {
  const session = await verifyAdminSession()
  if (!session) throw new Error('Unauthorized')

  let slug = slugify(data.title, { lower: true, strict: true })
  const existing = await prisma.blog.findUnique({ where: { slug } })
  if (existing) slug = `${slug}-${Date.now()}`

  const { productIds, coverImageUrl, ...rest } = data

  return prisma.blog.create({
    data: {
      ...rest,
      slug,
      ...(productIds?.length
        ? { products: { create: productIds.map((productId) => ({ productId })) } }
        : {}),
    },
  })
}

export async function updateBlog(
  id: string,
  data: {
    title?: string
    content?: string
    excerpt?: string
    coverImageId?: string
    coverImageUrl?: string
    tags?: string[]
    readTime?: number
    author?: string
    isPublished?: boolean
    isFeatured?: boolean
    productIds?: string[]
  }
) {
  const session = await verifyAdminSession()
  if (!session) throw new Error('Unauthorized')

  const { productIds, coverImageUrl, ...rest } = data

  return prisma.blog.update({
    where: { id },
    data: {
      ...rest,
      ...(productIds !== undefined
        ? {
            products: {
              deleteMany: {},
              create: productIds.map((productId) => ({ productId })),
            },
          }
        : {}),
    },
  })
}

export async function deleteBlog(id: string) {
  const session = await verifyAdminSession()
  if (!session) throw new Error('Unauthorized')
  return prisma.blog.delete({ where: { id } })
}

// ─── LEGAL PAGE ACTIONS ───────────────────────────────────────────────────────

export async function updateLegalPage(type: string, title: string, content: string) {
  const session = await verifyAdminSession()
  if (!session) throw new Error('Unauthorized')

  return prisma.legalPage.upsert({
    where: { type: type as any },
    update: { title, content },
    create: { type: type as any, title, content },
  })
}

// ─── CATEGORY & BRAND ACTIONS ────────────────────────────────────────────────

export async function createCategory(name: string, description?: string) {
  const session = await verifyAdminSession()
  if (!session) throw new Error('Unauthorized')
  const slug = slugify(name, { lower: true, strict: true })
  return prisma.category.create({ data: { name, slug, description } })
}

export async function createBrand(name: string, website?: string) {
  const session = await verifyAdminSession()
  if (!session) throw new Error('Unauthorized')
  const slug = slugify(name, { lower: true, strict: true })
  return prisma.brand.create({ data: { name, slug, website } })
}
