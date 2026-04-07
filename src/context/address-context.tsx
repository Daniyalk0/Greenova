"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
} from "react";
import {
  createAddress,
  getUserAddresses,
} from "../app/actions/address-actions";
import { useSession } from "next-auth/react";
import {
  clearGuestAddress,
  getGuestAddress,
  saveGuestAddress,
} from "@/lib/clientAddress";

export type Address = {
  id: number;

  // Person details
  name: string;
  phone: string;

  // Address details
  street: string; // house no, building, street
  landmark?: string | null;
  area?: string; // locality / colony

  city: string;
  state: string;
  country?: string;
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
  setAddresses: React.Dispatch<React.SetStateAction<Address[]>>;
  setSelectedAddressId: any;
  selectAddress: (id: number) => void;
  refreshAddresses: () => Promise<void>;
  pendingGuestAddress: Address | null;
  setPendingGuestAddress: any;
  mergeGuestAddress: any;
  guestAddress: Address | null;
  saveGuest: any;
  clearGuest: any;
};

const AddressContext = createContext<AddressContextType | null>(null);

export function AddressProvider({ children }: { children: ReactNode }) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [pendingGuestAddress, setPendingGuestAddress] =
    useState<Address | null>(null);
  const { data: session } = useSession();
  const [guestAddress, setGuestAddress] = useState<Address | null>(null);

  useEffect(() => {
    if (!session?.user?.id) {
      setGuestAddress(getGuestAddress());
    } else {
      setGuestAddress(null);
    }
  }, [session?.user?.id]);

  const saveGuest = (data: Address) => {
    saveGuestAddress(data);
    setGuestAddress(data);
  };

  const clearGuest = () => {
    clearGuestAddress();
    setGuestAddress(null);
  };

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

  useEffect(() => {
    if (!session?.user?.id) return;

    const guest = getGuestAddress();
    if (guest) {
      setPendingGuestAddress(guest);
    }
  }, [session?.user?.id]);

  const mergeGuestAddress = async () => {
    if (!pendingGuestAddress) return;

    const saved = await createAddress(pendingGuestAddress);

    await fetchAddresses();
    setSelectedAddressId(saved.id);

    clearGuestAddress();
    setPendingGuestAddress(null);
  };

  return (
    <AddressContext.Provider
      value={{
        addresses,
        selectedAddress,
        setAddresses,
        selectedAddressId,
        setSelectedAddressId,
        loading,
        selectAddress,
        refreshAddresses: fetchAddresses,
        pendingGuestAddress,
        setPendingGuestAddress,
        mergeGuestAddress,
        guestAddress,
        saveGuest,
        clearGuest,
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
