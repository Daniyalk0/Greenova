import { unstable_cache } from "next/cache";
import { getProducts } from "./products";
import { Category, Season } from "@prisma/client";

export async function getCachedProducts({
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
  return unstable_cache(
    () =>
      getProducts({
        category,
        subCategory,
        season,
        limit,
      }),
    [
      `products-${category}-${subCategory ?? "all"}-${season ?? "all"}-${limit}`,
    ],
    {
      tags: [
        "products",
        `category-${category}`,
      ],
      revalidate: 300,
    }
  )();
}