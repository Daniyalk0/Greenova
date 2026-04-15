"use server";

import { prisma } from "@/lib/prisma";

export async function searchProducts(keyword: string) {
  // 1. If empty, maybe return top 4 featured products
  if (!keyword || keyword.trim() === "") {
    return await prisma.product.findMany({
      take: 4,
      orderBy: { createdAt: "desc" }, // Or however you define "Featured"
    });
  }

  // 2. Search database efficiently (Only return max 6 results)
  const results = await prisma.product.findMany({
    where: {
      name: {
        contains: keyword,
        mode: "insensitive", // Ignore uppercase/lowercase
      },
    },
    take: 6, 
  });

  return results;
}