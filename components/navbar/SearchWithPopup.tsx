"use client";

import { useState, useEffect, useRef, useTransition } from "react";
import {
  Heart,
  Search,
  X,
  PackageSearch,
  TrendingUp,
  Loader2,
} from "lucide-react";
import { AppDispatch, RootState } from "@/src/store/store";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlistUtil } from "@/lib/wishlistUtils";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { searchProducts } from "./actions";

// IMPORT YOUR SERVER ACTION HERE
// import { searchProducts } from "@/src/actions/searchActions";

export default function SearchPopup() {
  const [isOpen, setIsOpen] = useState(false);

  // Search & Debounce State
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  // Results & UI State
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [suggestedResults, setSuggestedResults] = useState<any[]>([]);

const [dynamicPlaceholders, setDynamicPlaceholders] = useState<string[]>([
  "apple",
  "banana",
  "mango",
  "tomato",
  "potato",
  "carrot",
  "broccoli",
  "almonds",
  "cashews",
  "raisins",
]);

  const [index, setIndex] = useState(0);
  const [focused, setFocused] = useState(false);

  // Next.js Transition for Loading State
  const [isPending, startTransition] = useTransition();

  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();
  const router = useRouter();

  const modalRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // const hasFetchedRef = useRef(false);
  const hasFetchedRef = useRef(false);
  const isSuggestionFetchRef = useRef(false);

  // --- Debounce ---
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedTerm(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // --- Search Fetch ---
  useEffect(() => {
    if (!debouncedTerm.trim()) return;

    let isActive = true;

    startTransition(async () => {
      try {
        const data = await searchProducts(debouncedTerm);
        if (isActive) setSearchResults(data);
      } catch (error) {
        console.error(error);
      }
    });

    return () => {
      isActive = false;
    };
  }, [debouncedTerm]);

  // --- Suggestions Fetch ---
  const fetchSuggested = async () => {
    if (hasFetchedRef.current) return;

    hasFetchedRef.current = true;
    isSuggestionFetchRef.current = true;

    startTransition(async () => {
      try {
        const data = await searchProducts("");
        setSuggestedResults(data);

        // if (data.length > 0) {
        //   setDynamicPlaceholders(data.map((p) => p.name));
        // }
      } catch (error) {
        console.error(error);
      } finally {
        isSuggestionFetchRef.current = false;
      }
    });
  };

  // --- Placeholder animation ---
  useEffect(() => {
    if (focused) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % dynamicPlaceholders.length);
    }, 2500);
    return () => clearInterval(id);
  }, [focused, dynamicPlaceholders.length]);

  // --- UX helpers ---
  const isSearching = debouncedTerm.trim() !== "";
  const resultsToShow = isSearching ? searchResults : suggestedResults;

  // Close on "Esc" key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Close when clicking outside the modal
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Handlers

  // const fetchSuggested = async () => {
  //   if (hasFetchedRef.current) return;

  //   hasFetchedRef.current = true;

  //   startTransition(async () => {
  //     try {
  //       const data = await searchProducts("");
  //       setResults(data);
  //       if (data.length > 0) {
  //         setDynamicPlaceholders(data.map((p) => p.name));
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch suggestions:", error);
  //     }
  //   });
  // };

  const handleClose = () => {
    setIsOpen(false);
    setSearchTerm("");
    setDebouncedTerm("");
    // ❌ REMOVE THIS:
    // setResults([]);
  };

  const handleOpen = () => {
    setIsOpen(true);
    setSearchTerm("");
    setDebouncedTerm("");

    // fallback if hover didn't trigger
    if (suggestedResults.length === 0) {
      fetchSuggested();
    }
  };

  // const handleOpen = () => {
  //   setSearchTerm("");
  //   setResults([]);
  //   if (inputRef.current) inputRef.current.value = "";
  //   setIsOpen(true);
  //   fetchSuggested(); // 👈 this was missing
  // };

  const handleToggleWishlist = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    toggleWishlistUtil({ product, wishlist: wishlistItems, session, dispatch });
  };

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    console.log("Adding to cart:", product);
  };

  const handleProductRoute = (slug: string) => {
    setIsOpen(false);
    router.push(`/products/${slug}`);
  };

  const SkeletonItem = () => {
  return (
    <div className="flex items-center gap-3.5 p-3 rounded-xl border border-gray-100 animate-pulse">
      {/* Image skeleton */}
      <div className="w-14 h-14 rounded-lg bg-gray-200 flex-shrink-0" />

      {/* Details */}
      <div className="flex-1 space-y-2">
        <div className="h-3 w-3/4 bg-gray-200 rounded" />

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <div className="h-3 w-12 bg-gray-200 rounded" />
            <div className="h-3 w-10 bg-gray-200 rounded" />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <div className="w-8 h-8 bg-gray-200 rounded-lg" />
        <div className="w-14 h-8 bg-gray-200 rounded-lg" />
      </div>
    </div>
  );
};

