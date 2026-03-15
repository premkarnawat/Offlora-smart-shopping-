import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Try ProductImage first, then UploadedImage
    const productImage = await prisma.productImage.findUnique({
      where: { id: params.id },
      select: { data: true, mimeType: true },
    })

    const record = productImage || await prisma.uploadedImage.findUnique({
      where: { id: params.id },
      select: { data: true, mimeType: true },
    })

    if (!record) {
      return new NextResponse('Image not found', { status: 404 })
    }

    // data is stored as "data:image/jpeg;base64,<data>"
    const base64Data = record.data.split(',')[1]
    if (!base64Data) {
      return new NextResponse('Invalid image data', { status: 500 })
    }

    const buffer = Buffer.from(base64Data, 'base64')

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': record.mimeType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Length': String(buffer.length),
      },
    })
  } catch (error) {
    console.error('Image serve error:', error)
    return new NextResponse('Server error', { status: 500 })
  }
}
