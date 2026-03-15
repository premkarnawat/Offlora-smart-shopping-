import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAdminSession } from '@/lib/actions'

// Max 4MB per image (base64 inflates ~33%, so raw limit ~3MB)
const MAX_SIZE_BYTES = 4 * 1024 * 1024

export async function POST(req: NextRequest) {
  // Auth check
  const session = await verifyAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const alt = (formData.get('alt') as string) || ''

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: JPEG, PNG, WebP, GIF' },
        { status: 400 }
      )
    }

    // Validate size
    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { error: `File too large. Maximum size is 4MB` },
        { status: 400 }
      )
    }

    // Convert to base64
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const base64 = buffer.toString('base64')
    const dataUri = `data:${file.type};base64,${base64}`

    // Store in UploadedImage table
    const uploaded = await prisma.uploadedImage.create({
      data: {
        data: dataUri,
        mimeType: file.type,
        filename: file.name,
        size: file.size,
        alt,
      },
    })

    return NextResponse.json({
      id: uploaded.id,
      url: `/api/images/${uploaded.id}`,
      mimeType: uploaded.mimeType,
      filename: uploaded.filename,
      size: uploaded.size,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
