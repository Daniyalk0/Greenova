"use client"
import { ArrowRight } from 'lucide-react'
import React, { useState } from 'react'
import { motion, useAnimation } from "framer-motion";
import Image from 'next/image';

const GridItem = ({ className, cat }: any) => {
  const controlsMain = useAnimation();
  const controlsSecond = useAnimation();
  const [cardHover, setCardHover] = useState(false)

  const handleMouseEnter = () => {
    setCardHover(true)
    controlsMain.start({ x: 25, transition: { type: "spring", stiffness: 300, damping: 20 } });
    controlsSecond.start({ x: 11, y: 11, opacity: 1, transition: { type: "spring", stiffness: 400, damping: 20 } });
  };

  const handleMouseLeave = () => {
    setCardHover(false)
    controlsMain.start({ x: 0, transition: { type: "spring", stiffness: 300, damping: 20 } });
    controlsSecond.start({ x: -6, y: 11, opacity: 0, transition: { type: "spring", stiffness: 400, damping: 20 } });
  };
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      key={cat.id}
      className={`flex flex-col overflow-hidden gap-[2px]  rounded-3xl ${cat.height}`}
    >
      {/* Image Section (60% height) */}
      <div className="relative h-full w-full rounded-3xl  
">
        <div className={`transition-all duration-300   rounded-2xl bg-white 
  relative w-full h-full`}>

          <Image
            src={`/categoriesImages/${cat.img}`}
            alt="Fresh Vegetables"
            fill
            className={`object-cover object-center transition-transform duration-500 ease-in-out ${cardHover ? 'scale-150' : 'scale-100'} `}
          />
          <div className='flex items-center absolute bottom-3 z-[1000] left-3 md:w-[95%] w-[92%] justify-between overflow-hidden'>

            <h1 className={`text-lg top-1 relative font-dmsans_light text-white md:text-[1.2rem] lg:text-xl leading-5 xl:text-lg ${cardHover ? 'left-0' : 'left-0 md:-left-96'}  transition-all duration-500 `}>{cat.name}</h1>

            <button className={` p-3 ${cat.btnBg}  rounded-full text-xs md:text-sm  shadow-md -rotate-45 overflow-hidden`}>
              <motion.div
                className="relative w-4 h-4"
                animate={controlsMain}
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
              >
                <ArrowRight className="w-4 h-4 text-white" />
              </motion.div>


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

          <div className={`${cardHover ? 'bottom-0' : 'bottom-0 md:-bottom-96'} transition-all duration-200 absolute  left-0 w-full h-56 bg-gradient-to-t from-black/90 via-black/40 to-transparent`} />
        </div>

        {/* Dark fade overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" /> */}
      </div>

      {/* Content Section (40% height) */}
      {/* <div className={`relative ${cat.contentHeight} w-full rounded-3xl py-2 overflow-hidden`}>
        <Image
          src={`/categoriesImages/${cat.bgImg}`}
          alt="Fresh Vegetables Blur"
          fill
          className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(100%)" }}
        />

        <div className="  px-4 xl:px-6 py-2 flex flex-col justify-center md:gap-2 items-center">
          
          <div className="flex items-center justify-between w-full ">


            <h1 className="text-2xl relative font-monasans_semibold text-white md:text-[1.2rem] lg:text-xl leading-5 xl:text-2xl">{cat.name}</h1>

            <p className="text-sm absolute bottom-10 font-dmsans_italic_light text-white  lg:text-[0.8rem] w-[20rem] sm:bottom-7 md:bottom-4 md:text-xs md:w-[12rem] lg:w-[15rem] xl:w-[70%] xl:bottom-7 ">{cat.sub_heading}</p>


            <button className={`relative p-3 ${cat.btnBg}  rounded-full text-xs md:text-sm  shadow-md -rotate-45 overflow-hidden`}>
              <motion.div
                className="relative w-4 h-4"
                animate={controlsMain}
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
              >
                <ArrowRight className="w-4 h-4 text-white" />
              </motion.div>


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
      </div> */}
    </div>
  )
}

export default GridItem