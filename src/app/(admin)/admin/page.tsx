import { prisma } from "@/lib/prisma";
import { Plus, Package, ShoppingBag, IndianRupee, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const hasOrders = false; // Toggle this once you have real data logic
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mt-10 sm:mt-0 font-monasans_semibold">Overview</h1>
        <p className="text-gray-500 font-dmsans_light">Welcome back! Here&apos;s what&apos;s happening with your store.</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Orders" value="0" icon={<ShoppingBag className="text-blue-600" size={20} />} />
        <StatCard title="Total Revenue" value="₹0" icon={<IndianRupee className="text-green-600" size={20} />} />
        <StatCard title="Total Products" value={products?.length} icon={<Package className="text-purple-600" size={20} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions - Very useful during development */}
        <div className="bg-white p-2 sm:p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 font-dmsans_semibold">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/admin/products/new"
              className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-gray-300 hover:border-green-500 hover:bg-green-50 transition-all group"
            >
              <Plus className="mb-2 text-gray-400 group-hover:text-green-600" />
              <span className="text-sm font-medium text-gray-600 group-hover:text-green-700 font-dmsans_light">
                Add Product
              </span>
            </Link>

            <Link
              href="/"
              target="_blank"
              className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all group"
            >
              <LayoutDashboard className="mb-2 text-gray-400 group-hover:text-blue-600" />
              <span className="text-sm font-medium text-gray-600 group-hover:text-blue-700 font-dmsans_light">
                View Storefront
              </span>
            </Link>
          </div>
        </div>

        {/* Empty State / Recent Orders */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center min-h-[300px]">
          {!hasOrders ? (
            <>
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="text-gray-300" size={32} />
              </div>
              <h3 className="text-lg font-medium text-gray-800 font-dmsans_semibold">No orders yet!</h3>
              <p className="text-gray-500 max-w-[250px] text-sm mt-1 font-dmsans_light">
                Once customers start buying your products, they will appear here.
              </p>
            </>
          ) : (
            <div className="w-full text-left">
              <h2 className="text-lg font-semibold mb-4 text-left font-dmsans_semibold">Recent Orders</h2>
              {/* Order list would go here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl 
                    p-4 sm:p-6 shadow-sm 
                    flex items-center justify-between gap-3">

      <div className="min-w-0">
        <p className="text-xs sm:text-sm text-gray-500 truncate font-dmsans_semibold">
          {title}
        </p>

        <p className="text-xl sm:text-2xl lg:text-3xl font-bold mt-1 text-gray-900 font-dmsans_semibold">
          {value}
        </p>
      </div>

      <div className="p-2 sm:p-3 bg-gray-50 rounded-xl flex items-center justify-center">
        {icon}
      </div>

    </div>
  );
}

