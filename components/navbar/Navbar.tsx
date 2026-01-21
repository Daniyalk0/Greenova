"use client"
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import LikedDrawer from "../likedProducts/LikedPopup";
import { calcOrderSummary } from "@/lib/calcOrderSummary";
import { useAuthSource } from "@/lib/useAuthSource";
import { useUI } from "@/src/context/ui-context";
import { setLocationToLocalStorage } from "@/lib/localStorageLocation";
import { syncUserLocation } from "@/src/app/actions/syncLocation";
import { setLocation } from "@/src/store/locationSlice";
import { AppLocation } from "@/src/types/next-auth";

const Navbar = () => {
  const [itemCount, setItemCount] = useState<number | null>(10);
  const cartProducts = useSelector((state: RootState) => state.cartProducts.items);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const [isMobileView, setIsMobileView] = useState(false);
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const { isNextAuthUser } = useAuthSource();
    const {total} = calcOrderSummary(cartProducts, isNextAuthUser);
      const { data: session } = useSession();


    const dispatch = useDispatch();
    
      const location = useSelector(
        (state: RootState) => state.location.location
      );
      const { isLocationModalOpen, closeLocationModal, openLocationModal } = useUI();

    
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 640);
    };

    // Run once on mount
    handleResize();

    // Add resize listener
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const handleLocationSelect = async (newLocation: AppLocation) => {
    // Get current location from Redux
    const sessionUserId = session?.user?.id;
  
    // 1️⃣ Check if the new location is identical to the current one
    const isSame =
      location &&
      location.lat === newLocation.lat &&
      location.lng === newLocation.lng;
  
    if (isSame) {
      // Optional: show toast or ignore
      return; // nothing to do
    }
  
    // 2️⃣ Update Redux immediately for UI responsiveness
    dispatch(
      setLocation({
        location: newLocation,
        source: sessionUserId ? "db" : "local",
      })
    );
  
    // 3️⃣ Persist the change
    if (!sessionUserId) {
      // Guest: save to localStorage only
      setLocationToLocalStorage(newLocation);
      return;
    }
  
    // Logged-in user: update DB via server action
    await syncUserLocation(sessionUserId, newLocation);
  };

return (
  <>
    {isMobileView ? (
      <MobileNav itemCount={cartProducts.length} likedItemCount={wishlistItems.length} data={session}  setDrawerOpen={setDrawerOpen} total={total} handleLocationSelect={handleLocationSelect}/>
    ) : (
      <DesktopNav likedItemCount={wishlistItems.length}  itemCount={cartProducts.length} data={session} setDrawerOpen={setDrawerOpen} total={total} handleLocationSelect={handleLocationSelect}/>
    )}

    {/* Always render LikedDrawer */}
    <LikedDrawer isOpen={isDrawerOpen}  onClose={() => setDrawerOpen(false)} />
  </>
);

};

export default Navbar;
