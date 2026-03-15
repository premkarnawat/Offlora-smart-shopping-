import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Offlora — Discover the Best Products Before You Buy',
    template: '%s | Offlora',
  },
  description:
    'Offlora is your curated guide to the best products across electronics, beauty, lifestyle, and more.',
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
