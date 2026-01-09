

// export const calcOrderSummary = (products: any[]) => {
//   const subtotal = Math.max(
//     0,
//     products.reduce((sum, item) => {
//       const weight = item?.weight ?? 0;
//       const price = item?.Product?.basePricePerKg ?? 0;
//       return sum + price * weight;
//     }, 0)
//   );

//   const hasProducts = products.length > 0;

//   const deliveryFee = hasProducts ? 30 : 0;
//   const discount = hasProducts ? 50 : 0;

//   const total = Math.max(0, subtotal + deliveryFee - discount);

//   return {
//     subtotal,
//     deliveryFee,
//     discount,
//     total,
//     hasProducts,
//   };
// };


export const calcOrderSummary = (products: any[]) => {
  const { subtotal, discount } = products.reduce(
    (acc, item) => {
      const weight = item?.weight ?? 0;
      const pricePerKg = item?.Product?.basePricePerKg ?? 0;
      const discountPercent = item?.Product?.discount ?? 0; // e.g. 7 = 7%

      const itemTotal = pricePerKg * weight;
      const itemDiscount = itemTotal * (discountPercent / 100);

      acc.subtotal += itemTotal;
      acc.discount += itemDiscount;

      return acc;
    },
    { subtotal: 0, discount: 0 }
  );

const safeSubtotal = Math.max(0, Math.round(subtotal));
const safeDiscount = Math.min(safeSubtotal, Math.max(0, Math.round(discount)));

const discountedPrice = Math.max(0, safeSubtotal - safeDiscount);


  const hasProducts = products.length > 0;
  const deliveryFee = hasProducts ? 30 : 0;

  const total = Math.max(0, discountedPrice + deliveryFee);

  return {
    subtotal: safeSubtotal,          // before discount
    discount: safeDiscount,          // total discount amount
    discountedPrice,                 // after discount, before delivery
    deliveryFee,
    total,                           // final payable amount
    hasProducts,
  };
};
