"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import NavCart from "./NavCart";
import UserMenu from "./UserMenu";
import SearchWithPopup from "./SearchWithPopup";
import NavHeart from "./NavHeart";
import { MapPin, ChevronDown } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LocationModal from "../ui/LocationModel";
import WishlistIndicator from "../ui/WishlistIndicator";
import CartBottomBadge from "../ui/CartIndicator";

export type UserMenuProps = {
  data: any;
  itemCount: number | null;
  likedItemCount: number | null;
  setDrawerOpen: (open: boolean) => void;
  total: number;
};

const DesktopNav = ({
  itemCount,
  likedItemCount,
  data,
  setDrawerOpen,
  total
}: UserMenuProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [locationOpen, setLocationOpen] = useState(false)
  const [location, setLocation] = useState('')
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
              onClick={() => setLocationOpen(true)}
              className="flex flex-col items-start f"
            >
              <span className="text-xs text-gray-500 font-dmsans_light">Delivery to</span>
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold text-gray-900 font-monasans_semibold">
                  Add delivery location
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

            <UserMenu user={data?.user} />
          </div>
        </div>
      </div>
      <LocationModal
        open={locationOpen}
        onClose={() => setLocationOpen(false)}
        onSelect={(loc) => setLocation(loc)}
      />
      <CartBottomBadge itemCount={itemCount || 0} totalPrice={total} />
      
    </nav>
  );
};

export default DesktopNav;
