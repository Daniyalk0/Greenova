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
    <div className="px-5 w-full sm:px-6 lg:px-20 my-6 md:my-14  md:min-h-screen pb-10">
      <div className='flex items-center justify-center w-full gap-2 sm:gap-5'>

        <Heading text='Offers / Discounts' />
      </div>
      <div className="w-full h-[60vw] lg:h-[40vw] xl:h-[38vw] 
     relative rounded-3xl transition-all duration-500 
     cursor-pointer hover:-translate-y-2
     hover:shadow-[0_0_50px_rgba(0,0,0,0.30)]">



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
              src="/banners/almondsBanner.webp"
              alt="almonds banner"
              fill
              className="object-cover object-center "
              priority
            />

          </SwiperSlide>


          <SwiperSlide className="relative w-full h-full">
            <Image
              src="/banners/kiwiBanner.webp"
              alt="kiwi banner"
              fill
              className="object-cover object-center"
            />
          </SwiperSlide>


          <SwiperSlide className="relative w-full h-full">
            <Image
              src="/banners/orangesBanner.webp"
              alt="tomato banner"
              fill
              className="object-cover object-center"
            />
          </SwiperSlide>
          <SwiperSlide className="relative w-full h-full">
            <Image
              src="/banners/spinachBanner.webp"
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