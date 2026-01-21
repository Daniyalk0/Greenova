"use client"
import React, { useEffect, useState } from 'react'
import ProductCard from '../../ui/productCard'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/src/store/store';
import { buildProductOptions } from '@/lib/productOptions';

const SeasonalFruits = () => {
  // const options = [
  //   { id: 1, label: "1 kg - ₹120" },
  //   { id: 2, label: "2 kg - ₹230" },
  //   { id: 5, label: "5 kg - ₹550" },
  // ]
  const seasonalNames = [
    "Mango",
    "Watermelon",
    "Kiwi",
    "Orange",
    "Pineapple",
    "Lychee"]

  const cartProducts = useSelector((state: RootState) => state.cartProducts.items);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);;

  const products = useSelector((state: RootState) => state.products.items)
  const error = useSelector((state: RootState) => state.products.error)
  const loading = useSelector((state: RootState) => state.products.loading)
  const [windowWidth, setWindowWidth] = useState<number>(0);
  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const seasonalProducts = products.filter((product: any) =>
    seasonalNames.includes(product.name)
  );



  const getLimit = () => {
    if (windowWidth < 768) return 6;
    if (windowWidth >= 768 && windowWidth < 1025) return 4;
    return 5; // 1080px and above
  };


  const limitedProducts = seasonalProducts.slice(0, getLimit());

  if (error) {
    return <div>Error: {error}</div>
  }
  if (loading) return <div>Loading...</div>
  return (
    <div className="flex w-full lg:px-10 xl:px-20 flex-col">
      <h1 className="text-md bg-[#c4fee5] w-fit px-3 py-1 rounded-full mb-4 font-dmsans_light text-green-900">
        Fresh Fruits
      </h1>

      <div
        className="
      flex gap-4 overflow-x-auto scrollbar-hide
      md:grid md:grid-cols-4 md:overflow-visible
      lg:grid-cols-5
    "
      >
        {limitedProducts.map((p: any) => {
          if (!p) return null;

          return (
            <div
              key={p.id || p.name}
              className="
            min-w-[160px]
            md:min-w-0
          "
            >
              <ProductCard
                product={p}
                wishlist={wishlistItems}
                cart={cartProducts}
                 options={buildProductOptions(p)}
              />
            </div>
          );
        })}
      </div>
    </div>


  )
}

export default SeasonalFruits