// components/cart/CartPreview.tsx
"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DesktopCartPreview from "./DesktopCartPreview";
import MobileCartPreview from "./MobileCartPreview";
import { AppDispatch, RootState, store } from "@/src/store/store";
import { setCart } from "@/src/store/cartProductsSlice";
import { useSession } from "next-auth/react";
import {
  removeCartItem,
  syncLocalCartToSupabase,
} from "@/src/app/actions/cart";
import { addToCart } from "@/lib/cartUtils";
import { toast } from "react-toastify";
import { addToCartUtil } from "@/lib/addToCartUtil";

export default function CartPreview() {
  const isOpen = useSelector((state: RootState) => state.cartUI.isCartOpen);
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();
  const userId = session?.user?.id ? Number(session.user.id) : null;

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none"; // important for mobile
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen]);

  const cartProducts = useSelector(
    (state: RootState) => state.cartProducts.items,
  );

  // console.log( cartProducts);

  const handleAddToCart = async (product: any, weight: any) => {
    const result = await addToCartUtil({
      product,
      weight,
      cart: cartProducts ?? [],
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
    product: any,
  ): Promise<void> => {
    // Find exact item being removed
    let undone = false;
    const removedItem = (cartProducts ?? []).find(
      (item) => item.productId === productId && item.weight === weight,
    );

    if (!removedItem) return;

    // ------------------------
    // ⚡ Optimistic UI update
    // ------------------------
    const updatedCart = (cartProducts ?? []).filter(
      (item) => !(item.productId === productId && item.weight === weight),
    );

    dispatch(
      setCart({
        items: updatedCart,
        source: session?.user?.id ? "db" : "local",
      }),
    );

    // ------------------------
    // Toast with Undo
    // ------------------------
    toast(
      ({ closeToast }) => (
        <div className="flex items-center gap-3">
          <span>Item removed</span>

          <button
            onClick={async () => {
              undone = true;

              const latestCart = store.getState().cartProducts.items ?? [];

              const restoredCart = [...latestCart, removedItem];

              // Redux restore
              dispatch(
                setCart({
                  items: restoredCart,
                  source: session?.user?.id ? "db" : "local",
                }),
              );

              // Guest persistence
              if (!session?.user?.id) {
                localStorage.setItem("cart", JSON.stringify(restoredCart));
              }

              // Logged-in persistence
              if (session?.user?.id) {
                await syncLocalCartToSupabase(session.user.id, [
                  {
                    productId: removedItem.productId,
                    weight: removedItem.weight,
                    totalPrice: removedItem.totalPrice,
                  },
                ]);
              }

              closeToast();
            }}
            className="text-green-600 underline"
          >
            Undo
          </button>
        </div>
      ),
      { autoClose: 4000 },
    );

    try {
      if (session?.user?.id) {
        // Logged-in user → DB remove
        await removeCartItem(session.user.id, productId, weight);
      } else {
        // Guest → localStorage remove
        const localCart = JSON.parse(localStorage.getItem("cart") || "[]");

        const newCart = localCart.filter(
          (item: any) =>
            !(item.productId === productId && item.weight === weight),
        );

        localStorage.setItem("cart", JSON.stringify(newCart));
      }
    } catch (error) {
      if (undone) return;
      console.error("❌ Failed to remove item:", error);

      handleAddToCart(removedItem.product, removedItem.weight);
    }
  };

  return (
    <div className="relative z-[2500]">
      <div className="hidden md:block">
        <DesktopCartPreview
          products={cartProducts}
          handleRemoveProduct={handleRemoveProduct}
        />
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <MobileCartPreview
          products={cartProducts}
          handleRemoveProduct={handleRemoveProduct}
        />
      </div>
    </div>
  );
}
