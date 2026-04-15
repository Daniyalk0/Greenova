"use server"
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authConfig } from "../api/auth/[...nextauth]/auth.config";

export async function addToWishlistDB(userId: number, productId: number) {
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


export async function removeWishlistItemDB(productId: number) {
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
      // 👈 Add this to fetch the product name from the Product table
      include: {
        product: {
          select: {
            name: true,
          },
        },
      },
    });

    return deleted; // optional
  } catch (error) {
    console.error("❌ Error removing wishlist item:", error);
    throw new Error("Failed to remove wishlist item.");
  }
}


export async function getWishlistDB(userId: number) {
  if (!userId) {
    console.warn("❌ User must be logged in to fetch wishlist.");
    return [];
  }

  try {
    const wishlist = await prisma.wishlist.findMany({
      where: { userId },
      include: {
        product: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // 🔥 FIX: serialize Dates
    const serializedWishlist = wishlist.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
      // updatedAt: item.updatedAt?.toISOString(),
      product: item.product
        ? {
            ...item.product,
            createdAt: item.product.createdAt?.toISOString?.(),
            updatedAt: item.product.updatedAt?.toISOString?.(),
          }
        : null,
    }));

    console.log("✅ Wishlist fetched:", serializedWishlist.length);

    return serializedWishlist;
  } catch (error) {
    console.error("❌ Error fetching wishlist:", error);
    return [];
  }
}
