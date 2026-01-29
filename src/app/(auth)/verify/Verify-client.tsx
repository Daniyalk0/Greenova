"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Status = "success" | "invalid" | "expired";

export default function VerifyClient({ status }: { status: Status }) {
  const router = useRouter();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (status !== "success") return;

    const timers = [
      setTimeout(() => setStep(1), 500),   // Verifying
      setTimeout(() => setStep(2), 1100),  // Verified
      setTimeout(() => setStep(3), 1700),  // Redirecting
      setTimeout(() => {
        router.replace("/login?verified=true");
      }, 2000),
    ];

    return () => timers.forEach(clearTimeout);
  }, [status, router]);

  if (status === "invalid") {
    return <p className="font-semibold text-center">❌ Invalid verification link.</p>;
  }

  if (status === "expired") {
    return <p className="font-semibold text-center">⏰ Verification link has expired.</p>;
  }

  return (
    <div className="space-y-2 font-semibold text-center">
      {step >= 1 && <p>🔍 Verifying your email…</p>}
      {step >= 2 && <p>✅ Email verified</p>}
      {step >= 3 && <p>➡️ Redirecting to login…</p>}
    </div>
  );
}

