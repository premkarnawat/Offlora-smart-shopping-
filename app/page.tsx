import { Suspense } from 'react'
import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import MarqueeTicker from '@/components/home/MarqueeTicker'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import CategoryGrid from '@/components/home/CategoryGrid'
import TopRatedProducts from '@/components/home/TopRatedProducts'
import BlogHighlights from '@/components/home/BlogHighlights'
import NewsletterSection from '@/components/home/NewsletterSection'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Offlora — Discover the Best Products Before You Buy',
}

export const revalidate = 3600

async function getHomeData() {
  try {
    const { getHomeData } = await import('@/lib/data')
    return getHomeData()
  } catch {
    return { featured: [], topRated: [], categories: [], blogs: [] }
  }
}

export default async function HomePage() {
  const { featured, topRated, categories, blogs } = await getHomeData()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <MarqueeTicker />
        <Suspense fallback={<div className="h-96" />}>
          <FeaturedProducts products={featured} />
        </Suspense>
        <CategoryGrid categories={categories} />
        <TopRatedProducts products={topRated} />
        <BlogHighlights blogs={blogs} />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}
