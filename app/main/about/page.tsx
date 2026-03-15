import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Offlora',
  description: 'Learn about Offlora — our mission, editorial standards, and how we select the products we review.',
}

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-xs tracking-[0.25em] uppercase text-bark-400 font-sans mb-4">Our Story</p>
        <h1
          className="font-serif text-6xl text-bark-900 mb-16"
          style={{ fontFamily: 'Cormorant, serif', fontWeight: 300 }}
        >
          About Offlora
        </h1>

        <div className="prose-offlora space-y-8">
          <p className="text-lg text-bark-700 font-sans leading-relaxed">
            Offlora was built on a simple premise: buying decisions shouldn't feel like guesswork.
          </p>

          <p className="text-bark-600 font-sans leading-relaxed">
            We spend hundreds of hours researching, testing, and comparing products across categories — so you don't have to. Every recommendation on Offlora is the result of rigorous editorial scrutiny, not sponsored placement.
          </p>

          <div className="border-l-2 border-cream-300 pl-6 my-10">
            <p className="font-serif text-2xl text-bark-800 italic" style={{ fontFamily: 'Cormorant, serif', fontWeight: 300 }}>
              "Discover the best products before you buy."
            </p>
          </div>

          <h2 className="font-serif text-3xl text-bark-900 mt-12" style={{ fontFamily: 'Cormorant, serif', fontWeight: 400 }}>
            How We Review
          </h2>
          <p className="text-bark-600 font-sans leading-relaxed">
            Our review process combines expert hands-on testing, community feedback analysis, long-term durability data, and value-for-money assessment. We track real-world performance across diverse use cases before publishing any recommendation.
          </p>

          <h2 className="font-serif text-3xl text-bark-900 mt-12" style={{ fontFamily: 'Cormorant, serif', fontWeight: 400 }}>
            Affiliate Transparency
          </h2>
          <p className="text-bark-600 font-sans leading-relaxed">
            Offlora participates in affiliate programs. When you click "Buy Now" and make a purchase, we may earn a commission at no additional cost to you. This revenue funds our editorial operation — our reviews remain completely independent of commercial relationships.
          </p>

          <h2 className="font-serif text-3xl text-bark-900 mt-12" style={{ fontFamily: 'Cormorant, serif', fontWeight: 400 }}>
            Our Categories
          </h2>
          <p className="text-bark-600 font-sans leading-relaxed">
            We cover Electronics, Beauty & Skincare, Gadgets, Lifestyle, Home & Kitchen, Health & Fitness, and more — with new categories added regularly based on reader demand.
          </p>
        </div>

        <div className="mt-20 border-t border-cream-300 pt-12">
          <p className="text-xs tracking-widest uppercase text-bark-400 font-sans mb-3">Get in Touch</p>
          <a
            href="mailto:hello@offlora.in"
            className="font-serif text-3xl text-bark-900 hover:text-bark-600 transition-colors"
            style={{ fontFamily: 'Cormorant, serif', fontWeight: 300 }}
          >
            hello@offlora.in
          </a>
        </div>
      </div>
    </div>
  )
}
