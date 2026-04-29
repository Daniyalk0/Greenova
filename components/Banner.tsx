"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import BannerSlide from "./BannerSlide";

// Accept banners as a prop!
export default function Banner({ banners = [] }: { banners: any[] }) {
  // If there are no banners in the database, don't render the empty box
  if (!banners || banners.length === 0) return null;

  return (
  <div className="px-4 sm:px-6 lg:px-8 xl:px-0 mb-8">
  <div
    className="
      w-full max-w-[1100px] xl:max-w-[1340px] mx-auto
      h-[180px] sm:h-[230px] md:h-[240px] lg:h-[270px] xl:h-[290px]
      rounded-2xl lg:rounded-3xl overflow-hidden
      transition-all duration-500
      shadow-[0_8px_30px_rgba(0,0,0,0.12)]
      hover:-translate-y-1
      hover:shadow-[0_10px_50px_rgba(0,0,0,0.18)]
    "
  >
    <Swiper
      slidesPerView={1}
      loop
      autoplay={{ delay: 2500 }}
      className="h-full"
    >
      {banners.map((banner, index) => (
        <SwiperSlide key={banner.id}>
          <BannerSlide
            {...banner}
            isPriority={index === 0}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
</div>
  );
}