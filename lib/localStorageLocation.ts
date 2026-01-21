// import { AppLocation } from "@/types/location";

import { AppLocation } from "@/src/types/next-auth";

const STORAGE_KEY = "userLocation";

/**
 * Save location to localStorage
 * @param location - AppLocation object or string "SKIPPED"
 */
export function saveLocationToLocalStorage(location: AppLocation | "SKIPPED") {
  if (typeof window === "undefined") return; // SSR safety

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(location));
  } catch (err) {
    console.error("Failed to save location to localStorage:", err);
  }
}

/**
 * Retrieve location from localStorage
 * @returns AppLocation object or null
 */
export function getLocationFromLocalStorage(): AppLocation | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch (err) {
    console.error("Failed to read location from localStorage:", err);
    return null;
  }
}

/**
 * Remove location from localStorage
 */
export function removeLocationFromLocalStorage() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

export function setLocationToLocalStorage(location: AppLocation) {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(location));
  } catch (err) {
    console.error("Failed to save location to localStorage:", err);
  }
}

