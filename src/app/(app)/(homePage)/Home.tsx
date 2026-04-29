
import React, { Suspense } from "react";
import { useSession } from "next-auth/react";
import Hero from "@/components/hero-section/Hero";
import SeasonalHighlights from "@/components/seasonalHighlights/SeasonalHighlights";
import Banner from "@/components/Banner";
import WhyChooseUs from "@/components/whyChooseUs/WhyChooseUs";
import Reviews from "@/components/reviews/Reviews";
import SeasonalSkeleton from "@/components/ui/loadingSkeletons/SeasonalSkeleton";
import { prisma } from "@/lib/prisma";

const Home = async () => {
  const dbBanners = await prisma.banner.findMany({
    where: { isActive: true }, // Only show active banners
    orderBy: { sortOrder: "asc" }, // Show them in the correct order
  });

  return (
    <div className="">

      <Hero />
      <Banner banners={dbBanners} />
      <Suspense fallback={<SeasonalSkeleton />}>
        <SeasonalHighlights />
      </Suspense>
      <WhyChooseUs />
      <Reviews />
    </div>
  );
};

export default Home;
