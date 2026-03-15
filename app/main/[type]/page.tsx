import { notFound } from 'next/navigation'
import { getLegalPage } from '@/lib/data'
import type { Metadata } from 'next'

const LEGAL_TYPE_MAP: Record<string, string> = {
  'privacy-policy': 'PRIVACY_POLICY',
  'terms': 'TERMS_AND_CONDITIONS',
  'affiliate-disclaimer': 'AFFILIATE_DISCLAIMER',
  'privacy-center': 'PRIVACY_CENTER',
}

interface Props {
  params: { type: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const type = LEGAL_TYPE_MAP[params.type]
  if (!type) return { title: 'Not Found' }
  const page = await getLegalPage(type)
  return { title: page?.title || 'Legal' }
}

export default async function LegalPageRenderer({ params }: Props) {
  const type = LEGAL_TYPE_MAP[params.type]
  if (!type) notFound()

  const page = await getLegalPage(type)

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-xs tracking-[0.25em] uppercase text-bark-400 font-sans mb-4">Legal</p>
        <h1
          className="font-serif text-5xl text-bark-900 mb-12 pb-10 border-b border-cream-300"
          style={{ fontFamily: 'Cormorant, serif', fontWeight: 300 }}
        >
          {page?.title || type.replace(/_/g, ' ')}
        </h1>

        {page?.content ? (
          <div className="prose-offlora" dangerouslySetInnerHTML={{ __html: page.content }} />
        ) : (
          <p className="text-sm text-bark-400 font-sans">This page is being updated. Please check back soon.</p>
        )}

        <div className="mt-16 border-t border-cream-300 pt-8">
          <p className="text-xs text-bark-400 font-sans">
            Last updated: {page?.updatedAt ? new Date(page.updatedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) : '—'}
          </p>
        </div>
      </div>
    </div>
  )
}
