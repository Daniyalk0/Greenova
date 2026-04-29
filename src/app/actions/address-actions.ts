"use server";

import { prisma } from "@/lib/prisma";
// import { auth } from "@/auth"
import { revalidatePath } from "next/cache";
import { authConfig } from "../api/auth/[...nextauth]/auth.config";
import { getServerSession } from "next-auth";
import { ZodNumber } from "zod";

export async function createAddress(data: any) {
  const session = await getServerSession(authConfig);
  if (!session?.user?.id) throw new Error("Unauthorized");
//   const area = await prisma.serviceArea.findUnique({
//   where: { pincode: data.pincode },
// });

// const mapStatus = (s?: string): "ACTIVE" | "LIMITED" | "UNAVAILABLE" => {
//   if (!s) return "UNAVAILABLE";
//   const v = s.toUpperCase();
//   if (v === "ACTIVE" || v === "LIMITED" || v === "UNAVAILABLE") return v;
//   return "UNAVAILABLE";
// };

// const serviceStatus = mapStatus(area?.status);

  const address = await prisma.address.create({
    data: {
      userId: session.user.id,
      name: data.name,
      phone: data.phone,
      street: data.street,
      city: data.city,
      state: data.state,
      pincode: data.pincode,
      landmark: data.landmark,
      // serviceStatus
    },
  });

  revalidatePath("/");

  revalidatePath("/checkout");
  return address;
}

export async function updateAddress(id: number, data: any) {
  const session = await getServerSession(authConfig);
  if (!session?.user?.id) throw new Error("Unauthorized");

//     const area = await prisma.serviceArea.findUnique({
//   where: { pincode: data.pincode },
// });
// const mapStatus = (s?: string): "ACTIVE" | "LIMITED" | "UNAVAILABLE" => {
//   if (!s) return "UNAVAILABLE";
//   const v = s.toUpperCase();
//   if (v === "ACTIVE" || v === "LIMITED" || v === "UNAVAILABLE") return v;
//   return "UNAVAILABLE";
// };

// const serviceStatus = mapStatus(area?.status);


  const updatedAddress = await prisma.address.update({
    where: { id },
    data: {
      ...data,
      // serviceStatus
    },
  });
  revalidatePath("/");
  revalidatePath("/checkout");
  return updatedAddress
}

export async function deleteAddress(id: number) {
  await prisma?.address?.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/checkout");
}

export async function getUserAddresses() {
  const session = await getServerSession(authConfig);

  if (!session?.user?.id) return [];

  

  const addresses = await prisma?.address?.findMany({
    where: {
      userId: Number(session.user.id),
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const pincodes = [...new Set(addresses.map((a) => a.pincode))];

  const serviceAreas = await prisma.serviceArea.findMany({
    where: {
      pincode: { in: pincodes },
    },
  });

  const serviceMap = new Map(
    serviceAreas.map((a) => [a.pincode, a.status])
  );


   return addresses.map((addr) => ({
    ...addr,
    serviceStatus: serviceMap.get(addr.pincode) || "UNAVAILABLE",
  }));
}
