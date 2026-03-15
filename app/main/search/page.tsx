import type { Metadata } from 'next'
import { searchProducts } from '@/lib/data'
import ProductCard from '@/components/product/ProductCard'
import Link from 'next/link'

interface Props { searchParams: { q?: string } }

export function generateMetadata({ searchParams }: Props): Metadata {
  return { title: searchParams.q ? `"${searchParams.q}" — Search` : 'Search Products' }
}

export default async function SearchPage({ searchParams }: Props) {
  const query = searchParams.q || ''
  const results = query ? await searchProducts(query) : []

  return (
    <div className="pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="mb-10 sm:mb-14 lg:mb-16">
        <p className="text-xs tracking-[0.25em] uppercase text-bark-400 font-sans mb-2 sm:mb-3">
          {query ? 'Results for' : 'Search'}
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-bark-900 break-words"
          style={{ fontFamily:'Cormorant, serif', fontWeight:300 }}>
          {query ? `"${query}"` : 'Find Products'}
        </h1>
        {query && (
          <p className="mt-3 sm:mt-4 text-sm text-bark-400 font-sans">
            {results.length} result{results.length !== 1 ? 's' : ''} found
          </p>
        )}
      </div>

      {query && results.length === 0 && (
        <div className="py-16 sm:py-24 text-center border border-cream-300 px-4">
          <p className="font-serif text-xl sm:text-2xl text-bark-400" style={{ fontFamily:'Cormorant, serif' }}>
            No products found for &quot;{query}&quot;
          </p>
          <p className="text-sm text-bark-400 font-sans mt-2 sm:mt-3">Try a different term or browse our categories.</p>
          <Link href="/categories" className="mt-6 inline-flex items-center text-xs tracking-widests uppercase text-bark-600 hover:text-bark-900 font-sans border-b border-bark-300 hover:border-bark-600 pb-0.5 min-h-0">
            Browse Categories →
          </Link>
        </div>
      )}

      {results.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
          {results.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      )}
    </div>
  )
}
