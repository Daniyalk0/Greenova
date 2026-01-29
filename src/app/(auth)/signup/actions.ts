'use server';

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signupSchema } from "@/lib/validation";
import { randomUUID } from "crypto";
import { sendVerificationEmail } from "@/lib/email";


export async function registerUser(data: {
  email: string;
  password: string;
  name: string;
}) {
  // 1️⃣ Zod validation
  const parsed = signupSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.errors[0].message);
  }

  const { email, password, name } = parsed.data;

  // 2️⃣ Check duplicate
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("EMAIL_ALREADY_EXISTS");

  // 3️⃣ Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 4️⃣ Create UNVERIFIED user
  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      emailVerified: null,
    },
  });

  // 5️⃣ Create verification token
  const token = randomUUID();

  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
    },
  });

  // 6️⃣ Send verification email
  const verifyUrl = `${process.env.NEXTAUTH_URL}/verify?token=${token}`;

  await sendVerificationEmail(email, verifyUrl);

  return {
    success: true,
    message: "Verification email sent",
  };
}



