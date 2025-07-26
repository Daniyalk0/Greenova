export const addOrIncreaseQuantity = (cart, givenquantity, product) => {
  const existingItem = cart.find((item) => item.id === product.id);
  if (existingItem) {
    const updatedItem = cart.map((item) =>
      item.id === product.id
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    );
    return updatedItem;
  }
  return [...cart, { ...product, quantity: givenquantity || 1 }];
};

export const removeProduct = (cart, product) => {
  const filteredProducts = cart.filter((p) => p.id !== product.id);
  return filteredProducts;
};

export const decreaseQuantity = (productId, cart) => {
  const decreasedQuantity = cart.map((item) =>
    item.id === productId
      ? { ...item, quantity: item.quantity - 1 } : item
  ).filter((item) => item.quantity > 0)
  return decreasedQuantity
};
