import { Suspense } from 'react'
import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import MarqueeTicker from '@/components/home/MarqueeTicker'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import CategoryGrid from '@/components/home/CategoryGrid'
import TopRatedProducts from '@/components/home/TopRatedProducts'
import BlogHighlights from '@/components/home/BlogHighlights'
import NewsletterSection from '@/components/home/NewsletterSection'
import { getHomeData } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Offlora — Discover the Best Products Before You Buy',
}

export const revalidate = 3600 // ISR: revalidate every hour

export default async function HomePage() {
  const { featured, topRated, categories, blogs } = await getHomeData()

  return (
    <>
      <HeroSection />
      <MarqueeTicker />
      <Suspense fallback={<div className="h-96 animate-pulse bg-cream-200" />}>
        <FeaturedProducts products={featured} />
      </Suspense>
      <CategoryGrid categories={categories} />
      <TopRatedProducts products={topRated} />
      <BlogHighlights blogs={blogs} />
      <NewsletterSection />
    </>
  )
}
