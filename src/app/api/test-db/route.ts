import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return Response.json({ status: "DB Connected ✅" });
  } catch (err) {
    console.error(err);
    return Response.json({ status: "DB Failed ❌", error: err.message });
  }
}
