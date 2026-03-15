import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getCategoryBySlug, getProductsByCategory } from '@/lib/data'
import ProductCard from '@/components/product/ProductCard'

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug)
  if (!category) return { title: 'Category Not Found' }
  return { title: `${category.name} Products`, description: category.description || `Browse the best ${category.name} products on Offlora.` }
}

export const revalidate = 1800

export default async function CategoryPage({ params }: Props) {
  const category = await getCategoryBySlug(params.slug)
  if (!category) notFound()
  const products = await getProductsByCategory(category.id)

  return (
    <div className="pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="border-b border-cream-300 pb-10 sm:pb-14 lg:pb-16 mb-10 sm:mb-14 lg:mb-16">
        <p className="text-xs tracking-[0.25em] uppercase text-bark-400 font-sans mb-2 sm:mb-3">Category</p>
        <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-bark-900"
          style={{ fontFamily:'Cormorant, serif', fontWeight:300 }}>
          {category.name}
        </h1>
        {category.description && (
          <p className="mt-4 sm:mt-6 text-sm text-bark-500 font-sans max-w-xl leading-relaxed">{category.description}</p>
        )}
        <p className="mt-3 sm:mt-4 text-xs text-bark-400 font-sans">{products.length} products</p>
      </div>

      {products.length === 0 ? (
        <div className="py-20 text-center border border-cream-300">
          <p className="font-serif text-xl sm:text-2xl text-bark-400" style={{ fontFamily:'Cormorant, serif' }}>
            No products yet in this category.
          </p>
        </div>
      ) : (
        /* 2 col mobile → 3 col md → 4 col xl */
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
          {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      )}
    </div>
  )
}
