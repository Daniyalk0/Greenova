"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORIES } from "./data";
import Image from "next/image";
// import { TOP_CATEGORIES } from "./topCategories";

export default function TopCategoryBar({ showTopActions }: { showTopActions?: boolean; }) {
  const pathname = usePathname();

  return (
    <div
      className={`
    sticky top-[56px] z-[1500] bg-green-200
    transition-all duration-300 ease-in-out

    /* Mobile only */
    ${showTopActions ? "max-h-[120px] opacity-100" : "max-h-0 opacity-0"}

    /* Disable animation + force visible on sm+ */
    sm:max-h-none sm:opacity-100 sm:static

    lg:[mask-image:linear-gradient(to_left,transparent,black_30%)]
    lg:[-webkit-mask-image:linear-gradient(to_left,transparent,black_30%)]
  `}
    >


      <div className="relative">
        {/* Edge fade (mobile) */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-10 bg-gradient-to-r from-green-100 to-transparent sm:hidden" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10 bg-gradient-to-l from-green-100 to-transparent sm:hidden" />


        <div
          className="
        flex items-end overflow-x-auto no-scrollbar
        gap-4 sm:gap-6
        px-4 sm:px-6 md:px-9
        pt-3 sm:pt-2
      "
        >
          {CATEGORIES.map(({ label, href, icon }) => {
            const isActive =
              href === "/"
                ? pathname === "/"
                : pathname.startsWith(href);


            return (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center min-w-fit pb-1 sm:pb-2"
              >
                {/* Icon */}
                <Image
                  src={icon}
                  alt={label}
                  width={24}
                  height={24}
                  className="object-contain sm:w-8 sm:h-8"
                />

                {/* Label */}
                <span
                  className={`
                mt-0.5 sm:mt-1
                text-[10px] sm:text-[11px]
                font-dmsans_semibold whitespace-nowrap
                ${isActive ? "text-black" : "text-gray-700"}
              `}
                >
                  {label}
                </span>

                {/* Active underline */}
                <span
                  className={`
                mt-0.5 sm:mt-1
                h-[2px] w-full rounded-full transition
                ${isActive ? "bg-black" : "bg-transparent"}
              `}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>

  );
}
