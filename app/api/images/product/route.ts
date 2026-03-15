import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAdminSession } from '@/lib/actions'

// POST /api/images/product — attach uploaded image to product
export async function POST(req: NextRequest) {
  const session = await verifyAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { productId, imageId, alt, isPrimary } = await req.json()

    if (!productId || !imageId) {
      return NextResponse.json({ error: 'productId and imageId required' }, { status: 400 })
    }

    // Fetch the uploaded image data
    const uploaded = await prisma.uploadedImage.findUnique({ where: { id: imageId } })
    if (!uploaded) return NextResponse.json({ error: 'Image not found' }, { status: 404 })

    // If setting as primary, unset others
    if (isPrimary) {
      await prisma.productImage.updateMany({
        where: { productId },
        data: { isPrimary: false },
      })
    }

    const productImage = await prisma.productImage.create({
      data: {
        data: uploaded.data,
        mimeType: uploaded.mimeType,
        filename: uploaded.filename,
        size: uploaded.size,
        alt: alt || uploaded.alt || '',
        isPrimary: isPrimary || false,
        productId,
      },
    })

    return NextResponse.json({
      id: productImage.id,
      url: `/api/images/${productImage.id}`,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to attach image' }, { status: 500 })
  }
}

// DELETE /api/images/product?id=xxx — remove image from product
export async function DELETE(req: NextRequest) {
  const session = await verifyAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const id = new URL(req.url).searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

  await prisma.productImage.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
