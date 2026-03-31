"use client"
import CartProductcard from '@/components/cartComponents/CartProductcard'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { removeCartItem } from '../../actions/cart'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/src/store/store'
import { setCart } from '@/src/store/cartProductsSlice'
import { toast } from 'react-toastify'
import { addToCartUtil } from '@/lib/addToCartUtil'
import { restoreCartItem } from '../../actions/restoreCartItem'
// import { setLocalCart } from "../../store/cartProductsSlice"

const Page = () => {

  const dispatch = useDispatch<AppDispatch>();
  const reduxCart = useSelector((state: RootState) => state.cartProducts.items);


  const { data: session } = useSession()
  const userId = session?.user?.id ? Number(session.user.id) : null;

  const location = useSelector(
    (state: RootState) => state.location.location
  );

  const handleAddToCart = async (product: any, weight: any) => {
    const result = await addToCartUtil({
      product,
      weight,
      cart: reduxCart,
      session,
      dispatch,
      onOptimisticAdd: (msg) => {
        toast.dismiss();
        toast.success(msg, { autoClose: 2000 });
      },
    });

    if (!result) return;

    switch (result.type) {
      case "already-exists":
        toast.info(result.message);
        break;

      case "error":
        toast.error(result.message);
        break;

      case "local-added":
        toast.success(result.message);
        break;

      // "added" is optional here because optimistic toast already fired
      default:
        break;
    }
  };

  const handleRemoveProduct = async (
    productId: number,
    weight: number,
    product: any
  ): Promise<void> => {
    const previous = [...reduxCart];

    const removedItem = previous.find(
      (item) => item.productId === productId && item.weight === weight
    );

    if (!removedItem) return;

    // ------------------------
    // ⚡ Optimistic UI update
    // ------------------------
    const updated = previous.filter(
      (item) => !(item.productId === productId && item.weight === weight)
    );
    dispatch(
      setCart({
        items: updated,
        source: session?.user?.id ? "db" : "local",
      })
    );

    // ------------------------
    // Toast with Undo
    // ------------------------
    const toastId = toast(
      ({ closeToast }) => (
        <div className="flex items-center gap-3">
          <span>Item removed</span>
          <button
            onClick={async () => {
              // Restore Redux immediately
              dispatch(
                setCart({
                  items: previous,
                  source: session?.user?.id ? "db" : "local",
                })
              );

              // Restore persistence
              if (session?.user?.id) {
                await restoreCartItem(session.user.id, removedItem);
              } else {
                localStorage.setItem("cart", JSON.stringify(previous));
              }

              closeToast();
            }}
            className="text-green-600 underline"
          >
            Undo
          </button>

        </div>
      ),
      { autoClose: 4000 }
    );

    try {
      if (session?.user?.id) {
        // Auth user → remove from DB
        await removeCartItem(session.user.id, productId, weight);
        // ✅ No need to refetch; Redux already has updated snapshot
      } else {
        // Guest → remove from localStorage
        const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
        const newCart = localCart.filter(
          (item: any) => !(item.productId === productId && item.weight === weight)
        );
        localStorage.setItem("cart", JSON.stringify(newCart));
      }
    } catch (error) {
      console.error("❌ Failed to remove item:", error);

      // 🔁 Rollback UI
      dispatch(
        setCart({
          items: previous,
          source: session?.user?.id ? "db" : "local",
        })
      );
    }
  };


  return (
   <div className="min-h-screen bg-[#f4f8f5] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-dmsans_light">
      <div className="max-w-5xl mx-auto">
        
   

        {/* Page Title */}
        <div className="flex items-end gap-3 mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-monasans_semibold text-gray-900 tracking-tight">
            Shopping Cart
          </h1>
          {reduxCart && reduxCart.length > 0 && (
            <span className="text-base sm:text-lg text-gray-500 font-dmsans_light mb-1 sm:mb-1.5">
              ({reduxCart.length} {reduxCart.length === 1 ? 'item' : 'items'})
            </span>
          )}
        </div>

        {/* Main Cart Container */}
        <div className="w-full flex flex-col bg-white shadow-sm border border-green-100 rounded-2xl overflow-hidden transition-all">
          
          {/* Header Row - Hidden on mobile, shown on tablet/desktop */}
          {reduxCart && reduxCart.length > 0 && (
            <div className="hidden sm:flex items-center w-full bg-[#f9fbf9] border-b border-green-100 px-6 py-4 font-dmsans_semibold text-[13px] text-gray-500 uppercase tracking-widest">
              <div className="w-[50%] flex items-center">
                Item Details
              </div>
              <div className="w-[25%] flex items-center justify-center">
                Weight / Qty
              </div>
              <div className="w-[25%] flex items-center justify-center">
                Total
              </div>
            </div>
          )}

          {/* Cart Items Area */}
          <div className="flex flex-col md:max-h-[600px] overflow-y-auto custom-scrollbar">
            {reduxCart && reduxCart.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {reduxCart.map((c) => (
                  <div 
                    key={`${c?.id}-${c?.weight}`} 
                    className="px-4 sm:px-6 py-5 hover:bg-[#fafdfa] transition-colors"
                  >
                    <CartProductcard
                      item={c}
                      handleRemoveProduct={handleRemoveProduct}
                    />
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-20 px-4 sm:px-6">
                <div className="w-24 h-24 bg-green-50/50 rounded-full flex items-center justify-center mb-6 border border-green-100">
                  <span className="text-4xl opacity-80">🛒</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-monasans_semibold text-gray-900 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-[15px] font-dmsans_light text-gray-500 text-center max-w-md leading-relaxed">
                  Looks like you haven&apos;t added anything to your cart yet. Explore our fresh products and start filling it up!
                </p>
              </div>
            )}
          </div>

          {/* Optional bottom accent bar */}
          {reduxCart && reduxCart.length > 0 && (
            <div className="h-1.5 w-full bg-gradient-to-r from-[#0c831f]/10 via-[#0c831f]/40 to-[#0c831f]/10" />
          )}
        </div>

      </div>
    </div>
  )
}

export default Page