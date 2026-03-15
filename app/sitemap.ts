import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE = 'https://offlora.in'

  const [products, blogs, categories] = await Promise.all([
    prisma.product.findMany({ where: { isPublished: true }, select: { slug: true, updatedAt: true } }),
    prisma.blog.findMany({ where: { isPublished: true }, select: { slug: true, updatedAt: true } }),
    prisma.category.findMany({ select: { slug: true, updatedAt: true } }),
  ])

  const staticPages = [
    { url: BASE, lastModified: new Date(), priority: 1.0 },
    { url: `${BASE}/products`, lastModified: new Date(), priority: 0.9 },
    { url: `${BASE}/categories`, lastModified: new Date(), priority: 0.9 },
    { url: `${BASE}/blogs`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE}/about`, lastModified: new Date(), priority: 0.6 },
    { url: `${BASE}/contact`, lastModified: new Date(), priority: 0.5 },
    { url: `${BASE}/privacy-policy`, lastModified: new Date(), priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: new Date(), priority: 0.3 },
    { url: `${BASE}/affiliate-disclaimer`, lastModified: new Date(), priority: 0.3 },
  ]

  return [
    ...staticPages,
    ...products.map((p) => ({
      url: `${BASE}/product/${p.slug}`,
      lastModified: p.updatedAt,
      priority: 0.8,
    })),
    ...blogs.map((b) => ({
      url: `${BASE}/blog/${b.slug}`,
      lastModified: b.updatedAt,
      priority: 0.7,
    })),
    ...categories.map((c) => ({
      url: `${BASE}/category/${c.slug}`,
      lastModified: c.updatedAt,
      priority: 0.7,
    })),
  ]
}
