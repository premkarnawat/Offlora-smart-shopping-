'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Menu, X, ArrowRight } from 'lucide-react'

const navLinks = [
  { label: 'Categories', href: '/categories' },
  { label: 'Products', href: '/products' },
  { label: 'Reviews', href: '/blogs' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); setSearchOpen(false) }, [pathname])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen || searchOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen, searchOpen])

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMenuOpen(false); setSearchOpen(false) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      {/* ── Top Bar ──────────────────────────────────────── */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-cream-100/95 backdrop-blur-md border-b border-cream-300/60 py-2 sm:py-3'
            : 'bg-transparent py-3 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-12 sm:h-auto">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center min-h-0"
            aria-label="Offlora home"
          >
            <span
              className="font-serif text-xl sm:text-2xl text-bark-900"
              style={{ fontFamily: 'Cormorant, serif', letterSpacing: '0.14em' }}
            >
              OFFLORA
            </span>
          </Link>

          {/* Desktop Nav — hidden on mobile/tablet */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs tracking-widest uppercase font-sans transition-colors duration-200 min-h-0 ${
                  pathname.startsWith(link.href)
                    ? 'text-bark-900'
                    : 'text-bark-600 hover:text-bark-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2.5 text-bark-600 hover:text-bark-900 transition-colors rounded-sm min-h-0"
              aria-label="Open search"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>
            {/* Hamburger — visible below lg */}
            <button
              className="lg:hidden p-2.5 text-bark-600 hover:text-bark-900 transition-colors rounded-sm min-h-0"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X size={20} strokeWidth={1.5} />
                  </motion.span>
                ) : (
                  <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu size={20} strokeWidth={1.5} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile / Tablet Drawer ───────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-bark-900/20 backdrop-blur-sm lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-xs sm:max-w-sm bg-cream-50 shadow-2xl flex flex-col lg:hidden"
              style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-cream-300">
                <span
                  className="font-serif text-xl text-bark-900"
                  style={{ fontFamily: 'Cormorant, serif', letterSpacing: '0.14em' }}
                >
                  OFFLORA
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 text-bark-500 hover:text-bark-900 min-h-0"
                  aria-label="Close menu"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 flex flex-col py-6 px-6 gap-1 overflow-y-auto" aria-label="Mobile navigation">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center justify-between w-full py-4 border-b border-cream-200 min-h-0 ${
                        pathname.startsWith(link.href)
                          ? 'text-bark-900'
                          : 'text-bark-600'
                      }`}
                    >
                      <span
                        className="font-serif text-2xl sm:text-3xl"
                        style={{ fontFamily: 'Cormorant, serif', fontWeight: 300 }}
                      >
                        {link.label}
                      </span>
                      <ArrowRight size={14} strokeWidth={1.5} className="text-bark-300 flex-shrink-0" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer footer */}
              <div className="px-6 py-5 border-t border-cream-300">
                <button
                  onClick={() => { setMenuOpen(false); setSearchOpen(true) }}
                  className="w-full flex items-center gap-3 py-3 text-bark-600 hover:text-bark-900 transition-colors min-h-0"
                >
                  <Search size={16} strokeWidth={1.5} />
                  <span className="text-sm font-sans tracking-wide">Search products…</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Search Overlay ───────────────────────────────── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-cream-100/98 backdrop-blur-sm flex flex-col"
            style={{ paddingTop: 'env(safe-area-inset-top)' }}
          >
            {/* Close */}
            <div className="flex justify-between items-center px-4 sm:px-6 py-4">
              <span className="text-xs tracking-widest uppercase text-bark-400 font-sans">Search</span>
              <button
                onClick={() => setSearchOpen(false)}
                className="p-2 text-bark-500 hover:text-bark-900 transition-colors min-h-0"
                aria-label="Close search"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Input area */}
            <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 -mt-16">
              <form
                action="/search"
                onSubmit={(e) => { if (!searchQuery.trim()) e.preventDefault() }}
                className="w-full max-w-2xl mx-auto"
              >
                <div className="relative">
                  <input
                    autoFocus
                    type="search"
                    name="q"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products, brands…"
                    className="w-full bg-transparent border-b-2 border-bark-300 focus:border-bark-900 outline-none py-3 sm:py-4 text-xl sm:text-2xl md:text-3xl font-serif text-bark-900 placeholder:text-bark-300 transition-colors pr-10"
                    style={{ fontFamily: 'Cormorant, serif', fontSize: 'clamp(1.25rem, 4vw, 2rem)' }}
                    enterKeyHint="search"
                  />
                  <button
                    type="submit"
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-bark-400 hover:text-bark-700 min-h-0"
                    aria-label="Submit search"
                  >
                    <Search size={20} strokeWidth={1.5} />
                  </button>
                </div>
                <p className="mt-4 text-xs text-bark-400 font-sans hidden sm:block">Press Enter to search</p>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
