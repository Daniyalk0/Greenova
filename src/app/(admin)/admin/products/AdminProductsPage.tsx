"use client";

import Link from "next/link";
import ConfirmDelete from "./components/ConfirmDelete";
import { Pencil, Trash2 } from "lucide-react";

type Product = {
  id: number;
  name: string;
  basePricePerKg: number;
  inStock: boolean;
};

interface AdminProductsPageProps {
  products: Product[];
  page: number;
  totalCount: number;
  limit: number;
}

export default function AdminProductsPage({
  products,
  page,
  totalCount,
  limit,
}: AdminProductsPageProps) {
  console.log({ page, limit, totalCount });
  return (
    <div className="flex flex-col max-h-screen overflow-hidden sm:overflow-y-auto bg-gray-50/50">
      {/* Header */}
      {/* <div className=" p-3 sm:p-4 lg:p-8 flex-shrink-0"> */}
       

        {/* Scrollable Content Area */}
        <div className="flex-1 p-1 sm:p-4 lg:p-8">
          {/* Desktop Table */}
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="text-zinc-700 border-b border-zinc-300 font-dmsans_semibold">
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold uppercase">
                    Name
                  </th>

                  {/* Hide price on very small screens */}
                  <th className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold uppercase">
                    Price
                  </th>

                  <th className="px-2 sm:px-6 py-3 sm:py-4 text-left font-semibold uppercase">
                    Stock
                  </th>

                  <th className="pr-3 md:pr-auto sm:px-6 py-3 sm:py-4 text-right font-semibold uppercase">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {products
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-green-100 font-monasans_semibold"
                    >
                      {/* Name */}
                      <td className="px-3 sm:px-6 py-3 sm:py-4 font-medium">
                        {p.name}
                      </td>

                      {/* Price (hidden on very small screens) */}
                      <td className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4">
                        ₹{p.basePricePerKg}
                      </td>

                      {/* Stock */}
                      <td className="px-0 sm:px-4 py-3 sm:py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-[10px] sm:text-xs font-medium ${
                            p.inStock
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {p.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-right">
                        <div className="flex items-center justify-end gap-2 sm:gap-3">
                          {/* Mobile Icon */}
                          <Link
                            href={`/admin/products/${p.id}/edit`}
                            className="text-blue-600 flex items-center"
                          >
                            {/* Icon (mobile) */}
                            <span className="lg:hidden">
                              <Pencil size={16} />
                            </span>

                            {/* Text (desktop) */}
                            <span className="hidden lg:inline text-sm">
                              Edit
                            </span>
                          </Link>

                          {/* Delete */}
                          <ConfirmDelete id={p.id} type="product">
                            <button className="text-red-600 flex items-center">
                              {/* Icon (mobile) */}
                              <span className="lg:hidden">
                                <Trash2 size={16} />
                              </span>

                              {/* Text (desktop) */}
                              <span className="hidden lg:inline text-sm">
                                Delete
                              </span>
                            </button>
                          </ConfirmDelete>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10">
            <div className="text-xs lg:text-sm font-dmsans_light text-gray-600 text-center sm:text-left w-full sm:w-auto">
              Showing {(page - 1) * limit + 1} to{" "}
              {Math.min(page * limit, totalCount)} of{" "}
              <span className="font-dmsans_semibold">{totalCount}</span>{" "}
              products
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 w-full sm:w-auto">
              <Link
                href={`/admin/products?page=${page - 1}`}
                className={`px-4 py-2 rounded-lg border font-dmsans_semibold text-xs lg:text-sm transition-all ${
                  page <= 1
                    ? "opacity-50 cursor-not-allowed border-gray-200 text-gray-400"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                }`}
                onClick={(e) => page <= 1 && e.preventDefault()}
              >
                ← Prev
              </Link>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.ceil(totalCount / limit) }).map(
                  (_, idx) => {
                    const pageNum = idx + 1;
                    return (
                      <Link
                        key={pageNum}
                        href={`/admin/products?page=${pageNum}`}
                        className={`w-8 h-8 flex items-center justify-center rounded text-xs font-dmsans_semibold transition-all ${
                          page === pageNum
                            ? "bg-black text-white"
                            : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </Link>
                    );
                  },
                )}
              </div>

              <Link
                href={`/admin/products?page=${page + 1}`}
                className={`px-4 py-2 rounded-lg border font-dmsans_semibold text-xs lg:text-sm transition-all ${
                  page >= Math.ceil(totalCount / limit)
                    ? "opacity-50 cursor-not-allowed border-gray-200 text-gray-400"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                }`}
                onClick={(e) =>
                  page >= Math.ceil(totalCount / limit) && e.preventDefault()
                }
              >
                Next →
              </Link>
            </div>
          </div>

          {/* Empty State */}
          {products.length === 0 && (
            <div className="bg-white rounded-xl border p-10 text-center">
              <h3 className="text-sm font-medium">No products</h3>
              <p className="text-sm text-gray-500">
                Get started by adding a new product.
              </p>
            </div>
          )}
        </div>
      </div>
    // </div>
  );
}
