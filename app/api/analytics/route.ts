import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
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

        // Try to get user if logged in
        const token = cookies().get("session")?.value;
        let userId = null;
        if (token) {
            const payload = verifyToken(token);
            if (payload && payload.userId) {
                userId = payload.userId;
            }
        }

        if (eventType === "AFFILIATE_CLICK" && productId) {
            await supabase.from('AffiliateClick').insert({
                source,
                productId,
                userId,
            });
        }

        await supabase.from('AnalyticsEvent').insert({
            eventType,
            source,
            productId,
            url,
            userId,
        });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Analytics Error:", error);
        return NextResponse.json({ success: false }, { status: 200 });
    }
}
