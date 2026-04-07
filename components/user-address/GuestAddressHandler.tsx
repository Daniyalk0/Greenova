"use client";

import { MapPin } from "lucide-react";
import { clearGuestAddress } from "@/lib/clientAddress";
import { useAddress } from "@/src/context/address-context";

export default function GuestAddressHandler() {
  const { pendingGuestAddress, mergeGuestAddress } = useAddress();

  if (!pendingGuestAddress) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:bottom-6 sm:right-6 sm:w-[380px] bg-white border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl p-4 sm:p-5 z-50">
      
      {/* Content Area */}
      <div className="flex items-start gap-3.5 w-full min-w-0">
        <div className="w-10 h-10 rounded-full bg-[#0c831f]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
          <MapPin className="w-5 h-5 text-[#0c831f]" strokeWidth={2.5} />
        </div>

        <div className="flex flex-col flex-1 min-w-0">
          <p className="font-dmsans_semibold text-[15px] sm:text-[16px] text-gray-900 leading-snug">
            Use previous address?
          </p>
          <p className="font-dmsans_light text-gray-500 text-[13px] mt-1 truncate w-full">
            {pendingGuestAddress.city}, {pendingGuestAddress.state}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gray-100 my-4 sm:my-5" />

      {/* Action Buttons */}
      <div className="flex items-center gap-3 justify-end shrink-0">
        <button
          onClick={() => clearGuestAddress()}
          className="font-dmsans_semibold text-[13px] text-gray-500 hover:text-gray-800 bg-gray-50 hover:bg-gray-100 px-4 py-2.5 rounded-xl transition-colors"
        >
          Discard
        </button>

        <button
          onClick={mergeGuestAddress}
          className="font-dmsans_semibold text-[13px] bg-[#0c831f] text-white hover:bg-[#0a6c19] hover:shadow-[0_4px_12px_rgba(12,131,31,0.2)] px-5 py-2.5 rounded-xl transition-all duration-200"
        >
          Use this address
        </button>
      </div>

    </div>
  );
}