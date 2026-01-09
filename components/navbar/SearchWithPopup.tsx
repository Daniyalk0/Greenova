"use client"

import { useState, useEffect, useRef } from "react";
import { Heart, Search } from "lucide-react";
import { AppDispatch, RootState } from "@/src/store/store";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlistUtil } from "@/lib/wishlistUtils";
import { useSession } from "next-auth/react";
import { fetchWishlistProducts, setLocalWishlist } from "@/src/store/wishListSlice"
import { addToWishlist, removeWishlistItem } from "@/src/app/actions/like"

import { motion, AnimatePresence } from "framer-motion";


const placeholders = [
  { id: 1, name: "banana" },
  { id: 2, name: "apple" },
  { id: 3, name: "milk" },
  { id: 4, name: "bread" },
];

export default function SearchPopup() {
  const [index, setIndex] = useState(0);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (focused) return;

    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % placeholders.length);
    }, 2000);

    return () => clearInterval(id);
  }, [focused]);


  const [isOpen, setIsOpen] = useState(false);
  const [defaultsProducts, setDefaultsProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);


  const products = useSelector((state: RootState) => state.products.items)
  const error = useSelector((state: RootState) => state.products.error)
  const loading = useSelector((state: RootState) => state.products.loading)

  const cartProducts = useSelector((state: RootState) => state.cartProducts.items);
  const cartError = useSelector((state: RootState) => state.cartProducts.error);
  const cartLoading = useSelector((state: RootState) => state.cartProducts.loading);

  const wishlistItems = useSelector((state: RootState) => state.wishlistProducts.items);
  const wishlistError = useSelector((state: RootState) => state.wishlistProducts.error);
  const wishlistLoading = useSelector((state: RootState) => state.wishlistProducts.loading);

  // Close on "Esc" key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const modalRef = useRef<HTMLDivElement | null>(null);
  //   const [showModal, setShowModal] = useState(false);


  // Close when clicking outside the modal
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);



  useEffect(() => {
    if (products.length > 0) {
      // pick 4 random products as defaults
      const randomDefaults = [...products]
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);

      setDefaultsProducts(randomDefaults);
      setFilteredProducts(randomDefaults); // initial UI
    }
  }, [products]);



  const handleSearch = (e: any) => {
    const value = String(e.target.value || "").trim().toLowerCase();

    // 🔥 If input is empty → show default famous products
    if (!value) {
      setFilteredProducts(defaultsProducts);
      return;
    }

    const matched = products.filter((p: any) =>
      p?.name?.toLowerCase().startsWith(value)
    );

    setFilteredProducts(matched);
  };

  const [localProducts, setLocalProducts] = useState(cartProducts || []);
  const dispatch = useDispatch<AppDispatch>();
  // const [wishList, setwishList] = useState(wishlist || [])
  const { data: session } = useSession()


  useEffect(() => {
    if (Array.isArray(cartProducts)) {
      setLocalProducts(cartProducts);

    }
  }, [cartProducts, session]);

  // const isInWishlist = wishlistItems?.some(item => item.productId === product.id);

  const handleToggleWishlist = (product: any) =>
    toggleWishlistUtil({
      product,
      wishlist: wishlistItems,
      session,
      dispatch,
      setLocalWishlist,
      fetchWishlistProducts,
      addToWishlist,
      removeWishlistItem,
    });


  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);


  return (
    <div className="relative w-[100%]  transition-all duration-200">
      {/* Search Input */}
      <div className={`
    relative
    transition-[max-width]
    duration-300
    ease-in-out
    ${wishlistItems.length > 0 ? "max-w-[calc(100%-0.7rem)]" : "max-w-full"}
  `}>
        {/* Search icon */}
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 z-20" />

        {/* Input */}
        <input
          type="text"
          readOnly
          onFocus={(e) => e.target.blur()} // prevents typing + caret
          onClick={() => setIsOpen(true)}
          className="
    relative z-10
    w-full
    pl-9 pr-3 py-3
    text-sm
    border border-gray-300
    rounded-lg
    bg-transparent
    outline-none
    
    
  "
        />

        {/* Animated placeholder */}
        {!focused && (
          <div
            className="
          pointer-events-none
          absolute
         left-9
          top-1/2
          -translate-y-1/2
          flex
          items-center
          text-sm
          text-gray-500
          z-0
          font-dmsans_light
        "
          >
            <span className="mr-1 whitespace-nowrap">Search for</span>

            <div className="relative h-[1.25rem] min-w-[70px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute left-0 top-0"
                >
                  &quot;{placeholders[index]?.name}&quot;
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>



      {/* Overlay & Popup */}

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-[2100] 
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <div
        className={`fixed z-[2400] left-1/2 top-1/2 w-[90%] max-w-md bg-white rounded-xl shadow-xl
    transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out
    ${isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"}
  `}
        ref={modalRef}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b font-monasans_semibold">
          <h2 className="text-sm font-medium text-gray-700 ">
            Search Products
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-800 text-xs"
          >
            Esc ✕
          </button>
        </div>

        {/* Search Box */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              ref={inputRef}
              type="text"
              onChange={handleSearch}
              placeholder="Type to search..."
              autoFocus
              className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-md
                   focus:outline-none focus:ring-1 focus:ring-cyan-500 font-dmsans_light"
            />
          </div>

          {/* Results */}
          <ul className="mt-4 max-h-60 overflow-y-auto text-sm space-y-2">
            {filteredProducts.map((item: any) => {
              const isWishlisted = wishlistItems.some(
                (w) => w.productId === item.id
              );

              return (
                <li
                  key={item.id}
                  className="p-2 rounded-lg bg-white shadow-sm hover:shadow-md
                       transition cursor-pointer flex items-center gap-3 border"
                >
                  {/* Image */}
                  <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 font-monasans_semibold">{item.name}</p>
                    <p className="text-gray-600 text-xs font-monasans_semibold">₹{item.price}</p>
                  </div>

                  {/* Wishlist */}
                  <button
                    onClick={() => handleToggleWishlist(item)}
                    className="p-1 rounded-lg hover:bg-gray-100 transition"
                  >
                    <Heart
                      size={20}
                      className={`transition ${isWishlisted
                        ? "fill-red-500 text-red-500"
                        : "text-gray-500"
                        }`}
                    />
                  </button>

                  {/* Add */}
                  <button
                    className="font-dmsans_semibold px-3 py-1 bg-green-600 text-white text-xs rounded-md
                         hover:bg-green-700 transition"
                  >
                    Add
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>


    </div>
  );
}
