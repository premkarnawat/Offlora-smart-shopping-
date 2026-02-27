import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import { signToken } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }

        // Find admin user
        const { data: admin, error } = await supabase
            .from('Admin')
            .select('*')
            .eq('email', email)
            .single();

        if (error || !admin) {
            // Return generic error to prevent email enumeration
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);

        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Generate JWT payload with 'ADMIN' role
        const token = signToken({
            userId: admin.id,
            email: admin.email,
            role: admin.role
        });

        // Set HTTP-only admin session cookie
        cookies().set("admin_session", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60, // 1 day
            path: "/",
        });

        return NextResponse.json({ message: "Login successful" }, { status: 200 });
    } catch (error) {
        console.error("Admin Login Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
