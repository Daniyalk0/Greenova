import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteProduct } from "./actions";
import ConfirmDelete from "./components/ConfirmDelete";
// import DeleteProductButton from "./components/DeleteProductButton";
import { Pencil, Trash2 } from "lucide-react";
// import DeleteButton from "./components/DeleteProductButton";
// import DeleteProductAction from "./components/DeleteProductAction";
// import DeleteEntityAction from "./components/DeleteProductAction";
// import { useRouter } from "next/navigation";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
     <div className=" sm:mt-6 lg:mt-8 p-3 sm:p-4 lg:p-8 bg-gray-50/50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
   <div className="my-3 md:mb-3 md:mt-0">
  <h1 className="text-xl sm:text-2xl lg:text-3xl font-monasans_semibold text-gray-900">
    Products Management
  </h1>
  <p className="text-gray-500 text-[13px] sm:text-[14px] font-dmsans_light mt-1">
Manage and update your product catalog with ease.
  </p>
</div>

        <Link
          href="/admin/products/new"
          className="
    fixed z-50 transition
    
    /* 📱 Mobile (default) */
    bottom-6 right-6
    w-14 h-14 rounded-full
    flex items-center justify-center
    bg-black text-white shadow-xl hover:bg-gray-800

    /* 💻 sm and up */
    sm:top-6 sm:right-6 sm:bottom-auto
    sm:w-auto sm:h-auto
    sm:px-5 sm:py-2.5
    sm:rounded-lg
    sm:shadow-md
    sm:flex sm:items-center sm:gap-2
    font-dmsans_semibold
  "
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>

          <span className="hidden sm:inline text-sm font-medium ">
            Add Product
          </span>
        </Link>
      </div>

      {/* Desktop Table */}

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto px-3">
          <table className="w-full text-xs sm:text-sm ">
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
                          <span className="sm:hidden">
                            <Pencil size={16} />
                          </span>

                          {/* Text (desktop) */}
                          <span className="hidden sm:inline text-sm">Edit</span>
                        </Link>

                        {/* Delete */}
                        <ConfirmDelete id={p.id} type="product">
                          <button className="text-red-600 flex items-center">
                            {/* Icon (mobile) */}
                            <span className="sm:hidden">
                              <Trash2 size={16} />
                            </span>

                            {/* Text (desktop) */}
                            <span className="hidden sm:inline text-sm">
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
      </div>

      {/* Mobile Cards */}
      {/* <div className="hidden space-y-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl shadow-sm border p-4 space-y-3"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-semibold">{p.name}</h3>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  p.inStock
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {p.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <p className="text-sm text-gray-600">Price: ₹{p.basePricePerKg}</p>

            <div className="flex justify-end gap-4 pt-2 border-t">
              <Link
                href={`/admin/products/${p.id}/edit`}
                className="text-sm text-blue-600"
              >
                Edit
              </Link>
              <ConfirmDelete id={p.id} type="product">
                <button className="text-red-600">Delete</button>
              </ConfirmDelete>
            </div>
          </div>
        ))}
      </div> */}

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
  );
}
