"use client"
import CartProductcard from '@/components/cartComponents/CartProductcard'
import OrderSummary from '@/components/cartComponents/OrderSummary'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { removeCartItem } from '../actions/cart'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/src/store/store'
import { setCart } from '@/src/store/cartProductsSlice'
import { toast } from 'react-toastify'
import { addToCartUtil } from '@/lib/addToCartUtil'
import { restoreCartItem } from '../actions/restoreCartItem'
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
    <div className='py-5 gap-6 md:p-12 lg:p-32 flex flex-col md:flex-row items-start justify-start relative '>
      <div className="text-sm text-gray-800 mb-4 font-dmsans_light absolute top-5 left-10 ">
        <span className="hover:underline cursor-pointer ">Home</span> /
        <span className="ml-1 ">Cart</span>
      </div>
      <div className="w-full flex flex-col md:w-[60%] shadow-lg rounded-lg p-5 md:max-h-[575px]">
        {/* Header */}
        <div className="flex items-center w-full border-b border-gray-300 py-2 mb-2 font-monasans_semibold text-sm sm:text-base">
          <div className="w-[50%] flex items-center gap-3">
            <span>Item</span>
          </div>

          <div className="w-[25%] flex items-center justify-center">
            <span>Weight</span>
          </div>

          <div className="w-[25%] flex items-center justify-center">
            <span>Total</span>
          </div>
        </div>
        {reduxCart && reduxCart.length > 0 ? (
          reduxCart.map((c) => (
            <CartProductcard
              key={`${c?.id}-${c?.weight}`}
              item={c}
              handleRemoveProduct={handleRemoveProduct}
            />
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            Your cart is empty 🛒
          </div>
        )}

      </div>

      <OrderSummary products={reduxCart} address={location} />
    </div>
  )
}

export default Page