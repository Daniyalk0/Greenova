
const CART_STORAGE_KEY = "cart";


export const addToCart = (product: any, selectedWeight: number) => {
  const cart:any[] = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
  const sessionId = localStorage.getItem("sessionId");

  const existingIndex = cart?.findIndex(
    (item) => item.id === product.id && item.weight === selectedWeight
  );
  if (existingIndex !== -1) {
    cart[existingIndex].weight = selectedWeight;
    cart[existingIndex].totalPrice = product.basePricePerKg * selectedWeight;
  } else {
    cart.push({
      sessionId,
      productId: product.id,
      name: product.name,
      category: product.category,
      subCategory: product.subCategory ?? null,
      imageUrl: product.imageUrl,
      weight: selectedWeight,
      basePricePerKg: product.basePricePerKg,
      totalPrice: (product.basePricePerKg || 0) * (selectedWeight || 0),
      inStock: product.inStock ?? true,

      // Optional fields (nullable in Prisma)
      rating: product.rating ?? null,
      discount: product.discount ?? null,
      calories: product.calories ?? null,
      fat: product.fat ?? null,
      sugar: product.sugar ?? null,
      carbohydrates: product.carbohydrates ?? null,
      protein: product.protein ?? null,
      price: product.price ?? null,
      description: product.description ?? null,
      availableWeights: product.availableWeights ?? [],
    });
  }
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};


// ✅ Remove only one product variant (id + weight)
export const removeItemLocalStorage = (id: number, weight?: number) => {
  let cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");

  if (weight !== undefined) {
    // Remove only that specific weight
    cart = cart.filter(
      (item: any) => !(item.productId === id && item.weight === weight)
    );
  } else {
    // Remove all weights for that product
    cart = cart.filter((item: any) => item.productId !== id);
  }

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};

export const updateCartWeight = (productId: number, newWeight: number) => {
  const cart: any[] = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
  const item = cart.find((i) => i.id === productId);
  if (item) {
    item.weight = newWeight;
    item.totalPrice = item.basePricePerKg * newWeight;
  }
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};

export const clearCartLocalStorage = () => {
  localStorage.removeItem(CART_STORAGE_KEY);
};

export const calculateCartTotal = (cart: any[]): number => {
  return cart.reduce((sum, item) => sum + item.totalPrice, 0);
};



/**
 * Get cart from localStorage
 */
export function getCartFromLocalStorage(): any[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored) as any[];
  } catch (err) {
    console.error("Failed to read cart from localStorage:", err);
    return [];
  }
}

