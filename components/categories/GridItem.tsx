"use client";

import { ArrowRight } from "lucide-react";
import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

const GridItem = ({ cat }: any) => {
  const controlsMain = useAnimation();
  const controlsSecond = useAnimation();
  const [cardHover, setCardHover] = useState(false);
  const router = useRouter();


  return (
    <div
      onClick={() => router.push(`/categories/${cat.route}`)}
      className={`
        relative cursor-pointer overflow-hidden
        rounded-3xl
        ${cat.height}
      `}
    >
      {/* Image wrapper MUST be relative + full height */}
      <div className="relative w-full h-full rounded-3xl">
        <Image
          src={`/categoriesImages/${cat.img}`}
          alt={cat.name}
          fill
          priority
          className={`object-cover transition-transform duration-500 ease-in-out ${
            cardHover ? "scale-150" : "scale-100"
          }`}
        />

        {/* Bottom gradient overlay */}
        <div
          className={`
            absolute left-0 bottom-0 w-full h-56
            bg-gradient-to-t from-black/90 via-black/40 to-transparent
            transition-all duration-300
            ${cardHover ? "translate-y-0" : "translate-y-20 md:translate-y-full"}
          `}
        />

        {/* Content */}
        <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between">
          <h2
            className={`
              text-white text-lg md:text-xl font-dmsans_light
              transition-all duration-500
              ${cardHover ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6 md:opacity-100 md:translate-x-0"}
            `}
          >
            {cat.name}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default GridItem;
