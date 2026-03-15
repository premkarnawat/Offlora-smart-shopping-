import type { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'All Categories',
  description: 'Browse products across all categories on Offlora.',
}

export const revalidate = 3600

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: 'asc' },
  })

  return (
    <div className="pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10 sm:mb-14 lg:mb-16">
          <p className="text-xs tracking-[0.25em] uppercase text-bark-400 font-sans mb-2 sm:mb-3">Browse by interest</p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-bark-900"
            style={{ fontFamily:'Cormorant, serif', fontWeight:300 }}>
            All Categories
          </h1>
        </div>
        {/* 1 col mobile → 2 col sm → 3 col lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/category/${cat.slug}`}
              className="group relative overflow-hidden bg-cream-200 flex flex-col justify-end p-6 sm:p-8 hover:bg-cream-300 transition-colors duration-500 min-h-[140px] sm:min-h-[160px]">
              <div className="relative z-10">
                <p className="text-xs tracking-widests uppercase text-bark-500 font-sans mb-1">
                  {cat._count.products} products
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl text-bark-900 group-hover:text-bark-700 transition-colors"
                  style={{ fontFamily:'Cormorant, serif', fontWeight:300 }}>
                  {cat.name}
                </h2>
                {cat.description && (
                  <p className="text-xs text-bark-500 font-sans mt-1.5 line-clamp-1 hidden sm:block">{cat.description}</p>
                )}
              </div>
              <div className="absolute bottom-5 sm:bottom-8 right-5 sm:right-8 text-bark-400 group-hover:text-bark-700 transition-colors text-lg">→</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
