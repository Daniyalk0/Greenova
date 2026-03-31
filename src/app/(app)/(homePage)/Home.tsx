
import React, { Suspense } from "react";
import { useSession } from "next-auth/react";
import Hero from "@/components/hero-section/Hero";
import SeasonalHighlights from "@/components/seasonalHighlights/SeasonalHighlights";
import Banner from "@/components/Banner";
import WhyChooseUs from "@/components/whyChooseUs/WhyChooseUs";
import Reviews from "@/components/reviews/Reviews";
import SeasonalSkeleton from "@/components/ui/loadingSkeletons/SeasonalSkeleton";

const Home = () => {


  return (
    <div className="">

      <Hero />
      <Banner />
      <Suspense fallback={<SeasonalSkeleton />}>
        <SeasonalHighlights />
      </Suspense>
      <WhyChooseUs />
      <Reviews />
    </div>
  );
};

export default Home;
