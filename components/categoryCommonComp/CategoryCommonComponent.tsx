"use client";

import {useMemo } from "react";
// import ProductCard from "../ui/productCard";
import SeasonSelect from "../ui/SeasonSelect";
import { buildProductOptions } from "@/lib/productOptions";
import ProductCard from "../ui/productCard";
import { useRouter } from "next/navigation";
import { Season } from "@prisma/client";

type Props = {
  products: any[];
  isSeasonalPage?: boolean;
  selectedSeason?: Season;
  enableSeasonHighlight?: boolean;
};

const seasonsOptions: { id: number; label: string; value: Season }[] = [
  { id: 1, label: "Winter", value: Season.WINTER },
  { id: 2, label: "Summer", value: Season.SUMMER },
  { id: 3, label: "Monsoon", value: Season.MONSOON },
  { id: 4, label: "All Seasons", value: Season.ALL },
];

export default function CategoryCommonComponent({
  products,
  isSeasonalPage = false,
  selectedSeason = Season.SUMMER,
  enableSeasonHighlight = false
}: Props) {

  const router = useRouter();

  const orderedProducts = useMemo(() => {
    if (!enableSeasonHighlight || !isSeasonalPage || !selectedSeason) {
      return products;
    }

    return [...products].sort((a, b) => {
      const aPriority = a.season === selectedSeason ? 1 : 0;
      const bPriority = b.season === selectedSeason ? 1 : 0;
      return bPriority - aPriority;
    });
  }, [products, selectedSeason, isSeasonalPage, enableSeasonHighlight]);


  return (
    <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 py-6">
      {/* Season selector only for seasonal pages */}
      {isSeasonalPage && (
        <div className="mb-6">
          <SeasonSelect
            seasons={seasonsOptions}
            value={
              seasonsOptions.find((s) => s.value === selectedSeason) || seasonsOptions[0]
            }
            onSelect={(opt) => {
              router.push(`?season=${opt.value}`);
            }}
          />

        </div>
      )}

      {/* Products grid */}
      <div
        className="
          grid grid-cols-2 gap-4
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
          w-full
        "
      >
   {orderedProducts.map((p) => {
  const isHighlighted =
    enableSeasonHighlight &&
    isSeasonalPage &&
    p.season === selectedSeason;

  return (
    <ProductCard
      key={p.id}
      product={p}
      options={buildProductOptions(p)}
      highlight={isHighlighted}
      enableSeasonHighlight={enableSeasonHighlight}
    />
  );
})}

      </div>
    </div>
  );
}
