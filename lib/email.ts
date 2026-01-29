import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendVerificationEmail(
  to: string,
  verifyUrl: string
) {
  await transporter.sendMail({
    from: `"Greenova" <${process.env.EMAIL_FROM}>`,
    to,
    subject: "Verify your email",
    html: `
      <div style="font-family: sans-serif">
        <h2>Verify your email</h2>
        <p>Click the link below to verify your account:</p>
        <a href="${verifyUrl}">${verifyUrl}</a>
        <p>This link expires in 1 hour.</p>
      </div>
    `,
  });
}
