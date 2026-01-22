"use client";

import { useEffect, useState } from "react";
import { MapPin, Search, X, Loader2 } from "lucide-react";
import { getCurrentLocation } from "@/lib/getCurrentLocation";
// import { searchPlacesOSM } from "@/lib/searchPlacesOSM";
import { reverseGeocodeOSM } from "@/lib/reverseGeocodeOSM";
import { formatOSMPlace } from "@/lib/formatOSMPlace";
import { searchPlacesOSM } from "@/lib/searchPlacesOSM";
import { AppLocation } from "@/src/types/next-auth";
import { saveLocationToLocalStorage } from "@/lib/localStorageLocation";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { toast } from "react-toastify";
// import { AppLocation } from "@/types/location";

type LocationModalProps = {
  open: boolean;
  onClose: () => void;
  onSelect?: (location: AppLocation) => void;
};
const LocationModal = ({ open, onClose, onSelect }: LocationModalProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  // const [selectedLocation, setSelectedLocation] = useState<AppLocation | null>(null);

  const selectedLocation = useSelector(
    (state: RootState) => state.location.location,
  );

  console.log("selectedLocation", selectedLocation);

  const handleClose = () => {
    setQuery("");
    onClose();
    setResults([]);
  };


  const handleUseCurrentLocation = async () => {
    try {
      setLoading(true);

      const { lat, lng } = await getCurrentLocation();
      const location = await reverseGeocodeOSM(lat, lng);

      onSelect?.(location);

      handleClose();
    } catch (err: any) {
      switch (err.type) {
        case "PERMISSION_DENIED":
          toast.error(
            "Location access was denied."
          );
          break;

        case "POSITION_UNAVAILABLE":
          toast.error("Unable to detect your location. Try again later.");
          break;

        case "TIMEOUT":
          toast.error("Location request timed out. Please try again.");
          break;

        default:
          toast.error("Something went wrong while fetching location.");
      }
    } setLoading(false);
  }


  const handleSearch = async (value: string) => {
    setQuery(value);
    const data = await searchPlacesOSM(value);
    setResults(data);
    saveLocationToLocalStorage(data);
  };

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
      <div className="absolute inset-0 bg-black/30" onClick={handleClose} />

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
          <button onClick={handleClose}>
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 overflow-y-auto overscroll-contain">
          {/* Detect location */}
          <button
            onClick={handleUseCurrentLocation}
            disabled={loading}
            className={`flex items-center gap-3 w-full p-3 border rounded-xl transition
    ${loading
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-gray-50"
              }`}
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin text-green-600" />
            ) : (
              <MapPin className="w-5 h-5 text-green-600" />
            )}

            <div className="text-left font-monasans_semibold">
              <p className="text-sm font-medium text-gray-900">
                {loading ? "Detecting your location…" : "Use current location"}
              </p>
              <p className="text-xs text-gray-500">
                {loading
                  ? "This may take a few seconds"
                  : "Automatically detect location"}
              </p>
            </div>
          </button>

          {/* Current selected location */}
          {selectedLocation && (
            <div className="flex items-center gap-3 w-full p-3 border rounded-xl bg-gray-50">
              <MapPin className="w-5 h-5 text-green-600" />
              <div className="text-left font-monasans_semibold">
                <p className="text-sm font-medium text-gray-900">
                  Current location
                </p>
                <p className="text-xs text-gray-500">
                  {selectedLocation.address}
                </p>
              </div>
            </div>
          )}

          {/* Search */}
          <div className="relative">
            {/* Search input */}
            <Search className="absolute right-3 top-5 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              type="text"
              placeholder="Search area, street, city"
              className="w-full pl-4 pr-3 py-2.5 text-sm border rounded-lg
               focus:outline-none focus:ring-1 focus:ring-cyan-500
               font-dmsans_light"
            />

            {/* Results */}
            {results.length > 0 && (
              <div className="mt-2 max-h-60 overflow-y-auto rounded-lg border bg-white shadow-sm">
                {results.map((place) => (
                  <button
                    key={place.place_id || place.osm_id}
                    onClick={() => {
                      const location = formatOSMPlace(place);
                      onSelect?.(location);
                      handleClose();
                    }}
                    className="block w-full text-left px-3 py-2 text-sm
                     hover:bg-green-200 transition-colors
                     border-b last:border-b-0 rounded-xl font-dmsans_light"
                  >
                    <p className="line-clamp-2 text-gray-700">
                      {place.display_name}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <button
            onClick={handleClose}
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
