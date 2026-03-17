import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

function authorized(req: NextRequest): boolean {
  const secret = req.headers.get("x-automation-secret")
  return secret === process.env.AUTOMATION_SECRET
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80)
}

export async function POST(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()

    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: "title and content are required" },
        { status: 400 }
      )
    }

    const slug = body.slug || generateSlug(body.title)

    // ✅ FIXED HERE
    const existing = await prisma.blog.findFirst({ where: { slug } })

    if (existing) {
      return NextResponse.json(
        { article_id: existing.id, slug: existing.slug, duplicate: true }
      )
    }

    // ✅ FIXED HERE
    const article = await prisma.blog.create({
      data: {
        title: body.title,
        slug,
        excerpt: body.excerpt || body.title,
        content: body.content,
        author: body.author || "Offlora Editorial",
        readTime: body.read_time || 7,
        tags: body.tags || [],
        coverImage: body.cover_image || null,
        isPublished: false,
        isFeatured: false,
        featuredProductIds: body.featured_product_ids || [],
        seoKeyword: body.seo_keyword || null,
        metaDescription: body.excerpt?.slice(0, 155) || null,
        source: "automation",
      }
    })

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://offlora.in"

    return NextResponse.json({
      article_id: article.id,
      slug: article.slug,
      article_url: `${siteUrl}/blog/${article.slug}`
    })

  } catch (error: any) {
    console.error("[Automation] add-article error:", error)
    return NextResponse.json(
      { error: "Failed to create article", detail: error.message },
      { status: 500 }
    )
  }
}
