'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Clock } from 'lucide-react'

interface Blog { id:string; title:string; slug:string; excerpt:string; coverImage?:string|null; readTime:number; author:string; createdAt:Date; tags:string[] }
interface Props { blogs: Blog[] }

export default function BlogHighlights({ blogs }: Props) {
  if (!blogs.length) return null
  const [featured, ...rest] = blogs

  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-bark-900 text-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 gap-4">
          <div>
            <motion.p initial={{ opacity:0,y:8 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }}
              className="text-xs tracking-[0.25em] uppercase text-bark-400 font-sans mb-2 sm:mb-3">
              Guides & Reviews
            </motion.p>
            <motion.h2 initial={{ opacity:0,y:12 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ delay:0.1 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-cream-100"
              style={{ fontFamily:'Cormorant, serif', fontWeight:300 }}>
              From Our Editorial
            </motion.h2>
          </div>
          <Link href="/blogs" className="text-xs tracking-widests uppercase text-bark-400 hover:text-cream-200 transition-colors font-sans border-b border-bark-700 hover:border-bark-400 pb-0.5 self-start sm:self-auto min-h-0">
            All Articles →
          </Link>
        </div>

        {/* Stack on mobile, side-by-side on lg */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Featured hero */}
          {featured && (
            <motion.div initial={{ opacity:0,x:-16 }} whileInView={{ opacity:1,x:0 }} viewport={{ once:true }} className="lg:col-span-3">
              <Link href={`/blog/${featured.slug}`} className="group block min-h-0">
                <div className="relative h-52 sm:h-64 lg:h-80 xl:h-96 overflow-hidden mb-4 sm:mb-5 bg-bark-800">
                  {featured.coverImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={featured.coverImage} alt={featured.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-bark-900/80 to-transparent" />
                  <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 flex gap-2 flex-wrap">
                    {featured.tags.slice(0,2).map(tag => (
                      <span key={tag} className="text-xs tracking-wider uppercase bg-cream-50/10 backdrop-blur-sm px-2.5 py-1 text-cream-200 font-sans">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-xs text-bark-400 font-sans mb-2 sm:mb-3">
                  <Clock size={11} strokeWidth={1.5} />
                  <span>{featured.readTime} min read</span>
                  <span>·</span>
                  <span>{featured.author}</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-cream-100 group-hover:text-cream-300 transition-colors leading-snug"
                  style={{ fontFamily:'Cormorant, serif', fontWeight:300 }}>
                  {featured.title}
                </h3>
                <p className="text-xs sm:text-sm text-bark-400 font-sans mt-2 sm:mt-3 leading-relaxed line-clamp-2">{featured.excerpt}</p>
              </Link>
            </motion.div>
          )}

          {/* Side list — horizontal scroll on mobile, stacked on lg */}
          <div className="lg:col-span-2 flex flex-row lg:flex-col gap-5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {rest.slice(0,3).map((blog,i) => (
              <motion.div key={blog.id} initial={{ opacity:0,x:16 }} whileInView={{ opacity:1,x:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}
                className="min-w-[220px] sm:min-w-[260px] lg:min-w-0 flex-shrink-0 lg:flex-shrink">
                <Link href={`/blog/${blog.slug}`} className="group flex gap-3 sm:gap-4 min-h-0">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 overflow-hidden bg-bark-800">
                    {blog.coverImage && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={blog.coverImage} alt={blog.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-bark-500 font-sans mb-1">
                      <Clock size={10} strokeWidth={1.5} /><span>{blog.readTime} min</span>
                    </div>
                    <h4 className="font-serif text-base sm:text-lg text-cream-200 group-hover:text-cream-100 transition-colors leading-snug line-clamp-2"
                      style={{ fontFamily:'Cormorant, serif' }}>
                      {blog.title}
                    </h4>
                  </div>
                </Link>
                {i < 2 && <div className="border-b border-bark-800 mt-5 hidden lg:block" />}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
