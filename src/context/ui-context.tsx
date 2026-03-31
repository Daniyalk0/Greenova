"use client";

import { createContext, useContext, useState } from "react";

type UIContextType = {
  isAddressListOpen: boolean;
  openAddressListModal: () => void;
  closeAddressListModal: () => void;

  isAddressFormOpen: boolean;
  openAddressFormModal: (address?: any) => void;
  closeAddressFormModal: () => void;

  editingAddress: any;
};

const UIContext = createContext<UIContextType | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [isAddressListOpen, setIsAddressListOpen] = useState(false);
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const openAddressListModal = () => setIsAddressListOpen(true);
  const closeAddressListModal = () => setIsAddressListOpen(false);

  const openAddressFormModal = (address: any) => {
    setEditingAddress(address);
    setIsAddressFormOpen(true);
  };

  const closeAddressFormModal = () => {
    setEditingAddress(null);
    setIsAddressFormOpen(false);
  };

  return (
    <UIContext.Provider
      value={{
        isAddressListOpen,
        openAddressListModal,
        closeAddressListModal,

        isAddressFormOpen,
        openAddressFormModal,
        closeAddressFormModal,

        editingAddress,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export const useUI = () => {
  const context = useContext(UIContext);

  if (!context) {
    throw new Error("useUI must be used within UIProvider");
  }

  return context;
};