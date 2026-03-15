'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Star, ArrowUpRight } from 'lucide-react'
import { trackAffiliateClick } from '@/lib/actions'

interface ProductCardProps {
  product: {
    id: string
    title: string
    slug: string
    shortDesc: string
    rating: number
    reviewCount: number
    affiliateLink: string
    brand: { name: string }
    category: { name: string }
    images: { url: string; alt?: string | null; isPrimary: boolean }[]
  }
  index?: number
  /** Layout hint — 'grid' (default) stacks vertically; 'list' shows side-by-side on mobile */
  layout?: 'grid' | 'list'
}

export default function ProductCard({ product, index = 0, layout = 'grid' }: ProductCardProps) {
  const primaryImage = product.images.find((i) => i.isPrimary) || product.images[0]

  const handleBuyClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    await trackAffiliateClick(product.id)
    window.open(product.affiliateLink, '_blank', 'noopener,noreferrer')
  }

  if (layout === 'list') {
    // Horizontal card for list views (search results, etc.)
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.06 }}
        className="flex gap-4 sm:gap-6 border-b border-cream-300 pb-6 last:border-0"
      >
        <Link href={`/product/${product.slug}`} className="flex-shrink-0 min-h-0">
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-cream-200 overflow-hidden">
            {primaryImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={primaryImage.url}
                alt={primaryImage.alt || product.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-xs text-bark-400 font-sans">No Image</span>
              </div>
            )}
          </div>
        </Link>
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <p className="text-xs text-bark-400 font-sans mb-1">{product.brand.name}</p>
            <Link href={`/product/${product.slug}`}>
              <h3
                className="font-serif text-lg sm:text-xl text-bark-900 leading-snug line-clamp-2"
                style={{ fontFamily: 'Cormorant, serif', fontWeight: 300 }}
              >
                {product.title}
              </h3>
            </Link>
            <div className="flex items-center gap-1.5 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={10} strokeWidth={1} className={i < Math.round(product.rating) ? 'fill-bark-600 text-bark-600' : 'text-bark-300'} />
              ))}
              <span className="text-xs text-bark-400 font-sans">{product.rating.toFixed(1)}</span>
            </div>
          </div>
          <button
            onClick={handleBuyClick}
            className="mt-3 self-start border border-bark-900 text-bark-900 px-4 py-2 text-xs tracking-widest uppercase font-sans hover:bg-bark-900 hover:text-cream-100 transition-all duration-300 min-h-0"
          >
            Buy Now
          </button>
        </div>
      </motion.div>
    )
  }

  // Default: vertical grid card
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.07, 0.4), ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group product-card-hover flex flex-col"
    >
      {/* Image container — 3:4 portrait on all sizes */}
      <Link href={`/product/${product.slug}`} className="block min-h-0">
        <div
          className="relative overflow-hidden bg-cream-200 w-full mb-3 sm:mb-4"
          style={{ paddingBottom: '133.33%' }} /* 3:4 ratio */
        >
          <div className="absolute inset-0">
            {primaryImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={primaryImage.url}
                alt={primaryImage.alt || product.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-xs text-bark-400 font-sans tracking-widest uppercase">No Image</span>
              </div>
            )}

            {/* Hover overlay — desktop only */}
            <div className="absolute inset-0 bg-bark-900/0 group-hover:bg-bark-900/8 transition-colors duration-500 hidden sm:block" />

            {/* Quick view badge — desktop hover */}
            <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex">
              <div className="bg-cream-50/90 backdrop-blur-sm px-2.5 py-1.5 flex items-center gap-1">
                <span className="text-xs tracking-wide uppercase font-sans text-bark-800">View</span>
                <ArrowUpRight size={10} strokeWidth={1.5} className="text-bark-800" />
              </div>
            </div>

            {/* Category badge */}
            <div className="absolute bottom-2.5 left-2.5">
              <span className="bg-cream-50/90 backdrop-blur-sm px-2 py-0.5 text-xs tracking-wide uppercase font-sans text-bark-600">
                {product.category.name}
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* Text info */}
      <div className="flex flex-col flex-1 space-y-1.5 sm:space-y-2">
        <p className="text-xs tracking-widests uppercase text-bark-400 font-sans truncate">{product.brand.name}</p>
        <Link href={`/product/${product.slug}`}>
          <h3
            className="font-serif text-base sm:text-lg leading-snug text-bark-900 group-hover:text-bark-700 transition-colors line-clamp-2"
            style={{ fontFamily: 'Cormorant, serif' }}
          >
            {product.title}
          </h3>
        </Link>
        <p className="text-xs text-bark-500 leading-relaxed font-sans line-clamp-2 hidden sm:block">
          {product.shortDesc}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 pt-0.5">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={10}
                strokeWidth={1}
                className={i < Math.round(product.rating) ? 'fill-bark-600 text-bark-600' : 'text-bark-300'}
              />
            ))}
          </div>
          <span className="text-xs text-bark-400 font-sans">
            {product.rating.toFixed(1)}
            <span className="hidden sm:inline"> ({product.reviewCount})</span>
          </span>
        </div>
      </div>

      {/* Buy button — full width, tall enough for touch */}
      <button
        onClick={handleBuyClick}
        className="mt-4 w-full border border-bark-900 text-bark-900 py-3 sm:py-3.5 text-xs tracking-widests uppercase font-sans hover:bg-bark-900 hover:text-cream-100 active:bg-bark-800 active:text-cream-100 transition-all duration-300 min-h-0"
      >
        Buy Now ↗
      </button>
    </motion.div>
  )
}
