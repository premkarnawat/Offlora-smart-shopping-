import { getAnalytics } from '@/lib/data'
import Link from 'next/link'
import { Package, BookOpen, MousePointerClick, TrendingUp, Tag, Grid } from 'lucide-react'

export default async function AdminDashboard() {
  const { totalProducts, totalBlogs, totalClicks, topProducts } = await getAnalytics()

  const stats = [
    { label:'Total Products', value:totalProducts, icon:Package, href:'/admin/products' },
    { label:'Blog Articles', value:totalBlogs, icon:BookOpen, href:'/admin/blogs' },
    { label:'Affiliate Clicks', value:totalClicks.toLocaleString(), icon:MousePointerClick, href:'/admin/analytics' },
    { label:'Top Products', value:topProducts.length, icon:TrendingUp, href:'/admin/analytics' },
  ]

  return (
    <div>
      <div className="mb-8 sm:mb-10">
        <h1 className="font-serif text-2xl sm:text-3xl text-bark-900" style={{ fontFamily:'Cormorant, serif' }}>Dashboard</h1>
        <p className="text-sm text-bark-500 font-sans mt-1">Welcome back to Offlora Admin</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mb-8 sm:mb-12">
        {stats.map(({ label, value, icon: Icon, href }) => (
          <Link key={label} href={href}
            className="bg-white border border-cream-300 p-4 sm:p-5 lg:p-6 hover:border-bark-400 transition-colors group">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <p className="text-xs tracking-wide uppercase text-bark-400 font-sans leading-tight">{label}</p>
              <Icon size={14} strokeWidth={1.5} className="text-bark-400 group-hover:text-bark-700 transition-colors flex-shrink-0 ml-2" />
            </div>
            <p className="font-serif text-3xl sm:text-4xl text-bark-900" style={{ fontFamily:'Cormorant, serif' }}>{value}</p>
          </Link>
        ))}
      </div>

      {/* Top products */}
      <div className="bg-white border border-cream-300 p-4 sm:p-5 lg:p-6 mb-6 sm:mb-8 overflow-x-auto">
        <h2 className="font-serif text-lg sm:text-xl text-bark-900 mb-4 sm:mb-6" style={{ fontFamily:'Cormorant, serif' }}>Most Clicked Products</h2>
        <div className="space-y-2 sm:space-y-3 min-w-[300px]">
          {topProducts.map((product, i) => (
            <div key={product.id} className="flex items-center justify-between py-2.5 border-b border-cream-100 last:border-0 gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xs text-bark-300 font-mono w-4 flex-shrink-0">{i+1}</span>
                <Link href={`/product/${product.slug}`} target="_blank"
                  className="text-sm text-bark-800 hover:text-bark-600 font-sans transition-colors truncate min-h-0">
                  {product.title}
                </Link>
              </div>
              <span className="text-xs sm:text-sm text-bark-500 font-sans flex-shrink-0">
                {product._count.affiliateClicks} clicks
              </span>
            </div>
          ))}
          {topProducts.length === 0 && (
            <p className="text-sm text-bark-400 font-sans py-4">No clicks yet. Add products to get started.</p>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {[
          { label:'Add Brand', href:'/admin/brands' },
          { label:'Add Category', href:'/admin/categories' },
          { label:'Add Product', href:'/admin/products/new' },
          { label:'Write Article', href:'/admin/blogs/new' },
          { label:'Legal Pages', href:'/admin/legal' },
        ].map(action => (
          <Link key={action.href} href={action.href}
            className="border border-bark-900 text-bark-900 py-3 sm:py-3.5 text-center text-xs tracking-widest uppercase font-sans hover:bg-bark-900 hover:text-cream-100 active:bg-bark-800 transition-colors min-h-0">
            {action.label}
          </Link>
        ))}
      </div>

      {/* Getting started guide — shown when no products */}
      {totalProducts === 0 && (
        <div className="mt-8 bg-cream-200/60 border border-cream-300 p-5 sm:p-6">
          <h3 className="font-serif text-lg text-bark-900 mb-4" style={{ fontFamily:'Cormorant, serif' }}>
            Getting Started — Follow this order:
          </h3>
          <ol className="space-y-3">
            {[
              { step:'1', label:'Add Brands', desc:'Add product brands first (e.g. Samsung, Apple, Sony)', href:'/admin/brands' },
              { step:'2', label:'Add Categories', desc:'Add product categories (e.g. Electronics, Beauty)', href:'/admin/categories' },
              { step:'3', label:'Add Products', desc:'Now you can add products with brands and categories', href:'/admin/products/new' },
              { step:'4', label:'Write Blog Articles', desc:'Add buying guides and product reviews', href:'/admin/blogs/new' },
            ].map(item => (
              <li key={item.step} className="flex items-start gap-4">
                <span className="w-6 h-6 rounded-full bg-bark-900 text-cream-100 text-xs font-sans flex items-center justify-center flex-shrink-0 mt-0.5">
                  {item.step}
                </span>
                <div>
                  <Link href={item.href} className="text-sm font-sans text-bark-900 hover:text-bark-600 transition-colors font-medium min-h-0">
                    {item.label} →
                  </Link>
                  <p className="text-xs text-bark-500 font-sans mt-0.5">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}
