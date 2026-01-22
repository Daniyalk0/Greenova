"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import ProductCard from "../ui/productCard";
import RouteCategoryPills from "../ui/RouteCategoryPills";
import SeasonSelect from "../ui/SeasonSelect";
import { buildProductOptions } from "@/lib/productOptions";

const CategoryCommonComponent = ({ type, isSeasonalPage } : {type: any, isSeasonalPage: any}) => {

  // Current selected season (default Winter)
  const [season, setSeason] = useState("Winter");

  const products = useSelector((state: RootState) => state.products.items);

  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);


  const seasons = [
    { id: 1, label: "Winter" },
    { id: 2, label: "Summer" },
    { id: 3, label: "Monsoon" },
  ];

  const seasonalMappingFruits = {
    winter: ["apple", "orange"],
    summer: ["mango", "watermelon"],
    monsoon: ["jamun", "corn"],
  };

  const seasonalMappingVegetables = {
    winter: ["peas", "carrot", "spinach"],
    summer: ["cucumber", "bottle gourd"],
    monsoon: ["ladyfinger", "pumpkin"],
  };

useEffect(() => {
  if (!products?.length) return;

  let matched: any[] = [];
  const selectedSeason: any = (season as any).toLowerCase();

  // Which mapping to use?
  const map: any =
    type === "fruits"
      ? seasonalMappingFruits
      : type === "vegetables"
      ? seasonalMappingVegetables
      : null;

  // Seasonal logic
  if (isSeasonalPage && map && map[selectedSeason]?.length) {
    matched = products.filter(
      (item: any) =>
        item.name &&
        map[selectedSeason].includes(item.name.toLowerCase())
    );
  } else {
    // Non-seasonal fallback (normal category pages)
    matched = products.filter(
      (item: any) =>
        item.subCategory &&
        item.subCategory.toLowerCase() === (type as any).toLowerCase()
    );

  }

  setFilteredProducts(matched);
}, [products, type, season, isSeasonalPage]);


  const wishlistItems = useSelector(
    (state: RootState) => state.wishlist.items
  );
  const cartProducts = useSelector(
    (state: RootState) => state.cartProducts.items
  );

  return (
    <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 py-6">

      {/* Page Navigation Pills */}
      {/* <div className="mb-6">
        <RouteCategoryPills />
      </div> */}

      {/* Season Selector only on seasonal pages */}
      {isSeasonalPage && (
        <div className="mb-6">
          <SeasonSelect
            seasons={seasons}
            onSelect={(opt) => setSeason(opt.label)}
          />
        </div>
      )}

      {/* Products grid */}
      <div
        className="
          grid place-items-center 
          grid-cols-2 gap-4 
          sm:grid-cols-3 
          md:grid-cols-4 
          lg:grid-cols-5 
          w-full
        "
      >
        {filteredProducts.map((p: any) => (
          <ProductCard
            key={p.id || p.name}
            product={p}
             wishlist={wishlistItems && wishlistItems}
              cart={cartProducts && cartProducts}
          options={buildProductOptions(p)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryCommonComponent;
