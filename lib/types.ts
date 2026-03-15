import type { Product, Brand, Category, Blog, LegalPage } from '@prisma/client'

// ─── Image ────────────────────────────────────────────────────────────────────
// We never send raw base64 `data` to the client.
// All image references use a /api/images/[id] URL instead.

export type ProductImageSlim = {
  id: string
  url: string          // always /api/images/<id>
  alt: string | null
  isPrimary: boolean
}

// ─── Product ──────────────────────────────────────────────────────────────────

export type ProductWithRelations = Product & {
  brand: Brand
  category: Category
  images: ProductImageSlim[]
}

// ─── Blog ─────────────────────────────────────────────────────────────────────

export type BlogWithCover = Omit<Blog, 'coverImageId'> & {
  coverImage: string | null  // resolved /api/images/<id> or null
}

// ─── Analytics ────────────────────────────────────────────────────────────────

export type AnalyticsData = {
  totalProducts: number
  totalBlogs: number
  totalClicks: number
  topProducts: {
    id: string
    title: string
    slug: string
    _count: { affiliateClicks: number }
  }[]
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export type AdminUser = {
  userId: string
  role: string
}

// ─── Legal ────────────────────────────────────────────────────────────────────

export type LegalPageType =
  | 'PRIVACY_POLICY'
  | 'TERMS_AND_CONDITIONS'
  | 'AFFILIATE_DISCLAIMER'
  | 'PRIVACY_CENTER'
