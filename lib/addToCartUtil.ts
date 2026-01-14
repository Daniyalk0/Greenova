export const addToCartUtil = async ({
  product,
  weight,
  cart,
  // localProducts,
  session,
  dispatch,
  setLocalCart,
  syncLocalCartToSupabase,
  fetchCartProducts,
  addToCart,
  getCart,
  onOptimisticAdd,
}: {
  product: any;
  weight: number;
  cart: any[];
  // localProducts: any[];
  session: any;
  dispatch: any;
  setLocalCart: (items: any[]) => void;
  syncLocalCartToSupabase: (userId: number, items: any[]) => Promise<void>;
  fetchCartProducts: (userId: number) => void;
  addToCart: (productWithWeight: any, weight: number) => void;
  getCart: () => any[];
  onOptimisticAdd?: (message: string) => void;
}) => {
  const totalPrice = (product.basePricePerKg || 0) * (weight || 0);

  const productWithWeight = {
    ...product,
    weight: weight,
    totalPrice,
  };

  const existingItem = Array.isArray(cart)
    ? cart.find(
        (item) => item.productId === product.id && item.weight === weight
      )
    : null;

  if (existingItem) {
    return {
      type: "already-exists",
      message: `This variant (${weight} kg) of ${product.name} is already in your cart.`,
    };
  }

  const previous = [...cart];

  // -------------- OPTIMISTIC UPDATE --------------
  const updatedOptimistic = [...cart, productWithWeight];
  dispatch(setLocalCart(updatedOptimistic));
  // alert(`${weight} kg of ${product.name} added to your cart!`);
  onOptimisticAdd?.(`${weight} kg of ${product.name} added to your cart!`);

  if (session?.user?.id) {
    try {
      await syncLocalCartToSupabase(Number(session.user.id), [
        productWithWeight,
      ]);
      setTimeout(() => {
        dispatch(fetchCartProducts(Number(session.user.id)));
      }, 150);
    } catch (error) {
      console.error("Failed syncing:", error);
      dispatch(setLocalCart(previous)); // rollback
      // alert("Failed to add item. Please try again.");
      return {
        type: "error",
        message: "Failed to add item. Please try again.",
      };
    }
  } else {
    // local cart only
    addToCart(product, productWithWeight.weight);
    dispatch(setLocalCart(getCart()));
  }
};
