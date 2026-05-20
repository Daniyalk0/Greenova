import { setCart } from "@/src/store/cartProductsSlice";
import { syncLocalCartToSupabase } from "@/src/app/actions/cart";
import { store } from "@/src/store/store";

export const addToCartUtil = async ({
  product,
  weight,
  cart,
  session,
  dispatch,
  onOptimisticAdd,
}: {
  product: any;
  weight: number;
  cart: any[];
  session: any;
  dispatch: any;
  onOptimisticAdd?: (message: string) => void;
}) => {
  
  const totalPrice = (product.basePricePerKg || 0) * weight;

  // 1️⃣ UI SNAPSHOT (Redux + localStorage)
  const uiItem = {
    productId: product.id,
    discount: product.discount,
    weight,
    totalPrice,
    name: product.name,
    imageUrl: product.imageUrl,
    basePricePerKg: product.basePricePerKg,
    inStock: product.inStock ?? true,
  };

  // 2️⃣ DB CANONICAL
  const dbItem = {
    productId: product.id,
    weight,
    totalPrice,
  };

  // 🔍 Duplicate check (UI shape)
const latestCart =
  store.getState().cartProducts.items ?? [];

const exists = latestCart.some(
  (item) =>
    item.productId === uiItem.productId &&
    item.weight === uiItem.weight
);

  if (exists) {
    return {
      type: "already-exists",
      message: `This variant (${weight} kg) is already in your cart.`,
    };
  }

  const previousCart = [...latestCart];
const updatedCart = [...latestCart, uiItem];
  // ⚡ INSTANT UI UPDATE (NO WAITING)
  dispatch(
    setCart({
      items: updatedCart,
      source: session?.user?.id ? "db" : "local",
    })
  );

  onOptimisticAdd?.(
    `${weight} kg of ${product.name} added to your cart!`
  );

  // 💾 Persist in background
  try {
    if (!session?.user?.id) {
      // Guest
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return;
    }

    // Logged-in → DB write ONLY canonical fields
    await syncLocalCartToSupabase(session.user.id, [dbItem]);
  } catch (error) {
    console.error("❌ Cart sync failed:", error);

    // 🔁 HARD ROLLBACK (only on failure)
    dispatch(
      setCart({
        items: previousCart,
        source: session?.user?.id ? "db" : "local",
      })
    );

    return {
      type: "error",
      message: "Failed to add item. Please try again.",
    };
  }
};
