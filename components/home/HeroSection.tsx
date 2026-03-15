'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const stats = [
  { value: '500+', label: 'Products Reviewed' },
  { value: '50+', label: 'Categories' },
  { value: '100K+', label: 'Monthly Readers' },
  { value: '4.8★', label: 'Rating Accuracy' },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-cream-50">

      {/* Background gradients */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 15% 50%, rgba(184,201,176,0.35) 0%, transparent 55%),
            radial-gradient(circle at 85% 20%, rgba(237,229,208,0.45) 0%, transparent 45%)
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 lg:pt-36 pb-28 sm:pb-32 text-center">

        {/* Eyebrow label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-bark-500 font-sans mb-5 sm:mb-8"
        >
          Curated Product Intelligence
        </motion.p>

        {/* Main headline — fully fluid font size */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-serif text-balance text-bark-900 mb-6 sm:mb-8 leading-[1.05]"
          style={{
            fontFamily: 'Cormorant, serif',
            fontWeight: 300,
            fontSize: 'clamp(2.5rem, 10vw, 7rem)',
          }}
        >
          Discover the Best
          <br />
          <em style={{ fontStyle: 'italic' }}>Before</em> You Buy
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.42 }}
          className="text-sm sm:text-base text-bark-600 max-w-xs sm:max-w-md lg:max-w-xl mx-auto leading-relaxed font-sans mb-8 sm:mb-12"
        >
          Deeply researched product reviews, expert comparisons, and honest buying guides — so every purchase feels certain.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.62 }}
          className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center items-center"
        >
          <Link
            href="/products"
            className="group w-full xs:w-auto inline-flex justify-center items-center gap-2 bg-bark-900 text-cream-100 px-6 sm:px-8 py-3.5 sm:py-4 text-xs tracking-widest uppercase font-sans hover:bg-bark-800 transition-colors duration-300 min-h-0"
          >
            Explore Products
            <ArrowRight size={13} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </Link>
          <Link
            href="/categories"
            className="w-full xs:w-auto inline-flex justify-center items-center border border-bark-300 text-bark-700 px-6 sm:px-8 py-3.5 sm:py-4 text-xs tracking-widest uppercase font-sans hover:border-bark-600 hover:text-bark-900 transition-colors duration-300 min-h-0"
          >
            Browse Categories
          </Link>
        </motion.div>

        {/* Scroll cue — hidden on very small screens */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="hidden sm:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 pointer-events-none"
          aria-hidden="true"
        >
          <span className="text-xs tracking-widest uppercase text-bark-400 font-sans">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-bark-400 to-transparent"
          />
        </motion.div>
      </div>

      {/* Stats bar — scrolls horizontally on mobile if needed */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="absolute bottom-0 left-0 right-0 border-t border-cream-300/60 bg-cream-100/70 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex items-center justify-around sm:justify-center sm:gap-12 lg:gap-20 overflow-x-auto no-scrollbar">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center flex-shrink-0 px-2">
                <p
                  className="font-serif text-lg sm:text-xl text-bark-900"
                  style={{ fontFamily: 'Cormorant, serif' }}
                >
                  {stat.value}
                </p>
                <p className="text-xs text-bark-500 font-sans mt-0.5 whitespace-nowrap">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
