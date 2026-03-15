'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Shield, RefreshCw } from 'lucide-react'
import { trackAffiliateClick } from '@/lib/actions'

interface Props {
  product: { id: string; title: string; affiliateLink: string }
}

export default function ProductAffiliate({ product }: Props) {
  const [clicked, setClicked] = useState(false)

  const handleBuy = async () => {
    setClicked(true)
    await trackAffiliateClick(product.id)
    window.open(product.affiliateLink, '_blank', 'noopener,noreferrer')
    setTimeout(() => setClicked(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="border border-cream-300 p-6 space-y-5"
    >
      <div>
        <p className="text-xs tracking-widest uppercase text-bark-400 font-sans mb-1">Purchase via affiliate link</p>
        <p className="text-xs text-bark-400 font-sans">
          Clicking Buy Now redirects you to a trusted retailer. Offlora may earn a commission.
        </p>
      </div>

      <button
        onClick={handleBuy}
        className="w-full bg-bark-900 text-cream-100 py-4 flex items-center justify-center gap-2 text-sm tracking-widest uppercase font-sans hover:bg-bark-800 transition-colors duration-300 group"
      >
        {clicked ? (
          <>
            <RefreshCw size={14} strokeWidth={1.5} className="animate-spin" />
            Opening…
          </>
        ) : (
          <>
            Buy Now
            <ExternalLink size={14} strokeWidth={1.5} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </>
        )}
      </button>

      {/* Trust signals */}
      <div className="flex items-center gap-2 justify-center">
        <Shield size={12} strokeWidth={1.5} className="text-bark-400" />
        <p className="text-xs text-bark-400 font-sans">Affiliate link — you pay the same price</p>
      </div>
    </motion.div>
  )
}
