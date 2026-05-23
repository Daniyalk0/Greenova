"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import SeasonSelect from "../ui/SeasonSelect";
import { buildProductOptions } from "@/lib/productOptions";
import ProductCard from "../ui/productCard";
import { useRouter } from "next/navigation";
import { Season } from "@prisma/client";
import SeasonalRowSkeleton from "../ui/loadingSkeletons/SeasonalRowSkeleton";
import CategoriesSkeleton from "../ui/loadingSkeletons/CategoriesSkeleton";

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
  enableSeasonHighlight = false,
}: Props) {
  const [localSeason, setLocalSeason] = useState(selectedSeason);

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  useEffect(() => {
    setLocalSeason(selectedSeason);
  }, [selectedSeason]);

  const orderedProducts = useMemo(() => {
    if (!enableSeasonHighlight || !isSeasonalPage || !localSeason) {
      return products;
    }

    return [...products].sort((a, b) => {
      const getPriority = (season: Season) => {
        if (season === localSeason) return 3;
        if (season === Season.ALL) return 2;
        return 1;
      };

      return getPriority(b.season) - getPriority(a.season);
    });
  }, [products, localSeason, isSeasonalPage, enableSeasonHighlight]);

  return (
    <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 py-6">
      {/* Season selector */}
      {isSeasonalPage && (
        <div className="mb-6">
          <SeasonSelect
            seasons={seasonsOptions}
            value={
              seasonsOptions.find((s) => s.value === localSeason) ||
              seasonsOptions[0]
            }
            onSelect={(opt) => {
              const newUrl = `?season=${opt.value}`;

              // instant UI update
              setLocalSeason(opt.value);

              // instant URL update
              window.history.replaceState(null, "", newUrl);

              // navigation with loading state
              startTransition(() => {
                router.push(newUrl);
              });
            }}
          />
        </div>
      )}

      {/* Skeleton loading */}
      {isPending ? (
        // <div
        //   className="
        //     grid grid-cols-2 gap-4
        //     sm:grid-cols-3
        //     md:grid-cols-4
        //     lg:grid-cols-5
        //     w-full
        //   "
        // >
        //   {Array.from({ length: 10 }).map((_, i) => (
        //     <div
        //       key={i}
        //       className="h-[320px] rounded-2xl bg-gray-200 animate-pulse"
        //     />
        //   ))}
        // </div>
        <CategoriesSkeleton count={8} className="w-full" />
      ) : (
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
              p.season === localSeason;

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
      )}
    </div>
  );
}
