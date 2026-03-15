import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, ArrowLeft } from 'lucide-react'
import { getBlogBySlug } from '@/lib/data'
import ProductCard from '@/components/product/ProductCard'

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = await getBlogBySlug(params.slug)
  if (!blog) return { title: 'Article Not Found' }
  return {
    title: blog.title,
    description: blog.excerpt,
    openGraph: { title: blog.title, description: blog.excerpt },
  }
}

export default async function BlogPage({ params }: Props) {
  const blog = await getBlogBySlug(params.slug)
  if (!blog) notFound()
  const featuredProducts = blog.products?.map((bp: any) => bp.product) || []

  return (
    <article className="pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link href="/blogs" className="inline-flex items-center gap-2 text-xs tracking-widests uppercase text-bark-400 hover:text-bark-700 transition-colors font-sans mb-8 sm:mb-12 min-h-0">
          <ArrowLeft size={12} strokeWidth={1.5} />All Articles
        </Link>

        <div className="flex gap-2 flex-wrap mb-4 sm:mb-6">
          {blog.tags.map((tag: string) => (
            <span key={tag} className="text-xs tracking-wider uppercase bg-cream-200 px-2.5 py-1 text-bark-600 font-sans">{tag}</span>
          ))}
        </div>

        <h1 className="font-serif leading-[1.05] text-bark-900 mb-5 sm:mb-6"
          style={{ fontFamily:'Cormorant, serif', fontWeight:300, fontSize:'clamp(2rem,6vw,3.5rem)' }}>
          {blog.title}
        </h1>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-bark-400 font-sans mb-8 sm:mb-12 pb-8 sm:pb-10 border-b border-cream-300">
          <span>{blog.author}</span>
          <span>·</span>
          <Clock size={11} strokeWidth={1.5} />
          <span>{blog.readTime} min read</span>
          <span>·</span>
          <span>{new Date(blog.createdAt).toLocaleDateString('en-IN', { year:'numeric', month:'long', day:'numeric' })}</span>
        </div>

        {blog.coverImage && (
          <div className="relative h-56 sm:h-72 md:h-96 mb-10 sm:mb-12 overflow-hidden bg-cream-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={blog.coverImage} alt={blog.title} className="absolute inset-0 w-full h-full object-cover" />
          </div>
        )}

        <div className="prose-offlora" dangerouslySetInnerHTML={{ __html: blog.content }} />

        {featuredProducts.length > 0 && (
          <div className="mt-16 sm:mt-20 pt-10 sm:pt-12 border-t border-cream-300">
            <p className="text-xs tracking-widests uppercase text-bark-400 font-sans mb-2">Products in this article</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-bark-900 mb-8 sm:mb-10"
              style={{ fontFamily:'Cormorant, serif', fontWeight:300 }}>
              Featured Products
            </h2>
            {/* 2 cols always for inline blog products */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 sm:gap-8">
              {featuredProducts.map((p: any, i: number) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