return (
  <div className="relative w-full transition-all duration-200">
    {/* --- Main Search Bar Trigger --- */}
    <div
      tabIndex={0}
      className={`relative transition-[max-width] duration-300 ease-in-out cursor-text group
        ${wishlistItems.length > 0 ? "max-w-[calc(100%-0.7rem)]" : "max-w-full"}`}
      onClick={handleOpen}
      onMouseEnter={fetchSuggested}
      onFocus={fetchSuggested}
    >
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 z-20 group-hover:text-[#0c831f] transition-colors" />

      <input
        type="text"
        readOnly
        className="relative z-10 w-full pl-10 pr-4 py-3 text-[14px] font-dmsans_light border border-gray-200 rounded-xl bg-gray-50/50 outline-none cursor-text transition-colors shadow-sm"
      />

      {!focused && (
        <div className="pointer-events-none absolute left-10 top-1/2 -translate-y-1/2 flex items-center text-[14px] text-gray-400 z-0 font-dmsans_light">
          <span className="mr-1 whitespace-nowrap">Search for</span>
          <div className="relative h-[1.25rem] min-w-[120px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute left-0 top-0 font-dmsans_semibold text-gray-500 truncate max-w-[150px]"
              >
                &quot;{dynamicPlaceholders[index]}&quot;
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>

    {/* --- Backdrop --- */}
    <div
      className={`fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 z-[2100] 
        ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      onClick={() => setIsOpen(false)}
    />

    {/* --- Modal --- */}
    <div
      ref={modalRef}
      className={`fixed z-[2400] left-1/2 top-1/2 w-[95%] max-w-lg bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100
        transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out flex flex-col
        ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
        <h2 className="text-[15px] font-monasans_semibold text-gray-900">
          Search Products
        </h2>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-1 font-dmsans_light text-xs"
        >
          Esc <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Search Input */}
      <div className="p-4 sm:p-5">
        <div className="relative mb-4">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />

          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Type to search..."
            className="w-full pl-10 pr-10 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0c831f] focus:ring-4 focus:ring-[#0c831f]/10 text-[14px] font-dmsans_light transition-all shadow-sm"
          />

          {isPending && !isSuggestionFetchRef.current && (
            <Loader2 className="absolute right-3 top-3 animate-spin" />
          )}
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto custom-scrollbar pr-1 -mr-1">
          {/* Header */}
          {resultsToShow.length > 0 && (
            <div className="flex items-center gap-2 mb-3 px-1">
              {debouncedTerm === "" ? (
                <>
                  <TrendingUp className="w-4 h-4 text-[#0c831f]" />
                  <h3 className="font-dmsans_semibold text-[13px] text-gray-600 uppercase tracking-wide">
                    Suggested for you
                  </h3>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 text-gray-400" />
                  <h3 className="font-dmsans_semibold text-[13px] text-gray-600 uppercase tracking-wide">
                    Search Results
                  </h3>
                </>
              )}
            </div>
          )}

          <div className="space-y-2.5">
            {/* Skeleton only if NO data yet */}
            {isPending && resultsToShow.length === 0 && (
              <>
                {Array.from({ length: 5 }).map((_, i) => (
                  <SkeletonItem key={i} />
                ))}
              </>
            )}

            {/* Results */}
            {resultsToShow.length > 0 && (
              <>
                {resultsToShow.map((item: any) => {
                  const isWishlisted = wishlistItems.some(
                    (w) => w.productId === item.id,
                  );

                  const discountedPricePerKg =
                    item?.discount > 0
                      ? Math.round(
                          item.basePricePerKg -
                            (item.basePricePerKg * item.discount) / 100,
                        )
                      : item.basePricePerKg;

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleProductRoute(item?.slug)}
                      className="group flex items-center gap-3.5 p-3 rounded-xl border border-gray-100 hover:border-[#0c831f]/30 hover:bg-[#0c831f]/5 transition-all cursor-pointer"
                    >
                      {/* Image */}
                      <div className="w-14 h-14 rounded-lg border border-gray-100 bg-white overflow-hidden flex-shrink-0 flex items-center justify-center p-1">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <PackageSearch className="w-6 h-6 text-gray-300" />
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <p className="font-dmsans_semibold text-[14px] text-gray-900 truncate">
                          {item.name}
                        </p>

                        <div className="flex justify-between mt-2 items-center">
                          <div className="flex items-center gap-2 font-dmsans_light">
                            <span className="text-sm font-semibold text-black">
                              ₹{discountedPricePerKg}
                            </span>

                            {item?.discount > 0 && (
                              <>
                                <span className="text-xs text-gray-400 line-through">
                                  ₹{item.basePricePerKg}
                                </span>
                                <span className="bg-green-100 text-green-800 text-[0.6rem] px-1 rounded">
                                  {item.discount}% OFF
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={(e) => handleToggleWishlist(e, item)}
                          className={`p-2 rounded-lg border ${
                            isWishlisted
                              ? "bg-red-50 border-red-100"
                              : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                          }`}
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              isWishlisted
                                ? "fill-red-500 text-red-500"
                                : "text-gray-400"
                            }`}
                          />
                        </button>

                        <button
                          onClick={(e) => handleAddToCart(e, item)}
                          className="font-dmsans_semibold text-[13px] px-4 py-2 bg-[#0c831f]/10 text-[#0c831f] hover:bg-[#0c831f] hover:text-white rounded-lg transition-all"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  );
                })}
              </>
            )}

            {/* Empty state */}
            {!isPending && resultsToShow.length === 0 && (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3 border border-gray-100">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <p className="font-dmsans_semibold text-[15px] text-gray-900">
                  No products found
                </p>
                <p className="font-dmsans_light text-[13px] text-gray-500 mt-1">
                  We couldn&apos;t find anything matching &quot;{debouncedTerm}&quot;.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);
}
