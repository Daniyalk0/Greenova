import SeasonalFruits from "./seasonalFruits/SeasonalFruits";
import SeasonalVegetables from "./seasonalVegetables/SeasonalVegetables";
import { getSeasonalProducts } from "@/lib/getSeasonalProducts";
import { Sprout, AlertCircle } from "lucide-react"; // Import some icons
import Link from "next/link"; // Assuming Next.js based on your syntax

const SeasonalHighlights = async () => {
  try {
    const { fruits, vegetables } = await getSeasonalProducts();

    const hasFruits = fruits?.length > 0;
    const hasVegetables = vegetables?.length > 0;

    // 1. PRODUCTION EMPTY STATE
    if (!hasFruits && !hasVegetables) {
      return (
        <section className="px-5 w-full sm:px-6 lg:px-5 pb-10 my-6 md:my-0">
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50/50 px-6 py-14 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
              <Sprout className="h-6 w-6 text-green-600" />
            </div>

            <h3 className="text-base font-semibold text-gray-900 font-dmsans_semibold">
              Seasonal highlights unavailable
            </h3>

            <p className="mt-2 max-w-sm text-sm text-gray-500 font-dmsans_light">
              We couldn&apos;t load seasonal products right now. Please try again
              later.
            </p>
          </div>
        </section>
      );
    }

    // SUCCESS STATE
    return (
      <section className="px-5 w-full sm:px-6 lg:px-5 pb-10 my-6 md:my-0">
        <div className="flex flex-col w-full gap-10">
          {hasFruits && <SeasonalFruits fruits={fruits} />}
          {hasVegetables && <SeasonalVegetables vegetables={vegetables} />}
        </div>
      </section>
    );
  } catch (error) {
    // 2. PRODUCTION ERROR STATE (If the API/Database fails)
    console.error("Failed to fetch seasonal products:", error);

    return (
      <section className="px-5 w-full sm:px-6 lg:px-5 pb-10 my-6 md:my-0">
        <div className="flex flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50/50 px-6 py-12 text-center">
          <AlertCircle
            className="h-10 w-10 text-red-400 mb-3"
            aria-hidden="true"
          />
          <h3 className="text-sm font-medium text-red-800 font-dmsans_semibold">
            Unable to load seasonal highlights
          </h3>
          <p className="mt-1 text-sm text-red-600 font-dmsans_light">
            We ran into a temporary issue. Please try refreshing the page.
          </p>
        </div>
      </section>
    );
  }
};

export default SeasonalHighlights;
