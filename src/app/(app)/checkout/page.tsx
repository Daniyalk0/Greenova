import { Suspense } from "react";
import CheckoutWrapper from "./CheckoutWrapper";
import CheckoutSkeleton from "./CheckoutSkeleton";
// import CheckoutSkeleton from "./CheckoutSkeleton";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutSkeleton />}>
      <CheckoutWrapper />
    </Suspense>
  );
}