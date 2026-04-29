// /app/(admin)/admin/service-area/actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addOrUpdateServiceArea(formData: FormData) {
  const pincode = formData.get("pincode") as string;
  const status = formData.get("status") as "ACTIVE" | "LIMITED" | "UNAVAILABLE";

  if (!pincode || pincode.length !== 6) {
    throw new Error("Invalid pincode");
  }

  await prisma.serviceArea.upsert({
    where: { pincode },
    update: { status },
    create: { pincode, status },
  });

  revalidatePath("/admin/service-area");
}

export async function deleteServiceArea(formData: FormData) {
  const id = Number(formData.get("id"));

  await prisma.serviceArea.delete({
    where: { id },
  });

  revalidatePath("/admin/service-area");
}