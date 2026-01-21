// components/cart/CartPreview.tsx
"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DesktopCartPreview from "./DesktopCartPreview";
import MobileCartPreview from "./MobileCartPreview";
import { AppDispatch, RootState } from "@/src/store/store";
import { setCart } from "@/src/store/cartProductsSlice";
import { useSession } from "next-auth/react";
import { removeCartItem, syncLocalCartToSupabase } from "@/src/app/actions/cart";
import { addToCart } from "@/lib/cartUtils";
import { toast } from "react-toastify";
import { addToCartUtil } from "@/lib/addToCartUtil";


export default function CartPreview() {
  const isOpen = useSelector(
    (state: RootState) => state.cartUI.isCartOpen
  );
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession()
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

  const cartProducts = useSelector((state: RootState) => state.cartProducts.items);

  console.log( cartProducts);
  

  const handleAddToCart = async (product : any, weight : any) => {
    const result = await addToCartUtil({
      product,
      weight,
      cart: cartProducts,
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
  const previous = [...cartProducts];

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
          onClick={() => {
            handleAddToCart(product, weight);
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
    <div className="relative z-[2500]">
      <div className="hidden md:block">
        <DesktopCartPreview products={cartProducts} handleRemoveProduct={handleRemoveProduct} />
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <MobileCartPreview products={cartProducts} handleRemoveProduct={handleRemoveProduct} />
      </div>
    </div>
  );
}
