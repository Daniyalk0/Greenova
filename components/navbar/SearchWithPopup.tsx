"use client"

import { useState, useEffect, useRef } from "react";
import { Heart, Search } from "lucide-react";
import { AppDispatch, RootState } from "@/src/store/store";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlistUtil } from "@/lib/wishlistUtils";
import { useSession } from "next-auth/react";
import { fetchWishlistProducts, setLocalWishlist } from "@/src/store/wishListSlice"
import { addToWishlist, removeWishlistItem } from "@/src/app/actions/like"

export default function SearchPopup() {
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

const handleToggleWishlist = (product:any) =>
  toggleWishlistUtil({
    product,
    wishlist : wishlistItems,
    session,
    dispatch,
    setLocalWishlist,
    fetchWishlistProducts,
    addToWishlist,
    removeWishlistItem,
  });


  return (
    <div className="relative md:w-[40%] lg:w-[50%]">
      {/* Search Input */}
      <div className="relative w-fit md:w-full">
        {/* Magnifying Glass (only mobile) */}
        <Search className="w-5 h-5 block md:hidden " onClick={() => setIsOpen(true)} />
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 hidden md:inline-block " />

        <input
          type="text"
          placeholder="Search..."

          className="w-full hidden md:flex pl-8 pr-3 py-2 text-sm border-gray-300 rounded-md focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none border-b-[1px]"
          onFocus={() => setIsOpen(true)}
        />
      </div>


      {/* Overlay & Popup */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-start justify-center z-50">
          <div className="mt-40 w-[95%] md:w-full max-w-lg bg-white rounded-xl shadow-lg p-4" ref={modalRef}>
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-sm font-medium text-gray-700">Search Products</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-800 text-xs"
              >
                Esc ✕
              </button>
            </div>

            {/* Search Box */}
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                onChange={(e) => handleSearch(e)}
                placeholder="Type to search..."
                className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-500"
                autoFocus
              />
            </div>

            <ul className="mt-4 max-h-60 overflow-y-auto text-sm space-y-2">
              {filteredProducts.map((item: any) => {
                const isWishlisted = wishlistItems.some((w) => w.productId === item.id);

                return (
                  <li
                    key={item.id}
                    className="p-2 rounded-lg bg-white shadow-sm hover:shadow-md transition cursor-pointer flex items-center gap-3 border"
                  >
                    {/* Product Image */}
                    <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      <p className="text-gray-600 text-xs">₹{item.price}</p>
                    </div>

                    {/* Wishlist Icon */}
                    <button
                      onClick={() => handleToggleWishlist(item)}
                      className="p-1 rounded-full hover:bg-gray-100 transition"
                    >
                      <Heart
                        size={20}
                        className={`transition ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-500"
                          }`}
                      />
                    </button>

                    {/* Add to Cart Button */}
                    <button
                      // onClick={() => handleAddToCart(item)}
                      className="px-3 py-1 bg-green-600 text-white text-xs rounded-md hover:bg-green-700 transition"
                    >
                      Add
                    </button>
                  </li>
                );
              })}
            </ul>




          </div>
        </div>
      )}
    </div>
  );
}
