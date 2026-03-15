import Link from 'next/link'
import { Instagram, Twitter, Youtube } from 'lucide-react'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Categories', href: '/categories' },
  { label: 'Products', href: '/products' },
  { label: 'Reviews & Blogs', href: '/blogs' },
  { label: 'About Offlora', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
]

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Affiliate Disclaimer', href: '/affiliate-disclaimer' },
  { label: 'Privacy Center', href: '/privacy-center' },
]

export default function Footer() {
  return (
    <footer className="bg-bark-900 text-cream-200 mt-16 sm:mt-24 lg:mt-32">

      {/* Main footer grid */}
      <div className="border-b border-bark-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">

          {/* Mobile: stacked. Tablet: 2-col. Desktop: 4-col */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12">

            {/* Brand block */}
            <div className="sm:col-span-2 lg:col-span-4">
              <p
                className="font-serif text-2xl sm:text-3xl tracking-[0.14em] text-cream-100 mb-3"
                style={{ fontFamily: 'Cormorant, serif' }}
              >
                OFFLORA
              </p>
              <p className="text-sm text-bark-400 leading-relaxed font-sans max-w-xs">
                Discover the best products before you buy. Honest reviews and trusted affiliate recommendations.
              </p>

              {/* Social icons */}
              <div className="flex gap-3 mt-6">
                {[
                  { href: 'https://instagram.com/offlora', icon: Instagram, label: 'Instagram' },
                  { href: 'https://twitter.com/offlora', icon: Twitter, label: 'Twitter' },
                  { href: 'https://youtube.com/@offlora', icon: Youtube, label: 'YouTube' },
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 border border-bark-700 rounded-full flex items-center justify-center text-bark-400 hover:text-cream-100 hover:border-bark-500 transition-colors min-h-0"
                  >
                    <Icon size={14} strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-3 lg:col-start-6">
              <p className="text-xs tracking-widest uppercase text-bark-500 mb-5 font-sans">
                Quick Links
              </p>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-bark-400 hover:text-cream-200 transition-colors font-sans min-h-0"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal + Contact */}
            <div className="lg:col-span-3">
              <p className="text-xs tracking-widest uppercase text-bark-500 mb-5 font-sans">Legal</p>
              <ul className="space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-bark-400 hover:text-cream-200 transition-colors font-sans min-h-0"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <p className="text-xs tracking-widests uppercase text-bark-500 mb-2 font-sans">Contact</p>
                <a
                  href="mailto:hello@offlora.in"
                  className="text-sm text-bark-400 hover:text-cream-200 transition-colors font-sans min-h-0"
                >
                  hello@offlora.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <p className="text-xs text-bark-600 font-sans order-2 sm:order-1">
          © {new Date().getFullYear()} Offlora. All rights reserved.
        </p>
        <p className="text-xs text-bark-600 font-sans order-1 sm:order-2 max-w-sm sm:max-w-none">
          Offlora participates in affiliate programs. We may earn a commission.
        </p>
      </div>
    </footer>
  )
}
