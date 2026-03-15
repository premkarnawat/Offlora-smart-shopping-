import Link from 'next/link'
import { ArrowLeft, AlertCircle } from 'lucide-react'
import { getCategories, getBrands } from '@/lib/data'
import ProductForm from '@/components/admin/ProductForm'

export const dynamic = 'force-dynamic'

export default async function NewProductPage() {
  let categories: any[] = []
  let brands: any[] = []

  try {
    ;[categories, brands] = await Promise.all([getCategories(), getBrands()])
  } catch {
    // DB not ready
  }

  const missingSetup = categories.length === 0 || brands.length === 0

  return (
    <div>
      <Link href="/admin/products"
        className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-bark-400 hover:text-bark-700 transition-colors font-sans mb-8 min-h-0">
        <ArrowLeft size={12} strokeWidth={1.5} /> Back to Products
      </Link>
      <h1 className="font-serif text-3xl text-bark-900 mb-8" style={{ fontFamily:'Cormorant, serif' }}>
        Add New Product
      </h1>

      {missingSetup && (
        <div className="mb-8 flex items-start gap-3 p-4 bg-amber-50 border border-amber-200">
          <AlertCircle size={16} strokeWidth={1.5} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-amber-800 font-sans font-medium mb-1">Setup required before adding products</p>
            <div className="flex gap-4">
              {brands.length === 0 && (
                <Link href="/admin/brands"
                  className="text-xs text-amber-700 hover:text-amber-900 font-sans underline min-h-0">
                  → Add Brands first
                </Link>
              )}
              {categories.length === 0 && (
                <Link href="/admin/categories"
                  className="text-xs text-amber-700 hover:text-amber-900 font-sans underline min-h-0">
                  → Add Categories first
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      <ProductForm categories={categories} brands={brands} mode="create" />
    </div>
  )
}
