"use server"

import { prisma } from "@/lib/prisma"
// import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import { authConfig } from "../api/auth/[...nextauth]/auth.config"
import { getServerSession } from "next-auth"
import { ZodNumber } from "zod"

export async function createAddress(data: any) {


  const session = await getServerSession(authConfig)
  if (!session?.user?.id) throw new Error("Unauthorized")

  await prisma.address.create({
    data: {
      userId: session.user.id,
      name: data.name,
      phone: data.phone,
      street: data.street,
      city: data.city,
      state: data.state,
      pincode: data.pincode,
      landmark: data.landmark
    }
  })
revalidatePath("/")

  revalidatePath("/checkout")
}

export async function updateAddress(id: string, data: any) {

 const session = await getServerSession(authConfig)
  if (!session?.user?.id) throw new Error("Unauthorized")

  await prisma.address.update({
    where: { id: parseInt(id) },
    data
  })
revalidatePath("/")
  revalidatePath("/checkout")
}

export async function deleteAddress(id: number) {

  await prisma?.address?.delete({
    where: { id }
  })

  revalidatePath("/")
  revalidatePath("/checkout")
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


  return addresses;
}