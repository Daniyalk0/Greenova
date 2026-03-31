"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import AddressForm from "./AddressForm";
import { useUI } from "@/src/context/ui-context";

export default function AddressModal() {
  const {
    isAddressFormOpen,
    closeAddressFormModal,
    editingAddress
  } = useUI();

  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

useEffect(() => {
  if (isAddressFormOpen) {
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
}, [isAddressFormOpen]);

  if (!isRendered) return null;

  return (
    <div
      className={`fixed inset-0 z-[3000] flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* OVERLAY - Click to close */}
      <div
        className={`absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={closeAddressFormModal}
      />

      {/* MODAL CONTENT */}
      <div
        className={`relative bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-green-100 flex flex-col max-h-[90vh] overflow-hidden transition-all duration-300 transform ${
          isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-start justify-between px-5 py-4 sm:px-6 sm:py-5 border-b border-gray-100 bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-lg sm:text-xl font-monasans_semibold text-gray-900">
              {editingAddress ? "Edit Address" : "Add New Address"}
            </h2>
            <p className="text-sm font-dmsans_light text-gray-500 mt-1">
              Please provide your full shipping details.
            </p>
          </div>
          
          <button
            onClick={closeAddressFormModal}
            className="p-2 rounded-xl bg-gray-50 hover:bg-[#f2fcf5] text-gray-400 hover:text-[#0c831f] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0c831f]/30"
            aria-label="Close modal"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* BODY (Scrollable if form is long) */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-grow custom-scrollbar">
          <AddressForm address={editingAddress} onClose={closeAddressFormModal} />
        </div>
      </div>
    </div>
  );
}