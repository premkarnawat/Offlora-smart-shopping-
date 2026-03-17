/**
 * GET /api/automation/get-pending
 *
 * Returns count of pending products and draft articles.
 * Used by your dashboard to show approval badges.
 *
 * Add this file to your existing Next.js project at:
 * app/api/automation/get-pending/route.ts
 */

import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

function authorized(req: NextRequest): boolean {
  const secret = req.headers.get("x-automation-secret")
  return secret === process.env.AUTOMATION_SECRET
}

export async function GET(req: NextRequest) {
  // Allow both automation service and your own dashboard (authenticated session)
  const isAutomation = authorized(req)
  // Add your own session check here if needed

  try {
    const [pendingProducts, draftArticles] = await Promise.all([
      prisma.product.count({ where: { status: "pending" } }),
      prisma.article.count({ where: { isPublished: false, source: "automation" } }),
    ])

    return NextResponse.json({
      pending_products: pendingProducts,
      draft_articles: draftArticles,
      total_action_needed: pendingProducts + draftArticles,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
