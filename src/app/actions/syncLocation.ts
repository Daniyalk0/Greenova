"use server";

import { prisma } from "@/lib/prisma";
import { AppLocation } from "@/src/types/next-auth";
import { getServerSession } from "next-auth";
// import { AppLocation } from "@/types/location";

/**
 * Sync user location to DB
 * @param location AppLocation object
 * @returns success status
 */
export async function syncUserLocation(userId: number, location: AppLocation) {
  // const session = await getServerSession();

  if (!userId) {
    // Guest: skip DB write
    return { success: true, message: "Guest location, not stored in DB" };
  }

  // Logged-in user, save actual location
  await prisma.userLocation.upsert({
    where: { userId },
    update: {
      address: location.address,
      lat: location.lat,
      lng: location.lng,
      city: location.city,
      state: location.state,
      pincode: location.pincode,
      label: location.label,
    },
    create: {
      userId: userId,
      address: location.address,
      lat: location.lat,
      lng: location.lng,
      city: location.city,
      state: location.state,
      pincode: location.pincode,
      label: location.label,
    },
  });

  return { success: true, message: "Location synced to DB" };
}

export async function fetchUserLocationFromDB(
  userId: number,
): Promise<AppLocation | null> {
  const location = await prisma.userLocation.findUnique({
    where: { userId },
  });

  if (!location) return null;

  return {
    address: location.address,
    lat: location.lat,
    lng: location.lng,
    city: location.city || undefined,
    state: location.state || undefined,
    pincode: location.pincode ?? undefined,
    label: location.label || undefined,
  };
}
