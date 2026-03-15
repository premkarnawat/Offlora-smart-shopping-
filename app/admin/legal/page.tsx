import { prisma } from '@/lib/prisma'
import LegalEditor from '@/components/admin/LegalEditor'

const LEGAL_PAGES = [
  { type: 'PRIVACY_POLICY', label: 'Privacy Policy' },
  { type: 'TERMS_AND_CONDITIONS', label: 'Terms & Conditions' },
  { type: 'AFFILIATE_DISCLAIMER', label: 'Affiliate Disclaimer' },
  { type: 'PRIVACY_CENTER', label: 'Privacy Center' },
]

export default async function AdminLegalPage() {
  const pages = await prisma.legalPage.findMany()
  const pagesMap = Object.fromEntries(pages.map((p) => [p.type, p]))

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-bark-900" style={{ fontFamily: 'Cormorant, serif' }}>Legal Pages</h1>
        <p className="text-sm text-bark-500 font-sans mt-1">Edit your privacy policy, terms, and legal disclosures.</p>
      </div>

      <div className="space-y-8">
        {LEGAL_PAGES.map(({ type, label }) => (
          <LegalEditor
            key={type}
            type={type}
            label={label}
            initialTitle={pagesMap[type]?.title || label}
            initialContent={pagesMap[type]?.content || ''}
          />
        ))}
      </div>
    </div>
  )
}
