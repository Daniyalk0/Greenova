// components/cart/CartPreview.tsx
"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DesktopCartPreview from "./DesktopCartPreview";
import MobileCartPreview from "./MobileCartPreview";
import { AppDispatch, RootState } from "@/src/store/store";
import { fetchCartProducts, setLocalCart } from "@/src/store/cartProductsSlice";
import { useSession } from "next-auth/react";
import { removeCartItem, syncLocalCartToSupabase } from "@/src/app/actions/cart";
import { addToCart, removeFromCart, getCart } from "@/lib/cartUtils";
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
  

  const handleAddToCart = (product: any, weight: number) =>
    addToCartUtil({
      product,
      weight,
      cart: cartProducts,
      session,
      dispatch,
      setLocalCart,
      syncLocalCartToSupabase,
      fetchCartProducts,
      addToCart,
      getCart,
    });


  const handleRemoveProduct = async (
    productId: number,
    weight: number,
    product: any,
  ): Promise<void> => {

    const previous = [...cartProducts];

    // optimistic UI update
    const updated = previous.filter(
      (item) => !(item.productId === productId && item.weight === weight)
    );



    dispatch(setLocalCart(updated)); // instant update

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


    if (userId) {
      try {
        await removeCartItem(userId, productId, weight);

        // sync after slight delay
        setTimeout(() => {
          dispatch(fetchCartProducts(userId));
        }, 200);

      } catch (error) {
        dispatch(setLocalCart(previous)); // rollback
      }
    } else {
      // guest
      removeFromCart(productId, weight);
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
