"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import NavCart from "./NavCart";
import SearchWithPopup from "./SearchWithPopup";
import NavHeart from "./NavHeart";
import { MapPin, ChevronDown } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import WishlistIndicator from "../ui/WishlistIndicator";
import CartBottomBadge from "../ui/CartIndicator";
import UserMenu from "./UserProfilePopUp";
import Categoriesbar from "../categoriesBar/Categoriesbar";
import { useUI } from "@/src/context/ui-context";
import { Address, useAddress } from "@/src/context/address-context";
import { getGuestAddress } from "@/lib/clientAddress";

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


}: UserMenuProps) => {
  const { data: session } = useSession();
  const router = useRouter();


  

  const { openAddressListModal, openAddressFormModal } = useUI();
  const { addresses, selectedAddress, guestAddress, error, loading } = useAddress();
   console.log(selectedAddress)

// const [guestAddress, setGuestAddress] = useState(() =>
//   !session?.user?.id ? getGuestAddress() : null
// );

  const isLoggedIn = !!session?.user?.id;

  // ✅ keep guest address in sync
  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     setGuestAddress(getGuestAddress());
  //   } else {
  //     setGuestAddress(null);
  //   }
  // }, [isLoggedIn]);

  // ✅ final address source
  const finalAddress = isLoggedIn ? selectedAddress : guestAddress;

  // console.log("finalAddress", finalAddress);
  

  // ✅ normalize for button logic
  const addressList = isLoggedIn
    ? addresses
    : guestAddress
    ? [{ ...guestAddress, id: -1 }]
    : [];

  const pathname = usePathname();

  const hideOnRoutes = [
    "/cart",
    "/checkout",
    "/order-success",
    "/orders",
    "/login",
    "/signup",
    "/profile",
  ];

  const shouldShowCategories = !hideOnRoutes.some((route) =>
    pathname.startsWith(route)
  );

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
       {loading ? (
  /* Loading Skeleton */
  <div className="flex flex-col items-start animate-pulse">
    <div className="h-3 w-16 rounded bg-gray-200 mb-2" />

    <div className="flex items-center gap-2">
      <div className="h-4 w-32 rounded bg-gray-300" />
      <div className="w-3 h-3 rounded-full bg-gray-200" />
    </div>
  </div>
) : (
  <button
    onClick={() => {
      if (addressList.length === 0) {
        openAddressFormModal();
      } else {
        openAddressListModal();
      }
    }}
    className="flex flex-col items-start"
  >
    <span className="text-xs text-gray-500 font-dmsans_light">
      Delivery to
    </span>

    <div className="flex items-center gap-1">
      <span className="text-sm font-semibold text-gray-900 font-monasans_semibold truncate max-w-[170px]">
        {error
          ? "Location unavailable"
          : finalAddress
          ? `${finalAddress.city}, ${finalAddress.state}`
          : "Add delivery location"}
      </span>

      {!error && (
        <ChevronDown className="w-3 h-3 text-gray-600" />
      )}
    </div>

    {/* Optional helper text */}
    {error && (
      <span className="text-[11px] text-red-500 mt-0.5 font-dmsans_medium">
        Tap to retry
      </span>
    )}
  </button>
)}
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
      {/* <LocationModal
        open={isLocationModalOpen}
        onClose={closeLocationModal}
        onSelect={handleLocationSelect}
      /> */}

      <CartBottomBadge itemCount={itemCount || 0} totalPrice={total} />
      {shouldShowCategories && <Categoriesbar />}
    </nav>
  );
};

export default DesktopNav;
