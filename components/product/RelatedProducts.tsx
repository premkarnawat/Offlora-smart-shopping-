import ProductCard from './ProductCard'
import type { ProductWithRelations } from '@/lib/types'

interface Props {
  products: ProductWithRelations[]
}

export default function RelatedProducts({ products }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} index={i} />
      ))}
    </div>
  )
}
