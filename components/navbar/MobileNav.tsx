"use client";

import SearchWithPopup from "./SearchWithPopup";
import { ChevronDown, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import CartBottomBadge from "../ui/CartIndicator";
import { UserMenuProps } from "./DesktopNav";
import UserMenu from "./UserProfilePopUp";
import { useUI } from "@/src/context/ui-context";
import { useAddress } from "@/src/context/address-context";
// import CartBottomBadge from "../ui/WishlistIndicator";

const MobileNav = ({ likedItemCount, itemCount, data, setDrawerOpen, total, handleLocationSelect }: UserMenuProps) => {
    const { data: session } = useSession();
    const router = useRouter();
    const { openAddressListModal, openAddressFormModal } = useUI();
const { addresses, selectedAddress, guestAddress, error, loading } = useAddress();

const isLoggedIn = !!session?.user?.id;

const finalAddress = isLoggedIn ? selectedAddress : guestAddress;

const addressList = isLoggedIn
  ? addresses
  : guestAddress
  ? [{ ...guestAddress, id: -1 }]
  : [];

    return (
        <div className="sticky top-0 z-[2000] bg-white sm:hidden border-2 ">
            {/* Top Bar */}
            <div className="flex items-center gap-2 px-3 py-3">
                {/* Location */}
                {loading ? (
                  /* Loading Skeleton */
                  <div className="flex min-w-0 flex-1 flex-col items-start animate-pulse">
                    <div className="h-3 w-16 rounded bg-gray-200 mb-2" />
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-32 max-w-full rounded bg-gray-300" />
                      <div className="w-3 h-3 rounded-full bg-gray-200" />
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (addressList.length === 0) {
                        openAddressFormModal();
                      } else {
                        openAddressListModal();
                      }
                    }}
                    className="flex min-w-0 flex-1 flex-col items-start"
                  >
                    <span className="text-xs text-gray-500">Delivery to</span>
                    <div className="flex min-w-0 max-w-full items-center gap-1">
                      <span className="max-w-full truncate text-left text-sm font-semibold text-gray-900 font-monasans_semibold">
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

                <div className="flex flex-shrink-0 items-center gap-0 mr-2">
                  <SearchWithPopup iconOnlyTrigger />

                  <button
                    type="button"
                    aria-label="Open wishlist"
                    onClick={() => {
                      if (!session?.user) {
                        router.push("/login");
                        return;
                      }
                      setDrawerOpen(true);
                    }}
                    className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-gray-700 transition-colors hover:bg-gray-100"
                  >
                    <Heart className="h-5 w-5" />
                    {(likedItemCount ?? 0) > 0 && (
                      <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-green-800 px-1 text-[10px] text-white">
                        {likedItemCount ?? 0}
                      </span>
                    )}
                  </button>
                </div>

                {/* User */}
                <UserMenu />
            </div>

            <CartBottomBadge itemCount={itemCount || 0} totalPrice={total} />
            {/* {shouldShowCategories && <Categoriesbar showTopActions={showTopActions} />} */}
        </div>
    );
};

export default MobileNav;
