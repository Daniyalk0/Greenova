"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
// import { setLocation, clearLocation } from "@/store/locationSlice";
import {
  getLocationFromLocalStorage,
  removeLocationFromLocalStorage,
  setLocationToLocalStorage,
} from "@/lib/localStorageLocation";
import { fetchUserLocationFromDB, syncUserLocation } from "@/src/app/actions/syncLocation";
import { setLocation } from "@/src/store/locationSlice";
// import { fetchUserLocationFromDB, syncUserLocation } from "../app/actions/syncLocation";

export default function LocationProvider({ children }: any) {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "loading") return;

    // -------------------------
    // Guest user → load from localStorage
    // -------------------------
    if (!session?.user?.id) {
      const localLocation = getLocationFromLocalStorage();
      dispatch(
        setLocation({
          location: localLocation,
          source: localLocation ? "local" : null,
        })
      );
      return;
    }

    // -------------------------
    // Authenticated user → handle DB + localStorage sync
    // -------------------------
    const initLocation = async () => {
      const localLocation = getLocationFromLocalStorage();
      const dbLocation = await fetchUserLocationFromDB(session.user.id);

      if (localLocation && !dbLocation) {
        // Guest picked a location, DB empty → sync to DB
        await syncUserLocation(session.user.id, localLocation);
        removeLocationFromLocalStorage();

        dispatch(
          setLocation({
            location: localLocation,
            source: "db",
          })
        );
      } else if (dbLocation) {
        // DB exists → always use DB
        dispatch(
          setLocation({
            location: dbLocation,
            source: "db",
          })
        );

        // Optional cleanup: remove localStorage if any
        if (localLocation) removeLocationFromLocalStorage();
      } else {
        // Neither DB nor local → null state
        dispatch(
          setLocation({
            location: null,
            source: null,
          })
        );
      }
    };

    initLocation();
  }, [status, session?.user?.id, dispatch]);

  return children;
}
