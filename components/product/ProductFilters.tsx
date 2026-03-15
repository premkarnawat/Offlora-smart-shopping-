'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

interface Category { id:string; name:string; slug:string }
interface Props {
  categories: Category[]
  currentCategory?: string
  currentSort?: string
  mode?: 'sidebar' | 'horizontal'
}

const sortOptions = [
  { value:'newest', label:'Newest' },
  { value:'rating', label:'Top Rated' },
  { value:'featured', label:'Featured' },
]

export default function ProductFilters({ categories, currentCategory, currentSort, mode='sidebar' }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateParam = useCallback((key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set(key, value)
    else params.delete(key)
    params.delete('page')
    router.push(`${pathname}?${params.toString()}`)
  }, [searchParams, pathname, router])

  if (mode === 'horizontal') {
    return (
      <div className="flex items-center gap-2 min-w-max">
        {/* Sort pills */}
        {sortOptions.map(opt => (
          <button key={opt.value} onClick={() => updateParam('sort', currentSort === opt.value ? null : opt.value)}
            className={`px-3 py-1.5 text-xs font-sans tracking-wide border transition-colors whitespace-nowrap min-h-0 ${
              currentSort === opt.value ? 'bg-bark-900 text-cream-100 border-bark-900' : 'border-cream-300 text-bark-600 hover:border-bark-400'
            }`}>
            {opt.label}
          </button>
        ))}
        <div className="w-px h-5 bg-cream-300 mx-1" />
        {/* Category pills */}
        <button onClick={() => updateParam('category', null)}
          className={`px-3 py-1.5 text-xs font-sans tracking-wide border transition-colors whitespace-nowrap min-h-0 ${
            !currentCategory ? 'bg-bark-900 text-cream-100 border-bark-900' : 'border-cream-300 text-bark-600 hover:border-bark-400'
          }`}>
          All
        </button>
        {categories.map(cat => (
          <button key={cat.id} onClick={() => updateParam('category', currentCategory === cat.slug ? null : cat.slug)}
            className={`px-3 py-1.5 text-xs font-sans tracking-wide border transition-colors whitespace-nowrap min-h-0 ${
              currentCategory === cat.slug ? 'bg-bark-900 text-cream-100 border-bark-900' : 'border-cream-300 text-bark-600 hover:border-bark-400'
            }`}>
            {cat.name}
          </button>
        ))}
      </div>
    )
  }

  // Sidebar mode
  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs tracking-widests uppercase text-bark-500 font-sans mb-4">Sort By</p>
        <div className="space-y-2">
          {sortOptions.map(opt => (
            <button key={opt.value} onClick={() => updateParam('sort', currentSort === opt.value ? null : opt.value)}
              className={`w-full text-left text-sm font-sans py-1.5 transition-colors min-h-0 ${
                currentSort === opt.value ? 'text-bark-900 font-medium' : 'text-bark-500 hover:text-bark-800'
              }`}>
              {currentSort === opt.value && <span className="mr-2">→</span>}{opt.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs tracking-widests uppercase text-bark-500 font-sans mb-4">Category</p>
        <div className="space-y-2">
          <button onClick={() => updateParam('category', null)}
            className={`w-full text-left text-sm font-sans py-1.5 transition-colors min-h-0 ${!currentCategory ? 'text-bark-900 font-medium' : 'text-bark-500 hover:text-bark-800'}`}>
            {!currentCategory && <span className="mr-2">→</span>}All
          </button>
          {categories.map(cat => (
            <button key={cat.id} onClick={() => updateParam('category', currentCategory === cat.slug ? null : cat.slug)}
              className={`w-full text-left text-sm font-sans py-1.5 transition-colors min-h-0 ${currentCategory === cat.slug ? 'text-bark-900 font-medium' : 'text-bark-500 hover:text-bark-800'}`}>
              {currentCategory === cat.slug && <span className="mr-2">→</span>}{cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
