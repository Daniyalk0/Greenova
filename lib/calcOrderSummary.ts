
export const calcOrderSummary = (
  products: any[] | null,
) => {

  if (!products || products.length === 0) {
    return {
      subtotal: 0,
      discountAmount: 0,
      discountPercent: 0,
      discountedPrice: 0,
      total: 0
    };
  }

 const { subtotal, discountAmount, discountPercent } = products.reduce(
  (acc, item) => {
    const weight = item?.weight ?? 0;
    const pricePerKg = item?.basePricePerKg ?? 0;
    const productDiscount = item?.discount ?? 0; // % from product

    const itemTotal = pricePerKg * weight;
    const itemDiscount = itemTotal * (productDiscount / 100);

    acc.subtotal += itemTotal;
    acc.discountAmount += itemDiscount;

    // just store the product discount %
    acc.discountPercent = productDiscount;

    return acc;
  },
  { subtotal: 0, discountAmount: 0, discountPercent: 0 }
);

const safeSubtotal = Math.max(0, Math.round(subtotal));
const safeDiscountAmount = Math.min(
  safeSubtotal,
  Math.max(0, Math.round(discountAmount))
);

const discountedPrice = Math.max(0, safeSubtotal - safeDiscountAmount);

return {
  subtotal: safeSubtotal,
  discountAmount: safeDiscountAmount, // money
  discountPercent,                    // product %
  discountedPrice,
  total: discountedPrice
};
};


export function getItemsTotal(items: any[] = []): number {
  return items.reduce((sum, item) => {
    return sum + (item.totalPrice ?? 0);
  }, 0);
}
