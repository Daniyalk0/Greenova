"use client"
import React, { useEffect, useState } from 'react'
import ProgressCircle from './ui/ProgressCircle';
import RotatingFruit from './ui/RotateFruits';
import { motion, AnimatePresence } from "framer-motion";
import { useResponsiveSize } from '@/lib/useResponsiveSize';
import { Check } from 'lucide-react';
import Image from 'next/image';

const fruitData = [
    {
        image: "/pineapple.png",
        progress: 0,
        color: "#D6BF24",
        visibleColor: "#3E2F00", // dark enough to show over glassBg
        glassBg: `linear-gradient(135deg, #D6BF2466, #D6BF2433)`,
        highlights: ["Boosts immunity", "Juice, salad, curry", "Season: Summer"],
        nutritions: {
            calories: 50.0, // Pineapple ~50 cal per 100g
            sugar: 9.9,     // sweet fruit, sugar-rich
            protein: 0.5,
        },
    },
    {
        image: "/carrot.png",
        progress: 1,
        color: "#FF3300",
          visibleColor: "#FFBF00",
        glassBg: `linear-gradient(135deg, #E32A0266, #E32A0233)`,
        highlights: ["Good for eyes", "Soup, salad, juice", "Season: Winter"],
        nutritions: {
            calories: 41.0, // Carrot ~41 cal per 100g
            sugar: 4.7,
            protein: 0.9,
        },
    },
    {
        image: "/apple.png",
        progress: 2,
        color: "#E32A10",
        visibleColor: "#FFC4C2", // deep red for maximum contrast
        glassBg: `linear-gradient(135deg, #E32A1066, #E32A1033)`,
        highlights: ["Rich in fiber", "Juice, pie, fresh", "Season: Autumn"],
        nutritions: {
            calories: 52.0, // Apple ~52 cal per 100g
            sugar: 10.4,
            protein: 0.3,
        },
    },
    {
        image: "/pomegranate.png",
        progress: 3, // bumped up for stronger "superfruit" vibe
        color: "#A60321", // deep ruby red
        visibleColor: "#FFD6D9", // soft pinkish background for contrast
        glassBg: `linear-gradient(135deg, #A6032166, #A6032133)`, // translucent ruby gradient
        highlights: [
            "Packed with antioxidants",
            "Juice, salads, desserts",
            "Season: September–February",
        ],
        nutritions: {
            calories: 83.0, // Pomegranate ~83 cal per 100g
            sugar: 13.7,
            protein: 1.7,
        },
    },
    {
        image: "/watermelon.png",
        progress: 4, // hydrating + refreshing fruit
        color: "#1CA344", 
         visibleColor: "#FFCCD2",// light pink for contrast with red flesh
        glassBg: `linear-gradient(135deg, #1CA34466, #1CA34433)`,
        highlights: ["Hydrating & refreshing", "Juice, salads, fresh slices", "Season: Summer"],
        nutritions: {
            calories: 30.0,   // very low calories per 100g
            sugar: 6.0,       // mildly sweet
            protein: 0.6,     // small amount of protein
        },
    },
    {
        image: "/corn.png",
        progress: 5, // adjust to whatever health metric you want
        color: "#FFB300", // golden yellow (corn kernels)
       visibleColor: "#426900", // soft pale yellow for contrast
        glassBg: `linear-gradient(135deg, #FFB30066, #FFB30033)`, // translucent golden gradient
        highlights: [
            "Good source of fiber & antioxidants",
            "Great roasted, boiled, or in soups",
            "Season: Summer–Autumn",
        ],
        nutritions: {
            calories: 96.0, // Corn ~96 cal per 100g
            sugar: 6.3,
            protein: 3.4,
        },
    },

    {
        image: "/broccoli.png",
        progress: 6, // you can tweak this to show "healthy level"
        color: "#2E7D32", // dark green, matches broccoli florets
        visibleColor: "#A5D6A7", // lighter green for contrast
        glassBg: `linear-gradient(135deg, #2E7D3266, #2E7D3233)`, // translucent green gradient
        highlights: [
            "Rich in vitamins C & K",
            "Great in salads, stir-fry, soups",
            "Season: Year-round",
        ],
        nutritions: {
            calories: 34.0, // Broccoli ~34 cal per 100g
            sugar: 1.7,
            protein: 2.8,
        },
    }



];


