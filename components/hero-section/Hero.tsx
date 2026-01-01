"use client"
import React, { useEffect, useState } from 'react'
import LandingPageProductCard from '../LandingPageProductCard';
import LandingPageBlogCard from '../LandingPageBlogCard';
import BouncingIconsContainer from '../BouncingIconsContainer';
import Banner from '../Banner';
import SeasonalHighlights from '../seasonalHighlights/SeasonalHighlights';
import Heading from '../ui/Heading';

const Hero = () => {

    return (
        <>
            <div className=' sm:py-10 relative flex flex-col items-center justify-start mt-0 pb-6  md:py-16 w-full px-4  sm:px-5 h-auto md:gap-6 overflow-hidden '>



                <BouncingIconsContainer className='hidden lg:block' />

                {/* <div className="left flex flex-col items-center justify-center gap-5  sm:w-[90%] md:w-[70%] relative z-[50]">
                    <div className='flex flex-col sm:flex-row items-center justify-center w-full gap-0 sm:gap-2'>

                        <h1 className='font-monasans_semibold text-[2.1rem] sm:text-[3rem]  text-center leading-tight '>
                            Bringing the Market to Your

                        </h1>
                        <Heading text='Home' />
                    </div>

        
                </div> */}

                <div className="right w-full flex justify-center mt-10 sm:mt-0 overflow-visible flex-row-reverse gap-2 items-center ">
                    <div className="w-[60%] sm:w-[55%] lg:w-[45%]  xl:w-[40%]  flex-shrink-0  flex items-center justify-center">
                        <LandingPageProductCard />
                    </div>

                    <div className="w-[37%] sm:w-[35%] lg:w-[35%] xl:w-[30%] flex items-center justify-center flex-shrink-0">
                        <LandingPageBlogCard />
                    </div>
                </div>

                {/* <SeasonalHighlights/> */}
            </div>

        </>
    )
}

export default Hero