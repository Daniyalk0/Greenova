"use client";

import Link from "next/link";
import SearchWithPopup from "./SearchWithPopup";
import { ChevronDown, UserIcon } from "lucide-react";
import WishlistIndicator from "../ui/WishlistIndicator";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import LocationModel from "../ui/LocationModel";
import LocationModal from "../ui/LocationModel";
import CartTagIndicator from "../ui/CartIndicator";
import CartBottomBadge from "../ui/CartIndicator";
import { UserMenuProps } from "./DesktopNav";
import UserMenu from "./UserProfilePopUp";
import Categoriesbar from "../categoriesBar/Categoriesbar";
// import CartBottomBadge from "../ui/WishlistIndicator";

const MobileNav = ({ likedItemCount, itemCount, data, setDrawerOpen, total }: UserMenuProps) => {
    const { data: session } = useSession();
    const router = useRouter();
    const [locationOpen, setLocationOpen] = useState(false)
    const [location, setLocation] = useState('')


    const [showTopActions, setShowTopActions] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            // only apply on mobile
            if (window.innerWidth >= 640) {
                setShowTopActions(true);
                return;
            }

            // show only when user is near top
            setShowTopActions(window.scrollY < 20);
        };

        handleScroll(); // initial check
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <div className="sticky top-0 z-[2000] bg-white sm:hidden border-2 ">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 py-3">
                {/* Location */}
                <button
                    onClick={() => setLocationOpen(true)}
                    className="flex flex-col items-start"
                >
                    <span className="text-xs text-gray-500">Delivery to</span>
                    <div className="flex items-center gap-1">
                        <span className="text-sm font-semibold text-gray-900">
                            Add delivery location
                        </span>
                        <ChevronDown className="w-3 h-3 text-gray-600" />
                    </div>
                </button>


                {/* User */}
             <UserMenu />
            </div>

            {/* Floating Search */}
            <div
                className={`
                 overflow-hidden transition-all duration-300 ease-out
                 ${showTopActions
                        ? "max-h-[120px] opacity-100"
                        : "max-h-0 opacity-0"}
  `}
            >
                <div className="flex items-center gap-2 px-4 pb-3">
                    <div className="flex-1">
                        <SearchWithPopup />
                    </div>

                    <div
                        onClick={() => {
                            if (!session?.user) {
                                router.push("/login");
                                return;
                            }
                            setDrawerOpen(true);
                        }}
                        className="cursor-pointer"
                    >
                        <WishlistIndicator likedItemCount={likedItemCount} />
                    </div>
                </div>
            </div>


            <LocationModal
                open={locationOpen}
                onClose={() => setLocationOpen(false)}
                onSelect={(loc) => setLocation(loc)}
            />
            <CartBottomBadge itemCount={itemCount || 0} totalPrice={total}  />
            <Categoriesbar showTopActions={showTopActions}/>
        </div>
    );
};

export default MobileNav;
