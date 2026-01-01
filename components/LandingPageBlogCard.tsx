"use client"
import { ArrowRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { motion, useAnimation } from "framer-motion";
import Image from 'next/image';

const LandingPageBlogCard = () => {
    const controlsMain = useAnimation();
    const controlsSecond = useAnimation();

    const handleMouseEnter = () => {
        controlsMain.start({ x: 25, transition: { type: "spring", stiffness: 300, damping: 20 } });
        controlsSecond.start({ x: 11, y: 11, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 20 } });
    };

    const handleMouseLeave = () => {
        controlsMain.start({ x: 0, transition: { type: "spring", stiffness: 300, damping: 20 } });
        controlsSecond.start({ x: -6, y: 11, opacity: 0, transition: { type: "spring", stiffness: 300, damping: 20 } });
    };

    const [showPara, setShowPara] = useState(false);

useEffect(() => {
  setShowPara(window.innerWidth >= 640);
}, []);

    return (
        <div
            className={`w-full  h-48 md:h-60 rounded-2xl shadow-2xl sm:h-48 relative px-3 py-2 sm:px-4  md:px-5 flex flex-col justify-between transition-all duration-700 cursor-pointer overflow-hidden `}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >

            <Image
                src="/stacked-waves-haikei.svg"
                alt="Blog background"
                fill
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: "brightness(80%)" }}
                unoptimized
            />

            <span className="relative w-fit top-0 -left-1 sm:-left-1 sm:top-1  px-2 py-1 rounded-full text-[#001d15]  shadow-md bg-[#b4f7ed4d]  font-dmsans_italic_light text-[0.6rem]">
                BLOG
            </span>

            {/* Blog content */}
            <div className="flex flex-col gap-2 relative">
                <h3 className="text-white font-dmsans_light text-base md:text-lg leading-snug underline">
                    The Health Secrets of Pineapple
                </h3>
                {showPara && (
                <p className="text-white text-xs md:text-sm line-clamp-2 font-dmsans_light">
                    Pineapples are not just sweet and juicy—they are loaded with vitamins,
                    enzymes, and antioxidants that can help boost immunity, build strong
                    bones, and aid digestion...
                </p>
                )}
            </div>

            {/* Meta info + button row */}
            <div className="flex items-center justify-between relative ">
                <span className="text-white text-[9px] md:text-[10px] font-dmsans_light bg-[#0284459a] rounded-full px-2 py-1">
                    Aug 24, 2025 · 3 min read
                </span>
                <button className="hidden sm:block relative p-3 bg-[#028445] rounded-full text-xs md:text-sm font-semibold shadow-md -rotate-45 overflow-hidden">
                    <motion.div
                        className="relative w-4 h-4"
                        animate={controlsMain}
                        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                    >
                        <ArrowRight className="w-4 h-4 text-white" />
                    </motion.div>

                    {/* Second arrow wrapper */}
                    <motion.div
                        className="absolute top-0 left-0 w-4 h-4"
                        animate={controlsSecond}
                        initial={{ x: -6, opacity: 0 }}
                        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                    >
                        <ArrowRight className="w-4 h-4 text-white" />
                    </motion.div>
                </button>
            </div>
        </div>


    )
}

export default LandingPageBlogCard