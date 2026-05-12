"use client";

import { useAddress } from "@/src/context/address-context";
import { useUI } from "@/src/context/ui-context";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";

type CoverageStatus = "limited" | "active" | "unavailable" | "none";

type CoverageConfig = {
  text: string;
  bg: string;
  textColor: string;
  dot: string;
  hoverColor: string;
  pulse?: boolean;
};

export default function CoverageBar() {
  const [mounted, setMounted] = useState(false);

  const { addresses, selectedAddress, guestAddress , loading, error, refreshAddresses} = useAddress();
  const { openAddressListModal, openAddressFormModal } = useUI();
  const { data: session } = useSession();

  const isLoggedIn = !!session?.user?.id;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // 👉 Determine active address
  const activeAddress = selectedAddress || guestAddress || null;

  // 👉 Determine status
  let status: CoverageStatus = "none";

  if (activeAddress?.serviceStatus) {
    status = activeAddress.serviceStatus.toLowerCase() as CoverageStatus;
  }

  if (error) {
  status = "none";
}

  // 👉 Location label
  const location =
    activeAddress?.city || activeAddress?.pincode || "your area";

  const hasAnyAddress = isLoggedIn
    ? addresses.length > 0
    : !!guestAddress;

const handleLocationClick = () => {
  if (loading) return;

  if (error) {
    refreshAddresses();
    return;
  }

  if (!hasAnyAddress) {
    openAddressFormModal();
  } else {
    openAddressListModal();
  }
};
  const shouldHideBar = loading;

const visibilityClass = shouldHideBar
  ? "-translate-y-full opacity-0 max-h-0 pointer-events-none border-transparent"
  : "translate-y-0 opacity-100 max-h-[60px]";

// --- FRESH & ORGANIC COLOR PALETTE ---
// --- ORGANIC MULTI-SHADE GRADIENT PALETTE ---
  const config: Record<CoverageStatus, CoverageConfig> = {
    
    active: {
      text: `Now delivering in ${location}`,
      // Lush Greens (Spinach/Kale): Light green fading into your deep brand green
      bg: "bg-gradient-to-r from-[#22c55e] via-[#0c831f] to-[#065f15] border-b-[#065f15]", 
      textColor: "text-white",
      dot: "bg-white",
      hoverColor: "hover:text-green-100",
      pulse: true,
    },
    limited: {
      text: `Serving limited areas in ${location}`,
      // Ripe Citrus (Mango/Orange): Sunny yellow fading into deep, rich orange
      bg: "bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#d97706] border-b-[#b45309]", 
      textColor: "text-white",
      dot: "bg-white",
      hoverColor: "hover:text-orange-100",
      pulse: true,
    },
    unavailable: {
      text: `Not available in ${location}`,
      // Earthy Roots (Mushroom/Potato): Soft, organic stone-browns blending together
      bg: "bg-gradient-to-r from-[#a8a29e] via-[#78716c] to-[#57534e] border-b-[#44403c]", 
      textColor: "text-white",
      dot: "bg-stone-200",
      hoverColor: "hover:text-stone-200",
    },
    none: {
      text: "Select your delivery location",
      // Crisp Lettuce (Morning Dew): Very pale, refreshing minty greens
      bg: "bg-gradient-to-r from-[#f0fdf4] via-[#dcfce7] to-[#bbf7d0] border-b-[#86efac]", 
      textColor: "text-[#0c831f]", // Deep green text to contrast the pale green background
      dot: "bg-[#0c831f]",
      hoverColor: "hover:text-[#096617]",
    },
  };
  const current = config[status];
  const barText = error
  ? "Unable to verify delivery coverage"
  : current.text;

  return (
 <div
  className={`sticky top-0 w-full overflow-hidden border-b z-[1100] transition-all duration-500 ease-out ${visibilityClass} ${current.bg}`}
>
      {/* 
        Key changes here: 
        1. Removed flex-wrap
        2. Reduced py to make it ribbon-like
        3. Added overflow-hidden to prevent horizontal scrolling
      */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-4 overflow-hidden">
        
        {/* Left (Text & Dot) - Uses flex-1 and min-w-0 to allow truncation! */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-1 min-w-0">
          <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5 flex-shrink-0">
            {current.pulse && (
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full ${current.dot} opacity-50`}
              />
            )}
            <span
              className={`relative inline-flex h-full w-full rounded-full ${current.dot}`}
            />
          </span>

          {/* Added 'truncate' so long city names don't break onto two lines */}
          <p className={`font-dmsans_semibold text-[12px] sm:text-[13.5px] ${current.textColor} truncate`}>
            {barText}
          </p>
        </div>

        {/* Right (Action Button) - Uses flex-shrink-0 so it never gets squished */}
        <button
          onClick={handleLocationClick}
          className={`group flex items-center gap-0.5 sm:gap-1 text-[11px] sm:text-[12.5px] font-dmsans_semibold ${current.textColor} ${current.hoverColor} transition-colors whitespace-nowrap flex-shrink-0 focus:outline-none`}
        >
          <span>
            {hasAnyAddress ? "Change" : "Add Location"}
          </span>
          <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>

      </div>
    </div>
  );
}