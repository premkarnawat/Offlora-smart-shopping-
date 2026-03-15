'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface Category { id:string; name:string; slug:string; description?:string|null; imageUrl?:string|null; _count?:{products:number} }
interface Props { categories: Category[] }

const bgColors = ['bg-sage-300/30','bg-bark-300/30','bg-cream-300','bg-sage-400/20','bg-bark-200/50','bg-cream-200']

export default function CategoryGrid({ categories }: Props) {
  if (!categories.length) return null
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-cream-50 border-y border-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <motion.p initial={{ opacity:0,y:8 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }}
            className="text-xs tracking-[0.25em] uppercase text-bark-400 font-sans mb-2 sm:mb-3">
            Browse by
          </motion.p>
          <motion.h2 initial={{ opacity:0,y:12 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ delay:0.1 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-bark-900"
            style={{ fontFamily:'Cormorant, serif', fontWeight:300 }}>
            Product Categories
          </motion.h2>
        </div>

        {/* 3 col mobile → 6 col lg */}
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.slice(0,6).map((cat,i) => (
            <motion.div key={cat.id} initial={{ opacity:0,scale:0.96 }} whileInView={{ opacity:1,scale:1 }} viewport={{ once:true }} transition={{ delay:i*0.07 }}>
              <Link href={`/category/${cat.slug}`}
                className={`group block ${bgColors[i % bgColors.length]} p-3 sm:p-4 lg:p-6 text-center hover:shadow-md transition-shadow duration-300`}>
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mx-auto mb-2 sm:mb-3 lg:mb-4 rounded-full bg-bark-200/50 flex items-center justify-center">
                  <span className="font-serif text-base sm:text-lg lg:text-xl text-bark-700" style={{ fontFamily:'Cormorant, serif' }}>
                    {cat.name[0]}
                  </span>
                </div>
                <p className="text-xs tracking-wide uppercase font-sans text-bark-700 group-hover:text-bark-900 transition-colors leading-tight">
                  {cat.name}
                </p>
                {cat._count && (
                  <p className="text-xs text-bark-400 font-sans mt-1 hidden sm:block">{cat._count.products}</p>
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-10">
          <Link href="/categories" className="text-xs tracking-widests uppercase text-bark-600 hover:text-bark-900 transition-colors font-sans border-b border-bark-300 hover:border-bark-600 pb-0.5 min-h-0">
            View All Categories →
          </Link>
        </div>
      </div>
    </section>
  )
}
