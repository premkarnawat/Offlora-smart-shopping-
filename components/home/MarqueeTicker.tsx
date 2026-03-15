'use client'

const items = [
  'Electronics',
  '✦',
  'Beauty & Skincare',
  '✦',
  'Gadgets',
  '✦',
  'Lifestyle',
  '✦',
  'Home & Kitchen',
  '✦',
  'Health & Fitness',
  '✦',
  'Accessories',
  '✦',
  'Smart Home',
  '✦',
  'Audio',
  '✦',
  'Photography',
  '✦',
]

export default function MarqueeTicker() {
  return (
    <div className="border-y border-cream-300 bg-cream-50 overflow-hidden py-4">
      <div className="flex">
        <div className="marquee-inner flex gap-12 items-center" style={{ whiteSpace: 'nowrap' }}>
          {[...items, ...items].map((item, i) => (
            <span
              key={i}
              className={
                item === '✦'
                  ? 'text-bark-400 text-xs'
                  : 'text-xs tracking-[0.2em] uppercase text-bark-600 font-sans'
              }
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
