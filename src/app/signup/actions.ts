'use server';

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signupSchema } from "@/lib/validation";

export async function registerUser(data: { email: string; password: string; name: string }) {
  // ✅ Validate using Zod
  const parsed = signupSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.errors[0].message); // return first validation error
  }

  const { email, password, name } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("EMAIL_ALREADY_EXISTS");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password: hashedPassword, name },
  });

  return { success: true, user };
}
