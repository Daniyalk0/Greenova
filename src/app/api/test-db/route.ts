import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return Response.json({ status: "DB Connected ✅" });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      return Response.json({ status: "DB Failed ❌", error: err.message });
    }
    return Response.json({ status: "DB Failed ❌", error: String(err) });
  }
}
