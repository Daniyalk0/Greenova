"use server";

import { prisma } from "@/lib/prisma";

export async function syncLocalCartToSupabase(
  userId: number,
  localCart: any[],
) {
  if (!localCart || localCart.length === 0) return;

  try {
    for (const item of localCart) {
      const createdCart = await prisma.cart.upsert({
        where: {
          userId_productId_weight: {
            userId,
            productId: item.productId || item.id,
            weight: item.weight,
          },
        },
        update: {
          totalPrice: item.totalPrice,
          weight: item.weight,
          updatedAt: new Date(),
        },
        create: {
          userId,
          productId: item.productId || item.id,
          weight: item.weight,
          totalPrice: item.totalPrice,
        },
      });

      console.log("✅ Cart item synced:", createdCart);
    }

    console.log("✅ Local cart synced successfully.");
  } catch (error) {
    console.error("❌ Error syncing cart:", error);
  }
}

export async function getCartItemsFromSupabase(userId: number): Promise<any[]> {
  try {
    if (!userId) throw new Error("Missing User Id");

    const cart = await prisma.cart.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: { product: true }, // ✅ include full product details
    });

    return cart.map((item) => ({
      productId: item.productId,
      weight: item.weight,
      totalPrice: item.totalPrice,
      
      // UI snapshot rebuilt here 👇
      discount: item.product.discount,
      name: item.product.name,
      imageUrl: item.product.imageUrl,
      basePricePerKg: item.product.basePricePerKg,
      inStock: item.product.inStock ?? true,
    }));
  } catch (error) {
    console.error("❌ Error getting cart:", error);
    return [];
  }
}

export async function removeCartItem(
  userId: number,
  productId: number,
  weight: number,
) {
  try {
    // Check if the item exists first
    const existingItem = await prisma.cart.findUnique({
      where: { userId_productId_weight: { userId, productId, weight } },
    });

    if (!existingItem) {
      console.log("⚠️ Cart item not found, nothing to delete.");
      return null; // silently skip or return a message
    }

    // Delete the item safely
    const deletedItem = await prisma.cart.delete({
      where: { userId_productId_weight: { userId, productId, weight } },
    });

    console.log("✅ Cart item removed:", deletedItem);
    return deletedItem;
  } catch (error) {
    console.error("❌ Error removing cart item:", error);
    throw error;
  }
}
