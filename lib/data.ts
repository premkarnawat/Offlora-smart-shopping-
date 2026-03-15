import { prisma } from './prisma'

// Never send raw base64 to the client — transform image records to URL references
function withImageUrls<T extends { images: { id: string; alt?: string | null; isPrimary: boolean }[] }>(
  product: T
): T & { images: { id: string; url: string; alt?: string | null; isPrimary: boolean }[] } {
  return {
    ...product,
    images: product.images.map((img) => ({
      ...img,
      url: `/api/images/${img.id}`,
    })),
  }
}

// Reusable image select — only IDs and metadata, never the raw data field
const imgSelect = {
  select: { id: true, alt: true, isPrimary: true },
  orderBy: { isPrimary: 'desc' as const },
}

// ─── HOME DATA ────────────────────────────────────────────────────────────────

export async function getHomeData() {
  const [featured, topRated, categories, blogs] = await Promise.all([
    prisma.product.findMany({
      where: { isFeatured: true, isPublished: true },
      include: { brand: true, category: true, images: { ...imgSelect, take: 1 } },
      orderBy: { createdAt: 'desc' },
      take: 4,
    }),
    prisma.product.findMany({
      where: { isTopRated: true, isPublished: true },
      include: { brand: true, category: true, images: { ...imgSelect, take: 1 } },
      orderBy: { rating: 'desc' },
      take: 3,
    }),
    prisma.category.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: { name: 'asc' },
      take: 6,
    }),
    prisma.blog.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: 'desc' },
      take: 4,
    }),
  ])

  return {
    featured: featured.map(withImageUrls),
    topRated: topRated.map(withImageUrls),
    categories,
    blogs: blogs.map((b) => ({
      ...b,
      coverImage: b.coverImageId ? `/api/images/${b.coverImageId}` : null,
    })),
  }
}

// ─── PRODUCTS ────────────────────────────────────────────────────────────────

export async function getProducts({
  categorySlug,
  sort,
  page = 1,
  perPage = 12,
}: {
  categorySlug?: string
  sort?: string
  page?: number
  perPage?: number
}) {
  const where = {
    isPublished: true,
    ...(categorySlug ? { category: { slug: categorySlug } } : {}),
  }
  const orderBy =
    sort === 'rating' ? { rating: 'desc' as const }
    : sort === 'featured' ? { isFeatured: 'desc' as const }
    : { createdAt: 'desc' as const }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { brand: true, category: true, images: imgSelect },
      orderBy,
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.product.count({ where }),
  ])
  return { products: products.map(withImageUrls), total }
}

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      brand: true,
      category: true,
      images: {
        select: { id: true, alt: true, isPrimary: true, mimeType: true, filename: true, size: true },
        orderBy: { isPrimary: 'desc' },
      },
      blogProducts: { include: { blog: true } },
    },
  })
  if (!product) return null
  return withImageUrls(product)
}

export async function getRelatedProducts(categoryId: string, excludeId: string) {
  const products = await prisma.product.findMany({
    where: { categoryId, id: { not: excludeId }, isPublished: true },
    include: { brand: true, category: true, images: { ...imgSelect, take: 1 } },
    take: 4,
    orderBy: { rating: 'desc' },
  })
  return products.map(withImageUrls)
}

export async function getProductsByCategory(categoryId: string) {
  const products = await prisma.product.findMany({
    where: { categoryId, isPublished: true },
    include: { brand: true, category: true, images: { ...imgSelect, take: 1 } },
    orderBy: { createdAt: 'desc' },
  })
  return products.map(withImageUrls)
}

export async function searchProducts(query: string) {
  const products = await prisma.product.findMany({
    where: {
      isPublished: true,
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { shortDesc: { contains: query, mode: 'insensitive' } },
        { brand: { name: { contains: query, mode: 'insensitive' } } },
        { category: { name: { contains: query, mode: 'insensitive' } } },
      ],
    },
    include: { brand: true, category: true, images: { ...imgSelect, take: 1 } },
    take: 24,
  })
  return products.map(withImageUrls)
}

// ─── CATEGORIES ──────────────────────────────────────────────────────────────

export async function getCategories() {
  return prisma.category.findMany({ orderBy: { name: 'asc' } })
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
    include: { _count: { select: { products: true } } },
  })
}

// ─── BLOGS ───────────────────────────────────────────────────────────────────

export async function getBlogs() {
  const blogs = await prisma.blog.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: 'desc' },
  })
  return blogs.map((b) => ({
    ...b,
    coverImage: b.coverImageId ? `/api/images/${b.coverImageId}` : null,
  }))
}

export async function getBlogBySlug(slug: string) {
  const blog = await prisma.blog.findUnique({
    where: { slug },
    include: {
      products: {
        include: {
          product: {
            include: {
              brand: true,
              category: true,
              images: { ...imgSelect, take: 1 },
            },
          },
        },
      },
    },
  })
  if (!blog) return null
  return {
    ...blog,
    coverImage: blog.coverImageId ? `/api/images/${blog.coverImageId}` : null,
    products: blog.products.map((bp) => ({
      ...bp,
      product: withImageUrls(bp.product),
    })),
  }
}

// ─── LEGAL PAGES ─────────────────────────────────────────────────────────────

export async function getLegalPage(type: string) {
  return prisma.legalPage.findUnique({ where: { type: type as any } })
}

// ─── BRANDS ──────────────────────────────────────────────────────────────────

export async function getBrands() {
  return prisma.brand.findMany({ orderBy: { name: 'asc' } })
}

// ─── ADMIN ANALYTICS ─────────────────────────────────────────────────────────

export async function getAnalytics() {
  const [totalProducts, totalBlogs, totalClicks, topProducts] = await Promise.all([
    prisma.product.count(),
    prisma.blog.count(),
    prisma.affiliateClick.count(),
    prisma.product.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        _count: { select: { affiliateClicks: true } },
      },
      orderBy: { affiliateClicks: { _count: 'desc' } },
      take: 5,
    }),
  ])
  return { totalProducts, totalBlogs, totalClicks, topProducts }
}
