/**
 * POST /api/automation/add-product
 */

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

    if (!body.title || !body.affiliate_link || !body.brandId || !body.categoryId) {
      return NextResponse.json(
        { error: "title, affiliate_link, brandId, categoryId are required" },
        { status: 400 }
      )
    }

    const slug = body.slug || generateSlug(body.title)

    // Check duplicate by ASIN
    if (body.asin) {
      const existing = await prisma.product.findFirst({
        where: { asin: body.asin }
      })

      if (existing) {
        return NextResponse.json(
          { product_id: existing.id, duplicate: true },
          { status: 200 }
        )
      }
    }

    // Check duplicate by slug
    const existingSlug = await prisma.product.findFirst({
      where: { slug }
    })

    if (existingSlug) {
      return NextResponse.json(
        { product_id: existingSlug.id, duplicate: true },
        { status: 200 }
      )
    }

    const product = await prisma.product.create({
      data: {
        title: body.title,
        slug,
        description: body.description || body.title,
        shortDesc: body.short_description || body.title.slice(0, 100),
        pros: Array.isArray(body.pros) ? body.pros : [],
        cons: Array.isArray(body.cons) ? body.cons : [],
        rating: Number(body.rating) || 0,
        reviewCount: Number(body.review_count) || 0,
        affiliateLink: body.affiliate_link,
        videoUrl: body.video_url || null,
        brandId: body.brandId,
        categoryId: body.categoryId,
        asin: body.asin || null,
        isPublished: false,
        isFeatured: false,
        isTopRated: false,
        source: "automation"
      }
    })

    return NextResponse.json({
      product_id: product.id,
      status: "pending"
    })

  } catch (error: any) {
    console.error("[Automation] add-product error:", error)

    return NextResponse.json(
      { error: "Failed to create product", detail: error.message },
      { status: 500 }
    )
  }
}
