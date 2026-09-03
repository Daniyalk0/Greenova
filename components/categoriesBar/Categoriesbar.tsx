"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORIES } from "./data";
import Image from "next/image";
import { motion } from "framer-motion";

export default function TopCategoryBar() {
  const pathname = usePathname();

  return (
    <nav className="relative z-30 -translate-y-1/2 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Main Bar Container */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-100  p-2 shadow-[0_20px_50px_rgba(0,0,0,0.05)] backdrop-blur-xl sm:rounded-3xl sm:p-4">
          
          {/* Mobile Edge Gradients */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-white to-transparent sm:hidden" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-white to-transparent sm:hidden" />

          {/* Categories List */}
          <div className="no-scrollbar flex items-center justify-between overflow-x-auto px-2 sm:px-4">
            <div className="flex min-w-full items-center justify-between gap-2 sm:gap-8">
              {CATEGORIES.map(({ label, href, icon }) => {
                const isActive =
                  href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(href);

                return (
                  <Link
                    key={href}
                    href={href}
                    className="group relative flex flex-col items-center gap-2 px-3 py-2 transition-all"
                  >
                    {/* Icon Container with active/hover lift */}
                    <div className={`
                      relative flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300
                      sm:h-16 sm:w-16
                      ${isActive 
                        ? "bg-green-100/80 shadow-inner" 
                        : "bg-slate-50 group-hover:bg-green-50 group-hover:scale-105"
                      }
                    `}>
                      <Image
                        src={icon}
                        alt={label}
                        width={32}
                        height={32}
                        className={`object-contain transition-transform duration-300 sm:w-10 sm:h-10 ${isActive ? "scale-110" : "grayscale-[0.5] group-hover:grayscale-0"}`}
                      />
                    </div>

                    {/* Label */}
                    <span className={`
                      text-[8px] font-dmsans_italic_light tracking-tight sm:text-[10px]
                      ${isActive ? "text-slate-900" : "text-slate-500 group-hover:text-green-700"}
                    `}>
                      {label}
                    </span>

                    {/* Active Indicator (Dot) */}
                    {isActive && (
                      <motion.div
                        layoutId="activeCategory"
                        className="absolute -bottom-1 h-1.5 w-1.5 rounded-full bg-green-600 shadow-[0_0_8px_#16a34a]"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}