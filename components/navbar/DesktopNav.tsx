"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import NavCart from "./NavCart";
import SearchWithPopup from "./SearchWithPopup";
import NavHeart from "./NavHeart";
import { MapPin, ChevronDown } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LocationModal from "../ui/LocationModel";
import WishlistIndicator from "../ui/WishlistIndicator";
import CartBottomBadge from "../ui/CartIndicator";
import UserProfilePopUp from "./UserProfilePopUp";
import UserMenu from "./UserProfilePopUp";
import Categoriesbar from "../categoriesBar/Categoriesbar";
import { AppLocation } from "@/src/types/next-auth";
import { useDispatch, useSelector } from "react-redux";
import { persistLocation } from "@/lib/persistLocation";
import { setLocation } from "@/src/store/locationSlice";
import { RootState } from "@/src/store/store";
import { setLocationToLocalStorage } from "@/lib/localStorageLocation";
import { syncUserLocation } from "@/src/app/actions/syncLocation";
import { useUI } from "@/src/context/ui-context";

export type UserMenuProps = {
  data: any;
  itemCount: number | null;
  likedItemCount: number | null;
  setDrawerOpen: (open: boolean) => void;
  total: number;
  handleLocationSelect: any;
};

const DesktopNav = ({
  itemCount,
  likedItemCount,
  data,
  setDrawerOpen,
  total,
  handleLocationSelect
}: UserMenuProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [locationOpen, setLocationOpen] = useState(false);
  // const [locationn, setLocationn] = useState<AppLocation | null>(null);
  const dispatch = useDispatch();

  const location = useSelector(
    (state: RootState) => state.location.location
  );
  const { isLocationModalOpen, closeLocationModal, openLocationModal } = useUI();

// const handleLocationSelect = async (newLocation: AppLocation) => {
//   // Get current location from Redux
//   const sessionUserId = session?.user?.id;

//   // 1️⃣ Check if the new location is identical to the current one
//   const isSame =
//     location &&
//     location.lat === newLocation.lat &&
//     location.lng === newLocation.lng;

//   if (isSame) {
//     // Optional: show toast or ignore
//     return; // nothing to do
//   }

//   // 2️⃣ Update Redux immediately for UI responsiveness
//   dispatch(
//     setLocation({
//       location: newLocation,
//       source: sessionUserId ? "db" : "local",
//     })
//   );

//   // 3️⃣ Persist the change
//   if (!sessionUserId) {
//     // Guest: save to localStorage only
//     setLocationToLocalStorage(newLocation);
//     return;
//   }

//   // Logged-in user: update DB via server action
//   await syncUserLocation(sessionUserId, newLocation);
// };


  return (
    <nav className="sticky top-0 z-[2000] bg-white border-b p-2">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-9">
        <div className="flex items-center gap-6 h-16">

          {/* LEFT: Logo + Location */}
          <div className="flex items-center gap-7 min-w-fit">
            <Link href="/" className="flex-shrink-0 mb-3">
              <Image
                src="/logo.png"
                width={120}
                height={40}
                alt="logo"
                className="w-[6.5rem] lg:w-[7.5rem]"
              />
            </Link>

            {/* Location Button */}
            <button
              onClick={openLocationModal}
              className="flex flex-col items-start f"
            >
              <span className="text-xs text-gray-500 font-dmsans_light">Delivery to</span>
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold text-gray-900 font-monasans_semibold truncate max-w-[170px]">
                  {location ? location.address : "Add delivery location"}
                </span>

                <ChevronDown className="w-3 h-3 text-gray-600" />
              </div>
            </button>
          </div>

          {/* CENTER: Search (Wide like Zepto/Blinkit) */}
          <div className="flex-1 max-w-3xl ml-5">
            <SearchWithPopup />
          </div>

          {/* RIGHT: Actions (ml-auto keeps this group at the far right) */}
          <div className="flex items-center gap-5 md:gap-7 min-w-fit ml-auto">
            {/* Wishlist placeholder: fixed width to avoid layout shifts (only search flex-1 can shrink) */}
            <div
              onClick={() => {
                if (!session?.user) {
                  router.push("/login");
                  return;
                }
                setDrawerOpen(true);
              }}
              className="cursor-pointer w-12 flex items-center justify-center flex-shrink-0"
            >
              <WishlistIndicator likedItemCount={likedItemCount} className="" />
            </div>

            <UserMenu />
            {/* <UserProfilePopUp/> */}
          </div>
        </div>
      </div>
      <LocationModal
        open={isLocationModalOpen}
        onClose={closeLocationModal}
        onSelect={handleLocationSelect}
      />

      <CartBottomBadge itemCount={itemCount || 0} totalPrice={total} />
      <Categoriesbar />
    </nav>
  );
};

export default DesktopNav;
