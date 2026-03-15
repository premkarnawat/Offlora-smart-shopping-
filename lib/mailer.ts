import nodemailer from 'nodemailer'

// ─── Gmail SMTP Transporter ───────────────────────────────────────────────────
// Uses your Gmail account directly via App Password (no third-party service).
// Setup instructions are in the README below this file.

function createTransporter() {
  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD

  if (!user || !pass) {
    throw new Error(
      'Missing GMAIL_USER or GMAIL_APP_PASSWORD in environment variables. ' +
      'See .env.example for setup instructions.'
    )
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass, // Gmail App Password (NOT your regular Gmail password)
    },
  })
}

// ─── Contact Form Email ───────────────────────────────────────────────────────

export interface ContactEmailData {
  fromName: string
  fromEmail: string
  subject: string
  message: string
}

export async function sendContactEmail(data: ContactEmailData): Promise<void> {
  const transporter = createTransporter()

  const toEmail = process.env.CONTACT_RECEIVER_EMAIL || process.env.GMAIL_USER!

  // Email received in your inbox
  await transporter.sendMail({
    from: `"Offlora Contact" <${process.env.GMAIL_USER}>`,
    to: toEmail,
    replyTo: `"${data.fromName}" <${data.fromEmail}>`,
    subject: `[Offlora] ${data.subject} — from ${data.fromName}`,
    text: `
New contact form submission from Offlora website
─────────────────────────────────────────────────

Name:    ${data.fromName}
Email:   ${data.fromEmail}
Subject: ${data.subject}

Message:
${data.message}

─────────────────────────────────────────────────
Reply directly to this email to respond to ${data.fromName}.
    `.trim(),
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="margin:0;padding:0;background:#FAF7F0;font-family:'DM Sans',system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF7F0;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width:560px;background:#ffffff;border:1px solid #EDE5D0;">

          <!-- Header -->
          <tr>
            <td style="padding:32px 40px 24px;border-bottom:1px solid #EDE5D0;">
              <p style="margin:0;font-family:Georgia,serif;font-size:22px;letter-spacing:0.14em;color:#1E1B13;">OFFLORA</p>
              <p style="margin:6px 0 0;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#9A8B6F;">New Contact Form Submission</p>
            </td>
          </tr>

          <!-- Sender details -->
          <tr>
            <td style="padding:28px 40px 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom:14px;">
                    <p style="margin:0;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#9A8B6F;">From</p>
                    <p style="margin:4px 0 0;font-size:15px;color:#1E1B13;">${data.fromName}</p>
                    <p style="margin:2px 0 0;font-size:13px;color:#7D7057;">
                      <a href="mailto:${data.fromEmail}" style="color:#7D7057;text-decoration:none;">${data.fromEmail}</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:14px;">
                    <p style="margin:0;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#9A8B6F;">Subject</p>
                    <p style="margin:4px 0 0;font-size:15px;color:#1E1B13;">${data.subject}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #EDE5D0;margin:4px 0 24px;" /></td>
          </tr>

          <!-- Message body -->
          <tr>
            <td style="padding:0 40px 32px;">
              <p style="margin:0;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#9A8B6F;">Message</p>
              <p style="margin:10px 0 0;font-size:14px;line-height:1.75;color:#3D3628;white-space:pre-wrap;">${data.message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
            </td>
          </tr>

          <!-- Reply CTA -->
          <tr>
            <td style="padding:0 40px 32px;">
              <a href="mailto:${data.fromEmail}?subject=Re: ${encodeURIComponent(data.subject)}"
                style="display:inline-block;background:#1E1B13;color:#FAF7F0;padding:12px 24px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;">
                Reply to ${data.fromName}
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;border-top:1px solid #EDE5D0;background:#FAF7F0;">
              <p style="margin:0;font-size:11px;color:#B5A48A;">
                This message was sent via the contact form at offlora.in
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim(),
  })

  // Auto-reply to the person who contacted you
  await transporter.sendMail({
    from: `"Offlora" <${process.env.GMAIL_USER}>`,
    to: `"${data.fromName}" <${data.fromEmail}>`,
    subject: `We received your message — Offlora`,
    text: `
Hi ${data.fromName},

Thank you for reaching out to Offlora. We have received your message and will get back to you within 1–2 business days.

Your message:
"${data.message}"

— The Offlora Team
hello@offlora.in
    `.trim(),
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#FAF7F0;font-family:'DM Sans',system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF7F0;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width:560px;background:#ffffff;border:1px solid #EDE5D0;">
          <tr>
            <td style="padding:32px 40px 24px;border-bottom:1px solid #EDE5D0;">
              <p style="margin:0;font-family:Georgia,serif;font-size:22px;letter-spacing:0.14em;color:#1E1B13;">OFFLORA</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px;">
              <p style="margin:0 0 16px;font-size:15px;color:#1E1B13;">Hi ${data.fromName},</p>
              <p style="margin:0 0 16px;font-size:14px;line-height:1.75;color:#3D3628;">
                Thank you for reaching out to Offlora. We have received your message and will get back to you within <strong>1–2 business days</strong>.
              </p>
              <div style="margin:24px 0;padding:16px 20px;background:#FAF7F0;border-left:2px solid #EDE5D0;">
                <p style="margin:0;font-size:12px;color:#9A8B6F;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:8px;">Your message</p>
                <p style="margin:0;font-size:13px;color:#5C5240;line-height:1.7;white-space:pre-wrap;">${data.message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
              </div>
              <p style="margin:0;font-size:14px;color:#3D3628;">— The Offlora Team</p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 40px;border-top:1px solid #EDE5D0;background:#FAF7F0;">
              <p style="margin:0;font-size:11px;color:#B5A48A;">offlora.in · Discover the Best Products Before You Buy</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim(),
  })
}
