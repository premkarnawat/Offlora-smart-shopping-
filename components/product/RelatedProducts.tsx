import ProductCard from './ProductCard'
import type { ProductWithRelations } from '@/lib/types'

interface Props {
  products: ProductWithRelations[]
}

export default function RelatedProducts({ products }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} index={i} />
      ))}
    </div>
  )
}
