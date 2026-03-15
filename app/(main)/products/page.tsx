import type { Metadata } from 'next'
import { getProducts, getCategories } from '@/lib/data'
import ProductCard from '@/components/product/ProductCard'
import ProductFilters from '@/components/product/ProductFilters'

export const metadata: Metadata = {
  title: 'All Products',
  description: 'Browse our curated selection of products across all categories.',
}

interface Props {
  searchParams: { category?: string; sort?: string; page?: string }
}

export const revalidate = 1800

export default async function ProductsPage({ searchParams }: Props) {
  const page = Number(searchParams.page) || 1
  const { products, total } = await getProducts({
    categorySlug: searchParams.category,
    sort: searchParams.sort as any,
    page,
    perPage: 12,
  })
  const categories = await getCategories()

  return (
    <div className="pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="mb-10 sm:mb-14 lg:mb-16">
        <p className="text-xs tracking-[0.25em] uppercase text-bark-400 font-sans mb-2 sm:mb-3">All Products</p>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-bark-900"
          style={{ fontFamily:'Cormorant, serif', fontWeight:300 }}>
          Browse Everything
        </h1>
      </div>

      {/* Filters: horizontal scrollable strip on mobile, sidebar on lg */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

        {/* Mobile: horizontal scroll filter strip */}
        <div className="lg:hidden overflow-x-auto pb-2">
          <ProductFilters categories={categories} currentCategory={searchParams.category} currentSort={searchParams.sort} mode="horizontal" />
        </div>

        {/* Desktop: sidebar */}
        <aside className="hidden lg:block w-52 xl:w-60 flex-shrink-0">
          <ProductFilters categories={categories} currentCategory={searchParams.category} currentSort={searchParams.sort} mode="sidebar" />
        </aside>

        {/* Product grid */}
        <div className="flex-1 min-w-0">
          {products.length === 0 ? (
            <div className="py-20 text-center border border-cream-300">
              <p className="font-serif text-2xl text-bark-400" style={{ fontFamily:'Cormorant, serif' }}>
                No products found
              </p>
            </div>
          ) : (
            <>
              <p className="text-xs text-bark-400 font-sans mb-6 sm:mb-8">{total} products</p>
              {/* 2 cols on mobile, 3 on xl */}
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
                {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </div>
              {/* Pagination */}
              {total > 12 && (
                <div className="flex justify-center gap-2 sm:gap-3 mt-12 sm:mt-16 flex-wrap">
                  {Array.from({ length: Math.ceil(total / 12) }).map((_, i) => (
                    <a key={i}
                      href={`?${new URLSearchParams({ ...searchParams, page: String(i + 1) })}`}
                      className={`w-9 h-9 flex items-center justify-center text-sm font-sans transition-colors ${
                        page === i + 1 ? 'bg-bark-900 text-cream-100' : 'border border-cream-300 text-bark-600 hover:border-bark-400'
                      }`}>
                      {i + 1}
                    </a>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
