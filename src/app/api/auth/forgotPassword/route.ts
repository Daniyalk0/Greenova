import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/sendEmail";
import { randomBytes } from "crypto";
// import { sendEmail } from "@/lib/sendEmail"; // your email sending util
import { addMinutes } from "date-fns";

export async function POST(req: Request) {
  const { email } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return Response.json({ message: "If that email exists, a reset link has been sent." });
  }

  const token = randomBytes(32).toString("hex");
  const expires = addMinutes(new Date(), 15); // 15 min validity

  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  });

  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

  await sendEmail(email, "Password Reset", `Click here to reset: ${resetLink}`);

  return Response.json({ message: "Reset link sent." });
}
