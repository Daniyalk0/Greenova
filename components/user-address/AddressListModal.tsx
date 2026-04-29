"use client";

import { useState, useEffect } from "react";
import { Address, useAddress } from "@/src/context/address-context";
import { useUI } from "@/src/context/ui-context";
import { X, MapPin, CheckCircle } from "lucide-react";
import { deleteAddress } from "@/src/app/actions/address-actions";
import { clearGuestAddress, getGuestAddress } from "@/lib/clientAddress";
import { useSession } from "next-auth/react";

export default function AddressListModal() {
  const { isAddressListOpen, closeAddressListModal, openAddressFormModal } =
    useUI();

  const { data: session } = useSession();
  const { addresses, selectAddress, refreshAddresses, selectedAddressId, setAddresses, clearGuest , setSelectedAddressId} =
    useAddress();
  const guestAddress = getGuestAddress();

  const addressList = session?.user?.id
    ? addresses
    : guestAddress
      ? [{ ...(guestAddress as Address), id: -1 }]
      : [];

  const [deletingAddressId, setDeletingAddressId] = useState<number | null>(
    null,
  );
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isAddressListOpen) {
      setIsRendered(true);
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    } else {
      setIsVisible(false);
      const timeout = setTimeout(() => {
        setIsRendered(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isAddressListOpen]);

const handleDelete = async (id?: number) => {
  if (deletingAddressId !== null) return;

  // Guest
  if (!session?.user?.id) {
    
    clearGuest();
    closeAddressListModal();
    return;
  }

  if (!id) return;

  const prevAddresses = addresses;
  const prevSelectedId = selectedAddressId;

  try {
    setDeletingAddressId(id);
    setDeleteError(null);

    // 👉 compute remaining BEFORE updating state
    const remaining = addresses.filter((a) => a.id !== id);

    // ✅ optimistic remove
    setAddresses(remaining);
    if (remaining.length === 0) {
  setSelectedAddressId(null); // 🔥 immediate reset
}

    // ✅ FIX: update selected address immediately
    if (selectedAddressId === id) {
      const next =
        remaining.find((a) => a.serviceStatus === "ACTIVE") ||
        remaining.find((a) => a.serviceStatus === "LIMITED") ||
        remaining[0] ||
        null;

      setSelectedAddressId(next?.id || null);
    }

    await deleteAddress(id);

    // 🔄 re-sync with server (ensures consistency)
    await refreshAddresses();

  } catch (error) {
    // ❌ rollback everything
    setAddresses(prevAddresses);
    setSelectedAddressId(prevSelectedId);
    setDeleteError("Unable to delete address. Please try again.");
  } finally {
    setDeletingAddressId(null);
  }
};
  if (!isRendered) return null;

  // const handleDelete = async (id: number) => {
  //   await fetch(`/api/address/${id}`, { method: "DELETE" });
  //   await refreshAddresses();
  // };

  return (
    <div
      className={`fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex justify-center items-end sm:items-center z-[2000] transition-opacity duration-300 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={closeAddressListModal}
    >
      <div
        className={`bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ease-in-out transform ${
          isVisible
            ? "translate-y-0 sm:scale-100 opacity-100"
            : "translate-y-full sm:translate-y-8 sm:scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <h2 className="text-lg sm:text-xl font-monasans_semibold text-gray-900 tracking-tight">
            Select Delivery Address
          </h2>
          <button
            onClick={closeAddressListModal}
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>

        <div className="p-4 sm:p-6 max-h-[60vh] sm:max-h-[65vh] overflow-y-auto custom-scrollbar bg-[#f4f8f5]/40">
          {addressList.length > 0 ? (
            <div className="space-y-3">
              {addressList.map((addr) => {
                const isSelected = session?.user?.id
                  ? addr.id === selectedAddressId
                  : true;

                return (
                  <div
                    key={addr.id}
                    className={`group border rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center transition-all duration-200 relative ${
                      isSelected
                        ? "border-[#0c831f] bg-[#0c831f]/5 shadow-[0_4px_20px_-4px_rgba(12,131,31,0.12)]"
                        : "bg-white border-gray-200 hover:border-[#0c831f] hover:shadow-[0_4px_20px_-4px_rgba(12,131,31,0.12)]"
                    }`}
                  >
                    {/* Address Details (Clickable Area) */}
                    <div
                      onClick={() => {
                        selectAddress(addr.id);
                        closeAddressListModal();
                      }}
                      // ADDED: min-w-0 to allow child truncation
                      className="flex-1 cursor-pointer pr-4 w-full min-w-0"
                    >
                      {/* ADDED: w-full min-w-0 */}
                      <div className="flex items-start gap-3.5 w-full min-w-0">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-200 ${
                            isSelected
                              ? "bg-[#0c831f] text-white"
                              : "bg-[#0c831f]/10 text-[#0c831f] group-hover:bg-[#0c831f] group-hover:text-white"
                          }`}
                        >
                          <MapPin className="w-4 h-4" strokeWidth={2.5} />
                        </div>

                        {/* ADDED: flex-1 min-w-0 */}
                        <div className="flex flex-col flex-1 min-w-0">
                          {/* Title & Checkmark */}
                          <div
                            className={`font-dmsans_semibold text-[15px] sm:text-[16px] leading-snug transition-colors flex items-center gap-2 w-full min-w-0 ${
                              isSelected
                                ? "text-[#0c831f]"
                                : "text-gray-800 group-hover:text-[#0c831f]"
                            }`}
                          >
                            {/* ADDED: span with truncate */}
                            <span className="truncate">
                              {addr.city}, {addr.state}
                            </span>
                            {isSelected && (
                              <CheckCircle
                                className="w-4 h-4 text-[#0c831f] shrink-0"
                                strokeWidth={2.5}
                              />
                            )}
                          </div>

                          {/* ADDED: truncate to subtitle as well */}
                          <p
                            className={`font-dmsans_light text-[13px] mt-1 truncate ${
                              isSelected
                                ? "text-[#0c831f]/80 font-medium"
                                : "text-gray-500"
                            }`}
                          >
                            {isSelected
                              ? "Selected delivery location"
                              : "Tap to select this delivery location"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-4 sm:mt-0 pl-11 sm:pl-4 sm:border-l sm:border-gray-100 w-full sm:w-auto justify-end shrink-0">
                      <button
                        disabled={deletingAddressId !== null}
                        onClick={() => {
                          closeAddressListModal();
                          openAddressFormModal(addr);
                        }}
                        className="font-dmsans_semibold text-[13px] text-gray-400 hover:text-[#0c831f] hover:bg-green-50 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(addr?.id)}
                        disabled={deletingAddressId === addr?.id}
                        className={`font-dmsans_semibold text-[13px] ${
                          deletingAddressId === addr?.id
                            ? "text-gray-300 bg-gray-100 cursor-not-allowed"
                            : "text-gray-400 hover:text-red-600 hover:bg-red-50"
                        } px-3 py-1.5 rounded-lg transition-colors`}
                      >
                        {deletingAddressId === addr?.id
                          ? "Deleting…"
                          : "Delete"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-10 sm:py-12 text-center px-4">
              <div className="w-16 h-16 bg-[#0c831f]/10 rounded-full flex items-center justify-center mb-4 border border-[#0c831f]/20">
                <MapPin
                  className="w-8 h-8 text-[#0c831f] opacity-90"
                  strokeWidth={1.5}
                />
              </div>
              <p className="font-monasans_semibold text-gray-900 text-lg mb-1.5">
                No addresses found
              </p>
              <p className="font-dmsans_light text-gray-500 text-[14px] max-w-[250px] leading-relaxed">
                You haven&apos;t saved any delivery locations yet.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        {session?.user?.id && (
          <div className="p-4 sm:p-6 border-t border-gray-100 bg-white">
            <button
              disabled={deletingAddressId !== null}
              onClick={() => {
                closeAddressListModal();
                openAddressFormModal();
              }}
              className="w-full bg-[#0c831f] hover:bg-[#0a6c19] text-white font-dmsans_semibold text-[15px] py-3.5 sm:py-4 rounded-xl shadow-[0_4px_12px_rgba(12,131,31,0.2)] hover:shadow-[0_6px_16px_rgba(12,131,31,0.3)] transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <span className="text-xl font-normal leading-none mb-0.5">+</span>{" "}
              Add New Address
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
