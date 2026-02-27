import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/db";

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

        const user = await prisma.user.findUnique({
            where: { id: payload.userId },
            select: { id: true, email: true, createdAt: true },
        });

        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ user: null }, { status: 200 });
    }
}
