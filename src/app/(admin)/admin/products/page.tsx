import { Suspense } from "react";
import ProductsTable from "./ProductsTable";
import ProductsSkeleton from "./ProductsSkeleton";
import Link from "next/dist/client/link";
// import ProductsSkeleton from "./ProductsSkeleton";

export default function Page(props: {
  searchParams: Promise<{ page?: string }>;
}){
   return (
    <div className=" p-0 sm:p-4 lg:p-8 bg-gray-50/50 ">

      {/* ✅ HEADER (instant render) */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        
        <div className="my-3 md:mb-3 md:mt-0">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-monasans_semibold text-gray-900">
            Products Management
          </h1>
          <p className="text-gray-500 text-[13px] sm:text-[14px] font-dmsans_light mt-1">
            Manage and update your product catalog with ease.
          </p>
        </div>

        {/* Add Product button (static) */}
        <Link
          href="/admin/products/new"
          className="
            fixed z-50 bottom-6 right-6
            w-14 h-14 rounded-full
            flex items-center justify-center
            bg-black text-white shadow-xl hover:bg-gray-800

            sm:top-6 sm:right-6 sm:bottom-auto
            sm:w-auto sm:h-auto
            sm:px-5 sm:py-2.5
            sm:rounded-lg
            sm:flex sm:items-center sm:gap-2
            font-dmsans_semibold
          "
        >
          +
          <span className="hidden sm:inline text-sm">
            Add Product
          </span>
        </Link>
      </div>

      {/* ✅ DATA AREA */}
      <div className="max-w-6xl mx-auto mt-4">
        <Suspense fallback={<ProductsSkeleton />}>
          <ProductsTable {...props} />
        </Suspense>
      </div>
    </div>
  );
}