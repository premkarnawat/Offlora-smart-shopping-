'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { adminLogin } from '@/lib/actions'
import { Eye, EyeOff } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = await adminLogin(email, password)
    if (result.success) {
      router.push('/admin/dashboard')
    } else {
      setError(result.error || 'Login failed')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream-100 flex items-center justify-center px-4 sm:px-6"
      style={{ paddingTop:'env(safe-area-inset-top)', paddingBottom:'env(safe-area-inset-bottom)' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-10 sm:mb-12">
          <p className="font-serif text-2xl sm:text-3xl tracking-[0.14em] text-bark-900"
            style={{ fontFamily:'Cormorant, serif' }}>OFFLORA</p>
          <p className="text-xs tracking-widests uppercase text-bark-400 font-sans mt-2">Admin Access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm font-sans text-center rounded-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block text-xs tracking-widests uppercase text-bark-500 font-sans mb-2">Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email"
              className="w-full bg-transparent border border-cream-300 focus:border-bark-500 outline-none px-4 py-3 text-sm font-sans text-bark-900 transition-colors"
              placeholder="admin@offlora.in" />
          </div>
          <div>
            <label className="block text-xs tracking-widests uppercase text-bark-500 font-sans mb-2">Password</label>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password"
                className="w-full bg-transparent border border-cream-300 focus:border-bark-500 outline-none px-4 py-3 pr-10 text-sm font-sans text-bark-900 transition-colors"
                placeholder="••••••••" />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-bark-400 hover:text-bark-700 transition-colors min-h-0 p-1">
                {showPassword ? <EyeOff size={14} strokeWidth={1.5} /> : <Eye size={14} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-bark-900 text-cream-100 py-3.5 text-xs tracking-widests uppercase font-sans hover:bg-bark-800 active:bg-bark-700 transition-colors disabled:opacity-60 mt-2 min-h-0">
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-xs text-bark-400 font-sans mt-8">Offlora Admin · Restricted Access</p>
      </div>
    </div>
  )
}
