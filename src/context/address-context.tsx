"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { getUserAddresses } from "../app/actions/address-actions";

type Address = {
  id: number;

  // Person details
  name: string;
  phone: string;

  // Address details
  street: string;        // house no, building, street
  landmark?: string | null;
  area?: string;         // locality / colony

  city: string;
  state: string;
  country: string;
  pincode: string;

  // Address type
  label?: "home" | "work" | "other";

  // Defaults & flags
  isDefault?: boolean;

  // Metadata
  createdAt: Date; 
  updatedAt: Date;   
};

type AddressContextType = {
  addresses: Address[];
  selectedAddress: Address | null;
  selectedAddressId: number | null;
  loading: boolean;

  selectAddress: (id: number) => void;
  refreshAddresses: () => Promise<void>;
};

const AddressContext = createContext<AddressContextType | null>(null);

export function AddressProvider({ children }: { children: ReactNode }) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // derive selected address
  const selectedAddress = useMemo(() => {
    return addresses.find((a) => a.id === selectedAddressId) || null;
  }, [addresses, selectedAddressId]);

  const fetchAddresses = async () => {
    setLoading(true);

    const data = await getUserAddresses();
    setAddresses(data);

    if (data.length > 0) {
      setSelectedAddressId((prev) => {
        // keep previous if still valid
        const exists = data.some((a) => a.id === prev);
        return exists ? prev : data[0].id;
      });
    } else {
      setSelectedAddressId(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const selectAddress = (id: number) => {
    setSelectedAddressId(id);
  };

  return (
    <AddressContext.Provider
      value={{
        addresses,
        selectedAddress,
        selectedAddressId,
        loading,
        selectAddress,
        refreshAddresses: fetchAddresses,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
}

export function useAddress() {
  const ctx = useContext(AddressContext);
  if (!ctx) throw new Error("useAddress must be used within AddressProvider");
  return ctx;
}