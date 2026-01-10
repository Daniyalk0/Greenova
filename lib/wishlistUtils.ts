export const toggleWishlistUtil = async ({
  product,
  wishlist,
  session,
  dispatch,
  setLocalWishlist,
  fetchWishlistProducts,
  addToWishlist,
  removeWishlistItem,
  onOptimisticAdd,
}: {
  product: any;
  wishlist: any[];
  session: any;
  dispatch: any;
  onOptimisticAdd?: (message: string) => void;
  setLocalWishlist: (items: any[]) => void;
  fetchWishlistProducts: (userId: number) => void;
  addToWishlist: (userId: number, productId: number) => Promise<any>;
  removeWishlistItem: (productId: number) => Promise<any>;
}) => {
  if (!session?.user?.id) {
    return {
      type: "error",
      message: "You must be logged in to modify the wishlist.",
    };
  }

  const userId = Number(session.user.id);
  const previousWishlist = [...wishlist];

  const isInWishlist = wishlist?.some(
    (item: any) => item.productId === product.id
  );

  if (isInWishlist) {
    // -------------------------------- REMOVE ITEM
    const updatedOptimistic = wishlist.filter(
      (item: any) => item.productId !== product.id
    );

    dispatch(setLocalWishlist(updatedOptimistic));
    // alert(`${product.name} removed from your wishlist.`);
    onOptimisticAdd?.(`${product.name} removed from your wishlist.`);

    try {
      await removeWishlistItem(product.id);
      setTimeout(() => dispatch(fetchWishlistProducts(userId)), 150);
    } catch (error) {
      console.error("Failed removing from wishlist:", error);
      dispatch(setLocalWishlist(previousWishlist)); // rollback
      return {
        type: "error",
        message: `Failed to remove item. Please try again.`,
      };
    }
  } else {
    // -------------------------------- ADD ITEM
    const updatedOptimistic = [
      ...wishlist,
      { productId: product.id, ...product },
    ];

    dispatch(setLocalWishlist(updatedOptimistic));
    onOptimisticAdd?.(`${product.name} added to your wishlist.`);

    try {
      await addToWishlist(userId, product.id);
      setTimeout(() => dispatch(fetchWishlistProducts(userId)), 150);
    } catch (error) {
      console.error("Failed adding to wishlist:", error);
      dispatch(setLocalWishlist(previousWishlist)); // rollback
       return {
        type: "error",
        message: `Failed to add item. Please try again.`,
      };
      // alert("Failed to add item. Please try again.");
    }
  }
};
