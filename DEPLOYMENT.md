# OFFLORA — Complete Build & Deployment Guide

## Table of Contents
1. Project Overview
2. Project Structure
3. Tech Stack
4. Local Development Setup
5. Database Setup (Neon)
6. Environment Variables
7. Vercel Deployment
8. Image Uploads (Cloudinary)
9. Admin Panel Usage
10. SEO & Performance Notes
11. Extending the Platform
12. File Reference Index

---

## 1. Project Overview

**Offlora** is a production-ready affiliate marketing website. It is a full-stack Next.js 14 application with:

- **Public website** — minimalist product discovery, blogs, categories, search
- **Admin dashboard** — full CRUD for products, blogs, legal pages, analytics
- **Affiliate click tracking** — every "Buy Now" click is recorded in PostgreSQL
- **SEO-optimized** — dynamic sitemaps, Open Graph tags, structured metadata per page
- **ISR** — pages revalidate on a timer so builds are fast and content stays fresh

Design language: refined editorial minimalism (Cormorant Garamond serif + DM Sans), cream/bark/sage color palette, smooth Framer Motion animations throughout.

---

## 2. Project Structure

```
offlora/
├── app/
│   ├── layout.tsx              # Root HTML shell, Google Fonts
│   ├── sitemap.ts              # Dynamic XML sitemap
│   ├── middleware.ts            # JWT-protected admin routes
│   │
│   ├── main/                   # Public pages (Navbar + Footer layout)
│   │   ├── layout.tsx
│   │   ├── page.tsx            # Home page
│   │   ├── products/page.tsx   # All products with filters
│   │   ├── categories/page.tsx # All categories grid
│   │   ├── blogs/page.tsx      # Blog listing
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── search/page.tsx     # Search results
│   │   └── [type]/page.tsx     # Dynamic legal pages
│   │
│   ├── product/[slug]/page.tsx # Product detail page
│   ├── category/[slug]/page.tsx
│   ├── blog/[slug]/page.tsx
│   │
│   ├── admin/
│   │   ├── layout.tsx          # Protected layout with sidebar
│   │   ├── login/page.tsx      # Admin login
│   │   ├── dashboard/page.tsx
│   │   ├── products/
│   │   │   ├── page.tsx        # Products list
│   │   │   ├── new/page.tsx    # Add product
│   │   │   └── [id]/edit/page.tsx
│   │   ├── blogs/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/edit/page.tsx
│   │   ├── legal/page.tsx
│   │   └── analytics/page.tsx
│   │
│   └── api/
│       ├── products/route.ts   # GET products (JSON API)
│       ├── search/route.ts     # GET search results
│       └── clicks/route.ts     # POST affiliate click
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Fixed top nav with search overlay
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── MarqueeTicker.tsx
│   │   ├── FeaturedProducts.tsx
│   │   ├── CategoryGrid.tsx
│   │   ├── TopRatedProducts.tsx
│   │   ├── BlogHighlights.tsx
│   │   └── NewsletterSection.tsx
│   ├── product/
│   │   ├── ProductCard.tsx     # Reusable card with affiliate button
│   │   ├── ProductGallery.tsx  # Image switcher + video embed
│   │   ├── ProductInfo.tsx
│   │   ├── ProductAffiliate.tsx # Buy Now CTA with click tracking
│   │   ├── ProductFilters.tsx  # Sidebar filter component
│   │   └── RelatedProducts.tsx
│   ├── blog/
│   │   └── (blog components)
│   ├── admin/
│   │   ├── AdminSidebar.tsx
│   │   ├── ProductForm.tsx     # Full add/edit product form
│   │   ├── BlogForm.tsx
│   │   ├── LegalEditor.tsx
│   │   ├── DeleteProductButton.tsx
│   │   └── DeleteBlogButton.tsx
│   └── ui/
│       └── BreadcrumbNav.tsx
│
├── lib/
│   ├── prisma.ts               # Singleton Prisma client
│   ├── data.ts                 # All server-side DB queries
│   ├── actions.ts              # Server Actions (auth, CRUD, tracking)
│   └── types.ts                # TypeScript types
│
├── prisma/
│   ├── schema.prisma           # Full DB schema
│   └── seed.ts                 # Sample data + admin user
│
├── styles/
│   └── globals.css             # Tailwind base + custom styles
│
├── middleware.ts               # Edge JWT auth guard
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── .env.example
```

---

## 3. Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Database | Neon PostgreSQL (serverless) |
| ORM | Prisma 5 |
| Auth | JWT via jose + HTTP-only cookies |
| Images | Cloudinary |
| Deployment | Vercel |
| Fonts | Cormorant Garamond + DM Sans (Google Fonts) |

---

## 4. Local Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- A Neon account (free tier works)

### Step 1: Clone and install
```bash
git clone <your-repo>
cd offlora
npm install
```

### Step 2: Set up environment variables
```bash
cp .env.example .env.local
# Edit .env.local with your actual values (see Section 6)
```

### Step 3: Set up the database
```bash
# Push the Prisma schema to your Neon database
npx prisma db push

# Seed with sample data and admin user
npm run db:seed
```

