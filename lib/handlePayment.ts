import { clearCart } from "@/src/store/cartProductsSlice";
import { AppDispatch } from "@/src/store/store";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export const handlePayment = (
  router: any,
  orderData: any,
  dispatch: AppDispatch
) => {
  return new Promise<void>((resolve, reject) => {
  
    if (!(window as any).Razorpay) {
      const error = new Error(
        "Razorpay payment SDK failed to load. Please refresh the page."
      )
      toast.error(error.message)
      reject(error)
      return
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: orderData.amount,
      currency: "INR",
      order_id: orderData.razorpayOrderId,

      handler: async function (response: any) {
        try {
          const verifyRes = await fetch("/api/payment/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          if (!verifyRes.ok) {
            throw new Error("Verification request failed");
          }

          const data = await verifyRes.json();

          if (!data.success) {
            throw new Error("Payment verification failed");
          }

          toast.success("Payment successful");
           dispatch(clearCart());

          router.push(`/order-success?orderId=${data.orderId}`);

          resolve();
        } catch (err: any) {
          console.error(err);
          toast.error(err.message || "Payment failed");
          console.log(err.message || "Payment failed");
          reject(err);
        }
      },
    };

    const razorpay = new (window as any).Razorpay(options);

    razorpay.on("payment.failed", function () {
      toast.error("Payment failed or cancelled");
      reject(new Error("Payment failed"));
    });

    razorpay.open();
  });
};