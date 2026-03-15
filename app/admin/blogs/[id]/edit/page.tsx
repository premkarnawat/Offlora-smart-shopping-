import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import BlogForm from '@/components/admin/BlogForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface Props { params: { id: string } }

export default async function EditBlogPage({ params }: Props) {
  const [blog, products] = await Promise.all([
    prisma.blog.findUnique({
      where: { id: params.id },
      include: { products: { select: { productId: true } } },
    }),
    prisma.product.findMany({ select: { id: true, title: true }, orderBy: { title: 'asc' } }),
  ])

  if (!blog) notFound()

  return (
    <div>
      <Link href="/admin/blogs" className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-bark-400 hover:text-bark-700 transition-colors font-sans mb-8">
        <ArrowLeft size={12} strokeWidth={1.5} /> Back to Articles
      </Link>
      <h1 className="font-serif text-3xl text-bark-900 mb-8" style={{ fontFamily: 'Cormorant, serif' }}>
        Edit Article
      </h1>
      <BlogForm
        products={products}
        mode="edit"
        initialData={{
          id: blog.id,
          title: blog.title,
          excerpt: blog.excerpt,
          content: blog.content,
          coverImageId: blog.coverImageId || '',
          coverImageUrl: blog.coverImageId ? `/api/images/${blog.coverImageId}` : '',
          tags: blog.tags,
          readTime: blog.readTime,
          author: blog.author,
          isPublished: blog.isPublished,
          isFeatured: blog.isFeatured,
          productIds: blog.products.map((p) => p.productId),
        }}
      />
    </div>
  )
}
