import ForgotPasswordForm from "@/components/ForgotPasswordForm";
import { Suspense } from "react";

export default async function ForgotPassword() {

  return (
    <Suspense fallback={<p>Loading...</p>}>
    <ForgotPasswordForm/>
    </Suspense>
  );
}
