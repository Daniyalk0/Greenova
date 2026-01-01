"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";
import BannerSlide from "./BannerSlide";

export const BANNERS = [
  {
    id: 1,
    title: "Fresh tomatoes – 15% off",
    subtitle: "Direct from farms",
    badge: "Today’s Deal",
    price: 89,
    originalPrice: 105,
    discountText: "15% OFF",
    cta: "Shop now",
    meta: "Free delivery",
    imageUrl: "/banners/tomato.png",

   colors: {
  text: "text-red-900",
  subText: "text-red-700",
  badgeBg: "bg-red-200",
  badgeText: "text-red-800",
  ctaBg: "bg-white",
  ctaText: "text-red-900",
}

  },
  // {
  //   id: 2,
  //   title: "Seasonal fruits combo",
  //   subtitle: "Sweet & handpicked",
  //   badge: "Limited Stock",
  //   price: 199,
  //   originalPrice: 249,
  //   discountText: "Save ₹50",
  //   cta: "Buy combo",
  //   meta: "Arrives in 10 mins",
  //   imageUrl: "/banners/fruits.png",

  //   colors: {
  //     text: "text-white",
  //     subText: "text-white/80",
  //     badgeBg: "bg-white/20",
  //     badgeText: "text-white",
  //     ctaBg: "bg-white",
  //     ctaText: "text-black",
  //   },
  // },
];


const Banner = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-9 my-0 ">
      <div
        className="
          w-full max-w-[1400px] mx-auto
          h-[160px] sm:h-[180px] md:h-[190px] lg:h-[200px]
          rounded-3xl overflow-hidden
          transition-all duration-500
          hover:-translate-y-1
          hover:shadow-[0_0_40px_rgba(0,0,0,0.25)]
        "
      >
        <Swiper slidesPerView={1} loop autoplay={{ delay: 2500 }} className="h-full">
          {BANNERS.map((banner) => (
            <SwiperSlide key={banner.id}>
              <BannerSlide {...banner} />
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </div>
  );
};

export default Banner;
