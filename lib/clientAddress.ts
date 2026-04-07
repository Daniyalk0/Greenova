const GUEST_ADDRESS_KEY = "guest_address";

export const saveGuestAddress = (address: any) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(GUEST_ADDRESS_KEY, JSON.stringify(address));
};

export const getGuestAddress = () => {
  if (typeof window === "undefined") return null;

  const data = localStorage.getItem(GUEST_ADDRESS_KEY);
  return data ? JSON.parse(data) : null;
};

export const clearGuestAddress = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(GUEST_ADDRESS_KEY);
};