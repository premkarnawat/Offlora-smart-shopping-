'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import ProductCard from '@/components/product/ProductCard'

interface Props { products: any[] }

export default function TopRatedProducts({ products }: Props) {
  if (!products.length) return null
  return (
    <section className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 gap-4">
        <div>
          <motion.p initial={{ opacity:0,y:8 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }}
            className="text-xs tracking-[0.25em] uppercase text-bark-400 font-sans mb-2 sm:mb-3">
            Community picks
          </motion.p>
          <motion.h2 initial={{ opacity:0,y:12 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ delay:0.1 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-bark-900"
            style={{ fontFamily:'Cormorant, serif', fontWeight:300 }}>
            Top Rated
          </motion.h2>
        </div>
        <Link href="/products?sort=rating" className="text-xs tracking-widests uppercase text-bark-600 hover:text-bark-900 transition-colors font-sans border-b border-bark-300 hover:border-bark-600 pb-0.5 self-start sm:self-auto min-h-0">
          See All →
        </Link>
      </div>
      {/* 2 col on mobile → 3 col on md+ */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-10">
        {products.slice(0,3).map((p,i) => <ProductCard key={p.id} product={p} index={i} />)}
      </div>
    </section>
  )
}
