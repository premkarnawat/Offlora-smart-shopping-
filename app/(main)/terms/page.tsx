import type { Metadata } from 'next'
import Link from 'next/link'

const LEGAL_TITLES: Record<string, string> = {
  'privacy-policy': 'Privacy Policy',
  'terms': 'Terms & Conditions',
  'affiliate-disclaimer': 'Affiliate Disclaimer',
  'privacy-center': 'Privacy Center',
}

const LEGAL_CONTENT: Record<string, string> = {
  'privacy-policy': `
    <h2>Information We Collect</h2>
    <p>Offlora collects information you provide directly to us, such as when you subscribe to our newsletter or contact us. We also automatically collect certain information when you use our website, including IP addresses, browser type, and pages visited.</p>
    <h2>How We Use Your Information</h2>
    <p>We use the information we collect to provide, maintain, and improve our services, and analyze usage patterns to enhance user experience.</p>
    <h2>Affiliate Links</h2>
    <p>Our website contains affiliate links. When you click these links, we may receive a commission at no extra cost to you.</p>
    <h2>Contact</h2>
    <p>For privacy inquiries, email offlora.contact@gmail.com</p>
  `,
  'terms': `
    <h2>Acceptance of Terms</h2>
    <p>By accessing Offlora, you agree to be bound by these Terms and Conditions.</p>
    <h2>Content</h2>
    <p>All content on Offlora is for informational purposes only. Always verify product details with the retailer before purchase.</p>
    <h2>Affiliate Relationships</h2>
    <p>Offlora participates in affiliate programs. Editorial decisions are made independently.</p>
    <h2>Limitation of Liability</h2>
    <p>Offlora is not liable for any damages arising from use of this website.</p>
  `,
  'affiliate-disclaimer': `
    <h2>Affiliate Disclosure</h2>
    <p>Offlora participates in affiliate marketing programs. When you click certain links and make a qualifying purchase, we may earn a small commission at no additional cost to you.</p>
    <h2>Editorial Independence</h2>
    <p>Our affiliate relationships do not influence our editorial content. Products are selected based solely on merit.</p>
    <h2>Price Transparency</h2>
    <p>You will always pay the same price whether you use our affiliate links or visit the retailer directly.</p>
  `,
  'privacy-center': `
    <h2>Your Privacy at Offlora</h2>
    <p>We believe in transparency about how we handle your data.</p>
    <h2>Data We Collect</h2>
    <ul>
      <li>Newsletter subscribers: Email address only</li>
      <li>Contact form: Name, email, and message</li>
      <li>Analytics: Anonymized page view data</li>
    </ul>
    <h2>Your Rights</h2>
    <ul>
      <li>Right to access your data</li>
      <li>Right to deletion</li>
      <li>Right to opt out of newsletters</li>
    </ul>
    <h2>Contact</h2>
    <p>Email offlora.contact@gmail.com for any privacy requests.</p>
  `,
}

const PAGE_TYPE = 'terms'

export const metadata: Metadata = {
  title: `${LEGAL_TITLES[PAGE_TYPE]} — Offlora`,
}

export default function LegalPage() {
  return (
    <div className="pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link href="/"
          className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-bark-400 hover:text-bark-700 transition-colors font-sans mb-8 sm:mb-12 min-h-0">
          ← Back to Home
        </Link>
        <p className="text-xs tracking-[0.25em] uppercase text-bark-400 font-sans mb-3">Legal</p>
        <h1
          className="font-serif text-4xl sm:text-5xl text-bark-900 mb-10 pb-8 border-b border-cream-300"
          style={{ fontFamily: 'Cormorant, serif', fontWeight: 300 }}
        >
          {LEGAL_TITLES[PAGE_TYPE]}
        </h1>
        <div
          className="prose-offlora"
          dangerouslySetInnerHTML={{ __html: LEGAL_CONTENT[PAGE_TYPE] }}
        />
        <div className="mt-12 border-t border-cream-300 pt-6">
          <p className="text-xs text-bark-400 font-sans">
            Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>
    </div>
  )
}
