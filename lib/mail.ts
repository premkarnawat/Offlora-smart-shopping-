import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const sendOtpEmail = async (to: string, otp: string) => {
    try {
        const info = await transporter.sendMail({
            from: `"Offlora Security" <${process.env.SMTP_USER}>`,
            to,
            subject: "Your Offlora Verification Code",
            text: `Your verification code is: ${otp}. It will expire in 5 minutes.`,
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #3E5F44;">Offlora Authentication</h2>
          <p>You requested to sign in. Please use the verification code below:</p>
          <div style="background-color: #F9FAF9; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
            <h1 style="color: #2F2F2F; letter-spacing: 5px; margin: 0;">${otp}</h1>
          </div>
          <p style="color: #666; font-size: 14px;">This code will expire in 5 minutes. If you did not request this, please ignore this email.</p>
        </div>
      `,
        });
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error };
    }
};
