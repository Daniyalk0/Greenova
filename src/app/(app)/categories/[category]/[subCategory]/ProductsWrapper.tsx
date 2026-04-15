// ProductsWrapper.tsx

import CategoryCommonComponent from "@/components/categoryCommonComp/CategoryCommonComponent";
import { getProducts } from "@/lib/products";
import { Category, Season } from "@prisma/client";

type Props = {
  category: string;
  subCategory: string;
  isSeasonalPage: boolean;
  selectedSeason?: Season;
};

export default async function ProductsWrapper({
  category,
  subCategory,
  isSeasonalPage,
  selectedSeason,
}: Props) {

  // simulate delay
//   await new Promise((resolve) => setTimeout(resolve, 5000));

  const products = await getProducts({
    category: category.toUpperCase() as Category,
    subCategory: isSeasonalPage ? undefined : subCategory,
    season: selectedSeason,
  });

  return (
    <CategoryCommonComponent
      products={products}
      isSeasonalPage={isSeasonalPage}
      selectedSeason={selectedSeason}
      enableSeasonHighlight={isSeasonalPage}
    />
  );
}