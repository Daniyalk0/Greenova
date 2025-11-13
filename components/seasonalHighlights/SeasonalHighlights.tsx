"use client"
import React from 'react'
import { RoughNotation } from 'react-rough-notation'
import SeasonalFruits from './seasonalFruits/SeasonalFruits'
import SeasonalVegetables from './seasonalVegetables/SeasonalVegetables'
import Heading from '../ui/Heading'

const SeasonalHighlights = () => {
    return (
        <div className="px-5 w-full sm:px-6 lg:px-20 pb-10 my-6 md:my-14 overflow-hidden min-h-screen">
            <div className='flex items-center justify-center w-full gap-4 sm:gap-5'>

                {/* <h1 className="text-xl sm:text-3xl text-center mb-10 lg:mb-10 font-monasans_semibold">    <RoughNotation
                    type="highlight"
                    show={true}
                    color="#a3ff61" // light yellow
                    animationDuration={1200}
                    strokeWidth={0.6}
                >
                    Seasonal Highlights
                </RoughNotation> </h1> */}
                <Heading text='Summer Highlights'/>
                <h1 className="text-xl  underline sm:text-3xl font-playfair  mb-10 lg:mb-10   ">
                    {/* <RoughNotation
                        type="highlight"
                        show={true}
                        color="#D1280B" // light yellow
                        animationDuration={1200}
                        strokeWidth={0.6}
                    > */}
                        {/* Summer */}
                    {/* </RoughNotation> */}
                </h1>
            </div>
            <div className='flex flex-col w-full justify-center gap-16'>

                <SeasonalFruits />
                <SeasonalVegetables />
            </div>
        </div>
    )
}

export default SeasonalHighlights