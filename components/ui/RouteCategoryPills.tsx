"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

type Tab = {
  id: string;
  label: string;
  path: string;
};

const ROUTE_TABS: Tab[] = [
  { id: "freshFruits", label: "Fresh Fruits", path: "/categories/freshFruits" },
  { id: "organicVegetables", label: "Organic Vegetables", path: "/categories/organicVegetables" },
  { id: "herbs", label: "Herbs", path: "/categories/herbs" },
  { id: "seasonalFruits", label: "Seasonal Fruits", path: "/categories/seasonalFruits" },
  { id: "seasonalVegetables", label: "Seasonal Vegetables", path: "/categories/seasonalVegetables" },
  { id: "exoticFruits", label: "Exotic Fruits", path: "/categories/exoticFruits" },
  { id: "dryFruits", label: "Dry Fruits", path: "/categories/dryFruits" },
  { id: "rootVegetables", label: "Root Vegetables", path: "/categories/rootVegetables" },
];

const RouteCategoryPills = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Use a type-safe ref object mapping tab.id => HTMLButtonElement
  const pillRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const activeTab = ROUTE_TABS.find((t) => pathname.includes(t.id));

    if (activeTab) {
      const el = pillRefs.current[activeTab.id];
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }
  }, [pathname]);

  return (
   <div className="relative w-full">
  {/* Scrollable Pills */}
  <div className="overflow-x-auto p-3 no-scrollbar relative z-10">
    <div className="flex gap-3 min-w-max font-monasans_semibold">
      {ROUTE_TABS.map((tab) => {
        const isActive = pathname.includes(tab.id);

        return (
          <button
            key={tab.id}
            ref={(el: HTMLButtonElement | null) => {
              pillRefs.current[tab.id] = el;
            }}
            onClick={() => router.push(tab.path)}
            className={`whitespace-nowrap px-4 py-2 rounded-full border text-sm font-medium transition-all 
              ${isActive
                ? "bg-green-600 text-white border-green-600 shadow-md scale-105"
                : "bg-white text-gray-700 border-gray-300 hover:bg-green-100"
              }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  </div>

  {/* Left Fade */}
  <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-white to-transparent z-20" />

  {/* Right Fade */}
  <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white to-transparent z-20" />
</div>

  );
};

export default RouteCategoryPills;

