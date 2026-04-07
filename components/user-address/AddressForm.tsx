"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Address, useAddress } from "@/src/context/address-context";
import { AddressFormValues, addressSchema } from "@/lib/validation";
import {
  createAddress,
  updateAddress,
} from "@/src/app/actions/address-actions";
import { saveGuestAddress } from "@/lib/clientAddress";
import { useSession } from "next-auth/react";

export default function AddressForm({
  address,
  onClose,
}: {
  address: any;
  onClose: () => void;
}) {
  const { refreshAddresses, setAddresses, setSelectedAddressId, selectedAddressId, addresses, saveGuest} = useAddress();
  const { data: session } = useSession();
  const user = session?.user?.id;

  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: address?.name || "",
      phone: address?.phone || "",
      street: address?.street || "",
      city: address?.city || "",
      state: address?.state || "",
      pincode: address?.pincode || "",
      landmark: address?.landmark || "",
    },
  });

 const handleCreate = async (data: AddressFormValues) => {
  if (!user) {
    saveGuest(data);
    onClose()
    return;
  }

  const tempId = Date.now();

  const tempAddress: Address = {
    id: tempId,
    name: data.name,
    phone: data.phone,
    street: data.street,
    city: data.city,
    state: data.state,
    pincode: data.pincode,
    // country: data.country ?? null,
    landmark: data.landmark ?? null,
    // area: data.area,
    // label: data.label,
    isDefault: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const prevSelected = selectedAddressId;

  try {
    // optimistic
// optimistic add
setAddresses((prev) => [tempAddress, ...prev]);

// ✅ ADD THIS
setSelectedAddressId(tempId);

    const saved = await createAddress(data);

    // replace with real
    setAddresses((prev) =>
      prev.map((a) => (a.id === tempId ? saved : a))
    );

    setSelectedAddressId(saved.id);

    onClose();
  } catch (error) {
    // rollback
    setAddresses((prev) => prev.filter((a) => a.id !== tempId));
    setSelectedAddressId(prevSelected);
  }
};


const handleUpdate = async (id: number, data: AddressFormValues) => {
  if (!user) {
    saveGuest(data); // guest overwrite
    onClose();
    return;
  }

  const prevAddresses = addresses;

  try {
    // ✅ optimistic update
    setAddresses((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              ...data,
              updatedAt: new Date(), // keep UI fresh
            }
          : a
      )
    );

    await updateAddress(id, data);

    onClose();
  } catch (error) {
    // ❌ rollback
    setAddresses(prevAddresses);
  }
};

const condtionalHandle = async (data: AddressFormValues) => {
  if (address) {
    await handleUpdate(address.id, data);
  } else {
    await handleCreate(data);
  }
};

