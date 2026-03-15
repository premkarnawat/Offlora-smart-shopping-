import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAdminSession } from '@/lib/actions'

export async function DELETE(req: NextRequest) {
  const session = await verifyAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const id = new URL(req.url).searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  const cat = await prisma.category.findUnique({ where: { id }, include: { _count: { select: { products: true } } } })
  if (!cat) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (cat._count.products > 0) return NextResponse.json({ error: `Cannot delete — has ${cat._count.products} products` }, { status: 400 })
  await prisma.category.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
