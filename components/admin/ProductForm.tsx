'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createProduct, updateProduct } from '@/lib/actions'
import { Plus, Minus } from 'lucide-react'
import ImageUploader, { type UploadedImageRecord } from './ImageUploader'

interface Category { id: string; name: string }
interface Brand { id: string; name: string }

interface ProductFormData {
  title: string
  description: string
  shortDesc: string
  pros: string[]
  cons: string[]
  rating: number
  reviewCount: number
  affiliateLink: string
  videoUrl: string
  isFeatured: boolean
  isTopRated: boolean
  isPublished: boolean
  brandId: string
  categoryId: string
  images: UploadedImageRecord[]
}

interface Props {
  categories: Category[]
  brands: Brand[]
  initialData?: Partial<ProductFormData> & { id?: string }
  mode: 'create' | 'edit'
}

const defaultData: ProductFormData = {
  title: '',
  description: '',
  shortDesc: '',
  pros: [''],
  cons: [''],
  rating: 4.0,
  reviewCount: 0,
  affiliateLink: '',
  videoUrl: '',
  isFeatured: false,
  isTopRated: false,
  isPublished: true,
  brandId: '',
  categoryId: '',
  images: [],
}

export default function ProductForm({ categories, brands, initialData, mode }: Props) {
  const router = useRouter()
  const [form, setForm] = useState<ProductFormData>({ ...defaultData, ...initialData })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const update = (key: keyof ProductFormData, value: any) =>
    setForm((f) => ({ ...f, [key]: value }))

  const updateArrayItem = (key: 'pros' | 'cons', index: number, value: string) => {
    const arr = [...form[key]]
    arr[index] = value
    update(key, arr)
  }

  const addArrayItem = (key: 'pros' | 'cons') => update(key, [...form[key], ''])
  const removeArrayItem = (key: 'pros' | 'cons', index: number) =>
    update(key, form[key].filter((_, i) => i !== index))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (form.images.length === 0) {
      setError('Please upload at least one product image.')
      return
    }

    setLoading(true)
    try {
      const payload = {
        ...form,
        pros: form.pros.filter(Boolean),
        cons: form.cons.filter(Boolean),
        images: form.images.map((img) => ({
          imageId: img.id,
          alt: img.alt,
          isPrimary: img.isPrimary,
          isExisting: img.isExisting || false,
        })),
      }

      if (mode === 'create') {
        await createProduct(payload as any)
      } else if (initialData?.id) {
        await updateProduct(initialData.id, payload as any)
      }

      router.push('/admin/products')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full bg-transparent border border-cream-300 focus:border-bark-500 outline-none px-3 py-2.5 text-sm font-sans text-bark-900 placeholder:text-bark-300 transition-colors'
  const labelClass = 'block text-xs tracking-widest uppercase text-bark-500 font-sans mb-2'

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm font-sans">
          {error}
        </div>
      )}

      {/* Basic Info */}
      <section className="bg-white border border-cream-300 p-6 space-y-5">
        <h2 className="font-serif text-xl text-bark-900 mb-6" style={{ fontFamily: 'Cormorant, serif' }}>Basic Information</h2>

        <div>
          <label className={labelClass}>Product Title *</label>
          <input className={inputClass} value={form.title} onChange={(e) => update('title', e.target.value)} placeholder="e.g. Sony WH-1000XM5 Headphones" required />
        </div>

        <div>
          <label className={labelClass}>Short Description *</label>
          <input className={inputClass} value={form.shortDesc} onChange={(e) => update('shortDesc', e.target.value)} placeholder="One-line summary shown in product cards" required maxLength={200} />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Brand *</label>
            <select className={inputClass} value={form.brandId} onChange={(e) => update('brandId', e.target.value)} required>
              <option value="">Select brand</option>
              {brands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Category *</label>
            <select className={inputClass} value={form.categoryId} onChange={(e) => update('categoryId', e.target.value)} required>
              <option value="">Select category</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Rating (0–5) *</label>
            <input type="number" min="0" max="5" step="0.1" className={inputClass} value={form.rating} onChange={(e) => update('rating', parseFloat(e.target.value))} required />
          </div>
          <div>
            <label className={labelClass}>Review Count</label>
            <input type="number" min="0" className={inputClass} value={form.reviewCount} onChange={(e) => update('reviewCount', parseInt(e.target.value))} />
          </div>
        </div>

        <div>
          <label className={labelClass}>Affiliate Link *</label>
          <input type="url" className={inputClass} value={form.affiliateLink} onChange={(e) => update('affiliateLink', e.target.value)} placeholder="https://amzn.to/..." required />
        </div>

        <div>
          <label className={labelClass}>Video URL (YouTube embed, optional)</label>
          <input type="url" className={inputClass} value={form.videoUrl} onChange={(e) => update('videoUrl', e.target.value)} placeholder="https://www.youtube.com/embed/..." />
        </div>
      </section>

      {/* Product Images */}
      <section className="bg-white border border-cream-300 p-6">
        <h2 className="font-serif text-xl text-bark-900 mb-2" style={{ fontFamily: 'Cormorant, serif' }}>Product Images</h2>
        <p className="text-xs text-bark-400 font-sans mb-6">
          Upload images directly — they are stored in your Neon PostgreSQL database. No external service needed.
        </p>
        <ImageUploader images={form.images} onChange={(imgs) => update('images', imgs)} maxImages={8} />
      </section>

      {/* Full Description */}
      <section className="bg-white border border-cream-300 p-6">
        <h2 className="font-serif text-xl text-bark-900 mb-6" style={{ fontFamily: 'Cormorant, serif' }}>Full Review / Description</h2>
        <textarea className={`${inputClass} min-h-[300px] resize-y`} value={form.description} onChange={(e) => update('description', e.target.value)} placeholder="Full review. HTML supported." required />
        <p className="text-xs text-bark-400 font-sans mt-2">HTML: &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, &lt;em&gt;</p>
      </section>

      {/* Pros & Cons */}
      <section className="bg-white border border-cream-300 p-6">
        <h2 className="font-serif text-xl text-bark-900 mb-6" style={{ fontFamily: 'Cormorant, serif' }}>Pros & Cons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className={labelClass}>Pros</label>
            <div className="space-y-2">
              {form.pros.map((pro, i) => (
                <div key={i} className="flex gap-2">
                  <input className={inputClass} value={pro} onChange={(e) => updateArrayItem('pros', i, e.target.value)} placeholder={`Pro ${i + 1}`} />
                  {form.pros.length > 1 && <button type="button" onClick={() => removeArrayItem('pros', i)} className="text-bark-300 hover:text-red-400"><Minus size={14} strokeWidth={1.5} /></button>}
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem('pros')} className="flex items-center gap-1.5 text-xs text-bark-400 hover:text-bark-700 font-sans"><Plus size={12} strokeWidth={1.5} /> Add Pro</button>
            </div>
          </div>
          <div>
            <label className={labelClass}>Cons</label>
            <div className="space-y-2">
              {form.cons.map((con, i) => (
                <div key={i} className="flex gap-2">
                  <input className={inputClass} value={con} onChange={(e) => updateArrayItem('cons', i, e.target.value)} placeholder={`Con ${i + 1}`} />
                  {form.cons.length > 1 && <button type="button" onClick={() => removeArrayItem('cons', i)} className="text-bark-300 hover:text-red-400"><Minus size={14} strokeWidth={1.5} /></button>}
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem('cons')} className="flex items-center gap-1.5 text-xs text-bark-400 hover:text-bark-700 font-sans"><Plus size={12} strokeWidth={1.5} /> Add Con</button>
            </div>
          </div>
        </div>
      </section>

      {/* Visibility */}
      <section className="bg-white border border-cream-300 p-6">
        <h2 className="font-serif text-xl text-bark-900 mb-6" style={{ fontFamily: 'Cormorant, serif' }}>Visibility & Flags</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {([{ key: 'isPublished', label: 'Published' }, { key: 'isFeatured', label: 'Featured on Home' }, { key: 'isTopRated', label: 'Top Rated' }] as { key: keyof ProductFormData; label: string }[]).map(({ key, label }) => (
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
          {loading ? 'Saving…' : mode === 'create' ? 'Create Product' : 'Update Product'}
        </button>
        <button type="button" onClick={() => router.push('/admin/products')} className="border border-cream-300 text-bark-600 px-6 py-3 text-xs tracking-widest uppercase font-sans hover:border-bark-400 transition-colors">
          Cancel
        </button>
      </div>
    </form>
  )
}
