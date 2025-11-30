export type CartItem = {
  name: string;
  imageUrl: string;
  basePricePerKg: number;
  weight: number; // selected weight in kg
  totalPrice: number;
  category?: string;
  subCategory?: string;
  slug?: string;
  inStock?: boolean;
  rating?: number;
  discount?: number;
  calories?: number;
  fat?: number;
  sugar?: number;
  carbohydrates?: number;
  protein?: number;
  availableWeights?: number[];
  price?: number;
  description?: string;
  sessionId: string | null;
  productId: number;
  id?:number;
};

export const addToCart = (product: any, selectedWeight: number) => {
  const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
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
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const getCart = () => {
  return JSON.parse(localStorage.getItem("cart") || "[]");
};

// ✅ Remove only one product variant (id + weight)
export const removeFromCart = (id: number, weight?: number) => {
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");

  if (weight !== undefined) {
    // Remove only that specific weight
    cart = cart.filter(
      (item: any) => !(item.productId === id && item.weight === weight)
    );
  } else {
    // Remove all weights for that product
    cart = cart.filter((item: any) => item.productId !== id);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

export const updateCartWeight = (productId: number, newWeight: number) => {
  const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
  const item = cart.find((i) => i.id === productId);
  if (item) {
    item.weight = newWeight;
    item.totalPrice = item.basePricePerKg * newWeight;
  }
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const clearCart = () => {
  localStorage.removeItem("cart");
};

export const calculateCartTotal = (cart: CartItem[]): number => {
  return cart.reduce((sum, item) => sum + item.totalPrice, 0);
};
