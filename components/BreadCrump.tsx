"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { Home, ChevronRight } from "lucide-react";
import { CATEGORIES } from "./categoriesBar/data";

export default function Breadcrumbs() {
  const pathname = usePathname();

  const segments = pathname?.split("/").filter(Boolean) ?? [];

  if (segments.length === 0) return null;

  const { labelMap, validRoutes } = useMemo(() => {
    const labelMap: Record<string, string> = {
      categories: "Categories",
      fruits: "Fruits",
      vegetables: "Vegetables",
    };

    const validRoutes = new Set<string>();
    
    CATEGORIES.forEach((c) => {
      const parts = c.href.split("/").filter(Boolean);
      const last = parts[parts.length - 1];

      labelMap[last] = c.label;
      validRoutes.add(c.href);
    });
    
    validRoutes.add("/");
    
    return { labelMap, validRoutes };
  }, []);
  
  const formatFallback = (str: string) =>
    str.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  
  const getLabel = (segment: string) =>
    labelMap[segment] || formatFallback(segment);
  if (!pathname || pathname === "/") return null;

  return (
    <div className="w-full bg-white ">
      <nav
        aria-label="Breadcrumb"
        // The classes below ensure it scrolls horizontally on mobile but hides the ugly scrollbar UI
        className="max-w-8xl mx-auto px-0 sm:px-4 py-2.5 sm:py-3.5 flex items-center overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {/* Home Link */}
        <Link
          href="/"
          className="flex items-center gap-1 sm:gap-1.5 text-gray-500 hover:text-[#0c831f] transition-colors font-dmsans_light text-[12px] sm:text-[14px] flex-shrink-0"
        >
          <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 mb-[1px]" />
          <span>Home</span>
        </Link>

        {segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/");
          const isClickable = validRoutes.has(href);
          const isLast = index === segments.length - 1;

          const label = getLabel(decodeURIComponent(segment));

          return (
            <div key={href} className="flex items-center flex-shrink-0">
              {/* Chevron Separator */}
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 mx-1 sm:mx-2.5 text-gray-300" />

              {/* States */}
              {isLast ? (
                // Current page: Pill-shaped badge
                <span className="text-gray-900 font-dmsans_light text-[12px] sm:text-[14px] bg-gray-50 px-2.5 sm:px-3 py-1 rounded-md border border-gray-100 cursor-default">
                  {label}
                </span>
              ) : isClickable ? (
                // Clickable Link
                <Link
                  href={href}
                  className="text-gray-500 hover:text-[#0c831f] font-dmsans_semibold text-[12px] sm:text-[14px] transition-colors"
                >
                  {label}
                </Link>
              ) : (
                // Unclickable / Intermediate Route
                <span className="text-gray-400 font-dmsans_light text-[12px] sm:text-[14px] cursor-default">
                  {label}
                </span>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}