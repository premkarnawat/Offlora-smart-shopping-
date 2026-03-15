import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { getCategories, getBrands } from '@/lib/data'
import ProductForm from '@/components/admin/ProductForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface Props {
  params: { id: string }
}

export default async function EditProductPage({ params }: Props) {
  const [product, categories, brands] = await Promise.all([
    prisma.product.findUnique({
      where: { id: params.id },
      include: {
        images: {
          select: { id: true, alt: true, isPrimary: true, size: true, filename: true },
          orderBy: { isPrimary: 'desc' },
        },
      },
    }),
    getCategories(),
    getBrands(),
  ])

  if (!product) notFound()

  // Transform existing ProductImage records into UploadedImageRecord shape
  // isExisting=true tells ProductForm/updateProduct to retain (not re-copy) these
  const existingImages = product.images.map((img) => ({
    id: img.id,
    url: `/api/images/${img.id}`,
    alt: img.alt || '',
    isPrimary: img.isPrimary,
    filename: img.filename || undefined,
    size: img.size || undefined,
    isExisting: true,
  }))

  return (
    <div>
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-bark-400 hover:text-bark-700 transition-colors font-sans mb-8"
      >
        <ArrowLeft size={12} strokeWidth={1.5} /> Back to Products
      </Link>
      <h1 className="font-serif text-3xl text-bark-900 mb-8" style={{ fontFamily: 'Cormorant, serif' }}>
        Edit Product
      </h1>
      <ProductForm
        categories={categories}
        brands={brands}
        mode="edit"
        initialData={{
          id: product.id,
          title: product.title,
          description: product.description,
          shortDesc: product.shortDesc,
          pros: product.pros,
          cons: product.cons,
          rating: product.rating,
          reviewCount: product.reviewCount,
          affiliateLink: product.affiliateLink,
          videoUrl: product.videoUrl || '',
          isFeatured: product.isFeatured,
          isTopRated: product.isTopRated,
          isPublished: product.isPublished,
          brandId: product.brandId,
          categoryId: product.categoryId,
          images: existingImages,
        }}
      />
    </div>
  )
}
