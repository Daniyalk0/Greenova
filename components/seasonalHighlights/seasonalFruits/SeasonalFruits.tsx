"use client"
import React, { useEffect, useState } from 'react'
import ProductCard from '../../ui/productCard'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/src/store/store';
import { buildProductOptions } from '@/lib/productOptions';

const SeasonalFruits = ({ fruits }: any) => {


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
      lg:grid lg:grid-cols-5 sm:gap-6 lg:overflow-visible
    "
      >
        {fruits?.map((p: any) => {
          if (!p) return null;

          return (
            <div
              key={p.id || p.name}
              className="
            min-w-[160px] md:min-w-[180px]
            lg:min-w-0
          "
            >
              <ProductCard
                product={p}
                wishlist={wishlistItems}
                cart={cartProducts ?? []} 
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