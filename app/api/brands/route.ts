import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAdminSession } from '@/lib/actions'

export async function DELETE(req: NextRequest) {
  try {
    // ✅ Check admin session
    const session = await verifyAdminSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // ✅ Get ID from query
    const id = new URL(req.url).searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'id required' }, { status: 400 })
    }

    // ✅ Find brand with product count
    const brand = await prisma.brand.findUnique({
      where: { id },
      include: {
        _count: {
          select: { products: true }
        }
      }
    })

    if (!brand) {
      return NextResponse.json({ error: 'Brand not found' }, { status: 404 })
    }

    // ✅ Prevent deletion if products exist
    if (brand._count.products > 0) {
      return NextResponse.json(
        { error: `Cannot delete — has ${brand._count.products} products` },
        { status: 400 }
      )
    }

    // ✅ Delete brand
    await prisma.brand.delete({
      where: { id }
    })

    return NextResponse.json({ ok: true })

  } catch (error: any) {
    console.error('[Brand DELETE error]', error)

    return NextResponse.json(
      { error: 'Failed to delete brand', detail: error.message },
      { status: 500 }
    )
  }
}
