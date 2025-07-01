"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import { usePathname } from "next/navigation";
import ProductCard from "../../components/ProductCard";
import React from "react";

// ✅ Product type
type Product = {
  id: number;
  namee: string;
  image: string;
  price: number;
};

const Page = () => {
  const [items, setItems] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    let isMounted = true;

    const fetchItems = async () => {
      try {
        const res = await fetch("/api/items");
        if (!res.ok) throw new Error("Failed to fetch");
        const data: Product[] = await res.json();
        if (isMounted) {
          setItems(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
        if (isMounted) setLoading(false);
      }
    };

    fetchItems();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <Head>
        <link rel="preload" as="image" href="/heroImage.webp" />
      </Head>

      <div className="w-full min-h-screen px-4">
        {/* Hero Section */}
        <div
          className="py-5 flex items-center font-playfair justify-center h-[90vh] text-cyan-200 flex-col w-full px-4 md:px-12 lg:px-32 gap-12"
          style={{
            backgroundImage: "url('/heroImage.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="w-full flex items-center justify-center gap-3 md:gap-4 flex-col">
            <h1 className="text-3xl text-center md:text-5xl lg:text-5xl xl:text-5xl">
              Fresh Fruits & Vegetables Delivered to Your Doorstep
            </h1>
            <h3 className="text-center font-playfair2 font-thin text-sm tracking-wide md:text-lg lg:text-2xl">
              Farm-fresh, organic produce sourced directly from local farms.
              <br />
              Guaranteed same-day delivery
            </h3>
          </div>
          <a
            href="#products"
            className="font-[100] text-2xl opacity-[0.8] bg-cyan-700 text-white px-3 py-2"
          >
            Shop now!
          </a>
        </div>

        {/* Products Section */}
        <div
          id="products"
          className="products-cont w-full px-0 md:px-4 py-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 place-items-center lg:w-[80%] mx-auto mt-4"
        >
          {loading ? (
            <p className="text-center col-span-full text-lg text-gray-500">
              Loading products...
            </p>
          ) : items?.length > 0 ? (
            items.map((item) => <ProductCard key={item.id} product={item} />)
          ) : (
            <p className="text-center col-span-full text-lg text-gray-500">
              No products found.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
