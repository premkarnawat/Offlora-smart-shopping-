import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { sendOtpEmail } from "@/lib/mail";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // Generate 6 digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

        // Store in DB
        await prisma.otpSession.create({
            data: {
                email,
                otp,
                expiresAt,
            },
        });

        // Send email
        const emailRes = await sendOtpEmail(email, otp);

        if (!emailRes.success) {
            return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
        }

        return NextResponse.json({ message: "OTP sent successfully" }, { status: 200 });
    } catch (error) {
        console.error("Send OTP Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
