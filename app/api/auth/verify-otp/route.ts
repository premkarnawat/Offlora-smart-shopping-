import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/db";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const { email, otp } = await req.json();

        if (!email || !otp) {
            return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 });
        }

        // Find valid OTP session
        const session = await prisma.otpSession.findFirst({
            where: {
                email,
                otp,
                verified: false,
                expiresAt: {
                    gt: new Date(),
                },
            },
            orderBy: { expiresAt: "desc" },
        });

        if (!session) {
            return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
        }

        // Mark verified
        await prisma.otpSession.update({
            where: { id: session.id },
            data: { verified: true },
        });

        // Find or create user
        let user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            user = await prisma.user.create({
                data: { email },
            });
        }

        // Generate JWT
        const token = signToken({ userId: user.id, email: user.email });

        // Set HTTP-only cookie
        cookies().set("session", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60, // 30 days
            path: "/",
        });

        return NextResponse.json({ message: "Verified successfully", user }, { status: 200 });
    } catch (error) {
        console.error("Verify OTP Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
