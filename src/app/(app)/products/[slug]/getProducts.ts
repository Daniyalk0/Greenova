import { cache } from "react";
import { prisma } from "@/lib/prisma";

export const getProduct = cache(async (slug: string) => {
  return prisma.product.findUnique({
    where: { slug },
  });
});