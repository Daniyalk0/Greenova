"use client";

import AddressModal from "./AddressModal";
import { deleteAddress } from "@/src/app/actions/address-actions";
import { Edit2, Trash2, MapPin, CheckCircle2 } from "lucide-react";
import { useAddress } from "@/src/context/address-context";
import { useUI } from "@/src/context/ui-context";
import { useState } from "react";

export default function AddressSection() {

  const [deletingAddressId, setDeletingAddressId] = useState<number | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const { addresses, selectedAddressId, selectAddress, refreshAddresses } = useAddress();
  const { openAddressFormModal } = useUI();

  const handleDelete = async (id: number | undefined) => {
    if (!id || deletingAddressId !== null) return;

    try {
      setDeleteError(null);
      setDeletingAddressId(id);
      await deleteAddress(id);
      await refreshAddresses();
    } catch (error) {
      console.error("Failed to delete address:", error);
      setDeleteError("Unable to delete address. Please try again.");
    } finally {
      setDeletingAddressId(null);
    }
  };

  return (
    <div className="w-full">
      {/* EMPTY STATE */}
      {addresses && addresses.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8 sm:p-12 border-2 border-dashed border-green-200 rounded-2xl bg-[#f4f8f5] transition-all">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <MapPin className="text-[#0c831f]" size={28} strokeWidth={1.5} />
          </div>
          <p className="text-gray-900 font-monasans_semibold text-lg mb-1">
            No addresses saved yet
          </p>
          <p className="text-sm font-dmsans_light text-gray-500 text-center">
            Add a delivery address to proceed with your checkout
          </p>
        </div>
      )}

      {/* ADDRESS GRID */}
      {addresses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {addresses.map((address) => {
            const isSelected = address.id === selectedAddressId;

            return (
              <label
                key={address.id}
                className={`relative flex flex-col p-3.5 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 group ${isSelected
                    ? "border-[#0c831f] bg-[#f2fcf5] shadow-sm"
                    : "border-gray-100 bg-white hover:border-[#0c831f]/30 hover:bg-[#f9fbf9] shadow-sm hover:shadow-md"
                  }`}
              >
                <input
                  type="radio"
                  name="address"
                  className="sr-only"
                  checked={isSelected}
                  onChange={() => selectAddress(address.id)}
                />

                {/* Selection Indicator */}
                <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 flex-shrink-0 transition-transform duration-200">
                  {isSelected ? (
                    <CheckCircle2
                      className="text-[#0c831f] fill-green-100"
                      size={22}
                      strokeWidth={2}
                    />
                  ) : (
                    <div className="w-[18px] h-[18px] border-2 border-gray-300 rounded-full group-hover:border-[#0c831f]/40 transition-colors" />
                  )}
                </div>

                {/* Address Details */}
                <div className="pr-8 flex-grow">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-monasans_semibold text-gray-900 text-sm sm:text-base">
                      {address.name}
                    </span>
                    {address.isDefault && (
                      <span className="px-1.5 py-0.5 bg-green-100 text-[#0c831f] text-[9px] uppercase font-dmsans_semibold rounded-md tracking-wider">
                        Default
                      </span>
                    )}
                  </div>

                  <p className="font-dmsans_light text-xs sm:text-sm text-gray-600 leading-snug line-clamp-2">
                    {address.street}
                  </p>

                  <p className="font-dmsans_light text-xs sm:text-sm text-gray-600 mt-0.5">
                    {address.city}, {address.state} -{" "}
                    <span className="font-dmsans_semibold">{address.pincode}</span>
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3.5 mt-3 pt-3 border-t border-gray-100">
                  <button
                  disabled={deletingAddressId === address.id}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      openAddressFormModal(address);
                    }}
                    className="flex items-center gap-1.5 text-xs font-dmsans_semibold text-gray-500 hover:text-[#0c831f] transition-colors"
                  >
                    <Edit2 size={13} strokeWidth={2.5} />
                    Edit
                  </button>

                  <div className="w-px h-3 bg-gray-200" />

                  <button
                    onClick={() => handleDelete(address?.id)}
                    disabled={deletingAddressId === address?.id}
                    className={`font-dmsans_semibold text-[13px] ${deletingAddressId === address?.id
                        ? "text-gray-300 bg-gray-100 cursor-not-allowed"
                        : "text-gray-500 hover:text-red-600 hover:bg-red-50"
                      } px-3 py-1.5 rounded-lg transition-colors`}
                  >
                    {deletingAddressId === address?.id ? "Deleting…" : "Delete"}
                  </button>
                </div>

                {isSelected && address.serviceStatus && (
  <div className="mt-3 pt-3 border-t border-gray-100">
    {address.serviceStatus === "ACTIVE" && (
      <p className="text-xs sm:text-sm text-green-600 font-dmsans_light">
        Delivery available in this area
      </p>
    )}

    {address.serviceStatus === "LIMITED" && (
      <p className="text-xs sm:text-sm text-amber-600 font-dmsans_light">
        Limited delivery available • May take longer
      </p>
    )}

    {address.serviceStatus === "UNAVAILABLE" && (
      <p className="text-xs sm:text-sm text-red-600 font-dmsans_light">
        Not serviceable in this area
      </p>
    )}
  </div>
)}
              </label>
            );
          })}
        </div>
      )}

      <AddressModal />
    </div>
  );
}