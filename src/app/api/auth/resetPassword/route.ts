import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// ✅ Verify token (GET request)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return Response.json({ valid: false, error: "Token missing" }, { status: 400 });
  }

  const record = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!record || record.expires < new Date()) {
    return Response.json({ valid: false, error: "Invalid or expired token" }, { status: 400 });
  }

  return Response.json({ valid: true });
}

// ✅ Reset password (POST request)
export async function POST(req: Request) {
  const { token, password } = await req.json();

  if (!token || !password) {
    return Response.json({ error: "Token and password required" }, { status: 400 });
  }

  const record = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!record || record.expires < new Date()) {
    return Response.json({ error: "Invalid or expired token" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { email: record.identifier },
    data: { password: hashedPassword },
  });

  // ❗ Delete token so it can't be reused
  await prisma.verificationToken.delete({ where: { token } });

  return Response.json({ message: "Password updated successfully" });
}
