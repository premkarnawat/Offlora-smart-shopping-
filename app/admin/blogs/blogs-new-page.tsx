import { prisma } from '@/lib/prisma'
import BlogForm from '@/components/admin/BlogForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function NewBlogPage() {
  let products: { id: string; title: string }[] = []
  try {
    products = await prisma.product.findMany({
      select: { id: true, title: true },
      orderBy: { title: 'asc' },
    })
  } catch {
    // DB not ready yet
  }

  return (
    <div>
      <Link href="/admin/blogs"
        className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-bark-400 hover:text-bark-700 transition-colors font-sans mb-8 min-h-0">
        <ArrowLeft size={12} strokeWidth={1.5} /> Back to Articles
      </Link>
      <h1 className="font-serif text-3xl text-bark-900 mb-8" style={{ fontFamily:'Cormorant, serif' }}>
        New Article
      </h1>
      <BlogForm products={products} mode="create" />
    </div>
  )
}
