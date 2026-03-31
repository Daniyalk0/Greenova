import { prisma } from "@/lib/prisma";
import { Category, Season } from "@prisma/client";

export async function getProducts({
  category,
  subCategory,
  season,
  limit = 20,
}: {
  category: Category;
  subCategory?: string;
  season?: Season;
  limit?: number;
}) {


 return prisma.product.findMany({
  where: {
    category,
    isActive: true,
    inStock: true,

    ...(subCategory && { subCategory }),

    ...(season && {
      OR: [
        { season },
        { season: Season.ALL },
      ],
    }),
  },
  take: limit,
 orderBy: [
  { rating: "desc" },
  { updatedAt: "desc" },
],

});

}

