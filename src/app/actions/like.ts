"use server"
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authConfig } from "../api/auth/[...nextauth]/auth.config";

export async function addToWishlist(userId: number, productId: number) {
  if (!userId) {
    console.warn("❌ User must be logged in to add to wishlist.");
    return;
  }

  try {
    const wishlistItem = await prisma.wishlist.upsert({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
      update: {},
      create: {
        userId,
        productId,
      },
    });

    console.log("✅ Product added to wishlist:", wishlistItem);
    return wishlistItem;
  } catch (error) {
    console.error("❌ Error adding to wishlist:", error);
  }
}


export async function removeWishlistItem(productId: number) {
  const session = await getServerSession(authConfig);

  if (!session?.user?.id) {
    throw new Error("User must be logged in.");
  }

  const userId = Number(session.user.id); // make sure it's a number

  try {
    const deleted = await prisma.wishlist.delete({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    return deleted; // optional
  } catch (error) {
    console.error("❌ Error removing wishlist item:", error);
    throw new Error("Failed to remove wishlist item.");
  }
}
