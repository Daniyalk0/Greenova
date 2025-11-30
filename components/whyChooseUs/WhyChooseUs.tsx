"use client"
import React, { useState } from 'react'
import { useRef } from "react";
import { Timeline } from '../ui/timeline';
import { RoughNotation } from 'react-rough-notation';
import {WhyChooseUsData } from './WhyChooseUsData';
import Heading from '../ui/Heading';

const WhyChooseUs = () => {
  const [data, setData] = useState(WhyChooseUsData);
  const ref = useRef(null);

  return (
    <div className="px-2 w-full sm:px-6 lg:px-20 my-6 md:my-14  overflow-hidden min-h-screen" ref={ref}>
      <div className='flex flex-col items-center justify-center w-full gap-2 sm:gap-5'>

        {/* <h1 className="text-2xl sm:text-3xl text-center mb-6 lg:mb-10 font-monasans_semibold">
          <span className="inline-block">
            <RoughNotation
              type="highlight"
              show={true}
              color="#a3ff61"
              animationDuration={1200}
              strokeWidth={0.6}
            >
              Why Choose Us
            </RoughNotation>
          </span>
        </h1> */}
        <Heading text="Why Choose Us"/>

        <div className="relative w-full overflow-clip">
          <Timeline data={data} />
        </div>

      </div></div>
  )
}

export default WhyChooseUs