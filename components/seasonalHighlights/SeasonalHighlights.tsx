"use client"
import React from 'react'
import { RoughNotation } from 'react-rough-notation'
import SeasonalFruits from './seasonalFruits/SeasonalFruits'
import SeasonalVegetables from './seasonalVegetables/SeasonalVegetables'

const SeasonalHighlights = () => {
    return (
        <div className="px-5 w-full sm:px-6 lg:px-20 my-8 overflow-hidden min-h-screen">
            <div className='flex items-center justify-center w-full gap-2 sm:gap-5'>

                <h1 className="text-xl sm:text-3xl text-center mb-6 font-monasans_semibold">Seasonal Highlights:  </h1>
                <h1 className="text-xl  sm:text-3xl font-playfair  mb-6  ">
                    <RoughNotation
                        type="highlight"
                        show={true}
                        color="#a3ff61" // light yellow
                        animationDuration={1200}
                        strokeWidth={0.6}
                    >
                        Summer
                    </RoughNotation>
                </h1>
            </div>
            <div className='flex flex-col w-full justify-center gap-16'>

            <SeasonalFruits/>
            <SeasonalVegetables/>
            </div>
        </div>
    )
}

export default SeasonalHighlights