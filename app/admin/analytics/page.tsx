import { prisma } from '@/lib/prisma'
import { MousePointerClick, TrendingUp, Package, BookOpen } from 'lucide-react'

export default async function AdminAnalyticsPage() {
  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  const [
    totalClicks,
    clicksLast30Days,
    clicksLast7Days,
    topProducts,
    totalProducts,
    totalBlogs,
    recentClicks,
  ] = await Promise.all([
    prisma.affiliateClick.count(),
    prisma.affiliateClick.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    prisma.affiliateClick.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
    prisma.product.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        category: { select: { name: true } },
        _count: { select: { affiliateClicks: true } },
      },
      orderBy: { affiliateClicks: { _count: 'desc' } },
      take: 10,
    }),
    prisma.product.count(),
    prisma.blog.count(),
    prisma.affiliateClick.findMany({
      include: { product: { select: { title: true } } },
      orderBy: { createdAt: 'desc' },
      take: 20,
    }),
  ])

  const stats = [
    { label: 'Total Affiliate Clicks', value: totalClicks.toLocaleString(), icon: MousePointerClick, sub: 'All time' },
    { label: 'Clicks (30 days)', value: clicksLast30Days.toLocaleString(), icon: TrendingUp, sub: 'Last 30 days' },
    { label: 'Clicks (7 days)', value: clicksLast7Days.toLocaleString(), icon: TrendingUp, sub: 'Last 7 days' },
    { label: 'Published Products', value: totalProducts.toString(), icon: Package, sub: 'Active listings' },
  ]

  return (
    <div>
      <div className="mb-10">
        <h1 className="font-serif text-3xl text-bark-900" style={{ fontFamily: 'Cormorant, serif' }}>Analytics</h1>
        <p className="text-sm text-bark-500 font-sans mt-1">Affiliate click performance and content overview</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-12">
        {stats.map(({ label, value, icon: Icon, sub }) => (
          <div key={label} className="bg-white border border-cream-300 p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs tracking-wide uppercase text-bark-400 font-sans">{label}</p>
              <Icon size={16} strokeWidth={1.5} className="text-bark-400" />
            </div>
            <p className="font-serif text-4xl text-bark-900 mb-1" style={{ fontFamily: 'Cormorant, serif' }}>{value}</p>
            <p className="text-xs text-bark-400 font-sans">{sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Top products by clicks */}
        <div className="bg-white border border-cream-300 p-6">
          <h2 className="font-serif text-xl text-bark-900 mb-6" style={{ fontFamily: 'Cormorant, serif' }}>
            Top Products by Clicks
          </h2>
          <div className="space-y-1">
            {topProducts.map((product, i) => {
              const maxClicks = topProducts[0]?._count.affiliateClicks || 1
              const pct = (product._count.affiliateClicks / maxClicks) * 100
              return (
                <div key={product.id} className="py-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xs text-bark-300 font-mono w-5 flex-shrink-0">{i + 1}</span>
                      <span className="text-sm text-bark-800 font-sans truncate">{product.title}</span>
                    </div>
                    <span className="text-xs text-bark-500 font-sans ml-4 flex-shrink-0">
                      {product._count.affiliateClicks} clicks
                    </span>
                  </div>
                  <div className="ml-8 h-1 bg-cream-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-bark-400 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
            {topProducts.length === 0 && (
              <p className="text-sm text-bark-400 font-sans py-4">No click data yet.</p>
            )}
          </div>
        </div>

        {/* Recent clicks log */}
        <div className="bg-white border border-cream-300 p-6">
          <h2 className="font-serif text-xl text-bark-900 mb-6" style={{ fontFamily: 'Cormorant, serif' }}>
            Recent Affiliate Clicks
          </h2>
          <div className="space-y-0">
            {recentClicks.map((click, i) => (
              <div key={click.id} className={`flex items-center justify-between py-3 ${i < recentClicks.length - 1 ? 'border-b border-cream-100' : ''}`}>
                <div className="min-w-0">
                  <p className="text-sm text-bark-800 font-sans truncate">{click.product.title}</p>
                  {click.referer && (
                    <p className="text-xs text-bark-400 font-sans mt-0.5 truncate">via {click.referer}</p>
                  )}
                </div>
                <span className="text-xs text-bark-400 font-sans ml-4 flex-shrink-0">
                  {new Date(click.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                </span>
              </div>
            ))}
            {recentClicks.length === 0 && (
              <p className="text-sm text-bark-400 font-sans py-4">No clicks recorded yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
