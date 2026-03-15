'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import Link from 'next/link'

interface Props {
  product: {
    title: string
    shortDesc: string
    rating: number
    reviewCount: number
    brand: { name: string; slug: string }
    category: { name: string; slug: string }
  }
}

export default function ProductInfo({ product }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-5"
    >
      {/* Brand + Category */}
      <div className="flex items-center gap-4">
        <Link
          href={`/category/${product.category.slug}`}
          className="text-xs tracking-widest uppercase text-bark-400 hover:text-bark-600 transition-colors font-sans"
        >
          {product.category.name}
        </Link>
        <span className="text-bark-300">·</span>
        <span className="text-xs tracking-widest uppercase text-bark-400 font-sans">{product.brand.name}</span>
      </div>

      {/* Title */}
      <h1
        className="font-serif text-4xl md:text-5xl text-bark-900 leading-[1.05]"
        style={{ fontFamily: 'Cormorant, serif', fontWeight: 300 }}
      >
        {product.title}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              strokeWidth={1}
              className={i < Math.round(product.rating) ? 'fill-bark-600 text-bark-600' : 'text-bark-300'}
            />
          ))}
        </div>
        <span className="text-sm text-bark-600 font-sans">{product.rating.toFixed(1)}</span>
        <span className="text-xs text-bark-400 font-sans">({product.reviewCount} reviews)</span>
      </div>

      {/* Short description */}
      <p className="text-sm text-bark-600 leading-relaxed font-sans border-l-2 border-cream-300 pl-4">
        {product.shortDesc}
      </p>
    </motion.div>
  )
}
