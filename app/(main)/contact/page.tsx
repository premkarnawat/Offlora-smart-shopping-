'use client'

import { useState } from 'react'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      setStatus('sent')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.')
      setStatus('error')
    }
  }

  const inputClass =
    'w-full bg-transparent border-b border-cream-300 focus:border-bark-600 outline-none py-3 text-sm font-sans text-bark-900 placeholder:text-bark-300 transition-colors'

  return (
    <div className="pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* ── Left: Info ──────────────────────────────── */}
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-bark-400 font-sans mb-3 sm:mb-4">Reach Us</p>
            <h1
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-bark-900 mb-6 sm:mb-8"
              style={{ fontFamily: 'Cormorant, serif', fontWeight: 300 }}
            >
              Contact Us
            </h1>
            <p className="text-sm text-bark-500 font-sans leading-relaxed mb-8 sm:mb-12 max-w-sm">
              Have a product suggestion, partnership inquiry, or editorial question? We would love to hear from you. Your message lands directly in our inbox.
            </p>

            <div className="space-y-2">
              <p className="text-xs tracking-widest uppercase text-bark-400 font-sans mb-1">Email</p>
              <a href="mailto:offlora.contact@gmail.com" className="text-sm text-bark-800 hover:text-bark-600 transition-colors font-sans min-h-0">
                offlora.contact@gmail.com
              </a>
            </div>

            {/* Direct delivery notice */}
            <div className="mt-10 sm:mt-12 flex items-start gap-3 p-4 bg-cream-200/60 border border-cream-300">
              <CheckCircle size={15} strokeWidth={1.5} className="text-sage-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-bark-600 font-sans leading-relaxed">
                Messages are delivered directly to our inbox — no third-party service involved. You will also receive an automatic confirmation copy.
              </p>
            </div>
          </div>

          {/* ── Right: Form ─────────────────────────────── */}
          <div>
            {status === 'sent' ? (
              // Success state
              <div className="h-full flex flex-col justify-center py-12 lg:py-0">
                <div className="flex items-center gap-3 mb-5">
                  <CheckCircle size={24} strokeWidth={1.5} className="text-sage-500" />
                  <p
                    className="font-serif text-3xl sm:text-4xl text-bark-900"
                    style={{ fontFamily: 'Cormorant, serif', fontWeight: 300 }}
                  >
                    Message Sent
                  </p>
                </div>
                <p className="text-sm text-bark-500 font-sans leading-relaxed mb-2">
                  Thank you for reaching out. Your message has been delivered directly to our inbox.
                </p>
                <p className="text-sm text-bark-500 font-sans leading-relaxed mb-8">
                  We have also sent a confirmation to your email. Expect a reply within 1–2 business days.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="self-start text-xs tracking-widest uppercase text-bark-600 hover:text-bark-900 transition-colors font-sans border-b border-bark-300 hover:border-bark-600 pb-0.5 min-h-0"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8" noValidate>

                {/* Error banner */}
                {status === 'error' && (
                  <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200">
                    <AlertCircle size={15} strokeWidth={1.5} className="text-red-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-red-700 font-sans">{errorMsg}</p>
                  </div>
                )}

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-bark-400 font-sans mb-2">
                      Name <span className="text-bark-400">*</span>
                    </label>
                    <input
                      className={inputClass}
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Your full name"
                      required
                      maxLength={100}
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-bark-400 font-sans mb-2">
                      Email <span className="text-bark-400">*</span>
                    </label>
                    <input
                      type="email"
                      className={inputClass}
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      required
                      autoComplete="email"
                      enterKeyHint="next"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs tracking-widest uppercase text-bark-400 font-sans mb-2">
                    Subject <span className="text-bark-400">*</span>
                  </label>
                  <select
                    className={inputClass}
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    required
                  >
                    <option value="">Select a topic</option>
                    <option value="Product Suggestion">Product Suggestion</option>
                    <option value="Partnership / Collaboration">Partnership / Collaboration</option>
                    <option value="Editorial Inquiry">Editorial Inquiry</option>
                    <option value="Review Correction">Review Correction</option>
                    <option value="General Question">General Question</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs tracking-widest uppercase text-bark-400 font-sans mb-2">
                    Message <span className="text-bark-400">*</span>
                  </label>
                  <textarea
                    className={`${inputClass} min-h-[120px] sm:min-h-[160px] resize-none`}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Write your message here…"
                    required
                    maxLength={5000}
                  />
                  <p className="text-xs text-bark-400 font-sans mt-1.5 text-right">
                    {form.message.length}/5000
                  </p>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-bark-900 text-cream-100 px-8 py-3.5 text-xs tracking-widest uppercase font-sans hover:bg-bark-800 active:bg-bark-700 transition-colors disabled:opacity-60 min-h-0"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 size={13} strokeWidth={1.5} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>

                <p className="text-xs text-bark-400 font-sans">
                  Your message is sent directly to our inbox via Gmail SMTP. We reply within 1–2 business days.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
