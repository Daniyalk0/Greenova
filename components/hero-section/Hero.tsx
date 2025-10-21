"use client"
import React, { useEffect, useState } from 'react'
import LandingPageProductCard from '../LandingPageProductCard';
import LandingPageBlogCard from '../LandingPageBlogCard';
import BouncingIconsContainer from '../BouncingIconsContainer';

const Hero = () => {

    return (
        <>

            <div className=' pt-20 sm:pt-20 relative flex flex-col items-center justify-center w-full px-4 pb-0 sm:px-5 min-h-screen sm:h-auto md:h-screen md:pt-0 md:gap-6 overflow-hidden '>
                

                <BouncingIconsContainer />

                <div className="left flex flex-col items-center justify-center gap-5  sm:w-[90%] md:w-[70%] relative z-[50]">
                    <h1 className='font-monasans_semibold text-[2.4rem] sm:text-[3rem]  text-center leading-tight '>
                        Bringing the Market to Your <span className='font-playfair text-[3rem]'>Home</span>
                    </h1>
                    <h2 className='text-center font-dmsans_light text-xl '>Discover the taste of freshness with handpicked fruits and vegetables delivered straight from farms to your doorstep, every single day.</h2>
                    {/* <div className="calltoaction">checkout</div> */}
                    <div className="trust_elements w-full">
                        <div className="first bg-red-500 "></div>
                    </div>
                </div>

                <div className="right w-full flex justify-center mt-10 sm:mt-0 overflow-visible flex-col sm:flex-row-reverse gap-4">
                    <LandingPageProductCard />
                    <LandingPageBlogCard />

                </div>
            </div>


        </>
    )
}

export default Hero