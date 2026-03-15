import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Pencil } from 'lucide-react'
import DeleteBrandButton from '@/components/admin/DeleteBrandButton'
import AddBrandForm from '@/components/admin/AddBrandForm'

export default async function AdminBrandsPage() {
  const brands = await prisma.brand.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: 'asc' },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6 sm:mb-8 gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-bark-900" style={{ fontFamily: 'Cormorant, serif' }}>
            Brands
          </h1>
          <p className="text-sm text-bark-500 font-sans mt-0.5">{brands.length} brands total</p>
        </div>
      </div>

      {/* Add Brand Form */}
      <div className="bg-white border border-cream-300 p-5 sm:p-6 mb-6 sm:mb-8">
        <h2 className="font-serif text-xl text-bark-900 mb-5" style={{ fontFamily: 'Cormorant, serif' }}>
          Add New Brand
        </h2>
        <AddBrandForm />
      </div>

      {/* Brands List */}
      <div className="bg-white border border-cream-300 overflow-hidden overflow-x-auto">
        <table className="w-full min-w-[400px]">
          <thead>
            <tr className="border-b border-cream-200">
              <th className="text-left px-4 sm:px-5 py-3 text-xs tracking-widest uppercase text-bark-400 font-sans">Brand Name</th>
              <th className="text-left px-4 sm:px-5 py-3 text-xs tracking-widest uppercase text-bark-400 font-sans hidden sm:table-cell">Website</th>
              <th className="text-left px-4 sm:px-5 py-3 text-xs tracking-widest uppercase text-bark-400 font-sans">Products</th>
              <th className="px-4 sm:px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {brands.map((brand) => (
              <tr key={brand.id} className="border-b border-cream-100 hover:bg-cream-50 transition-colors">
                <td className="px-4 sm:px-5 py-3 sm:py-4">
                  <span className="text-sm text-bark-900 font-sans font-medium">{brand.name}</span>
                </td>
                <td className="px-4 sm:px-5 py-3 sm:py-4 hidden sm:table-cell">
                  {brand.website ? (
                    <a href={brand.website} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-bark-400 hover:text-bark-700 font-sans transition-colors min-h-0">
                      {brand.website.replace('https://', '')}
                    </a>
                  ) : (
                    <span className="text-xs text-bark-300 font-sans">—</span>
                  )}
                </td>
                <td className="px-4 sm:px-5 py-3 sm:py-4">
                  <span className="text-sm text-bark-500 font-sans">{brand._count.products}</span>
                </td>
                <td className="px-4 sm:px-5 py-3 sm:py-4">
                  <div className="flex items-center gap-3 justify-end">
                    <DeleteBrandButton brandId={brand.id} brandName={brand.name} productCount={brand._count.products} />
                  </div>
                </td>
              </tr>
            ))}
            {brands.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-12 text-center text-sm text-bark-400 font-sans">
                  No brands yet. Add your first brand above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
