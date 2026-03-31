import { prisma } from "@/lib/prisma";

async function getByCategory(category: "FRUITS" | "VEGETABLES", limit: number) {
  // 1. Get featured products first
  const featured = await prisma?.product?.findMany({
    where: {
      category,
      isFeatured: true,
      isActive: true,
      inStock: true,
    },
    orderBy: { updatedAt: "desc" },
    take: limit,
  });

  if (featured.length === limit) return featured;

  // 2. Auto-fill remaining slots
  const remaining = limit - featured.length;

  const fallback = await prisma.product.findMany({
    where: {
      category,
      isActive: true,
      inStock: true,
      id: { notIn: featured.map(p => p.id) },
    },
    orderBy: [
      { rating: "desc" },
      { createdAt: "desc" },
    ],
    take: remaining,
  });

  return [...featured, ...fallback];
}


function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getSeasonalProducts() {
   await sleep(8000);
  const [fruits, vegetables] = await Promise.all([
    getByCategory("FRUITS", 5),
    getByCategory("VEGETABLES", 5),
  ]);

  return { fruits, vegetables };
}
