import { Suspense } from "react";
import ResetPasswordPage from "./ResetPasswordPage";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ResetPasswordPage />
    </Suspense>
  );
}