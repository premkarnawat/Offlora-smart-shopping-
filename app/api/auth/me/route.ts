import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export async function GET() {
    try {
        const token = cookies().get("session")?.value;

        if (!token) {
            return NextResponse.json({ user: null }, { status: 200 });
        }

        const payload = verifyToken(token);

        if (!payload || !payload.userId) {
            return NextResponse.json({ user: null }, { status: 200 });
        }

        const { data: user } = await supabase
            .from('User')
            .select('id, email, createdAt')
            .eq('id', payload.userId)
            .single();

        if (!user) {
            return NextResponse.json({ user: null }, { status: 200 });
        }

        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ user: null }, { status: 200 });
    }
}
