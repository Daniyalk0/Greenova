"use client"
import React, { useEffect, useState } from 'react'
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import ProductCard from '../../ui/productCard'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/src/store/store';

const SeasonalVegetables = () => {
  // const options = [
  //   { id: 1, label: "1 kg - ₹120" },
  //   { id: 2, label: "2 kg - ₹230" },
  //   { id: 5, label: "5 kg - ₹550" },
  // ]
  const seasonalNames = [
    "Cucumber",
    "Tomato",
    "Capsicum",
    "Bitter Gourd",
    "Lady Finger",
    "Spinach"]

  const products = useSelector((state: RootState) => state.products.items)
  const error = useSelector((state: RootState) => state.products.error)
  const loading = useSelector((state: RootState) => state.products.loading)

  const seasonalProducts = products.filter((product: any) =>
    seasonalNames.includes(product.name)
  );
  
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    <div className="flex w-full flex-col lg:px-10 xl:px-20">


        <h1 className="text-md bg-[#c4fee5] w-fit px-3 py-1 rounded-full text-left mb-6 font-dmsans_light text-green-900">Fresh Vegetables</h1>

        <div className='grid place-items-center grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full '>

          {limitedProducts?.map((p: any) => (
            <ProductCard
              key={p.id}
              name={p.name}
              img={p.imageUrl}
              price={p.basePricePerKg}
              options={p.availableWeights.map((w: number) => ({
                weight: w,
                price: p.basePricePerKg * w, // ✅ numeric price (not string)
              }))}
            />
          ))}

        </div>
      </div>
  )
}

export default SeasonalVegetables