### Step 4: Run the dev server
```bash
npm run dev
# Open http://localhost:3000
```

**Admin panel:** `http://localhost:3000/admin/login`  
**Default credentials:** `admin@offlora.in` / `offlora@admin2024`  
⚠️ **Change the password immediately in production!**

---

## 5. Database Setup (Neon)

### Create a Neon Project
1. Go to https://console.neon.tech
2. Click **"New Project"**
3. Choose a region (select one closest to your Vercel region)
4. Name your project: `offlora`
5. Click **"Create project"**

### Get the Connection String
1. In your Neon project dashboard, go to **"Connection Details"**
2. Select **"Prisma"** from the connection string dropdown
3. Copy the connection string — it looks like:
   ```
   postgresql://offlora_owner:password@ep-xxx.us-east-2.aws.neon.tech/offlora?sslmode=require
   ```
4. Paste this as `DATABASE_URL` in your `.env.local`

### Run Migrations
```bash
# For development (generates migration files)
npx prisma migrate dev --name init

# For production (run from CI or Vercel build)
npx prisma migrate deploy

# Or simpler — just push the schema directly (recommended for initial setup)
npx prisma db push
```

### Seed the database
```bash
npm run db:seed
```

This creates:
- 1 admin user (`admin@offlora.in`)
- 6 product categories
- 8 brands
- 6 sample products with images
- 3 blog articles
- 4 legal pages (Privacy Policy, T&C, Affiliate Disclaimer, Privacy Center)

---

## 6. Environment Variables

Create `.env.local` for local development. Set all these in **Vercel → Settings → Environment Variables** for production.

```env
# Required
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secure-random-string-min-32-chars"

# Required for image uploads
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"

# Required for SEO/sitemaps
NEXT_PUBLIC_SITE_URL="https://offlora.in"

# Optional - contact form emails
RESEND_API_KEY="re_..."
CONTACT_EMAIL="hello@offlora.in"
```

**Generate a secure JWT_SECRET:**
```bash
openssl rand -base64 32
```

---

## 7. Vercel Deployment

### Step 1: Push code to GitHub
```bash
git init
git add .
git commit -m "Initial commit: Offlora"
git remote add origin https://github.com/yourusername/offlora.git
git push -u origin main
```

### Step 2: Connect to Vercel
1. Go to https://vercel.com
2. Click **"New Project"**
3. Import your GitHub repository
4. Select **"Next.js"** framework (auto-detected)

### Step 3: Add Environment Variables
In Vercel project settings → **Environment Variables**, add all variables from Section 6. Make sure to add them for **Production**, **Preview**, and **Development** environments.

### Step 4: Configure Build Settings
The `package.json` build script includes `prisma generate`:
```json
"build": "prisma generate && next build"
```
This ensures Prisma client is generated before every build. No extra configuration needed.

### Step 5: Deploy
Click **"Deploy"**. Vercel will:
1. Install dependencies
2. Run `prisma generate`
3. Build the Next.js application
4. Deploy to global CDN

### Step 6: Run migrations on first deploy
After deployment, run migrations via Vercel CLI or locally pointing at production DB:
```bash
# Using Vercel CLI
vercel env pull .env.production.local
DATABASE_URL=$(grep DATABASE_URL .env.production.local | cut -d '"' -f2) npx prisma migrate deploy
npm run db:seed
```

### Custom Domain
1. Vercel → Project → Settings → Domains
2. Add `offlora.in`
3. Update your DNS records as instructed
4. Update `NEXT_PUBLIC_SITE_URL` to your custom domain

---

## 8. Image Uploads (Cloudinary)

### Setup
1. Create a free account at https://cloudinary.com
2. Go to **Dashboard** to find your `cloud_name`, `api_key`, and `api_secret`
3. Add them to your environment variables

### Uploading Product Images
The admin panel accepts **direct Cloudinary URLs**. To upload images:

1. Go to your Cloudinary **Media Library**
2. Upload your product images
3. Click on an uploaded image → **Copy URL**
4. Paste the URL in the product form's image field

### Recommended Image Specs
- **Product images:** 800×1000px (portrait 4:3 ratio), WebP or JPEG
- **Blog covers:** 1200×630px (landscape), WebP or JPEG
- **Category icons:** 200×200px, PNG with transparency

### Optional: Cloudinary Upload Widget
To add a direct upload button in the admin panel, you can integrate the Cloudinary Upload Widget:

```tsx
// In ProductForm.tsx, replace the URL input with:
<CldUploadWidget
  uploadPreset="offlora-unsigned"
  onUpload={(result) => updateImage(i, 'url', result.info.secure_url)}
>
  {({ open }) => (
    <button type="button" onClick={() => open()}>
      Upload Image
    </button>
  )}
</CldUploadWidget>
```

Install: `npm install next-cloudinary`

---

## 9. Admin Panel Usage

**URL:** `yoursite.com/admin/login`

