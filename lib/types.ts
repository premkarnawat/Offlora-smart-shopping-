import type { Product, Brand, Category, ProductImage, Blog, AffiliateClick, LegalPage } from '@prisma/client'

export type ProductWithRelations = Product & {
  brand: Brand
  category: Category
  images: ProductImage[]
}

export type BlogWithProducts = Blog & {
  products: {
    product: ProductWithRelations
  }[]
}

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

export type AdminUser = {
  userId: string
  role: string
}
