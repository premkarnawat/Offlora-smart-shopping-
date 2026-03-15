import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProductBySlug, getRelatedProducts } from '@/lib/data'
import ProductGallery from '@/components/product/ProductGallery'
import ProductInfo from '@/components/product/ProductInfo'
import ProductAffiliate from '@/components/product/ProductAffiliate'
import RelatedProducts from '@/components/product/RelatedProducts'
import BreadcrumbNav from '@/components/ui/BreadcrumbNav'

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug(params.slug)
  if (!product) return { title: 'Product Not Found' }
  return {
    title: `${product.title} — ${product.brand.name}`,
    description: product.shortDesc,
    openGraph: { title: product.title, description: product.shortDesc },
  }
}

export default async function ProductPage({ params }: Props) {
  const product = await getProductBySlug(params.slug)
  if (!product) notFound()
  const related = await getRelatedProducts(product.categoryId, product.id)

  return (
    <div className="pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-20 lg:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <BreadcrumbNav items={[
          { label: 'Products', href: '/products' },
          { label: product.category.name, href: `/category/${product.category.slug}` },
          { label: product.title },
        ]} />

        {/* Product layout: stacked on mobile, side-by-side on lg */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-8 sm:mt-10">
          <div className="lg:col-span-6"><ProductGallery images={product.images} videoUrl={product.videoUrl} /></div>
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 lg:space-y-10">
            <ProductInfo product={product} />
            <ProductAffiliate product={product} />
          </div>
        </div>

        {/* Description + Pros/Cons */}
        <div className="mt-16 sm:mt-20 lg:mt-24 grid grid-cols-1 lg:grid-cols-3 gap-10 sm:gap-12 lg:gap-16">
          <div className="lg:col-span-2">
            <h2 className="font-serif text-3xl sm:text-4xl text-bark-900 mb-6 sm:mb-8"
              style={{ fontFamily:'Cormorant, serif', fontWeight:300 }}>Full Review</h2>
            <div className="prose-offlora text-sm leading-relaxed text-bark-700 font-sans"
              dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
          <div>
            <h3 className="font-serif text-2xl text-bark-900 mb-5 sm:mb-6"
              style={{ fontFamily:'Cormorant, serif', fontWeight:300 }}>At a Glance</h3>
            <div className="space-y-5 sm:space-y-6">
              <div>
                <p className="text-xs tracking-widests uppercase text-sage-600 font-sans mb-2 sm:mb-3">Pros</p>
                <ul className="space-y-2">
                  {product.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-bark-700 font-sans">
                      <span className="text-sage-500 mt-0.5 flex-shrink-0">+</span>{pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-cream-300 pt-5 sm:pt-6">
                <p className="text-xs tracking-widests uppercase text-bark-400 font-sans mb-2 sm:mb-3">Cons</p>
                <ul className="space-y-2">
                  {product.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-bark-600 font-sans">
                      <span className="text-bark-400 mt-0.5 flex-shrink-0">−</span>{con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-20 sm:mt-24 lg:mt-32">
            <h2 className="font-serif text-3xl sm:text-4xl text-bark-900 mb-8 sm:mb-10 lg:mb-12"
              style={{ fontFamily:'Cormorant, serif', fontWeight:300 }}>You May Also Like</h2>
            <RelatedProducts products={related} />
          </div>
        )}
      </div>
    </div>
  )
}
