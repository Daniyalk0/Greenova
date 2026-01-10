"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
// import { removeWishlistItem } from "@/src/store/wishListSlice";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { removeWishlistItem } from "@/src/app/actions/like";

interface LikedPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LikedPopup({ isOpen, onClose }: LikedPopupProps) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlistProducts.items);

  const [localWishlist, setLocalWishlistState] = useState<any[]>([]);
  const { data: session } = useSession()
  const userId = session?.user?.id

  useEffect(() => {
    setLocalWishlistState(wishlist);
  }, [wishlist]);




  const handleRemoveItem = async (product: any, productId: number) => {
    // Optimistic UI
    const updated = localWishlist.filter(item => item.Product.id !== productId);
    setLocalWishlistState(updated);
    
    const productName = product?.Product?.name || product?.name || "Item";
    toast.success(`${productName} removed!`);
    try {
      await removeWishlistItem(productId);

    } catch (error) {
      console.log("Delete failed, rolling back...");
      setLocalWishlistState(localWishlist);
    }
  };
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-[2100] 
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Popup Box */}
      <div
        className={`fixed z-[2400] left-1/2 top-1/2 w-[90%] max-w-md bg-white rounded-lg shadow-xl 
          transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300
          ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-300">
          <h2 className="text-lg font-monasans_semibold flex items-center gap-1">
            <span>  <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="red"
              className="w-5 h-5 transition-transform hover:scale-110"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
             4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 
             3.81 14.76 3 16.5 3 19.58 3 22 5.42 
             22 8.5c0 3.78-3.4 6.86-8.55 
             11.54L12 21.35z"/>
            </svg></span> Liked Products ({localWishlist.length})
          </h2>
          <button onClick={onClose} className="text-gray-800 hover:text-gray-900 text-3xl font-bold">
            ×
          </button>
        </div>

        {/* Product List */}
        <div className="max-h-[300px] overflow-y-auto p-4 space-y-4">
          {localWishlist?.length === 0 ? (
            <div className="text-center font-monasans_semibold text-gray-500 mt-4 font-medium">
              No liked items yet ❤️
            </div>
          ) : (
            localWishlist.map(item => {
              const basePrice = item?.Product?.basePricePerKg * item?.Product?.availableWeights[0];
              const discountedPrice =
                item?.Product?.discount > 0
                  ? Math.round(basePrice - (basePrice * item?.Product?.discount) / 100)
                  : Math.round(basePrice);
              return (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={item?.Product?.imageUrl}
                      alt={item?.Product?.name}
                      width={60}
                      height={60}
                      className="rounded object-cover"
                    />
                    <div>
                      <h3 className="text-sm font-dmsans_semibold">{item?.Product?.name}</h3>
                      <div className="flex justify-between mt-2 items-center">
                        {/* Price */}
                        <div className="flex items-center gap-2 font-dmsans_light">
                          {/* Discounted price */}
                          <span className="text-sm font-semibold text-black">
                            ₹{discountedPrice}
                          </span>

                          {/* Original price with strike-through */}
                          {item?.Product?.discount > 0 && (
                            <>
                              <span className="text-xs text-gray-400 line-through">
                                ₹{basePrice}
                              </span>
                              <span className="bg-green-100 text-green-800 text-[0.6rem] px-1 rounded">
                                {item?.Product?.discount}% OFF
                              </span>
                            </>
                          )}
                        </div>

                        {/* Quantity / Add control */}
                        <div className="h-7 w-20 bg-green-100 rounded" />
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item, item?.Product?.id)}
                    className="text-red-500 hover:text-red-700 text-lg font-bold"
                  >
                    ×
                  </button>
                </div>
              )
            })
          )}
        </div>

        {/* Footer */}

      </div>
    </>
  );
}