const onSubmit = (data: AddressFormValues) => {
  startTransition(() => condtionalHandle(data));
};


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="block text-[11px] sm:text-xs font-dmsans_semibold text-gray-500 mb-1 sm:mb-1.5 ml-1 uppercase tracking-wider">
            Full Name
          </label>
          <input
            disabled={isPending}
            {...register("name")}
            placeholder="John Doe"
            className={`w-full px-3.5 py-2.5 sm:py-3 bg-gray-50 border rounded-xl text-gray-900 font-dmsans_light text-sm focus:outline-none focus:ring-4 focus:bg-white transition-all placeholder-gray-400 ${
              errors.name
                ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                : "border-gray-200 focus:border-[#0c831f] focus:ring-[#0c831f]/10"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-[11px] font-dmsans_semibold mt-1 ml-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-[11px] sm:text-xs font-dmsans_semibold text-gray-500 mb-1 sm:mb-1.5 ml-1 uppercase tracking-wider">
            Phone Number
          </label>
          <input
            disabled={isPending}
            {...register("phone")}
            placeholder="+91 9876543210"
            className={`w-full px-3.5 py-2.5 sm:py-3 bg-gray-50 border rounded-xl text-gray-900 font-dmsans_light text-sm focus:outline-none focus:ring-4 focus:bg-white transition-all placeholder-gray-400 ${
              errors.phone
                ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                : "border-gray-200 focus:border-[#0c831f] focus:ring-[#0c831f]/10"
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-[11px] font-dmsans_semibold mt-1 ml-1">
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>

      {/* Street */}
      <div>
        <label className="block text-[11px] sm:text-xs font-dmsans_semibold text-gray-500 mb-1 sm:mb-1.5 ml-1 uppercase tracking-wider">
          Street Address
        </label>
        <input
          disabled={isPending}
          {...register("street")}
          placeholder="House/Flat No., Building Name, Area"
          className={`w-full px-3.5 py-2.5 sm:py-3 bg-gray-50 border rounded-xl text-gray-900 font-dmsans_light text-sm focus:outline-none focus:ring-4 focus:bg-white transition-all placeholder-gray-400 ${
            errors.street
              ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
              : "border-gray-200 focus:border-[#0c831f] focus:ring-[#0c831f]/10"
          }`}
        />
        {errors.street && (
          <p className="text-red-500 text-[11px] font-dmsans_semibold mt-1 ml-1">
            {errors.street.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* City */}
        <div>
          <label className="block text-[11px] sm:text-xs font-dmsans_semibold text-gray-500 mb-1 sm:mb-1.5 ml-1 uppercase tracking-wider">
            City
          </label>
          <input
            disabled={isPending}
            {...register("city")}
            placeholder="e.g. Mumbai"
            className={`w-full px-3.5 py-2.5 sm:py-3 bg-gray-50 border rounded-xl text-gray-900 font-dmsans_light text-sm focus:outline-none focus:ring-4 focus:bg-white transition-all placeholder-gray-400 ${
              errors.city
                ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                : "border-gray-200 focus:border-[#0c831f] focus:ring-[#0c831f]/10"
            }`}
          />
          {errors.city && (
            <p className="text-red-500 text-[11px] font-dmsans_semibold mt-1 ml-1">
              {errors.city.message}
            </p>
          )}
        </div>

        {/* State */}
        <div>
          <label className="block text-[11px] sm:text-xs font-dmsans_semibold text-gray-500 mb-1 sm:mb-1.5 ml-1 uppercase tracking-wider">
            State
          </label>
          <input
            disabled={isPending}
            {...register("state")}
            placeholder="e.g. Maharashtra"
            className={`w-full px-3.5 py-2.5 sm:py-3 bg-gray-50 border rounded-xl text-gray-900 font-dmsans_light text-sm focus:outline-none focus:ring-4 focus:bg-white transition-all placeholder-gray-400 ${
              errors.state
                ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                : "border-gray-200 focus:border-[#0c831f] focus:ring-[#0c831f]/10"
            }`}
          />
          {errors.state && (
            <p className="text-red-500 text-[11px] font-dmsans_semibold mt-1 ml-1">
              {errors.state.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Pincode */}
        <div>
          <label className="block text-[11px] sm:text-xs font-dmsans_semibold text-gray-500 mb-1 sm:mb-1.5 ml-1 uppercase tracking-wider">
            Pincode
          </label>
          <input
            disabled={isPending}
            {...register("pincode")}
            placeholder="6-digit pincode"
            className={`w-full px-3.5 py-2.5 sm:py-3 bg-gray-50 border rounded-xl text-gray-900 font-dmsans_light text-sm focus:outline-none focus:ring-4 focus:bg-white transition-all placeholder-gray-400 ${
              errors.pincode
                ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                : "border-gray-200 focus:border-[#0c831f] focus:ring-[#0c831f]/10"
            }`}
          />
          {errors.pincode && (
            <p className="text-red-500 text-[11px] font-dmsans_semibold mt-1 ml-1">
              {errors.pincode.message}
            </p>
          )}
        </div>

        {/* Landmark */}
        <div>
          <label className="block text-[11px] sm:text-xs font-dmsans_semibold text-gray-500 mb-1 sm:mb-1.5 ml-1 uppercase tracking-wider">
            Landmark{" "}
            <span className="text-gray-400 font-dmsans_light normal-case tracking-normal ml-1">
              (Optional)
            </span>
          </label>
          <input
            disabled={isPending}
            {...register("landmark")}
            placeholder="e.g. Near Apollo Hospital"
            className="w-full px-3.5 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-dmsans_light text-sm focus:outline-none focus:border-[#0c831f] focus:ring-4 focus:ring-[#0c831f]/10 focus:bg-white transition-all placeholder-gray-400"
          />
        </div>
      </div>

      <div className="pt-1 mt-2 sm:mt-1">
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-[#0c831f] hover:bg-[#0a6d1a] text-white py-3 sm:py-3.5 px-6 rounded-xl font-dmsans_semibold text-[15px] sm:text-base transition-all active:scale-[0.98] shadow-md shadow-[#0c831f]/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2.5"
        >
          {isPending ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Saving Address...</span>
            </>
          ) : address ? (
            "Update Address"
          ) : (
            "Save Address"
          )}
        </button>
      </div>
    </form>
  );
}
