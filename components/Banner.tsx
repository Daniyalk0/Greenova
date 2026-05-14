"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import BannerSlide from "./BannerSlide";

// Accept banners as a prop!
export default function Banner({ banners = [] }: { banners: any[] }) {
  // If there are no banners in the database, don't render the empty box
  const hasMultipleBanners = banners.length > 1;
if (!banners || banners.length === 0) {
  return (
    <div className="w-full py-16 flex flex-col items-center justify-center text-center">
      
      {/* Icon */}
      <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <svg
          className="w-6 h-6 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 7h18M3 12h18M3 17h18"
          />
        </svg>
      </div>

      {/* Title */}
      <h2 className="text-lg font-dmsans_semibold text-gray-800">
        Unable to load banners
      </h2>

      {/* Subtitle */}
      <p className="text-sm font-dmsans_light text-gray-500 mt-1">
        Something went wrong while fetching banner data.
      </p>

      {/* Retry Button */}
      <button
        onClick={() => window.location.reload()}
        className="mt-5 font-dmsans_light px-5 py-2 rounded-lg bg-[#0c831f] text-white text-sm font-medium hover:bg-[#0a6e1a] transition"
      >
        Reload
      </button>
    </div>
  );
}
  return (
    <div className="px-4 sm:px-6 lg:px-8 xl:px-0 mb-8">
      <div
        className="
        relative
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
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          loop={hasMultipleBanners}
          speed={1200}
          allowTouchMove={hasMultipleBanners}
          autoplay={
            hasMultipleBanners
              ? {
                  delay: 3500,
                  disableOnInteraction: false,
                }
              : false
          }
          pagination={
            hasMultipleBanners
              ? {
                  clickable: true,
                }
              : false
          }
          className="h-full banner-swiper"
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={banner.id}>
              <BannerSlide {...banner} isPriority={index === 0} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
