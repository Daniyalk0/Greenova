"use client";

import { createContext, useContext, useState } from "react";

type UIContextType = {
  isLocationModalOpen: boolean;
  openLocationModal: () => void;
  closeLocationModal: () => void;
};

const UIContext = createContext<UIContextType | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const openLocationModal = () => setIsLocationModalOpen(true);
  const closeLocationModal = () => setIsLocationModalOpen(false);

  return (
    <UIContext.Provider
      value={{
        isLocationModalOpen,
        openLocationModal,
        closeLocationModal,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within UIProvider");
  }
  return context;
}
