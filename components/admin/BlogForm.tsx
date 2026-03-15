'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createBlog, updateBlog } from '@/lib/actions'
import { Plus, Minus, X, Loader2, ImagePlus } from 'lucide-react'

interface Product { id: string; title: string }

interface BlogFormData {
  title: string
  excerpt: string
  content: string
  coverImageId: string
  coverImageUrl: string
  tags: string[]
  readTime: number
  author: string
  isPublished: boolean
  isFeatured: boolean
  productIds: string[]
}

interface Props {
  products: Product[]
  initialData?: Partial<BlogFormData> & { id?: string }
  mode: 'create' | 'edit'
}

const defaultData: BlogFormData = {
  title: '', excerpt: '', content: '', coverImageId: '', coverImageUrl: '',
  tags: [''], readTime: 5, author: 'Offlora Editorial',
  isPublished: true, isFeatured: false, productIds: [],
}

export default function BlogForm({ products, initialData, mode }: Props) {
  const router = useRouter()
  const [form, setForm] = useState<BlogFormData>({ ...defaultData, ...initialData })
  const [loading, setLoading] = useState(false)
  const [coverUploading, setCoverUploading] = useState(false)
  const [coverError, setCoverError] = useState('')
  const [error, setError] = useState('')
  const coverInputRef = useRef<HTMLInputElement>(null)

  const update = (key: keyof BlogFormData, value: any) => setForm((f) => ({ ...f, [key]: value }))

  const handleCoverUpload = async (file: File) => {
    setCoverError('')
    if (file.size > 4 * 1024 * 1024) { setCoverError('Max 4MB'); return }
    setCoverUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('alt', form.title || 'Blog cover')
      const res = await fetch('/api/images/upload', { method: 'POST', body: fd })
      if (!res.ok) throw new Error()
      const data = await res.json()
      update('coverImageId', data.id)
      update('coverImageUrl', data.url)
    } catch {
      setCoverError('Upload failed. Try again.')
    } finally {
      setCoverUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const payload = { ...form, tags: form.tags.filter(Boolean) }
      if (mode === 'create') await createBlog(payload)
      else if (initialData?.id) await updateBlog(initialData.id, payload)
      router.push('/admin/blogs')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = 'w-full bg-transparent border border-cream-300 focus:border-bark-500 outline-none px-3 py-2.5 text-sm font-sans text-bark-900 placeholder:text-bark-300 transition-colors'
  const labelClass = 'block text-xs tracking-widest uppercase text-bark-500 font-sans mb-2'
  const toggleProduct = (id: string) => {
    update('productIds', form.productIds.includes(id) ? form.productIds.filter(p => p !== id) : [...form.productIds, id])
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm font-sans">{error}</div>}

      <section className="bg-white border border-cream-300 p-6 space-y-5">
        <h2 className="font-serif text-xl text-bark-900 mb-6" style={{ fontFamily: 'Cormorant, serif' }}>Article Details</h2>
        <div>
          <label className={labelClass}>Title *</label>
          <input className={inputClass} value={form.title} onChange={e => update('title', e.target.value)} placeholder="e.g. Best Smartphones Under 30,000" required />
        </div>
        <div>
          <label className={labelClass}>Excerpt *</label>
          <textarea className={`${inputClass} min-h-[80px] resize-none`} value={form.excerpt} onChange={e => update('excerpt', e.target.value)} placeholder="Short summary" required />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Author</label>
            <input className={inputClass} value={form.author} onChange={e => update('author', e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Read Time (min)</label>
            <input type="number" min="1" className={inputClass} value={form.readTime} onChange={e => update('readTime', parseInt(e.target.value))} />
          </div>
        </div>
        <div>
          <label className={labelClass}>Tags</label>
          <div className="space-y-2">
            {form.tags.map((tag, i) => (
              <div key={i} className="flex gap-2">
                <input className={inputClass} value={tag} onChange={e => { const t = [...form.tags]; t[i] = e.target.value; update('tags', t) }} placeholder={`Tag ${i+1}`} />
                {form.tags.length > 1 && <button type="button" onClick={() => update('tags', form.tags.filter((_,idx) => idx !== i))} className="text-bark-300 hover:text-red-400"><Minus size={14} strokeWidth={1.5} /></button>}
              </div>
            ))}
            <button type="button" onClick={() => update('tags', [...form.tags, ''])} className="flex items-center gap-1.5 text-xs text-bark-400 hover:text-bark-700 font-sans"><Plus size={12} strokeWidth={1.5} /> Add Tag</button>
          </div>
        </div>
      </section>

      <section className="bg-white border border-cream-300 p-6">
        <h2 className="font-serif text-xl text-bark-900 mb-2" style={{ fontFamily: 'Cormorant, serif' }}>Cover Image</h2>
        <p className="text-xs text-bark-400 font-sans mb-5">Stored in Neon PostgreSQL. Max 4MB, JPEG/PNG/WebP.</p>
        <input ref={coverInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={e => e.target.files?.[0] && handleCoverUpload(e.target.files[0])} />
        {form.coverImageUrl ? (
          <div className="relative inline-block">
            <img src={form.coverImageUrl} alt="Cover" className="w-full max-w-sm h-48 object-cover border border-cream-300" />
            <button type="button" onClick={() => { update('coverImageId',''); update('coverImageUrl','') }} className="absolute top-2 right-2 bg-red-500 text-white p-1 hover:bg-red-600"><X size={12} strokeWidth={1.5} /></button>
            <button type="button" onClick={() => coverInputRef.current?.click()} className="mt-2 text-xs text-bark-500 hover:text-bark-800 font-sans underline block">Replace</button>
          </div>
        ) : (
          <div onClick={() => coverInputRef.current?.click()} className="border-2 border-dashed border-cream-300 hover:border-bark-400 cursor-pointer p-10 flex flex-col items-center gap-3 max-w-sm transition-colors">
            {coverUploading ? <Loader2 size={24} strokeWidth={1.5} className="text-bark-400 animate-spin" /> : <ImagePlus size={24} strokeWidth={1.5} className="text-bark-300" />}
            <p className="text-sm text-bark-500 font-sans">{coverUploading ? 'Uploading to database...' : 'Click to upload cover image'}</p>
            <p className="text-xs text-bark-400 font-sans">JPEG, PNG, WebP · Max 4MB</p>
          </div>
        )}
        {coverError && <p className="text-xs text-red-500 font-sans mt-2">{coverError}</p>}
      </section>

      <section className="bg-white border border-cream-300 p-6">
        <h2 className="font-serif text-xl text-bark-900 mb-6" style={{ fontFamily: 'Cormorant, serif' }}>Article Content</h2>
        <textarea className={`${inputClass} min-h-[500px] resize-y font-mono text-xs`} value={form.content} onChange={e => update('content', e.target.value)} placeholder="Article content. HTML supported." required />
        <p className="text-xs text-bark-400 font-sans mt-2">HTML: h2, h3, p, ul, li, strong, em, a</p>
      </section>

      <section className="bg-white border border-cream-300 p-6">
        <h2 className="font-serif text-xl text-bark-900 mb-2" style={{ fontFamily: 'Cormorant, serif' }}>Featured Products</h2>
        <p className="text-xs text-bark-400 font-sans mb-4">Products shown at the bottom of this article.</p>
        <div className="space-y-1 max-h-60 overflow-y-auto">
          {products.map(product => (
            <label key={product.id} className="flex items-center gap-3 cursor-pointer py-1.5 hover:bg-cream-50 px-2">
              <input type="checkbox" checked={form.productIds.includes(product.id)} onChange={() => toggleProduct(product.id)} className="accent-bark-900" />
              <span className="text-sm text-bark-700 font-sans">{product.title}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="bg-white border border-cream-300 p-6">
        <h2 className="font-serif text-xl text-bark-900 mb-6" style={{ fontFamily: 'Cormorant, serif' }}>Visibility</h2>
        <div className="flex gap-8">
          {([{key:'isPublished',label:'Published'},{key:'isFeatured',label:'Featured'}] as {key:keyof BlogFormData;label:string}[]).map(({key,label}) => (
            <label key={key} className="flex items-center gap-3 cursor-pointer">
              <div onClick={() => update(key, !form[key])} className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${form[key] ? 'bg-bark-900' : 'bg-cream-300'}`}>
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${form[key] ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
              <span className="text-sm text-bark-700 font-sans">{label}</span>
            </label>
          ))}
        </div>
      </section>

      <div className="flex gap-4">
        <button type="submit" disabled={loading} className="bg-bark-900 text-cream-100 px-8 py-3 text-xs tracking-widest uppercase font-sans hover:bg-bark-800 transition-colors disabled:opacity-60">
          {loading ? 'Saving...' : mode === 'create' ? 'Publish Article' : 'Update Article'}
        </button>
        <button type="button" onClick={() => router.push('/admin/blogs')} className="border border-cream-300 text-bark-600 px-6 py-3 text-xs tracking-widest uppercase font-sans hover:border-bark-400 transition-colors">Cancel</button>
      </div>
    </form>
  )
}
