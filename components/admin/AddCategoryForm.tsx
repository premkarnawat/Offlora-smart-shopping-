'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createCategory } from '@/lib/actions'
import { Plus, Loader2 } from 'lucide-react'

export default function AddCategoryForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const inputClass = 'w-full bg-transparent border border-cream-300 focus:border-bark-500 outline-none px-3 py-2.5 text-sm font-sans text-bark-900 placeholder:text-bark-300 transition-colors'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      await createCategory(name.trim(), description.trim() || undefined)
      setSuccess(`Category "${name}" added successfully!`)
      setName('')
      setDescription('')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Failed to add category')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-sm text-red-600 font-sans">{error}</p>}
      {success && <p className="text-sm text-sage-600 font-sans">✓ {success}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs tracking-widest uppercase text-bark-500 font-sans mb-2">
            Category Name *
          </label>
          <input
            className={inputClass}
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Electronics, Beauty & Skincare"
            required
          />
        </div>
        <div>
          <label className="block text-xs tracking-widest uppercase text-bark-500 font-sans mb-2">
            Description (optional)
          </label>
          <input
            className={inputClass}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Short description of this category"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !name.trim()}
        className="flex items-center gap-2 bg-bark-900 text-cream-100 px-5 py-2.5 text-xs tracking-widest uppercase font-sans hover:bg-bark-800 transition-colors disabled:opacity-60 min-h-0"
      >
        {loading ? (
          <><Loader2 size={12} strokeWidth={1.5} className="animate-spin" /> Adding…</>
        ) : (
          <><Plus size={12} strokeWidth={1.5} /> Add Category</>
        )}
      </button>
    </form>
  )
}
