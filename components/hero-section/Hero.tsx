"use client";

import { motion } from "framer-motion";
import React from "react";
import TopCategoryBar from "../categoriesBar/Categoriesbar";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative h-full overflow-hidden sm:py-12">
      {/* Decorative Background Element */}
      <div className="absolute top-10 left-0 hidden translate-x-1/4 -translate-y-1/4 pointer-events-none lg:block">
        <svg
          width="600"
          height="600"
          viewBox="0 0 600 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-green-900 opacity-[0.05]"
        >
          <path
            d="M450.5 150.5C520.5 220.5 580.5 280.5 540.5 380.5C500.5 480.5 380.5 550.5 280.5 520.5C180.5 490.5 120.5 380.5 150.5 280.5C180.5 180.5 380.5 80.5 450.5 150.5Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Hero Content */}
      <div className="grid min-h-[calc(95vh-6rem)] grid-cols-1 items-stretch gap-12 lg:grid-cols-12 lg:gap-8">
        {/* Left Column */}
        <div className="relative order-2 z-10 flex flex-col justify-center px-6 py-12 sm:order-1 sm:bg-transparent sm:pl-12 sm:py-0 lg:col-span-6 lg:-translate-y-6">
          {/* Mobile-Only Background Image (Hidden on sm:) */}
          <div className="absolute inset-0 z-0 overflow-hidden sm:hidden">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1074&auto=format&fit=crop"
              alt="Fresh Vegetables Background"
              className="h-full w-full object-cover"
            />
            {/* Darkening Overlay */}
            <div className="absolute inset-0 bg-slate-900/50" />
            {/* Bottom Fade-out (matches page background) */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#f7fff6] via-[#FBFBFA]/5 to-transparent" />
          </div>

          {/* Content Container (z-10 to stay above mobile image) */}
          <div className="relative z-10">
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [-6, 0, -6] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-6 -right-5 z-20 sm:hidden sm:bottom-20 sm:-left-4"
            >
              <div className="flex items-center gap-3 rounded-xl border border-white/30 bg-white/70 p-2 shadow-xl backdrop-blur-md sm:p-4">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-white shadow-inner p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-[8px] font-dmsans_semibold uppercase tracking-wider text-green-800 sm:text-xs">
                    Premium Quality
                  </p>
                  <p className="text-[8px] font-dmsans_light text-slate-600 sm:text-sm">
                    100% Organic
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Eyebrow Animation */}
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-4 inline-block text-[11px] font-dmsans_italic_light uppercase tracking-[0.2em] text-green-400 sm:text-green-700 sm:text-xs"
            >
              Sustainable Living
            </motion.span>

            {/* Headline Animation */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 text-[2rem] font-dmsans_semibold leading-[1.1] text-white sm:text-slate-900 md:text-5xl lg:text-7xl"
            >
              Nurture your home <br className="hidden lg:block" />
              with{" "}
              <span className="relative inline-block sm:px-2 text-green-300 sm:text-green-800 before:absolute before:inset-0 before:-z-10 before:translate-y-1 before:rounded-lg before:bg-green-900/40 sm:before:bg-green-100/80">
                nature&apos;s finest.
              </span>
            </motion.h1>

            {/* Description Animation */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-10 max-w-md text-base font-dmsans_light leading-relaxed text-slate-100 sm:text-lg sm:text-slate-600"
            >
              Discover a curated collection of eco-conscious essentials designed
              to bring balance, beauty, and sustainability to your everyday
              spaces.
            </motion.p>

            {/* CTA Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="#products"
                className="group relative w-full overflow-hidden rounded-full bg-green-600 sm:bg-green-800 px-10 py-4 font-dmsans_light text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-green-900 active:scale-[0.98] sm:w-auto"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 ">
                  Shop Collection
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 z-0 h-full w-full translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />
              </Link>
            </motion.div>
          </div>

          {/* Trust Pills Section - Fade in with longest delay */}
        {/* Trust Pills Section - Enhanced with Staggered Entry & Micro-interactions */}
<motion.div 
  variants={{
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.7
      }
    }
  }}
  initial="hidden"
  animate="show"
  className="relative z-10 mt-10 flex w-full items-center justify-start gap-2 sm:justify-start sm:gap-4"
