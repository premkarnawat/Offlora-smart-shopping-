import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import slugify from 'slugify'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding Offlora database...')

  // ─── Admin User ───────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash('offlora@admin2024', 12)
  await prisma.user.upsert({
    where: { email: 'admin@offlora.in' },
    update: {},
    create: {
      email: 'admin@offlora.in',
      password: hashedPassword,
      name: 'Offlora Admin',
      role: 'ADMIN',
    },
  })
  console.log('✓ Admin user created')

  // ─── Categories ───────────────────────────────────────────────
  const categoryData = [
    { name: 'Electronics', description: 'Smartphones, laptops, TVs and more' },
    { name: 'Beauty & Skincare', description: 'Skincare, makeup, and personal care' },
    { name: 'Gadgets', description: 'Smart devices, wearables, and tech accessories' },
    { name: 'Lifestyle', description: 'Fashion, accessories, and everyday essentials' },
    { name: 'Home & Kitchen', description: 'Appliances, cookware, and home essentials' },
    { name: 'Health & Fitness', description: 'Fitness equipment, supplements, and wellness' },
  ]

  const categories: Record<string, any> = {}
  for (const cat of categoryData) {
    const slug = slugify(cat.name, { lower: true, strict: true })
    const created = await prisma.category.upsert({
      where: { slug },
      update: {},
      create: { ...cat, slug },
    })
    categories[cat.name] = created
  }
  console.log('✓ Categories created')

  // ─── Brands ───────────────────────────────────────────────────
  const brandData = [
    { name: 'Sony', website: 'https://sony.com' },
    { name: 'Samsung', website: 'https://samsung.com' },
    { name: 'Apple', website: 'https://apple.com' },
    { name: 'The Ordinary', website: 'https://theordinary.com' },
    { name: 'Minimalist', website: 'https://beminimalist.co' },
    { name: 'Dyson', website: 'https://dyson.com' },
    { name: 'boAt', website: 'https://boat-lifestyle.com' },
    { name: 'Xiaomi', website: 'https://mi.com/in' },
  ]

  const brands: Record<string, any> = {}
  for (const brand of brandData) {
    const slug = slugify(brand.name, { lower: true, strict: true })
    const created = await prisma.brand.upsert({
      where: { slug },
      update: {},
      create: { ...brand, slug },
    })
    brands[brand.name] = created
  }
  console.log('✓ Brands created')

  // ─── Products ─────────────────────────────────────────────────
  // NOTE: Product images are NOT seeded here.
  // Images must be uploaded through the Admin Panel → Add Product.
  // The image uploader stores images directly in Neon PostgreSQL.
  const productData = [
    {
      title: 'Sony WH-1000XM5 Wireless Headphones',
      slug: 'sony-wh-1000xm5',
      shortDesc: 'Industry-leading noise cancellation with 30-hour battery life and premium sound.',
      description: `<h2>The Gold Standard in Noise Cancellation</h2>
<p>The Sony WH-1000XM5 continues Sony's tradition of delivering the best noise-cancelling headphones on the market. With 8 microphones and two processors working in concert, external noise is practically eliminated.</p>
<h3>Sound Quality</h3>
<p>Powered by the new Integrated Processor V1, the audio reproduction is rich, detailed, and well-balanced. The soundstage feels wide and immersive for a closed-back design.</p>
<h3>Comfort &amp; Build</h3>
<p>The redesigned headband and softened ear cushions make extended listening sessions genuinely comfortable. Build quality is premium throughout.</p>`,
      pros: ['Best-in-class ANC', 'Exceptional 30-hr battery', 'Speak-to-Chat feature', 'Lightweight redesign'],
      cons: ['Non-foldable design', 'Price premium over competition', 'Touch controls take adjustment'],
      rating: 4.8,
      reviewCount: 2847,
      affiliateLink: 'https://amzn.to/sony-wh1000xm5',
      isFeatured: true,
      isTopRated: true,
      brandName: 'Sony',
      categoryName: 'Electronics',
    },
    {
      title: 'Samsung Galaxy S24 Ultra',
      slug: 'samsung-galaxy-s24-ultra',
      shortDesc: 'The most powerful Android smartphone with a built-in S Pen and 200MP camera.',
      description: `<h2>Android Flagship Redefined</h2>
<p>The Galaxy S24 Ultra is Samsung's most capable smartphone to date. The titanium frame, integrated S Pen, and 200MP sensor make it a productivity and creative powerhouse.</p>
<h3>Camera System</h3>
<p>The 200MP main sensor captures extraordinary detail, while the 5x optical zoom delivers sharp images at distance.</p>`,
      pros: ['Integrated S Pen', '200MP camera system', 'Titanium build quality', '7 years of updates'],
      cons: ['Premium price tag', 'Large and heavy', 'S Pen nib wears quickly'],
      rating: 4.6,
      reviewCount: 1923,
      affiliateLink: 'https://amzn.to/s24ultra',
      isFeatured: true,
      isTopRated: false,
      brandName: 'Samsung',
      categoryName: 'Electronics',
    },
    {
      title: 'The Ordinary Niacinamide 10% + Zinc 1%',
      slug: 'the-ordinary-niacinamide-zinc',
      shortDesc: 'High-strength vitamin and mineral blemish formula for visible pores and uneven skin.',
      description: `<h2>The Holy Grail Serum for Oily Skin</h2>
<p>The Ordinary's Niacinamide serum has achieved cult status for good reason. A 10% concentration of niacinamide combined with 1% zinc effectively reduces blemishes, controls sebum, and minimizes pore visibility.</p>`,
      pros: ['Exceptional value', 'Visible pore reduction', 'Controls excess oil', 'Suitable for most skin types'],
      cons: ['Can pill under makeup', 'May sting sensitive skin'],
      rating: 4.7,
      reviewCount: 5621,
      affiliateLink: 'https://amzn.to/ordinary-niacinamide',
      isFeatured: false,
      isTopRated: true,
      brandName: 'The Ordinary',
      categoryName: 'Beauty & Skincare',
    },
    {
      title: 'Apple AirPods Pro (2nd Gen)',
      slug: 'apple-airpods-pro-2nd-gen',
      shortDesc: 'Adaptive Audio, Personalized Spatial Audio, and best-in-class integration for Apple users.',
      description: `<h2>The Best Earbuds for Apple Ecosystem</h2>
<p>The second-generation AirPods Pro set a new benchmark. The H2 chip enables improved noise cancellation and introduces Adaptive Audio mode which intelligently blends ANC and Transparency based on your environment.</p>`,
      pros: ['Adaptive Audio is transformative', 'Superior Apple ecosystem integration', 'Excellent call quality'],
      cons: ['Premium price', 'Limited Android functionality', 'Fit may not suit all ear shapes'],
      rating: 4.7,
      reviewCount: 3102,
      affiliateLink: 'https://amzn.to/airpods-pro-2',
      isFeatured: true,
      isTopRated: true,
      brandName: 'Apple',
      categoryName: 'Electronics',
    },
    {
      title: 'boAt Airdopes 141 TWS',
      slug: 'boat-airdopes-141',
      shortDesc: 'ENx technology, 42-hour total playback, and BEAST mode for gaming under ₹1,500.',
      description: `<h2>Best Budget TWS Earbuds in India</h2>
<p>The boAt Airdopes 141 delivers exceptional value. With ENx environmental noise cancellation, calls are crisp even in noisy environments.</p>`,
      pros: ['Exceptional price-to-value', '42-hour total battery', 'ENx call quality', 'Low latency BEAST mode'],
      cons: ['No ANC', 'Build feels plasticky', 'Basic app experience'],
      rating: 4.1,
      reviewCount: 18432,
      affiliateLink: 'https://amzn.to/boat-141',
      isFeatured: false,
      isTopRated: false,
      brandName: 'boAt',
      categoryName: 'Electronics',
    },
  ]

  for (const p of productData) {
    const existing = await prisma.product.findUnique({ where: { slug: p.slug } })
    if (existing) continue

    await prisma.product.create({
      data: {
        title: p.title,
        slug: p.slug,
        shortDesc: p.shortDesc,
        description: p.description,
        pros: p.pros,
        cons: p.cons,
        rating: p.rating,
        reviewCount: p.reviewCount,
        affiliateLink: p.affiliateLink,
        isFeatured: p.isFeatured,
        isTopRated: p.isTopRated,
        isPublished: true,
        brandId: brands[p.brandName].id,
        categoryId: categories[p.categoryName].id,
        // No images — upload via Admin Panel after seeding
      },
    })
  }
  console.log('✓ Products created (upload images via Admin → Products → Edit)')

  // ─── Blogs ────────────────────────────────────────────────────
  // NOTE: Blog cover images must be uploaded via Admin Panel → Blogs → Edit.
  const blogData = [
    {
      title: 'Best Smartphones Under ₹30,000 in 2024',
      slug: 'best-smartphones-under-30000-2024',
      excerpt: 'We tested 12 mid-range phones to find the top performers for camera, battery, and performance in this price bracket.',
      content: `<h2>The Mid-Range Revolution</h2>
<p>The ₹20,000–₹30,000 segment has never been more competitive. Manufacturers are packing flagship-tier features into mid-range devices, making this the sweet spot for value-conscious buyers.</p>
<h2>Our Top Picks</h2>
<p>After extensive testing across camera performance, battery life, software experience, and build quality, here are our recommendations.</p>
<h3>Best Overall: Samsung Galaxy A55 5G</h3>
<p>The Galaxy A55 offers a premium build with IP67 water resistance, a versatile triple-camera system, and Samsung's promise of four years of OS updates — all at ₹29,999.</p>
<h3>Best Camera: Google Pixel 8a</h3>
<p>Google's computational photography magic transforms a modest sensor into a camera that punches well above its price class.</p>
<h2>Final Verdict</h2>
<p>If you're buying in this segment, prioritize long-term software support. A phone that gets 3-4 years of updates delivers significantly more value than one abandoned in 18 months.</p>`,
      tags: ['Smartphones', 'Buying Guide', 'Budget'],
      readTime: 8,
      isPublished: true,
      isFeatured: true,
    },
    {
      title: 'The Complete Guide to Skincare Layering',
      slug: 'skincare-layering-guide-2024',
      excerpt: 'Stop wasting your serums. We explain the exact order to apply your skincare products for maximum efficacy.',
      content: `<h2>Why Order Matters</h2>
<p>Skincare products are formulated to work at specific pH levels and with specific molecular weights. Applying them in the wrong order can neutralize active ingredients or create a barrier that prevents absorption.</p>
<h2>The Golden Rule: Thinnest to Thickest</h2>
<p>Apply products from thinnest consistency to thickest. This allows lighter, water-based products to penetrate first before heavier occlusives seal everything in.</p>
<h3>Morning Routine Order</h3>
<ul><li>Cleanser</li><li>Toner / Essence</li><li>Vitamin C Serum</li><li>Eye Cream</li><li>Moisturizer</li><li>SPF (never skip)</li></ul>`,
      tags: ['Skincare', 'Guide', 'Beauty'],
      readTime: 6,
      isPublished: true,
      isFeatured: false,
    },
    {
      title: 'Sony WH-1000XM5 vs Bose QC45: Which Should You Buy?',
      slug: 'sony-wh1000xm5-vs-bose-qc45',
      excerpt: 'Two industry leaders, one clear winner for most buyers. Our 4-week comparative review.',
      content: `<h2>The Two Titans of Noise Cancellation</h2>
<p>For years, Sony and Bose have traded blows at the top of the wireless headphone market. Both the WH-1000XM5 and the QC45 are exceptional headphones — but they suit different buyers.</p>
<h2>Noise Cancellation</h2>
<p>Sony wins here, and it's not particularly close. The XM5's eight-microphone array creates a quieter, more sealed listening environment.</p>
<h2>Verdict</h2>
<p>If noise cancellation and sound quality are your priority: Sony XM5. If you'll be wearing them for 8+ hours daily: the Bose QC45's comfort advantage matters more.</p>`,
      tags: ['Headphones', 'Comparison', 'Electronics'],
      readTime: 7,
      isPublished: true,
      isFeatured: false,
    },
  ]

  for (const b of blogData) {
    const existing = await prisma.blog.findUnique({ where: { slug: b.slug } })
    if (existing) continue
    await prisma.blog.create({ data: b })
  }
  console.log('✓ Blog articles created (add cover images via Admin → Blogs → Edit)')

  // ─── Legal Pages ──────────────────────────────────────────────
  const legalPages = [
    {
      type: 'PRIVACY_POLICY' as const,
      title: 'Privacy Policy',
      content: `<h2>Information We Collect</h2>
<p>Offlora collects information you provide directly to us, such as when you subscribe to our newsletter or contact us. We also automatically collect certain information when you use our website, including IP addresses, browser type, and pages visited.</p>
<h2>How We Use Your Information</h2>
<p>We use the information we collect to provide, maintain, and improve our services, send you newsletters if you've opted in, and analyze usage patterns to enhance user experience.</p>
<h2>Affiliate Links & Tracking</h2>
<p>Our website contains affiliate links. When you click these links, we may receive a commission. Affiliate partners may use cookies to track purchases. Please refer to each partner's privacy policy for details.</p>
<h2>Cookies</h2>
<p>We use cookies to analyze site traffic and improve your experience. You can control cookie settings through your browser preferences.</p>
<h2>Contact</h2>
<p>For privacy-related inquiries, email us at privacy@offlora.in</p>`,
    },
    {
      type: 'TERMS_AND_CONDITIONS' as const,
      title: 'Terms & Conditions',
      content: `<h2>Acceptance of Terms</h2>
<p>By accessing Offlora, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our website.</p>
<h2>Content</h2>
<p>All content on Offlora is for informational purposes only. While we strive for accuracy, product specifications, prices, and availability are subject to change. Always verify with the retailer before purchase.</p>
<h2>Affiliate Relationships</h2>
<p>Offlora participates in affiliate programs. Editorial decisions are made independently of commercial relationships.</p>
<h2>Intellectual Property</h2>
<p>All content, design, and branding on Offlora is owned by Offlora and may not be reproduced without permission.</p>
<h2>Limitation of Liability</h2>
<p>Offlora is not liable for any damages arising from your use of this website or reliance on our recommendations.</p>`,
    },
    {
      type: 'AFFILIATE_DISCLAIMER' as const,
      title: 'Affiliate Disclaimer',
      content: `<h2>Affiliate Disclosure</h2>
<p>Offlora is a participant in affiliate marketing programs, including the Amazon Associates Program and other affiliate networks. This means that when you click on certain links on our site and make a qualifying purchase, we may earn a small commission at no additional cost to you.</p>
<h2>Our Editorial Independence</h2>
<p>Our affiliate relationships do not influence our editorial content. Products are selected and reviewed based solely on their merit and relevance to our readers. We never accept payment to feature or positively review any product.</p>
<h2>Price Transparency</h2>
<p>You will always pay the same price whether you use our affiliate links or visit the retailer directly. The commission comes from the retailer's marketing budget, not your pocket.</p>
<h2>Questions</h2>
<p>If you have questions about our affiliate relationships, email editorial@offlora.in</p>`,
    },
    {
      type: 'PRIVACY_CENTER' as const,
      title: 'Privacy Center',
      content: `<h2>Your Privacy at Offlora</h2>
<p>We believe in transparency about how we handle your data. This Privacy Center summarizes your rights and our practices.</p>
<h2>Data We Collect</h2>
<ul>
<li><strong>Newsletter subscribers:</strong> Email address only</li>
<li><strong>Contact form submissions:</strong> Name, email, and message content</li>
<li><strong>Analytics:</strong> Anonymized page view and click data via privacy-respecting analytics</li>
<li><strong>Affiliate clicks:</strong> Anonymized click events for internal analytics</li>
</ul>
<h2>Your Rights</h2>
<ul>
<li>Right to access your data</li>
<li>Right to deletion ("right to be forgotten")</li>
<li>Right to opt out of newsletter communications</li>
<li>Right to data portability</li>
</ul>
<h2>Exercise Your Rights</h2>
<p>Email privacy@offlora.in with your request. We will respond within 30 days.</p>`,
    },
  ]

  for (const page of legalPages) {
    await prisma.legalPage.upsert({
      where: { type: page.type },
      update: { content: page.content },
      create: page,
    })
  }
  console.log('✓ Legal pages created')

  console.log('\n✅ Seed complete! Login: admin@offlora.in / offlora@admin2024')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
