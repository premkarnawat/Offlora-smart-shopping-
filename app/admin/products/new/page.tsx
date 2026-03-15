import { getCategories, getBrands } from '@/lib/data'
import ProductForm from '@/components/admin/ProductForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function NewProductPage() {
  const [categories, brands] = await Promise.all([getCategories(), getBrands()])

  return (
    <div>
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-bark-400 hover:text-bark-700 transition-colors font-sans mb-8"
      >
        <ArrowLeft size={12} strokeWidth={1.5} /> Back to Products
      </Link>
      <h1 className="font-serif text-3xl text-bark-900 mb-8" style={{ fontFamily: 'Cormorant, serif' }}>
        Add New Product
      </h1>
      <ProductForm categories={categories} brands={brands} mode="create" />
    </div>
  )
}
