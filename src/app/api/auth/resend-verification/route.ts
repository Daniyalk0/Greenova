// POST /api/auth/resend-verification
import { sendVerificationEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
// import { sendVerificationEmail } from "@/lib/mail";

export async function POST(req: Request) {
  const { email } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
  if (user.emailVerified) return new Response(JSON.stringify({ error: "Email already verified" }), { status: 400 });

  // Delete old token if exists
  await prisma.verificationToken.deleteMany({ where: { identifier: email } });

  // Create new token
 const token = randomUUID();
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  await prisma.verificationToken.create({ data: { token, identifier: email, expires } });

  // Send email
  await sendVerificationEmail(email, token);

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
