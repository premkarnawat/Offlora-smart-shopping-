import { prisma } from '@/lib/prisma'
import DeleteCategoryButton from '@/components/admin/DeleteCategoryButton'
import AddCategoryForm from '@/components/admin/AddCategoryForm'

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: 'asc' },
  })

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="font-serif text-2xl sm:text-3xl text-bark-900" style={{ fontFamily: 'Cormorant, serif' }}>
          Categories
        </h1>
        <p className="text-sm text-bark-500 font-sans mt-0.5">{categories.length} categories total</p>
      </div>

      {/* Add Category Form */}
      <div className="bg-white border border-cream-300 p-5 sm:p-6 mb-6 sm:mb-8">
        <h2 className="font-serif text-xl text-bark-900 mb-5" style={{ fontFamily: 'Cormorant, serif' }}>
          Add New Category
        </h2>
        <AddCategoryForm />
      </div>

      {/* Categories List */}
      <div className="bg-white border border-cream-300 overflow-hidden overflow-x-auto">
        <table className="w-full min-w-[400px]">
          <thead>
            <tr className="border-b border-cream-200">
              <th className="text-left px-4 sm:px-5 py-3 text-xs tracking-widest uppercase text-bark-400 font-sans">Category Name</th>
              <th className="text-left px-4 sm:px-5 py-3 text-xs tracking-widest uppercase text-bark-400 font-sans hidden sm:table-cell">Description</th>
              <th className="text-left px-4 sm:px-5 py-3 text-xs tracking-widest uppercase text-bark-400 font-sans">Products</th>
              <th className="px-4 sm:px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-b border-cream-100 hover:bg-cream-50 transition-colors">
                <td className="px-4 sm:px-5 py-3 sm:py-4">
                  <span className="text-sm text-bark-900 font-sans font-medium">{cat.name}</span>
                </td>
                <td className="px-4 sm:px-5 py-3 sm:py-4 hidden sm:table-cell">
                  <span className="text-xs text-bark-500 font-sans line-clamp-1">
                    {cat.description || '—'}
                  </span>
                </td>
                <td className="px-4 sm:px-5 py-3 sm:py-4">
                  <span className="text-sm text-bark-500 font-sans">{cat._count.products}</span>
                </td>
                <td className="px-4 sm:px-5 py-3 sm:py-4">
                  <div className="flex items-center gap-3 justify-end">
                    <DeleteCategoryButton categoryId={cat.id} categoryName={cat.name} productCount={cat._count.products} />
                  </div>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-12 text-center text-sm text-bark-400 font-sans">
                  No categories yet. Add your first category above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
