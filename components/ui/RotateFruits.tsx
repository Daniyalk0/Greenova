"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// const fruitImages = [
//   "/pineapple.png",
//   "/carrot.png",
// //   "/banana.png",
// //   "/grapes.png",
//   "/apple.png",
// ];

export default function RotatingFruit({fruitImages, initialScale = 0.9,
  initialRotate = -10,
  animateScale = 1,
  animateRotate = 0,
  exitScale = 0.9,
  exitRotate = 10, }: any) {
  // const [index, setIndex] = useState(0);

  // Change image every 5 seconds
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setIndex((prev) => (prev + 1) % fruitImages.length);
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className={`absolute right-[-25%] md:-right-32 top-0  w-[100%] h-[150%] overflow-visible `}>
      <AnimatePresence mode="wait">
        <motion.div
          key={fruitImages} // key ensures animation runs on change
          initial={{ opacity: 0, scale: initialScale, rotate: initialRotate, x: 50 }}
          animate={{ opacity: 1, scale: animateScale, rotate: animateRotate, x: 0 }}
          exit={{ opacity: 0, scale: exitScale, rotate: exitRotate, x: -50 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center overflow-visible"
        >
          <Image
            src={fruitImages}
            alt="Fruit"
            width={500}
            height={500}
            className="object-contain absolute  -top-16  w-[100%] h-[100%] rotate-[26deg]"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
