import { Package, ShoppingBag, IndianRupee } from "lucide-react";

export default function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
      <StatSkeleton icon={<ShoppingBag size={20} />} />

      <StatSkeleton icon={<IndianRupee size={20} />} />

      <StatSkeleton icon={<Package size={20} />} />
    </div>
  );
}

function StatSkeleton({ icon }: { icon: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 shadow-sm flex items-center justify-between">
      <div>
        <div className="h-4 w-24 bg-gray-200 rounded mb-3" />
        <div className="h-8 w-20 bg-gray-300 rounded" />
      </div>

      <div className="p-3 bg-gray-100 rounded-xl text-gray-300">
        {icon}
      </div>
    </div>
  );
}