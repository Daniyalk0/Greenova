"use client";
import Image from "next/image";
import React, { useRef } from "react";
import Masonry from "react-masonry-css";
import { motion, useAnimation } from "framer-motion";
import { ArrowRight } from "lucide-react";
import GridItem from "./GridItem";
import { RoughNotation } from "react-rough-notation";
import Heading from "../ui/Heading";


const categories = [
  { id: 1, name: "Fresh Fruits", color: "bg-red-200", height: "h-[10rem] sm:h-[27rem] md:h-[20rem]", contentHeight: "h-[55%] sm:h-[43%] md:h-[45%] ", img: "fruits.jpg", bgImg: "phal-bg.png", btnBg: "bg-[#9B2B29]", sub_heading: "“Fresh, juicy, and healthy fruits to brighten every single day.“" },

  { id: 2, name: "Fresh Vegetables", color: "bg-green-200", height: "h-[10rem] sm:h-[29rem] md:h-[24rem]", contentHeight: "h-[55%] sm:h-[37%] md:h-[36%] ", img: "sabzi.jpg", bgImg: "sabzi-bg.png", btnBg: "bg-[#3B5C1E]", sub_heading: "“Enjoy farm-fresh vegetables packed with vitamins, minerals, and flavor“" },

  { id: 3, name: "Organic Vegetables", color: "bg-yellow-200", height: "h-[10rem] sm:h-[25rem] md:h-[17rem]", contentHeight: "h-[55%] sm:h-[46%] md:h-[60%] ", img: "organic-sabzi.jpg", bgImg: "organic-sabzi-bg.png", btnBg: "bg-[#D34C07]", sub_heading: "“Fresh, nutritious vegetables bringing health, taste, and nature’s goodness daily.“" },

  { id: 4, name: "Seasonal Fruits", color: "bg-orange-200", height: "h-[10rem] sm:h-[21rem] md:h-[14rem]", contentHeight: "h-[55%] sm:h-[55%] md:h-[72%] ", img: "seasonal-phal.jpg", bgImg: "seasonal-phal-bg.png", btnBg: "bg-[#6D5C0F]", sub_heading: "“Taste nature’s finest with fresh seasonal fruits, ripe and pure.“" },

  { id: 5, name: "Exotic Fruits", color: "bg-purple-200", height: "h-[10rem]sm:h-[27rem] md:h-[13rem]", contentHeight: "h-[55%] sm:h-[42%] md:h-[82%] ", img: "exotic-phal.jpg", bgImg: "exotic-phal-bg.png", btnBg: "bg-[#B9080F]", sub_heading: "“Experience exotic fruits with vibrant flavors from around the world“" },

  { id: 6, name: "Herbs", color: "bg-teal-200", height: "h-[10rem] sm:h-[26rem] md:h-[20rem]", contentHeight: "h-[55%] sm:h-[44%] md:h-[50%] ", img: "herbs.jpg", bgImg: "herbs-bg.png", btnBg: "bg-[#028445]", sub_heading: "“Handpicked herbs offering wellness, freshness, and vibrant kitchen flavors.“" },

  { id: 7, name: "Leafy Greens", color: "bg-lime-200", height: "h-[10rem] sm:h-[16rem] md:h-[16.5rem]", contentHeight: "h-[55%] sm:h-[90%] md:h-[62%] ", img: "leaf-sabzi.jpg", bgImg: "leaf-sabzi-bg.png", btnBg: "bg-[#121F02]", sub_heading: "“Power-packed leafy greens for a healthier, stronger, and fresher you.“" },

  { id: 8, name: "Root Vegetables", color: "bg-pink-200", height: "h-[10rem]sm:h-[36rem] md:h-[13.5rem]", contentHeight: "h-[55%] sm:h-[28%] md:h-[75%] ", img: "root-sabzi.jpg", bgImg: "root-sabzi-bg.png", btnBg: "bg-[#2F7B41]", sub_heading: "“From soil to plate, root vegetables deliver natural earthy goodness“" },

  { id: 9, name: "Dry Fruits", color: "bg-pink-500", height: "h-[10rem] sm:h-[16.2rem] md:h-[13.5rem]", contentHeight: "h-[55%] sm:h-[88%] md:h-[66%] ", img: "dry-phal.jpg", bgImg: "dry-phal-bg.png", btnBg: "bg-[#A85923]", sub_heading: "“Crunchy dry fruits deliver health, flavor, and natural goodness daily.“" },
];


const breakpointColumnsObj = {
  default: 3, // ≥ 640px → 3 columns
  639: 1,
  768: 2     // < 640px → 2 columns
};


export default function CategoryGrid() {
  // const controlsMain = useAnimation();
  // const controlsSecond = useAnimation();

  // const handleMouseEnter = () => {
  //   controlsMain.start({ x: 25, transition: { type: "spring", stiffness: 300, damping: 20 } });
  //   controlsSecond.start({ x: 11, y: 11, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 20 } });
  // };

  // const handleMouseLeave = () => {
  //   controlsMain.start({ x: 0, transition: { type: "spring", stiffness: 300, damping: 20 } });
  //   controlsSecond.start({ x: -6, y: 11, opacity: 0, transition: { type: "spring", stiffness: 300, damping: 20 } });
  // };


  return (
    <div className="flex w-full items-center justify-center">

      <div className="px-5 w-full sm:px-6 lg:px-20 my-8 overflow-hidden min-h-screen">
        {/* <h1 className="text-2xl sm:text-3xl text-center mb-6 lg:mb-10 font-monasans_semibold">    <RoughNotation
          type="highlight"
          show={true}
          color="#a3ff61" // light yellow
          animationDuration={1200}
          strokeWidth={0.6}
        >
          Categories
        </RoughNotation> </h1> */}
        <Heading text="categories"/>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex items-start justify-center w-auto gap-2 lg:gap-6"
          columnClassName="flex flex-col gap-2 lg:gap-6"

        >
          {categories.map((cat) => (
            <GridItem cat={cat} key={cat.id} />


          ))}

        </Masonry>
      </div>
    </div>
  );
}
