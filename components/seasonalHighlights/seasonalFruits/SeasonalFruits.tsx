"use client"
import React from 'react'
import ProductCard from '../../ui/productCard'

const SeasonalFruits = () => {
  const options = [
  { id: 1, label: "1 kg - ₹120" },
  { id: 2, label: "2 kg - ₹230" },
  { id: 5, label: "5 kg - ₹550" },
]
  return (
    <div className="flex w-full items-center justify-center lg:px-10 xl:px-20">

      <div className="px-5 w-full sm:px-6 lg:px-20 my-8 overflow-hidden min-h-screen">
        
        <h1 className="text-2xl md:text-3xl text-center mb-6 font-monasans_semibold">Seasonal Highlights</h1>

        <h1 className="text-md bg-[#c4fee5] w-fit px-3 py-1 rounded-full text-left mb-6 font-dmsans_light text-green-900">Fresh Fruits</h1>

        <div className='grid place-items-center grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full '>

          <ProductCard options={options} />
          <ProductCard options={options} />
          <ProductCard options={options} />
          <ProductCard options={options} />
          <ProductCard options={options} />
        </div>
      </div>
    </div>
  )
}

export default SeasonalFruits