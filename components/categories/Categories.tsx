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
  {
    id: 1,
    name: "Fresh Fruits",
    color: "bg-red-200",
    img: "fruits.webp",
    bgImg: "phal-bg.png",
    btnBg: "bg-[#9B2B29]",
    sub_heading: "Fresh, juicy, and healthy fruits to brighten every single day.",
    route: "/freshFruits",
  },
  {
    id: 2,
    name: "Fresh Vegetables",
    color: "bg-green-200",
    img: "sabzi.jpg",
    bgImg: "sabzi-bg.png",
    btnBg: "bg-[#3B5C1E]",
    sub_heading: "Enjoy farm-fresh vegetables packed with vitamins and flavor.",
    route: "/freshVegetables",
  },
  {
    id: 3,
    name: "Organic Vegetables",
    color: "bg-yellow-200",
    img: "organic-sabzi.webp",
    bgImg: "organic-sabzi-bg.png",
    btnBg: "bg-[#D34C07]",
    sub_heading: "Fresh, nutritious vegetables bringing health and nature’s goodness.",
    route: "/organicVegetables",
  },
  {
    id: 4,
    name: "Seasonal Fruits",
    color: "bg-orange-200",
    img: "seasonal-phal.jpg",
    bgImg: "seasonal-phal-bg.png",
    btnBg: "bg-[#6D5C0F]",
    sub_heading: "Taste nature’s finest with fresh seasonal fruits.",
    route: "/seasonalFruits",
  },
  {
    id: 5,
    name: "Exotic Fruits",
    color: "bg-purple-200",
    img: "exotic-phal.webp",
    bgImg: "exotic-phal-bg.png",
    btnBg: "bg-[#B9080F]",
    sub_heading: "Experience exotic fruits with vibrant global flavors.",
    route: "/exoticFruits",
  },
  {
    id: 6,
    name: "Herbs",
    color: "bg-teal-200",
    img: "herbs.webp",
    bgImg: "herbs-bg.png",
    btnBg: "bg-[#028445]",
    sub_heading: "Handpicked herbs offering freshness and wellness.",
    route: "/herbs",
  },
  {
    id: 7,
    name: "Leafy Greens",
    color: "bg-lime-200",
    img: "leaf-sabzi.jpg",
    bgImg: "leaf-sabzi-bg.png",
    btnBg: "bg-[#121F02]",
    sub_heading: "Power-packed leafy greens for a healthier you.",
    route: "/leafyGreens",
  },
  {
    id: 8,
    name: "Root Vegetables",
    color: "bg-pink-200",
    img: "root-sabzi.jpg",
    bgImg: "root-sabzi-bg.png",
    btnBg: "bg-[#2F7B41]",
    sub_heading: "Root vegetables delivering natural earthy goodness.",
    route: "/rootVegetables",
  },
  {
    id: 9,
    name: "Dry Fruits",
    color: "bg-pink-500",
    img: "dry-phal.webp",
    bgImg: "dry-phal-bg.png",
    btnBg: "bg-[#A85923]",
    sub_heading: "Crunchy dry fruits packed with health and energy.",
    route: "/dryFruits",
  },
];



// const breakpointColumnsObj = {
//   default: 4,
//   1280: 4,
//   1024: 3,
//   768: 2,
//   640: 2,   // 👈 very important
//   0: 2,     // 👈 mobile always 2 columns
// };



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
<div className="flex w-full justify-center">
  <div className="px-5 w-full sm:px-6 lg:px-20 my-8">
    <div
      className="
        grid gap-3 lg:gap-6
        grid-cols-2
        md:grid-cols-3
        xl:grid-cols-4
        auto-rows-[180px]
        md:auto-rows-[220px]
        xl:auto-rows-[260px]
      "
    >
      {categories.map((cat) => (
        <GridItem key={cat.id} cat={cat} />
      ))}
    </div>
  </div>
</div>



  );
}
