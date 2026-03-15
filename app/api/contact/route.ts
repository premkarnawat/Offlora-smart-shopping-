import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail } from '@/lib/mailer'

// Simple in-memory rate limiting — max 3 submissions per IP per hour
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 })
    return true // allowed
  }

  if (entry.count >= 3) return false // blocked

  entry.count++
  return true // allowed
}

export async function POST(req: NextRequest) {
  try {
    // Rate limit by IP
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown'

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please wait an hour before trying again.' },
        { status: 429 }
      )
    }

    const body = await req.json()
    const { name, email, subject, message } = body

    // Validation
    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      )
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    // Length guards
    if (name.length > 100 || subject.length > 200 || message.length > 5000) {
      return NextResponse.json(
        { error: 'Input too long.' },
        { status: 400 }
      )
    }

    // Send email via Gmail SMTP
    await sendContactEmail({
      fromName: name.trim(),
      fromEmail: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Contact email error:', error)

    // Friendly error for missing config
    if (error.message?.includes('GMAIL_USER') || error.message?.includes('GMAIL_APP_PASSWORD')) {
      return NextResponse.json(
        { error: 'Email service not configured. Please contact us directly.' },
        { status: 503 }
      )
    }

    // Gmail auth failure
    if (error.code === 'EAUTH' || error.responseCode === 535) {
      return NextResponse.json(
        { error: 'Email delivery failed. Please try again or contact us directly.' },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}
