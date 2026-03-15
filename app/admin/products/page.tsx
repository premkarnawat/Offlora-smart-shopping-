import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Pencil, Plus, Star } from 'lucide-react'
import DeleteProductButton from '@/components/admin/DeleteProductButton'

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { brand:true, category:true, images:{ select:{id:true,isPrimary:true}, where:{isPrimary:true}, take:1 } },
    orderBy: { createdAt:'desc' },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6 sm:mb-8 gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-bark-900" style={{ fontFamily:'Cormorant, serif' }}>Products</h1>
          <p className="text-sm text-bark-500 font-sans mt-0.5">{products.length} total</p>
        </div>
        <Link href="/admin/products/new"
          className="flex items-center gap-1.5 sm:gap-2 bg-bark-900 text-cream-100 px-3 sm:px-4 py-2 sm:py-2.5 text-xs tracking-widests uppercase font-sans hover:bg-bark-800 transition-colors min-h-0 flex-shrink-0">
          <Plus size={13} strokeWidth={1.5} />
          <span className="hidden xs:inline">Add Product</span>
          <span className="xs:hidden">Add</span>
        </Link>
      </div>

      <div className="bg-white border border-cream-300 overflow-hidden overflow-x-auto">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="border-b border-cream-200">
              <th className="text-left px-4 sm:px-5 py-3 text-xs tracking-widests uppercase text-bark-400 font-sans">Product</th>
              <th className="text-left px-4 sm:px-5 py-3 text-xs tracking-widests uppercase text-bark-400 font-sans hidden sm:table-cell">Brand</th>
              <th className="text-left px-4 sm:px-5 py-3 text-xs tracking-widests uppercase text-bark-400 font-sans hidden md:table-cell">Category</th>
              <th className="text-left px-4 sm:px-5 py-3 text-xs tracking-widests uppercase text-bark-400 font-sans hidden lg:table-cell">Rating</th>
              <th className="text-left px-4 sm:px-5 py-3 text-xs tracking-widests uppercase text-bark-400 font-sans">Status</th>
              <th className="px-4 sm:px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-b border-cream-100 hover:bg-cream-50 transition-colors">
                <td className="px-4 sm:px-5 py-3 sm:py-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    {product.images[0] && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={`/api/images/${product.images[0].id}`} alt={product.title}
                        className="w-9 h-9 sm:w-10 sm:h-10 object-cover flex-shrink-0" />
                    )}
                    <span className="text-sm text-bark-900 font-sans line-clamp-1 min-w-0">{product.title}</span>
                  </div>
                </td>
                <td className="px-4 sm:px-5 py-3 sm:py-4 text-sm text-bark-600 font-sans hidden sm:table-cell whitespace-nowrap">{product.brand.name}</td>
                <td className="px-4 sm:px-5 py-3 sm:py-4 text-sm text-bark-600 font-sans hidden md:table-cell whitespace-nowrap">{product.category.name}</td>
                <td className="px-4 sm:px-5 py-3 sm:py-4 hidden lg:table-cell">
                  <div className="flex items-center gap-1">
                    <Star size={11} strokeWidth={1} className="fill-bark-500 text-bark-500" />
                    <span className="text-sm text-bark-600 font-sans">{product.rating.toFixed(1)}</span>
                  </div>
                </td>
                <td className="px-4 sm:px-5 py-3 sm:py-4">
                  <span className={`text-xs px-2 py-0.5 font-sans whitespace-nowrap ${
                    product.isPublished ? 'bg-sage-300/30 text-sage-600' : 'bg-cream-200 text-bark-500'
                  }`}>
                    {product.isPublished ? 'Live' : 'Draft'}
                  </span>
                </td>
                <td className="px-4 sm:px-5 py-3 sm:py-4">
                  <div className="flex items-center gap-2 sm:gap-3 justify-end">
                    <Link href={`/admin/products/${product.id}/edit`} className="text-bark-400 hover:text-bark-700 transition-colors p-1 min-h-0">
                      <Pencil size={13} strokeWidth={1.5} />
                    </Link>
                    <DeleteProductButton productId={product.id} productTitle={product.title} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-sm text-bark-400 font-sans">No products yet.</p>
            <Link href="/admin/products/new" className="mt-4 inline-flex text-xs text-bark-600 hover:text-bark-900 font-sans underline min-h-0">Add your first product</Link>
          </div>
        )}
      </div>
    </div>
  )
}
