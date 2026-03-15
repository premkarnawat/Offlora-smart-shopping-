import ProductCard from './ProductCard'

// Using `any[]` here because the product data comes from
// withImageUrls() in data.ts which adds `url` at runtime.
// TypeScript can't infer the intersection type from Prisma + our transform.
interface Props {
  products: any[]
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
