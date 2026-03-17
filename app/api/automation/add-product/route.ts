/**
 * POST /api/automation/add-product
 *
 * Called by the Python automation agent to push new products
 * into your Offlora database as "pending" (for your approval).
 *
 * Add this file to your existing Next.js project at:
 * app/api/automation/add-product/route.ts
 */

import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

function authorized(req: NextRequest): boolean {
  const secret = req.headers.get("x-automation-secret")
  return secret === process.env.AUTOMATION_SECRET
}

export async function POST(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()

    // Validate required fields
    if (!body.title || !body.affiliate_link) {
      return NextResponse.json(
        { error: "title and affiliate_link are required" },
        { status: 400 }
      )
    }

    // Check for duplicate ASIN
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

    const product = await prisma.product.create({
      data: {
        title: body.title,
        shortDescription: body.short_description || body.title.slice(0, 100),
        price: body.price || "Check on Amazon",
        rating: body.rating || 0,
        reviewCount: body.review_count || 0,
        affiliateLink: body.affiliate_link,
        imageUrls: body.image_urls || [],
        pros: body.pros || [],
        cons: body.cons || [],
        category: body.category || "General",
        asin: body.asin || null,
        trendScore: body.trend_score || 0,
        status: "pending",       // ← Shows in your approval queue
        isPublished: false,
        isFeatured: false,
        isTopRated: false,
      }
    })

    return NextResponse.json({ product_id: product.id, status: "pending" })

  } catch (error: any) {
    console.error("[Automation] add-product error:", error)
    return NextResponse.json(
      { error: "Failed to create product", detail: error.message },
      { status: 500 }
    )
  }
}
