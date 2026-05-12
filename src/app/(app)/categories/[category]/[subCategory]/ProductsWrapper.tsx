// ProductsWrapper.tsx

import CategoryCommonComponent from "@/components/categoryCommonComp/CategoryCommonComponent";
import { getProducts } from "@/lib/products";
import { Category, Season } from "@prisma/client";
import { AlertCircle } from "lucide-react";

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
  try {
    // simulate delay
    // await new Promise((resolve) => setTimeout(resolve, 5000));

    
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
  } catch (error) {
    console.error("ProductsWrapper error:", error);
    const formatCategoryName = (value: string) => {
      return value
        .replace(/([A-Z])/g, " $1")
        .replace(/-/g, " ")
        .trim()
        .replace(/\b\w/g, (char) => char.toUpperCase());
    };
    const readableSubCategory = formatCategoryName(subCategory);
    const readableCategory = formatCategoryName(category);

   const title = isSeasonalPage
  ? `${readableCategory} seasonal products unavailable`
  : `${readableSubCategory} products unavailable`;

const description = isSeasonalPage
  ? `We're having trouble loading seasonal ${readableCategory.toLowerCase()} right now. Please try again shortly.`
  : `We couldn't load ${readableSubCategory.toLowerCase()} products at the moment. Please refresh the page and try again.`;

    return (
      <section className="w-full px-4 sm:px-6 md:px-10 lg:px-16 py-10">
        <div className="flex flex-col items-center justify-center rounded-3xl border border-orange-100 bg-gradient-to-b from-orange-50/70 to-white px-6 py-16 text-center shadow-sm">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100">
            <AlertCircle
              className="h-7 w-7 text-orange-500"
              aria-hidden="true"
            />
          </div>

          <h2 className="text-lg font-dmsans_semibold text-gray-900 capitalize">
            {title}
          </h2>

          <p className="mt-2 max-w-md font-dmsans_light text-sm leading-6 text-gray-500">
            {description}
          </p>
              <a
            href=""
            className="mt-6 inline-flex font-dmsans_light rounded-full bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Refresh page
          </a>

          {/* <button
          onClick={() => window.location.reload()}
          className="mt-6 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Try again
        </button> */}
        </div>
      </section>
    );
  }
}