>
  {/* Fast Delivery Pill */}
  <motion.div
    variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0 } }}
    whileHover={{ y: -4, backgroundColor: "rgba(255, 255, 255, 0.9)" }}
    whileTap={{ scale: 0.97 }}
    className="group flex cursor-pointer items-center gap-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-2 py-1.5 shadow-sm transition-colors sm:border-slate-100 sm:bg-white/50 sm:gap-2 sm:px-4 sm:py-2"
  >
    <motion.div 
      whileHover={{ x: 3 }} 
      className="flex h-4 w-4 items-center justify-center rounded-full bg-green-400 text-green-900 sm:bg-green-100 sm:text-green-700 sm:h-6 sm:w-6"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M15 18H9" /><circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" />
      </svg>
    </motion.div>
    <span className="whitespace-nowrap text-[10px] font-dmsans_light text-slate-700 sm:text-sm sm:font-medium">
      Fast Delivery
    </span>
  </motion.div>

  {/* Freshness Pill */}
  <motion.div
    variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0 } }}
    whileHover={{ y: -4, backgroundColor: "rgba(255, 255, 255, 0.9)" }}
    whileTap={{ scale: 0.97 }}
    className="group flex cursor-pointer items-center gap-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-2 py-1.5 shadow-sm transition-colors sm:border-slate-100 sm:bg-white/50 sm:gap-2 sm:px-4 sm:py-2"
  >
    <motion.div 
      whileHover={{ rotate: 15 }} 
      className="flex h-4 w-4 items-center justify-center rounded-full bg-green-400 text-green-900 sm:bg-green-100 sm:text-green-700 sm:h-6 sm:w-6"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C10.9 14.23 12 14 15 12c-2 3-2.73 4.35-4 7-1.28 2.65-4 4.5-9 2Z" />
      </svg>
    </motion.div>
    <span className="whitespace-nowrap text-[10px] font-dmsans_light text-slate-700 sm:text-sm sm:font-medium">
      Freshness
    </span>
  </motion.div>

  {/* Smooth Experience Pill */}
  <motion.div
    variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0 } }}
    whileHover={{ y: -4, backgroundColor: "rgba(255, 255, 255, 0.9)" }}
    whileTap={{ scale: 0.97 }}
    className="group flex cursor-pointer items-center gap-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-2 py-1.5 shadow-sm transition-colors sm:border-slate-100 sm:bg-white/50 sm:gap-2 sm:px-4 sm:py-2"
  >
    <motion.div 
      whileHover={{ scale: 1.2 }} 
      className="flex h-4 w-4 items-center justify-center rounded-full bg-green-400 text-green-900 sm:bg-green-100 sm:text-green-700 sm:h-6 sm:w-6"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      </svg>
    </motion.div>
    <span className="whitespace-nowrap text-[10px] font-dmsans_light text-slate-700 sm:text-sm sm:font-medium">
      Smooth
    </span>
  </motion.div>
</motion.div>
        </div>

        {/* Right Column */}
        <div className="hidden relative order-1 min-h-[450px] sm:order-2 sm:min-h-[600px] lg:col-span-6 lg:min-h-[600px] sm:flex items-center justify-center p-4 sm:px-8">
          {/* 1. Background Organic Shape - Subtle Scale & Fade Entry */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <svg
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] text-green-50/50"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M44.7,-76.4C58.3,-69.2,70.1,-57.4,78.6,-43.3C87.1,-29.2,92.3,-12.7,90.3,3.1C88.3,18.9,79,34,68.2,46.7C57.4,59.3,45,69.5,30.8,75.4C16.6,81.3,0.5,82.9,-15.8,79.8C-32.1,76.7,-48.6,68.9,-60.6,56.7C-72.6,44.5,-80.1,27.9,-82.7,11.1C-85.3,-5.7,-83,-22.7,-74.6,-36.8C-66.2,-50.9,-51.7,-62.1,-37,-68.8C-22.3,-75.5,-7.4,-77.7,8.7,-79.1C24.7,-80.6,44.7,-76.4,44.7,-76.4Z"
                transform="translate(100 100)"
              />
            </svg>
          </motion.div>

          {/* 2. Main Image Container - Reveal with Slide & Zoom */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: 20 }}
            animate={{ opacity: 1, x: 0, y: -32 }} // Maintains your lg:-translate-y-8
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full h-full overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] transition-all duration-700 hover:scale-[1.01] rounded-[2rem] rounded-tr-[5rem] rounded-bl-[5rem] lg:rounded-[3rem] lg:rounded-tr-[10rem] lg:rounded-bl-[10rem]"
          >
            <motion.img
              initial={{ scale: 1.4 }}
              animate={{ scale: 1.1 }} // Matches your scale-110
              transition={{ duration: 1.5, ease: "easeOut" }}
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1074&auto=format&fit=crop"
              alt="Premium sustainable home products"
              className="h-full w-full object-cover"
            />

            {/* Subtle Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/40 via-transparent to-transparent" />

            {/* Desktop: Light Beam */}
            <div className="absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-white/20 to-transparent lg:block -skew-x-12 -translate-x-12" />
          </motion.div>

          {/* 3. Floating Quality Badge - Entry + Continuous Float */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, x: -20 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              y: [-6, 0, -6],
            }}
            transition={{
              opacity: { duration: 0.5, delay: 0.6 },
              scale: {
                duration: 0.5,
                delay: 0.6,
                type: "spring",
                stiffness: 200,
              },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute bottom-10 left-0 z-20 sm:bottom-20 sm:-left-4"
          >
            <div className="flex items-center gap-3 rounded-2xl border border-white/30 bg-white/70 p-3 shadow-xl backdrop-blur-md sm:p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white shadow-inner sm:h-12 sm:w-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-dmsans_semibold uppercase tracking-wider text-green-800 sm:text-xs">
                  Premium Quality
                </p>
                <p className="text-xs font-dmsans_light text-slate-600 sm:text-sm">
                  100% Organic
                </p>
              </div>
            </div>
          </motion.div>

          {/* 4. Small Accent: Botanical Outline - Delayed Reveal */}
          <motion.div
            initial={{ opacity: 0, rotate: -15 }}
            animate={{ opacity: 0.2, rotate: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute -top-4 -right-4 z-20 hidden lg:block"
          >
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              fill="none"
              className="text-green-800"
            >
              <path
                d="M60 10C60 10 90 40 60 70C30 40 60 10 60 10Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M60 70V110"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>

          {/* Background Blur Glow - Slow Pulse Entry */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.4 }}
            className="absolute -bottom-10 -right-10 -z-10 h-64 w-64 rounded-full bg-green-200/30 blur-[80px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
