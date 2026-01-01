"use client";

import { useEffect } from "react";
import { MapPin, Search, X } from "lucide-react";

type LocationModalProps = {
  open: boolean;
  onClose: () => void;
  onSelect?: (location: string) => void;
};

const LocationModal = ({ open, onClose, onSelect }: LocationModalProps) => {
  // Lock background scroll
useEffect(() => {
  if (!open) {
    document.body.style.overflow = "";
    return;
  }

  const isMobile = window.innerWidth < 640;

  if (isMobile) {
    document.body.style.overflow = "hidden";
  }

  return () => {
    document.body.style.overflow = "";
  };
}, [open]);


  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[3000]">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
      />

      {/* Popup / Sheet */}
      <div
        className="
          fixed
          bottom-0
          left-0
          w-full
          sm:top-20
          sm:left-6
          sm:bottom-auto
          sm:w-[360px]
          bg-white
          rounded-t-2xl sm:rounded-xl
          shadow-xl
          max-h-[85dvh]
          overflow-hidden
          animate-in
          fade-in
          slide-in-from-bottom
          sm:slide-in-from-top-4
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-sm font-dmsans_semibold text-gray-900">
            Select delivery location
          </h2>
          <button onClick={onClose}>
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 overflow-y-auto overscroll-contain">
          {/* Detect location */}
          <button className="flex items-center gap-3 w-full p-3 border rounded-xl hover:bg-gray-50 transition">
            <MapPin className="w-5 h-5 text-green-600" />
            <div className="text-left font-monasans_semibold">
              <p className="text-sm font-medium text-gray-900">
                Use current location
              </p>
              <p className="text-xs text-gray-500">
                Automatically detect location
              </p>
            </div>
          </button>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search area, street, city"
              className="w-full pl-9 pr-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500 font-dmsans_light"
            />
          </div>

          {/* Suggestions */}
          <div className="space-y-2">
            {["Sector 62, Noida", "Connaught Place, Delhi"].map((loc) => (
              <button
                key={loc}
                onClick={() => {
                  onSelect?.(loc);
                  onClose();
                }}
                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition"
              >
                <p className="text-sm font-medium text-gray-900 font-dmsans_semibold">{loc}</p>
              </button>
            ))}
          </div>

          {/* Footer */}
          <button
            onClick={onClose}
            className="w-full text-xs text-gray-500 underline font-dmsans_light"
          >
            Continue without location
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
