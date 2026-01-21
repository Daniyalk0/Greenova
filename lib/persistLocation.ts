import { AppLocation } from "@/src/types/next-auth";
import { saveLocationToLocalStorage } from "./localStorageLocation";
import { syncUserLocation } from "@/src/app/actions/syncLocation";

/**
 * Persist location intelligently:
 * - Guest → save to localStorage
 * - Logged-in → save to DB only
 */
export async function persistLocation(
  location: AppLocation | null,
  userId?: number
) {
    console.log(userId, typeof(userId));
    
  if (!location) return; // No location → do nothing

if (userId) {
    await syncUserLocation(userId, location);
    return;
  }

  // Guest → localStorage only
  saveLocationToLocalStorage(location);

}
