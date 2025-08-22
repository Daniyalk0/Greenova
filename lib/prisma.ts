import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient().$extends(withAccelerate()) as unknown as PrismaClient;
} else {
  prisma = globalForPrisma.prisma ?? new PrismaClient();
  globalForPrisma.prisma = prisma;
}

export { prisma };
