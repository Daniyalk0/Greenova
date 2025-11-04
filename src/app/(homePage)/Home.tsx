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
import WhyChooseUs from "@/components/whyChooseUs/WhyChooseUs";
import Reviews from "@/components/reviews/Reviews";
import Footer from "@/components/footer/Footer";

const Home = () => {
  const { data: session } = useSession();
  console.log("Current session:", session);

  

  return (
    <div className="">

    <Hero/>
    <Categories/>
    <SeasonalHighlights/>
    <Banner/>
    <WhyChooseUs/>
    <Reviews/>
    <Footer/>
    </div>
  );
};

export default Home;
