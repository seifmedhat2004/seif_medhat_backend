const axios = require("axios");

const sendOTPEmail = async (toEmail, otp, userName) => {
  console.log("Brevo API key exists:", !!process.env.BREVO_API_KEY);

  console.log("Brevo API key length:", process.env.BREVO_API_KEY?.length);
  await axios.post(
    "https://api.brevo.com/v3/smtp/email",
    {
      subject: "Your OTP Code",
      htmlContent: `
        <div style="background:#f5f7fb;padding:24px;font-family:Arial,sans-serif;">
          <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;padding:28px;border:1px solid #e8ecf3;">
            <h2 style="margin:0 0 8px;color:#0b1220;">Seif Medhat</h2>
            <p style="margin:0 0 20px;color:#374151;font-size:14px;">Verification login</p>
            <p style="color:#111827;font-size:15px;line-height:1.6;">Hi ${userName},</p>
            <p style="color:#111827;font-size:15px;line-height:1.6;">Use this one-time password (OTP) to verify your login:</p>
            <div style="margin:20px 0;padding:14px 18px;background:#eef2ff;border:1px dashed #4f46e5;border-radius:10px;display:inline-block;">
              <span style="font-size:30px;letter-spacing:8px;font-weight:700;color:#1f2937;">${otp}</span>
            </div>
            <p style="color:#b91c1c;font-size:14px;margin:4px 0 18px;">This OTP will expire in 5 minutes.</p>
            <p style="color:#6b7280;font-size:13px;line-height:1.6;">
              If you did not request this login verification, you can safely ignore this email.
            </p>
            <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;"/>
            <p style="margin:0;color:#9ca3af;font-size:12px;">© ${new Date().getFullYear()} Seif Medhat. All rights reserved.</p>
          </div>
        </div>
      `,
      sender: {
        name: process.env.BREVO_SENDER_NAME,
        email: process.env.BREVO_SENDER_EMAIL,
      },

      to: [
        {
          email: toEmail,
        },
      ],
    },
    {
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json",
      },
    },
  );
};

module.exports = sendOTPEmail;
