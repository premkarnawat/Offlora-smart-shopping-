import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock } from 'lucide-react'
import { getBlogs } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Reviews & Buying Guides',
  description: 'Expert product reviews, comparisons, and buying guides from the Offlora editorial team.',
}

export const revalidate = 1800

export default async function BlogsPage() {
  const blogs = await getBlogs()
  const [hero, ...rest] = blogs

  return (
    <div className="pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10 sm:mb-14 lg:mb-20">
          <p className="text-xs tracking-[0.25em] uppercase text-bark-400 font-sans mb-2 sm:mb-3">Editorial</p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-bark-900"
            style={{ fontFamily:'Cormorant, serif', fontWeight:300 }}>
            Reviews & Guides
          </h1>
        </div>

        {/* Hero article */}
        {hero && (
          <Link href={`/blog/${hero.slug}`} className="group block mb-14 sm:mb-16 lg:mb-20 min-h-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
              <div className="relative h-64 sm:h-80 lg:h-[480px] overflow-hidden bg-cream-200">
                {hero.coverImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={hero.coverImage} alt={hero.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                )}
              </div>
              <div>
                <div className="flex gap-2 flex-wrap mb-3 sm:mb-4">
                  {hero.tags.slice(0,2).map(tag => (
                    <span key={tag} className="text-xs tracking-wider uppercase bg-cream-200 px-2.5 py-1 text-bark-600 font-sans">{tag}</span>
                  ))}
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-bark-900 group-hover:text-bark-700 transition-colors leading-snug mb-3 sm:mb-4"
                  style={{ fontFamily:'Cormorant, serif', fontWeight:300 }}>
                  {hero.title}
                </h2>
                <p className="text-sm text-bark-500 font-sans leading-relaxed mb-4 sm:mb-6 line-clamp-3">{hero.excerpt}</p>
                <div className="flex items-center gap-3 text-xs text-bark-400 font-sans">
                  <Clock size={11} strokeWidth={1.5} />
                  <span>{hero.readTime} min read</span>
                  <span>·</span>
                  <span>{hero.author}</span>
                </div>
              </div>
            </div>
          </Link>
        )}

        <div className="border-t border-cream-300 pt-10 sm:pt-14 lg:pt-16">
          {/* 1 col mobile, 2 col sm, 3 col lg */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            {rest.map(blog => (
              <Link key={blog.id} href={`/blog/${blog.slug}`} className="group min-h-0">
                <div className="relative h-48 sm:h-56 overflow-hidden bg-cream-200 mb-4 sm:mb-5">
                  {blog.coverImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={blog.coverImage} alt={blog.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  )}
                </div>
                <div className="flex gap-2 mb-2 sm:mb-3 flex-wrap">
                  {blog.tags.slice(0,1).map(tag => (
                    <span key={tag} className="text-xs tracking-wider uppercase text-bark-400 font-sans">{tag}</span>
                  ))}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-bark-900 group-hover:text-bark-700 transition-colors leading-snug mb-2 sm:mb-3 line-clamp-3"
                  style={{ fontFamily:'Cormorant, serif', fontWeight:300 }}>
                  {blog.title}
                </h3>
                <p className="text-xs text-bark-500 font-sans line-clamp-2 mb-3 sm:mb-4">{blog.excerpt}</p>
                <div className="flex items-center gap-2 text-xs text-bark-400 font-sans">
                  <Clock size={10} strokeWidth={1.5} /><span>{blog.readTime} min read</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
