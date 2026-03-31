import CategoryCommonComponent from "@/components/categoryCommonComp/CategoryCommonComponent";
import SeasonalRowSkeleton from "@/components/ui/loadingSkeletons/SeasonalRowSkeleton";
import SeasonalSkeleton from "@/components/ui/loadingSkeletons/SeasonalSkeleton";
import { getProducts } from "@/lib/products";
import { Category, Season } from "@prisma/client";
import { Suspense } from "react";


// type Props = {
//   params: {
//     category: "fruit" | "vegetable";
//     subCategory: string;
//   };
// };

type Params = {
  category: string;
  subCategory: string;
};

type SearchParams = {
  season?: Season;
};

export default async function SubCategoryPage({ params, searchParams }: {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}) {

   await new Promise((resolve) => setTimeout(resolve, 5000));
  const { category, subCategory } = await params;
  const { season } = await searchParams;

  const isSeasonalPage =
    category === "fruits" && subCategory === "seasonal";

  const selectedSeason = isSeasonalPage
    ? season ?? Season.WINTER
    : undefined;

  const products = await getProducts({
    category: category.toUpperCase() as Category,
    subCategory: isSeasonalPage ? undefined : subCategory,
    season: selectedSeason,
  });


  return (


    <Suspense fallback={<SeasonalRowSkeleton count={8} className="m-8"/>}>
      <CategoryCommonComponent
        products={products}
        isSeasonalPage={isSeasonalPage}
        selectedSeason={selectedSeason}
        enableSeasonHighlight={isSeasonalPage ? true : false}
        />
    </Suspense>
     
  );
}
