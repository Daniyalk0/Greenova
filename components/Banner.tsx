"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

// Import required modules
import { Autoplay, Pagination } from 'swiper/modules';
import Image from 'next/image';
import Heading from './ui/Heading';

const Banner = () => {
  return (
    <div className="px-5 w-full sm:px-6 lg:px-20 my-6 md:my-14  overflow-hidden md:min-h-screen pb-10">
      <div className='flex items-center justify-center w-full gap-2 sm:gap-5'>

        <Heading text='Offers / Discounts'/>
      </div>
      <div className="w-full h-[60vw] lg:h-[40vw] xl:h-[38vw] relative overflow-hidden rounded-3xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2  cursor-pointer">

        <Swiper
          slidesPerView={1}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}


          pagination={{
            clickable: true, // ✅ enable dots
          }}
          modules={[Autoplay, Pagination]} // ✅ include Pagination module
          speed={500}
          className="w-full h-full rounded-3xl overflow-hidden relative"
        >
          <SwiperSlide className="relative w-full h-full ">
            <Image
              src="/almondsBanner.png"
              alt="almonds banner"
              fill
              className="object-cover object-center "
              priority
            />

          </SwiperSlide>


          <SwiperSlide className="relative w-full h-full">
            <Image
              src="/kiwiBanner.png"
              alt="kiwi banner"
              fill
              className="object-cover object-center"
            />
          </SwiperSlide>


          <SwiperSlide className="relative w-full h-full">
            <Image
              src="/tomatoBanner.png"
              alt="tomato banner"
              fill
              className="object-cover object-center"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}

export default Banner