"use server";

import { prisma } from "@/lib/prisma";

export async function restoreCartItem(
  userId: number,
  item: { productId: number; weight: number; totalPrice: number }
) {
  try {
    // ✅ Upsert ensures no duplicates if somehow item already exists
    await prisma.cart.upsert({
      where: {
        userId_productId_weight: {
          userId,
          productId: item.productId,
          weight: item.weight,
        },
      },
      create: {
        userId,
        productId: item.productId,
        weight: item.weight,
        totalPrice: item.totalPrice,
      },
      update: {
        totalPrice: item.totalPrice, // refresh price just in case
      },
    });
  } catch (error) {
    console.error("❌ Failed to restore cart item:", error);
    throw error;
  }
}
