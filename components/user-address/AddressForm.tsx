"use client";

import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, User, Phone, CheckCircle2, AlertCircle, Plus } from "lucide-react";
import { useSession } from "next-auth/react";

import { useAddress } from "@/src/context/address-context";
import { AddressFormValues, addressSchema } from "@/lib/validation";
import { createAddress, updateAddress } from "@/src/app/actions/address-actions";

type AvailabilityStatus = "idle" | "checking" | "active" | "limited" | "unavailable" | "checking";

export default function AddressForm({
  address,
  onClose,
}: {
  address: any;
  onClose: () => void;
}) {
  const { refreshAddresses, setSelectedAddressId, saveGuest } = useAddress();
  const { data: session } = useSession();
  const user = session?.user?.id;

  const [isPending, startTransition] = useTransition();
  const [availability, setAvailability] = useState<AvailabilityStatus>("idle");
  const [showLandmark, setShowLandmark] = useState(!!address?.landmark);
  const [isManualOverride, setIsManualOverride] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
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

  const pincode = watch("pincode");

  // --- SUBMIT HANDLERS ---
  const onSubmit = (data: AddressFormValues) => {
    startTransition(async () => {
      try {
        if (!user) {
          // Guest User
          await new Promise((res) => setTimeout(res, 1000));
          await saveGuest(data);
          onClose();
          return;
        }

        if (availability === "unavailable") return;

        if (address) {
          // Update
          await updateAddress(address.id, data);
          await refreshAddresses();
          onClose();
        } else {
          // Create
          const saved = await createAddress(data);
          await refreshAddresses();
          setSelectedAddressId(saved.id);
          onClose();
        }
      } catch (error) {
        console.error("Submission failed:", error);
      }
    });
  };

// --- PINCODE AUTO-FILL & AVAILABILITY LOGIC ---
  useEffect(() => {
    // 1. If not exactly 6 digits, clear the fields and reset
    if (!pincode || pincode.length !== 6) {
      setAvailability("idle");
      setValue("city", "");
      setValue("state", "");
      return;
    }

    const fetchPincodeDetails = async () => {
      try {
        setAvailability("checking");

        // 2. Fetch standard City/State data via India Post API
        const postalRes = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        const postalData = await postalRes.json();

        if (postalData[0].Status === "Success") {
          // Auto-fill the fields (District usually maps to City)
          const postOffice = postalData[0].PostOffice[0];
          setValue("city", postOffice.District, { shouldValidate: true });
          setValue("state", postOffice.State, { shouldValidate: true });

          // 3. Now check YOUR backend to see if you deliver there
          const serviceRes = await fetch("/api/check-availability", {
            method: "POST",
            body: JSON.stringify({ pincode }),
          });
          const serviceData = await serviceRes.json();
          setAvailability(serviceData.status || "unavailable");

        } else {
          // If the postal API says invalid pincode, reset and mark unavailable
          setAvailability("unavailable");
          setValue("city", "");
          setValue("state", "");
        }
      } catch (error) {
        console.error("Failed to fetch pincode data", error);
        setAvailability("unavailable");
      }
    };

    // Debounce the call slightly to prevent rapid firing
    const timer = setTimeout(fetchPincodeDetails, 400);
    return () => clearTimeout(timer);
  }, [pincode, setValue]);
  

  // --- UI HELPERS ---
const isChecking = availability === "checking";

const isServiceable =
  availability === "active" ||
  availability === "limited" ||
  (availability === "idle" && address);

  const getInputClass = (hasError: boolean, readOnly = false) => `
    w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-gray-50/50 border rounded-xl text-gray-900 font-dmsans_medium text-[14px] focus:outline-none transition-all placeholder-gray-400
    ${readOnly ? "opacity-70 bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed select-none" : ""}
    ${!readOnly && hasError ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 bg-red-50/30" : ""}
    ${!readOnly && !hasError ? "border-gray-200 focus:border-[#0c831f] focus:ring-4 focus:ring-[#0c831f]/10 focus:bg-white hover:bg-white" : ""}
  `;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 sm:gap-5">
      
      {/* SECTION 1: CONTACT DETAILS */}
      <div className="space-y-2 sm:space-y-3">
        <h3 className="hidden sm:block text-[12px] font-dmsans_semibold text-gray-400 uppercase tracking-widest px-1">
          Contact Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          <div className="relative">
            <User className="absolute left-3.5 sm:left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              disabled={isPending}
              {...register("name")}
              placeholder="Full Name"
              className={`pl-10 sm:pl-7 font-dmsans_light ${getInputClass(!!errors.name)}`}
            />
          </div>

          <div className="relative">
            <Phone className="absolute left-3.5 sm:left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              disabled={isPending}
              {...register("phone")}
              placeholder="Phone Number"
              className={`pl-10 sm:pl-7 font-dmsans_light ${getInputClass(!!errors.phone)}`}
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: DELIVERY ADDRESS */}
      <div className="space-y-3">
        <h3 className="hidden sm:block text-[12px] font-dmsans_semibold text-gray-400 uppercase tracking-widest px-1">
          Delivery Address
        </h3>
        
        {/* Pincode & Status */}
        <div>
          <input
            disabled={isPending}
            maxLength={6}
            {...register("pincode")}
            placeholder="6-digit Pincode"
            className={ `font-dmsans_light ${getInputClass(!!errors.pincode)}` }
          />
          
          {/* Dynamic Status Feedback */}
          <div className="h-5 mt-1 px-1 flex items-center">
            {availability === "checking" && (
              <span className="text-[12px] text-gray-500 flex items-center gap-1.5 animate-pulse">
                <span className="w-3 h-3 border-2 border-gray-300 font-dmsans_semibold border-t-gray-500 rounded-full animate-spin" />
                Checking location...
              </span>
            )}
            {availability === "active" && (
              <span className="text-[12px] text-[#0c831f] flex items-center gap-1.5 font-dmsans_semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Delivery available
              </span>
            )}
            {availability === "limited" && (
              <span className="text-[12px] text-amber-600 flex items-center gap-1.5 font-dmsans_semibold">
                <AlertCircle className="w-3.5 h-3.5" /> Limited delivery area
              </span>
            )}
         {/* Inside your Dynamic Status Feedback block */}
        {availability === "unavailable" && (
          <span className="text-[12px] text-red-500 flex items-center gap-1.5 font-dmsans_semibold">
            <AlertCircle className="w-3.5 h-3.5" /> 
            {isManualOverride 
              ? "Invalid pincode. Please enter details manually." 
              : "Not serviceable in this area yet."}
          </span>
        )} 
          </div>
        </div>

        {/* Read-Only City & State Auto-fill */}
       {/* Read-Only City & State Auto-fill */}
       {/* City & State (Auto-fill or Manual Override) */}
        <div className="grid grid-cols-2 gap-3">
          <input
            readOnly={!isManualOverride} // Unlocks if API failed!
            {...register("city")}
            placeholder={availability === "checking" ? "Fetching..." : "City"}
            className={`${getInputClass(!!errors.city, !isManualOverride)} font-dmsans_light`}
            tabIndex={!isManualOverride ? -1 : 0} 
          />
          <input
            readOnly={!isManualOverride} // Unlocks if API failed!
            {...register("state")}
            placeholder={availability === "checking" ? "Fetching..." : "State"}
            className={`${getInputClass(!!errors.state, !isManualOverride)} font-dmsans_light`}
            tabIndex={!isManualOverride ? -1 : 0}
          />
        </div>
        {/* Street Address */}
        <div className="relative">
          <MapPin className="absolute left-3.5 sm:left-2 top-3.5 w-4 h-4 text-gray-400" />
          <textarea
            disabled={isPending}
            rows={2}
            {...register("street")}
            placeholder="House/Flat No., Building Name, Area"
            className={`pl-10 sm:pl-7 resize-none custom-scrollbar font-dmsans_light ${getInputClass(!!errors.street)}`}
          />
        </div>
      </div>

      {/* SECTION 3: OPTIONAL FIELDS */}
      <div>
        {!showLandmark ? (
          <button
            type="button"
            onClick={() => setShowLandmark(true)}
            className="flex items-center gap-1.5 text-[#0c831f] text-[13px] font-dmsans_semibold hover:bg-[#0c831f]/5 px-2 py-1.5 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add nearby landmark
          </button>
        ) : (
          <div className="animate-in fade-in slide-in-from-top-2">
            <input
              disabled={isPending}
              {...register("landmark")}
              placeholder="Landmark (Optional e.g. Near Apollo Hospital)"
              className={`font-dmsans_light ${getInputClass(!!errors.landmark)}`}
            />
          </div>
        )}
      </div>

      {/* SUBMIT BUTTON */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isPending || !isServiceable || (pincode?.length === 6 && isChecking)}
          className="w-full bg-[#0c831f] hover:bg-[#0a6d1a] text-white py-3 sm:py-3.5 px-5 sm:px-6 rounded-xl font-dmsans_semibold text-[14px] transition-all active:scale-[0.98] shadow-md shadow-[#0c831f]/20 disabled:opacity-50 disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Saving...</span>
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