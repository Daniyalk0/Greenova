import { fetchUserLocationFromDB } from "@/src/app/actions/syncLocation";
import { getLocationFromLocalStorage } from "./localStorageLocation";
import { AppLocation } from "@/src/types/next-auth";

export async function getSavedLocation(
  userId?: number
): Promise<AppLocation | null> {
  if (userId) {
    // Logged-in user → fetch from DB
    const location = await fetchUserLocationFromDB(userId);
    if (location) return location;
  }

  // Guest or fallback → fetch from localStorage
  const local = getLocationFromLocalStorage();
  return local || null;
}
