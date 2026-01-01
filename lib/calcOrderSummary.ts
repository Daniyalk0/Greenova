

export const calcOrderSummary = (products: any[]) => {
  const subtotal = Math.max(
    0,
    products.reduce((sum, item) => {
      const weight = item?.weight ?? 0;
      const price = item?.Product?.basePricePerKg ?? 0;
      return sum + price * weight;
    }, 0)
  );

  const hasProducts = products.length > 0;

  const deliveryFee = hasProducts ? 30 : 0;
  const discount = hasProducts ? 50 : 0;

  const total = Math.max(0, subtotal + deliveryFee - discount);

  return {
    subtotal,
    deliveryFee,
    discount,
    total,
    hasProducts,
  };
};
