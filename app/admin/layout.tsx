import { redirect } from 'next/navigation'
import { verifyAdminSession } from '@/lib/actions'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await verifyAdminSession()
  if (!session) redirect('/admin/login')

  return (
    <div className="min-h-screen bg-cream-50 flex">
      <AdminSidebar />
      {/* Desktop: offset for sidebar. Mobile: offset for top bar */}
      <main className="flex-1 lg:ml-56 xl:ml-64 pt-16 lg:pt-0 p-4 sm:p-6 lg:p-8 overflow-auto min-w-0">
        {children}
      </main>
    </div>
  )
}