const LandingPageProductCard = () => {
    const [index, setIndex] = useState(0);
    const circleSize = useResponsiveSize({ base: 40, sm: 40, md: 40, lg: 50 })

    // Change fruit + text every 5s
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % fruitData.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const fruit = fruitData[index];
    return (
        <div
            className={`w-full sm:w-[60%] md:w-[50%] lg:w-[35%] h-48 md:h-60 rounded-2xl shadow-2xl overflow-visible relative px-3 py-4 sm:px-4 md:py-4 md:px-5 flex flex-col justify-between transition-all duration-700`}
            style={{ backgroundColor: fruit.color }}
        >
            {/* Background overlay (SVG on top of bg color) */}
           <Image
  src="/blob-scene-haikei.svg"
  alt="Blog background"
  fill
  className="absolute inset-0 w-full h-full object-cover rounded-2xl mix-blend-overlay opacity-70"
  unoptimized
/>


            <div className="flex flex-col justify-center z-10 h-full w-[50%]   sm:w-[65%] md:w-[50%] gap-3 md:gap-5 ">
                <AnimatePresence mode="wait">
                    <motion.div

                        className="flex flex-wrap gap-2 md:mt-2 text-[0.6rem] font-dmsans_semibold sm:text-xs "
                    >
                        {fruit.highlights.map(

                            (item, i) => (
                                <motion.span

                                    key={i}
                                    className="inline-flex items-center gap-2 px-2.5 sm:px-3 md:px-3 py-[2px]  md:py-[2px] 
                                    rounded-full font-medium backdrop-blur-md transition-all duration-300 hover:scale-105"
                                    style={{
                                        background: fruitData[index].glassBg,
                                        border: `1px solid ${fruitData[index].visibleColor}66`,
                                        color: fruitData[index].visibleColor,
                                        boxShadow: `0 2px 6px ${fruitData[index].visibleColor}55`,
                                    }}
                                >
                                    {/* Checkmark with bg */}
                                    <span
                                        className="flex items-center justify-center rounded-full p-1 sm:p-1.5"
                                        style={{
                                            backgroundColor: `${fruitData[index].visibleColor}22`, // subtle tint
                                            color: fruitData[index].visibleColor,
                                        }}
                                    >
                                        <Check className="w-3 h-3 md:w-3 md:h-3" strokeWidth={2.5} />
                                    </span>

                                    {/* Responsive Text */}
                                    <motion.span key={fruitData[index].color} // key makes motion detect change
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 1.2 }} className="whitespace-nowrap text-[0.6rem] md:text-xs">
                                        {item}
                                    </motion.span>
                                </motion.span>
                            )

                        )}
                    </motion.div>
                </AnimatePresence>


                {/* Progress Circle Example */}
                <div className="flex gap-4 mb-0">
                    {Object.entries(fruit.nutritions || {}).map(([key, value], i) => (
                        <div key={i} className="flex flex-col items-center">
                            <ProgressCircle
                                value={value}
                                size={circleSize}
                                strokeWidth={3}
                                color={fruit.color}
                                nutritionName={key}
                                progressColor={fruit.visibleColor}
                                textColor={fruit.visibleColor}
                            />
                            {/* <span className="text-xs mt-2 text-gray-700">{key}</span> */}
                        </div>
                    ))}
                </div>


            </div>
            {/* Image Section */}
            <RotatingFruit fruitImages={fruitData[index].image}
/>
        </div>
    )
}

export default LandingPageProductCard