"use client";
import Head from "next/head";
import { usePathname } from "next/navigation";
import React from "react";
import { useSession } from "next-auth/react";
import Hero from "@/components/hero-section/Hero";
import Categories from "@/components/categories/Categories";
import SeasonalFruits from "@/components/seasonalHighlights/seasonalFruits/SeasonalFruits";
import SeasonalHighlights from "@/components/seasonalHighlights/SeasonalHighlights";
import Banner from "@/components/Banner";

const Home = () => {
  const { data: session } = useSession();
  console.log("Current session:", session);

  

  return (
    <div className="">

    <Hero/>
    <Categories/>
    <SeasonalHighlights/>
    <Banner/>
    </div>
    // <>
    //   <Head>
    //     <link rel="preload" as="image" href="/heroImage.webp" />
    //   </Head>

    //   <div className="w-full min-h-screen px-4">

    //     <div
    //       className="py-5 flex items-center font-playfair justify-center h-[90vh] text-cyan-200 flex-col w-full px-4 md:px-12 lg:px-32 gap-12"
    //       style={{
    //         backgroundImage: "url('/heroImage.webp')",
    //         backgroundSize: "cover",
    //         backgroundPosition: "center",
    //       }}
    //     >
    //       <div className="w-full flex items-center justify-center gap-3 md:gap-4 flex-col">
    //         <h1 className="text-3xl text-center md:text-5xl lg:text-5xl xl:text-5xl">
    //           Fresh Fruits & Vegetables Delivered to Your Doorstep
    //         </h1>
    //         <h3 className="text-center font-playfair2 font-thin text-sm tracking-wide md:text-lg lg:text-2xl">
    //           Farm-fresh, organic produce sourced directly from local farms.
    //           <br />
    //           Guaranteed same-day delivery
    //         </h3>
    //       </div>
    //       <a
    //         href={!session ? '/login' : '/'}
    //         className="font-[100] cursor-pointer text-2xl opacity-[0.8] bg-cyan-700 text-white px-3 py-2"
    //       >
    //         Shop now!
    //       </a>
    //     </div>
    //   </div>
    // </>
  );
};

export default Home;
