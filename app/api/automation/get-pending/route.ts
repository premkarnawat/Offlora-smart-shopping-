/**
 * GET /api/automation/get-pending
 */

import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

function authorized(req: NextRequest): boolean {
  const secret = req.headers.get("x-automation-secret")
  return secret === process.env.AUTOMATION_SECRET
}

export async function GET(req: NextRequest) {
  const isAutomation = authorized(req)
  // (optional) you can add session check here

  try {
    const [pendingProducts, draftArticles] = await Promise.all([
      // ✅ Use isPublished instead of status
      prisma.product.count({
        where: { isPublished: false }
      }),

      // ✅ Use blog instead of article + remove source
      prisma.blog.count({
        where: { isPublished: false }
      })
    ])

    return NextResponse.json({
      pending_products: pendingProducts,
      draft_articles: draftArticles,
      total_action_needed: pendingProducts + draftArticles,
    })

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
