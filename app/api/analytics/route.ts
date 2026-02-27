import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { eventType, source, productId, url } = body;

        // Fast-fail if missing essential data
        if (!eventType) {
            return NextResponse.json({ error: "Missing eventType" }, { status: 400 });
        }

        // Try to get user if logged in (optional for basic tracking)
        const token = cookies().get("session")?.value;
        let userId = null;
        if (token) {
            const payload = verifyToken(token);
            if (payload && payload.userId) {
                userId = payload.userId;
            }
        }

        if (eventType === "AFFILIATE_CLICK" && productId) {
            // Record dedicated click
            await prisma.affiliateClick.create({
                data: {
                    source,
                    productId,
                    userId,
                }
            });
        }

        // Record general event
        await prisma.analyticsEvent.create({
            data: {
                eventType,
                source,
                productId,
                url,
                userId,
            }
        });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Analytics Error:", error);
        // Return 200 anyway so we don't break the client if tracking fails
        return NextResponse.json({ success: false }, { status: 200 });
    }
}
