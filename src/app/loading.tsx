"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const loadingMessages = [
  "Handpicking fresh products...",
  "Checking farm-fresh arrivals...",
  "Sorting the crispiest veggies...",
  "Preparing your organic greens...",
  "Getting your daily essentials ready...",
  "Stocking up on seasonal fruits...",
  "Packing your groceries with care...",
  "Just a moment, freshness loading...",
];

export default function Loading() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    // Start at a random message so it's different every time they open the app
    const randomIndex = Math.floor(Math.random() * loadingMessages.length);
    setMessageIndex(randomIndex);

    // If loading takes longer than 2 seconds, cycle to the next message
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center min-h-screen bg-[#fafcfb] z-[9999]">
      <div className="relative flex flex-col items-center justify-center">
        
        {/* --- LOGO & ANIMATED RINGS WRAPPER --- */}
        <div className="relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28">
          
          {/* 1. Soft Background Glow (Pulse) */}
          <div className="absolute inset-0 bg-[#0c831f] blur-2xl opacity-15 animate-pulse rounded-full" />

          {/* 2. Static Track Ring */}
          <div className="absolute inset-0 border-[3px] border-[#0c831f]/10 rounded-full" />

          {/* 3. Smooth Spinning Ring */}
          <div className="absolute inset-0 border-[3px] border-[#0c831f] border-t-transparent border-r-transparent rounded-full animate-spin" />

          {/* 4. Logo Container (Static center) */}
         <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full shadow-sm border border-gray-100/50 overflow-hidden z-10">
  <Image
    src="/favicon.ico"
    alt="Greenova"
    fill
    className="object-cover"
    priority
  />
</div>
          
        </div>

        {/* --- DYNAMIC LOADING TEXT --- */}
        <div className="mt-8 flex flex-col items-center text-center gap-1.5 h-12">
          <h2 className="text-[#0c831f] text-[13px] font-monasans_semibold sm:text-[14px] font-bold tracking-[0.2em] uppercase">
            Greenova
          </h2>
          
          {/* Text wrapper with key to trigger Tailwind fade transitions (optional but smooth) */}
          <p 
            key={messageIndex} 
            className="text-gray-500 font-dmsans_light text-[12px] sm:text-[13px] font-medium animate-pulse transition-opacity duration-500"
          >
            {loadingMessages[messageIndex]}
          </p>
        </div>

      </div>
    </div>
  );
}