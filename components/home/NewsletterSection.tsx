'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle'|'loading'|'success'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    await new Promise(r => setTimeout(r, 800))
    setStatus('success')
  }

  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6">
      <motion.div initial={{ opacity:0,y:24 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
        className="max-w-xl sm:max-w-2xl mx-auto text-center">
        <p className="text-xs tracking-[0.25em] uppercase text-bark-400 font-sans mb-3 sm:mb-4">Stay informed</p>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-bark-900 mb-3 sm:mb-4"
          style={{ fontFamily:'Cormorant, serif', fontWeight:300 }}>
          The Offlora Edit
        </h2>
        <p className="text-sm text-bark-500 font-sans leading-relaxed mb-8 sm:mb-10 max-w-sm sm:max-w-md mx-auto">
          Weekly product discoveries, honest reviews, and buying guides. No spam, ever.
        </p>

        {status === 'success' ? (
          <motion.p initial={{ opacity:0,scale:0.95 }} animate={{ opacity:1,scale:1 }}
            className="text-sm text-sage-600 font-sans tracking-wide">
            ✓ You are on the list. Welcome to Offlora.
          </motion.p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col xs:flex-row gap-3 max-w-xs xs:max-w-sm sm:max-w-md mx-auto">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="Your email address" required
              enterKeyHint="done"
              className="flex-1 bg-transparent border border-cream-300 focus:border-bark-400 outline-none px-4 py-3 text-sm font-sans text-bark-900 placeholder:text-bark-300 transition-colors" />
            <button type="submit" disabled={status==='loading'}
              className="bg-bark-900 text-cream-100 px-5 sm:px-6 py-3 text-xs tracking-widests uppercase font-sans hover:bg-bark-800 active:bg-bark-700 transition-colors disabled:opacity-60 whitespace-nowrap min-h-0">
              {status==='loading' ? 'Joining…' : 'Subscribe'}
            </button>
          </form>
        )}
        <p className="text-xs text-bark-400 font-sans mt-3 sm:mt-4">By subscribing you agree to our Privacy Policy.</p>
      </motion.div>
    </section>
  )
}
