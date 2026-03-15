'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, ChevronLeft, ChevronRight } from 'lucide-react'

interface ProductImage { url:string; alt?:string|null; isPrimary:boolean }
interface Props { images:ProductImage[]; videoUrl?:string|null }

export default function ProductGallery({ images, videoUrl }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [showVideo, setShowVideo] = useState(false)

  const active = images[activeIndex]
  const total = images.length

  const prev = () => { setShowVideo(false); setActiveIndex(i => (i - 1 + total) % total) }
  const next = () => { setShowVideo(false); setActiveIndex(i => (i + 1) % total) }

  return (
    <div className="lg:sticky lg:top-28">
      {/* Main image — square ratio */}
      <div className="relative overflow-hidden bg-cream-200 mb-3 sm:mb-4" style={{ paddingBottom:'100%' }}>
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            {showVideo && videoUrl ? (
              <motion.div key="video" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="absolute inset-0">
                <iframe src={videoUrl} className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen title="Product video" />
              </motion.div>
            ) : (
              <motion.div key={activeIndex} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                transition={{ duration:0.3 }} className="absolute inset-0">
                {active && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={active.url} alt={active.alt || 'Product image'} className="w-full h-full object-cover" />
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Swipe / arrow nav on mobile */}
          {total > 1 && !showVideo && (
            <>
              <button onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-cream-50/80 backdrop-blur-sm flex items-center justify-center text-bark-700 hover:bg-cream-100 transition-colors sm:hidden min-h-0">
                <ChevronLeft size={16} strokeWidth={1.5} />
              </button>
              <button onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-cream-50/80 backdrop-blur-sm flex items-center justify-center text-bark-700 hover:bg-cream-100 transition-colors sm:hidden min-h-0">
                <ChevronRight size={16} strokeWidth={1.5} />
              </button>
              {/* Dot indicator on mobile */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 sm:hidden">
                {images.map((_, i) => (
                  <button key={i} onClick={() => setActiveIndex(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all min-h-0 ${i === activeIndex ? 'bg-bark-900' : 'bg-bark-400/60'}`} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Thumbnails — hidden on mobile (swipe instead), visible sm+ */}
      <div className="hidden sm:flex gap-2 sm:gap-3 overflow-x-auto pb-1 no-scrollbar">
        {images.map((img, i) => (
          <button key={i} onClick={() => { setActiveIndex(i); setShowVideo(false) }}
            className={`relative flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 overflow-hidden transition-all duration-200 min-h-0 ${
              activeIndex === i && !showVideo ? 'ring-2 ring-bark-900 ring-offset-1' : 'opacity-50 hover:opacity-100'
            }`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.url} alt={img.alt || `View ${i+1}`} className="w-full h-full object-cover" />
          </button>
        ))}
        {videoUrl && (
          <button onClick={() => setShowVideo(true)}
            className={`relative flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-bark-900 flex items-center justify-center transition-all duration-200 min-h-0 ${
              showVideo ? 'ring-2 ring-bark-900 ring-offset-1' : 'opacity-70 hover:opacity-100'
            }`}>
            <Play size={16} className="text-cream-100" strokeWidth={1.5} />
          </button>
        )}
      </div>
    </div>
  )
}
