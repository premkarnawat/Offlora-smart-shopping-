import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem { label: string; href?: string }
interface Props { items: BreadcrumbItem[] }

export default function BreadcrumbNav({ items }: Props) {
  return (
    <nav className="flex items-center gap-1 sm:gap-1.5 text-xs font-sans text-bark-400 flex-wrap" aria-label="Breadcrumb">
      <Link href="/" className="hover:text-bark-700 transition-colors min-h-0 whitespace-nowrap">Home</Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1 sm:gap-1.5">
          <ChevronRight size={10} strokeWidth={1.5} className="flex-shrink-0" />
          {item.href ? (
            <Link href={item.href} className="hover:text-bark-700 transition-colors min-h-0 whitespace-nowrap">{item.label}</Link>
          ) : (
            <span className="text-bark-700 line-clamp-1">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
