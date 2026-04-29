"use server";

import { prisma } from "@/lib/prisma";
import { supabaseAdmin } from "@/lib/supabaseClient";
// import { supabase } from "@/lib/supabaseClient";
import { authConfig } from "@/src/app/api/auth/[...nextauth]/auth.config";
import { OrderStatus } from "@prisma/client";
// import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
// import { authOptions } from "@/lib/auth";
// import { supabase } from "@/lib/supabase/server";

export async function createProduct(data: any) {
  const session = await getServerSession(authConfig);

  if (!session || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  await prisma.product.create({
    data: {
      ...data,
       availableWeights: data.availableWeights,
      imageUrl: data.imageUrl || "",
    },
  });
}


export async function updateProduct(productId: number, data: any) {
  const session = await getServerSession(authConfig);

  if (!session || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      ...data,
      availableWeights: data.availableWeights,
      imageUrl: data.imageUrl || "",
      updatedAt: new Date(),
    },
  });
}

export async function deleteProduct(productId: number) {
  const session = await getServerSession(authConfig);

  if (!session || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  await prisma.product.delete({
    where: { id: productId },
  });
    revalidatePath("/admin/products");
}


export async function uploadProductImage(file: File) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error } = await supabaseAdmin.storage
    .from("products")
    .upload(filePath, file, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  const { data } = supabaseAdmin.storage
    .from("products")
    .getPublicUrl(filePath);

  return data.publicUrl;
}


export async function deleteUser(id: number) {
  await prisma.user.delete({
    where: { id },
  });

  revalidatePath("/admin/users");
}




// order server actions

export async function updateOrderStatus(
  orderId: number,
  status: OrderStatus
) {
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to update order status:", error);
    return { success: false };
  }
}

// export async function createBanner(data) {
//   // 1. Save to database
//   await prisma.banner.create({
//     data: {
//       title: data.title,
//       subtitle: data.subtitle,
//       imageUrl: data.uploadedImageUrl, // From Cloudinary
//       linkUrl: data.linkUrl,
//       isActive: true,
//       colors: data.colors // JSON object
//     }
//   });

//   // 2. CRUCIAL: Clear the Next.js cache so customers see it immediately!
//   revalidatePath("/");
// }


export type BannerPayload = {
  title: string;
  subtitle?: string;
  badge?: string;
  cta?: string;
  linkUrl?: string;
  price?: string;
  originalPrice?: string;
  discountText?: string;
  imageUrl: string;
};

function toFloat(value?: string | null) {
  if (!value || value.trim() === "") return null;
  const num = parseFloat(value);
  return isNaN(num) ? null : num;
}

// CREATE
export async function createBanner(data: BannerPayload) {
  if (!data.imageUrl) {
    throw new Error("Image is required");
  }

  const banner = await prisma.banner.create({
    data: {
      title: data.title,
      subtitle: data.subtitle,
      badge: data.badge,
      cta: data.cta,
      linkUrl: data.linkUrl,
        price: toFloat(data.price),
    originalPrice: toFloat(data.originalPrice),

      discountText: data.discountText,
      imageUrl: data.imageUrl,
    },
  });

  revalidatePath("/");          // homepage banners
  revalidatePath("/admin");     // admin panel if needed

  return banner;
}

// UPDATE
export async function updateBanner(id: string, data: BannerPayload) {
  if (!id) throw new Error("Banner ID missing");

  const banner = await prisma.banner.update({
    where: { id },
    data: {
      title: data.title,
      subtitle: data.subtitle,
      badge: data.badge,
      cta: data.cta,
      linkUrl: data.linkUrl,
       price: toFloat(data.price),
    originalPrice: toFloat(data.originalPrice),
      discountText: data.discountText,
      imageUrl: data.imageUrl,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin");

  return banner;
}