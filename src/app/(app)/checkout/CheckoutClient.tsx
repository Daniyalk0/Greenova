"use client";

import { useState } from "react";
import AddressSection from "@/components/user-address/AddressSection";
import OrderSummary from "@/components/cartComponents/OrderSummary";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { handlePayment } from "@/lib/handlePayment";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";
import { useAddress } from "@/src/context/address-context";
import { useUI } from "@/src/context/ui-context";
import AddressSectionWrapper from "@/components/user-address/AddressSectionWrapper";
import { clearCart } from "@/src/store/cartProductsSlice";
import { AppDispatch } from "@/src/store/store";
import { useDispatch } from "react-redux";

export default function CheckoutClient({ cartItems, addresses, pricing }: any) {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const router = useRouter();
  const { selectedAddress, selectAddress, selectedAddressId } = useAddress();
  const { openAddressFormModal } = useUI();
  const [loading, setLoading] = useState(false);
const dispatch  = useDispatch<AppDispatch>();
  const handleOrder = async () => {
    if (loading) return;

    if (!selectedAddress) {
      toast.error("Please select an address");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems,
          addressId: selectedAddress?.id,
          paymentType: paymentMethod,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        console.log("addressID", selectedAddress);
        throw new Error(errData?.error || "Failed to create order");
      }

      const data = await res.json();

      if (!data?.orderId) {
        throw new Error("Invalid server response");
      }

      // ✅ COD
      if (paymentMethod === "cod") {
         dispatch(clearCart());
        toast.success("Order placed successfully");
        router.push(`/order-success?orderId=${data.orderId}`);
        return;
      }

      // ❌ missing payment data
      if (!data.razorpayOrderId || !data.amount) {
        throw new Error("Payment initialization failed");
      }

      // Update toast before opening Razorpay
      // toast.update(toastId, {
      //   render: "Redirecting to payment...",
      //   type: "info",
      //   isLoading: false,
      //   autoClose: 1500,
      // });

      if (paymentMethod !== "cod" && !(window as any).Razorpay) {
        throw new Error(
          "Payment system still loading. Please try again in a moment.",
        );
      }

      await handlePayment(router, data, dispatch);
    } catch (err: any) {
      console.error(err);

      toast.error(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f8f5] py-6 sm:py-10 px-4 sm:px-6 lg:px-8 font-dmsans_light">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-monasans_semibold text-gray-900 mb-6 sm:mb-8 tracking-tight">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* LEFT COLUMN: Address & Payment */}
          <div className="lg:col-span-8 space-y-6">
            {/* ADDRESS SECTION */}
            <section className="bg-white rounded-2xl shadow-sm border border-green-100 overflow-hidden transition-all">
              <div className="p-5 sm:p-7">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  {/* Left side */}
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 text-[#0c831f] rounded-full flex items-center justify-center text-base font-dmsans_semibold shrink-0">
                      1
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-monasans_semibold text-gray-900">
                        Delivery Address
                      </h2>
                      <p className="text-sm text-gray-500 mt-0.5">
                        Select where you want your items delivered
                      </p>
                    </div>
                  </div>

                  {/* Right side button */}
                  <div className="relative">
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => {
                        openAddressFormModal();
                      }}
                      className="flex items-center justify-center gap-2 bg-[#f4f8f5] hover:bg-[#e6f2eb] text-[#0c831f] border border-[#0c831f]/20 px-5 py-2.5 rounded-xl text-sm font-dmsans_semibold transition-colors w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus size={18} strokeWidth={2.5} />
                      Add New Address
                    </button>
                  </div>
                </div>

                <div className="relative space-y-4">
                  {loading && (
                    <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-xl">
                      <span className="w-6 h-6 border-2 border-[#0c831f] border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}

                  <AddressSectionWrapper />
                </div>
              
              </div>
            </section>

            {/* PAYMENT METHOD */}
            <section className="bg-white rounded-2xl shadow-sm border border-green-100 overflow-hidden transition-all">
              <div className="p-5 sm:p-7">
                {/* Heading */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 bg-green-100 text-[#0c831f] rounded-full flex items-center justify-center text-base font-dmsans_semibold shrink-0">
                    2
                  </div>
                  <h2 className="text-lg sm:text-xl font-monasans_semibold text-gray-900">
                    Payment Method
                  </h2>
                </div>

                {/* Options wrapper */}
                <div className="relative">
                  <div
                    className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-opacity duration-300 ${
                      loading ? "opacity-60 pointer-events-none" : ""
                    }`}
                  >
                    {/* COD */}
                    <label
                      className={`relative flex items-center p-5 border rounded-xl cursor-pointer transition-all duration-200 group ${
                        paymentMethod === "cod"
                          ? "border-[#0c831f] bg-[#f2fcf5] ring-1 ring-[#0c831f]"
                          : "border-gray-200 hover:border-[#0c831f]/40 hover:bg-[#f2fcf5]/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        className="h-5 w-5 text-[#0c831f] focus:ring-[#0c831f] border-gray-300 transition-colors cursor-pointer"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                      />
                      <div className="ml-4">
                        <span
                          className={`block text-base font-dmsans_semibold ${paymentMethod === "cod" ? "text-[#0c831f]" : "text-gray-900 group-hover:text-[#0c831f]"}`}
                        >
                          Cash on Delivery
                        </span>
                        <span className="block text-sm text-gray-500 mt-0.5">
                          Pay when you receive the package
                        </span>
                      </div>
                    </label>

                    {/* Razorpay */}
                    <label
                      className={`relative flex items-center p-5 border rounded-xl cursor-pointer transition-all duration-200 group ${
                        paymentMethod === "razorpay"
                          ? "border-[#0c831f] bg-[#f2fcf5] ring-1 ring-[#0c831f]"
                          : "border-gray-200 hover:border-[#0c831f]/40 hover:bg-[#f2fcf5]/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        className="h-5 w-5 text-[#0c831f] focus:ring-[#0c831f] border-gray-300 transition-colors cursor-pointer"
                        checked={paymentMethod === "razorpay"}
                        onChange={() => setPaymentMethod("razorpay")}
                      />
                      <div className="ml-4">
                        <span
                          className={`block text-base font-dmsans_semibold ${paymentMethod === "razorpay" ? "text-[#0c831f]" : "text-gray-900 group-hover:text-[#0c831f]"}`}
                        >
                          Online Payment
                        </span>
                        <span className="block text-sm text-gray-500 mt-0.5">
                          Cards, UPI, or Netbanking
                        </span>
                      </div>
                    </label>
                  </div>

                  {loading && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 bg-white/20 backdrop-blur-[1px] rounded-xl">
                      <span className="w-6 h-6 border-2 border-[#0c831f] border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: Order Summary (Sticky) */}
          <div className="lg:col-span-4">
            <div className="sticky top-8 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-5 sm:p-7 relative overflow-hidden">
                {/* Visual subtle top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#0c831f]" />

                <OrderSummary
                  products={cartItems}
                  pricing={pricing}
                  mode="checkout"
                />

                <div className="mt-8 pt-6 border-t border-dashed border-gray-200">
                  <button
                    onClick={handleOrder}
                    disabled={loading}
                    className="w-full bg-[#0c831f] hover:bg-[#0a6d1a] text-white py-4 px-6 rounded-xl font-dmsans_semibold text-lg transition-all active:scale-[0.98] shadow-lg shadow-[#0c831f]/20 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      "Place Order"
                    )}
                  </button>

                  <p className="text-center text-xs text-gray-400 mt-4 px-2">
                    By placing your order, you agree to our{" "}
                    <a
                      href="#"
                      className="underline hover:text-gray-600 transition-colors"
                    >
                      Terms of Service
                    </a>{" "}
                    &{" "}
                    <a
                      href="#"
                      className="underline hover:text-gray-600 transition-colors"
                    >
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
    </div>
  );
}
