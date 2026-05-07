// import { useAddress } from "@/context/AddressContext";
// import { AddressSkeleton } from "./AddressSkeleton";
import { AddressSectionSkeleton } from "@/src/app/(app)/checkout/sectionSkeletons/AddressSectionSkeleton";
import AddressSection from "./AddressSection";
import { useAddress } from "@/src/context/address-context";
import { MapPin } from "lucide-react";

export default function AddressSectionWrapper() {
  const { loading, addresses } = useAddress();

  if (loading) {
    return <AddressSectionSkeleton />;
  }

  if (addresses.length === 0) {
    return   <div className="flex flex-col items-center justify-center p-8 sm:p-12 border-2 border-dashed border-green-200 rounded-2xl bg-[#f4f8f5] transition-all">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <MapPin className="text-[#0c831f]" size={28} strokeWidth={1.5} />
          </div>
          <p className="text-gray-900 font-monasans_semibold text-lg mb-1">
            No addresses saved yet
          </p>
          <p className="text-sm font-dmsans_light text-gray-500 text-center">
            Add a delivery address to proceed with your checkout
          </p>
        </div>;
  }

  return <AddressSection />;
}