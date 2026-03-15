import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Offlora — Discover the Best Products Before You Buy',
    template: '%s | Offlora',
  },
  description:
    'Offlora is your curated guide to the best products across electronics, beauty, lifestyle, and more. Honest reviews. Trusted affiliate recommendations.',
  keywords: ['product reviews', 'affiliate', 'best products', 'buying guide', 'Offlora'],
  authors: [{ name: 'Offlora Editorial' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://offlora.in',
    siteName: 'Offlora',
    title: 'Offlora — Discover the Best Products Before You Buy',
    description: 'Curated product recommendations from experts you can trust.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Offlora' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Offlora — Discover the Best Products Before You Buy',
    description: 'Curated product recommendations from experts you can trust.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: { canonical: 'https://offlora.in' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=DM+Mono:wght@300;400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-cream-100 text-bark-900 antialiased">{children}</body>
    </html>
  )
}
