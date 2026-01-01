// src/lib/products.ts
// import { prisma } from "@/src/lib/prisma";

import { prisma } from "./prisma";

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
  });
}