### Adding a Product
1. Go to **Admin → Products → Add Product**
2. Fill in all required fields
3. Upload images to Cloudinary, paste URLs
4. Set as **Featured** to show on the homepage hero grid
5. Set as **Top Rated** to show in the Top Rated section
6. Click **Create Product**

### Adding a Blog Article
1. Go to **Admin → Blogs → New Article**
2. Write content using HTML tags (`<h2>`, `<p>`, `<ul>`, etc.)
3. Link products using the **Featured Products** selector
4. Set cover image URL from Cloudinary
5. Click **Publish Article**

### Editing Legal Pages
1. Go to **Admin → Legal Pages**
2. Click on any page to expand the editor
3. Edit content using HTML
4. Click **Save Changes**

### Changing Admin Password
Since there is no password change UI in the current build, use the Prisma Studio:
```bash
npx prisma studio
# Navigate to User table
# Update the password field with a bcrypt hash
```

Or run this script:
```typescript
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

const hash = await bcrypt.hash('your-new-password', 12)
await prisma.user.update({ where: { email: 'admin@offlora.in' }, data: { password: hash } })
```

---

## 10. SEO & Performance Notes

### ISR (Incremental Static Regeneration)
Pages use `export const revalidate = 3600` (1 hour). This means:
- Pages are statically generated at build time
- Every 1 hour, Next.js regenerates stale pages in the background
- Users always get fast cached responses

Adjust `revalidate` values:
- Home page: `3600` (products change infrequently)
- Product pages: `1800` (30 min — might have affiliate link changes)
- Blog pages: `3600`

### Structured Data (JSON-LD)
Add product schema to product pages for rich snippets:

```tsx
// In app/product/[slug]/page.tsx, add to <head>:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.title,
      "description": product.shortDesc,
      "brand": { "@type": "Brand", "name": product.brand.name },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": product.rating,
        "reviewCount": product.reviewCount
      }
    })
  }}
/>
```

### Image Optimization
All images use Next.js `<Image>` component with:
- `loading="lazy"` on non-hero images
- `priority` on hero/above-fold images
- Responsive `sizes` attributes
- Cloudinary serves WebP automatically

---

## 11. Extending the Platform

### Add a new category
```bash
npx prisma studio
# Navigate to Category → New Record
# Or use the seed script pattern
```

Or add via Prisma:
```typescript
await prisma.category.create({
  data: {
    name: 'Sports & Outdoors',
    slug: 'sports-outdoors',
    description: 'Gear for the active lifestyle',
  }
})
```

### Add Cloudinary Upload Widget to Admin
Replace URL input fields with drag-and-drop upload using `next-cloudinary`.

### Add Email Newsletter
Integrate with Mailchimp, ConvertKit, or Resend in `NewsletterSection.tsx` by POSTing to their API on form submit.

### Add Contact Form Email Sending
In `app/main/contact/page.tsx`, replace the `setTimeout` mock with a call to:
```typescript
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)
await resend.emails.send({
  from: 'offlora@offlora.in',
  to: process.env.CONTACT_EMAIL!,
  subject: `Contact: ${form.subject}`,
  text: `From: ${form.name} (${form.email})\n\n${form.message}`,
})
```

### Add a Ratings & Reviews System
Add a `Review` model to Prisma schema with `productId`, `rating`, `title`, `body`, `authorName`, `createdAt`. Add a public review submission form and admin moderation panel.

### Analytics Integration
Add Vercel Analytics or Google Analytics via `@next/third-parties/google` — both work with Next.js App Router without affecting Core Web Vitals.

---

## 12. File Reference Index

| File | Purpose |
|------|---------|
| `prisma/schema.prisma` | Full database schema |
| `prisma/seed.ts` | Sample data seeder |
| `lib/prisma.ts` | Singleton DB client |
| `lib/data.ts` | All DB read queries |
| `lib/actions.ts` | Server Actions (write operations + auth) |
| `lib/types.ts` | Shared TypeScript types |
| `middleware.ts` | JWT admin route protection |
| `app/layout.tsx` | Root HTML + font imports |
| `app/sitemap.ts` | Auto-generated XML sitemap |
| `app/main/page.tsx` | Home page (server component) |
| `components/layout/Navbar.tsx` | Top navigation with search |
| `components/layout/Footer.tsx` | Site footer |
| `components/product/ProductCard.tsx` | Reusable product card |
| `components/product/ProductForm.tsx` | Admin add/edit product form |
| `components/admin/AdminSidebar.tsx` | Admin navigation sidebar |
| `styles/globals.css` | Global CSS + Tailwind + animations |
| `tailwind.config.js` | Design tokens (colors, fonts) |
| `.env.example` | Environment variable template |

---

## Quick Reference Commands

```bash
# Local development
npm run dev

# Database
npm run db:push        # Sync schema (no migration files)
npm run db:migrate     # Create migration files + apply
npm run db:studio      # Visual DB editor
npm run db:seed        # Insert sample data

# Build & deploy
npm run build          # Production build
npm run start          # Start production server locally

# Generate Prisma client (auto-runs in build)
npx prisma generate
```

---

*Built with ❤️ for Offlora. Questions? hello@offlora.in*
