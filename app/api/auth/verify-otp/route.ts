import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const { email, otp } = await req.json();

        if (!email || !otp) {
            return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 });
        }

        // Find valid OTP session
        const { data: sessions, error: sessionError } = await supabase
            .from('OtpSession')
            .select('*')
            .eq('email', email)
            .eq('otp', otp)
            .eq('verified', false)
            .gt('expiresAt', new Date().toISOString())
            .order('expiresAt', { ascending: false })
            .limit(1);

        if (sessionError || !sessions || sessions.length === 0) {
            return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
        }

        const session = sessions[0];

        // Mark verified
        await supabase
            .from('OtpSession')
            .update({ verified: true })
            .eq('id', session.id);

        // Find or create user
        let { data: user } = await supabase
            .from('User')
            .select('*')
            .eq('email', email)
            .single();

        if (!user) {
            const { data: newUser, error: createError } = await supabase
                .from('User')
                .insert({ email })
                .select()
                .single();

            if (createError) throw createError;
            user = newUser;
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
