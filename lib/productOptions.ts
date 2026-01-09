export const buildProductOptions = (product: any) => {
  const weights = product.availableWeights || [];
  const basePricePerKg = product.basePricePerKg || 0;
  const discount = product.discount || 0;

  return weights.map((weight: number) => {
    const basePrice = basePricePerKg * weight;
    const finalPrice = Math.round(
      basePrice - (basePrice * discount) / 100
    );

    return {
      weight,
      price: finalPrice,
      originalPrice: discount ? basePrice : undefined,
    };
  });
};
