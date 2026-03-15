'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, BookOpen, BarChart2, FileText, Settings, LogOut, Menu, X } from 'lucide-react'
import { adminLogout } from '@/lib/actions'

const navItems = [
  { label:'Dashboard', href:'/admin/dashboard', icon:LayoutDashboard },
  { label:'Products', href:'/admin/products', icon:Package },
  { label:'Blogs', href:'/admin/blogs', icon:BookOpen },
  { label:'Analytics', href:'/admin/analytics', icon:BarChart2 },
  { label:'Legal Pages', href:'/admin/legal', icon:FileText },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => { setMobileOpen(false) }, [pathname])
  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const SidebarContent = () => (
    <>
      <div className="p-5 sm:p-6 border-b border-bark-800 flex items-center justify-between">
        <div>
          <p className="font-serif text-xl tracking-[0.14em] text-cream-100" style={{ fontFamily:'Cormorant, serif' }}>OFFLORA</p>
          <p className="text-xs text-bark-500 font-sans mt-0.5 tracking-wide">Admin Panel</p>
        </div>
        <button onClick={() => setMobileOpen(false)} className="lg:hidden text-bark-400 hover:text-cream-100 p-1 min-h-0">
          <X size={18} strokeWidth={1.5} />
        </button>
      </div>
      <nav className="flex-1 p-3 sm:p-4 space-y-1 overflow-y-auto">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname.startsWith(href)
          return (
            <Link key={href} href={href}
              className={`flex items-center gap-3 px-3 py-3 text-sm font-sans transition-colors rounded-sm min-h-0 ${
                active ? 'bg-bark-800 text-cream-100' : 'text-bark-400 hover:text-cream-200 hover:bg-bark-800/50'
              }`}>
              <Icon size={15} strokeWidth={1.5} />{label}
            </Link>
          )
        })}
      </nav>
      <div className="p-3 sm:p-4 border-t border-bark-800">
        <form action={adminLogout}>
          <button type="submit" className="flex items-center gap-3 px-3 py-3 text-sm font-sans text-bark-400 hover:text-cream-200 w-full transition-colors min-h-0">
            <LogOut size={15} strokeWidth={1.5} /> Sign Out
          </button>
        </form>
      </div>
    </>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-56 xl:w-64 bg-bark-900 flex-col z-40">
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-bark-900 border-b border-bark-800 px-4 py-3 flex items-center justify-between">
        <p className="font-serif text-lg tracking-[0.14em] text-cream-100" style={{ fontFamily:'Cormorant, serif' }}>OFFLORA</p>
        <button onClick={() => setMobileOpen(true)} className="text-bark-400 hover:text-cream-100 p-2 min-h-0">
          <Menu size={20} strokeWidth={1.5} />
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div className="lg:hidden fixed inset-0 z-40 bg-bark-900/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="lg:hidden fixed left-0 top-0 h-full w-64 sm:w-72 bg-bark-900 flex flex-col z-50">
            <SidebarContent />
          </aside>
        </>
      )}
    </>
  )
}
