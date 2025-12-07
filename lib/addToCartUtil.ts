export const addToCartUtil = async ({
  product,
  selectedWeightPrice,
  cart,
  localProducts,
  session,
  dispatch,
  setLocalCart,
  syncLocalCartToSupabase,
  fetchCartProducts,
  addToCart,
  getCart,
}: {
  product: any;
  selectedWeightPrice: { weight: number };
  cart: any[];
  localProducts: any[];
  session: any;
  dispatch: any;
  setLocalCart: (items: any[]) => void;
  syncLocalCartToSupabase: (userId: number, items: any[]) => Promise<void>;
  fetchCartProducts: (userId: number) => void;
  addToCart: (productWithWeight: any, weight: number) => void;
  getCart: () => any[];
}) => {
  const totalPrice = (product.basePricePerKg || 0) * (selectedWeightPrice.weight || 0);

  const productWithWeight = {
    ...product,
    weight: selectedWeightPrice.weight,
    totalPrice,
  };

  const existingItem = Array.isArray(localProducts)
    ? localProducts.find(
        (item) =>
          item.productId === product.id &&
          item.weight === selectedWeightPrice.weight
      )
    : null;

  if (existingItem) {
    alert(
      `This variant (${selectedWeightPrice.weight} kg) of ${product.name} is already in your cart.`
    );
    return;
  }

  const previous = [...cart];

  // -------------- OPTIMISTIC UPDATE --------------
  const updatedOptimistic = [...cart, productWithWeight];
  dispatch(setLocalCart(updatedOptimistic));
  alert(`${selectedWeightPrice.weight} kg of ${product.name} added to your cart!`);

  if (session?.user?.id) {
    try {
      await syncLocalCartToSupabase(Number(session.user.id), [productWithWeight]);
      setTimeout(() => {
        dispatch(fetchCartProducts(Number(session.user.id)));
      }, 150);
    } catch (error) {
      console.error("Failed syncing:", error);
      dispatch(setLocalCart(previous)); // rollback
      alert("Failed to add item. Please try again.");
    }
  } else {
    // local cart only
    addToCart(productWithWeight, selectedWeightPrice.weight);
    dispatch(setLocalCart(getCart()));
    alert(`${selectedWeightPrice.weight} kg of ${product.name} added to local cart!`);
  }
};
