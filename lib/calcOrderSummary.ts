export const calcOrderSummary = (products: any[] | null) => {
  if (!products || products.length === 0) {
    return {
      subtotal: 0,
      discountAmount: 0,
      discountedPrice: 0,
      total: 0,
      // discountPercent,
    };
  }

  const { subtotal, discountAmount } = products.reduce(
    (acc, item) => {
      const weight = item?.weight ?? 0;
      const pricePerKg = item?.basePricePerKg ?? 0;
      const productDiscount = item?.discount ?? 0; // % from product

      const itemTotal = pricePerKg * weight;
      const itemDiscount = itemTotal * (productDiscount / 100);

      acc.subtotal += itemTotal;
      acc.discountAmount += itemDiscount;

      return acc;
    },
    { subtotal: 0, discountAmount: 0 },
  );

  const safeSubtotal = Math.max(0, Math.round(subtotal));
  const safeDiscountAmount = Math.min(
    safeSubtotal,
    Math.max(0, Math.round(discountAmount)),
  );
  const discountPercent =
    safeSubtotal > 0
      ? Math.round((safeDiscountAmount / safeSubtotal) * 100)
      : 0;

  const discountedPrice = Math.max(0, safeSubtotal - safeDiscountAmount);

  return {
    subtotal: safeSubtotal,
    discountAmount: safeDiscountAmount, // money
    discountedPrice,
    discountPercent,
    total: discountedPrice,
  };
};

export function getItemsTotal(items: any[] = []): number {
  return items.reduce((sum, item) => {
    return sum + (item.totalPrice ?? 0);
  }, 0);
}
