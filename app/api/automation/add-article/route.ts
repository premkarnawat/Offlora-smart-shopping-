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

    if (!body.title || !body.description || !body.shortDesc) {
      return NextResponse.json(
        { error: "title, description, shortDesc required" },
        { status: 400 }
      )
    }

    const slug = body.slug || generateSlug(body.title)

    // ✅ Check duplicate using ASIN (exists in your DB)
    if (body.asin) {
      const existing = await prisma.product.findFirst({
        where: { asin: body.asin }
      })

      if (existing) {
        return NextResponse.json({
          product_id: existing.id,
          duplicate: true
        })
      }
    }

    // ✅ Create product
    const product = await prisma.product.create({
      data: {
        title: body.title,
        slug,
        description: body.description,
        shortDesc: body.shortDesc,
        pros: Array.isArray(body.pros) ? body.pros : [],
        cons: Array.isArray(body.cons) ? body.cons : [],
        rating: Number(body.rating) || 0,
        reviewCount: Number(body.reviewCount) || 0,
        affiliateLink: body.affiliateLink,
        videoUrl: body.videoUrl || null,
        isFeatured: false,
        brandId: body.brandId,
        categoryId: body.categoryId,
        asin: body.asin || null,
        trend_score: Number(body.trend_score) || 0,
        status: body.status || "pending",
        source: body.source || "automation"
      }
    })

    return NextResponse.json({
      product_id: product.id,
      slug: product.slug
    })

  } catch (error: any) {
    console.error("[Automation] add-product error:", error)

    return NextResponse.json(
      {
        error: "Failed to create product",
        detail: error.message
      },
      { status: 500 }
    )
  }
}
