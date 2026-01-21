import { addToWishlistDB, getWishlistDB, removeWishlistItemDB } from "@/src/app/actions/like";
import { setWishlist } from "@/src/store/wishListSlice";

export const toggleWishlistUtil = async ({
  product,
  wishlist,
  session,
  dispatch,
  onOptimisticAdd,
}: {
  product: any;
  wishlist: any[];
  session: any;
  dispatch: any;
  onOptimisticAdd?: (message: string) => void;
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
    (item: any) => item.productId === product.id,
  );

  if (isInWishlist) {
    // -------------------------------- REMOVE ITEM
    const updatedOptimistic = wishlist.filter(
      (item: any) => item.productId !== product.id,
    );

    dispatch(setWishlist({ items: updatedOptimistic }));
    // alert(`${product.name} removed from your wishlist.`);
    onOptimisticAdd?.(`${product.name} removed from your wishlist.`);

    try {
      await removeWishlistItemDB(product.id);
      const items = await getWishlistDB(userId);
      if (items) {
        dispatch(
          setWishlist({
            items: items,
          }),
        );
      }
    } catch (error) {
      console.error("Failed removing from wishlist:", error);
       dispatch(setWishlist({ items: previousWishlist }));
      return {
        type: "error",
        message: `Failed to remove item. Please try again`,
      };
    }
  } else {
    // -------------------------------- ADD ITEM
    const updatedOptimistic = [
      ...wishlist,
      { productId: product.id, ...product },
    ];

       dispatch(setWishlist({ items: updatedOptimistic }));
    onOptimisticAdd?.(`${product.name} added to your wishlist.`);

    try {
      await addToWishlistDB(userId, product.id);
      const items = await getWishlistDB(userId);
      if (items) {
        dispatch(
          setWishlist({
            items: items,

          }),
        );
      }
    } catch (error) {
      console.error("Failed adding to wishlist:", error);
      dispatch(
        setWishlist({
          items: previousWishlist
        }),
      );
      return {
        type: "error",
        message: `Failed to add item. Please try again.`,
      };
      // alert("Failed to add item. Please try again.");
    }
  }
};
