"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ResetPasswordForm from "@/components/ResetPasswordForm";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isValid, setIsValid] = useState<null | boolean>(null);

  useEffect(() => {
    if (!token) {
      setIsValid(false);
      return;
    }

    fetch(`/api/auth/resetPassword?token=${token}`)
      .then(res => res.json())
      .then(data => setIsValid(data.valid))
      .catch(() => setIsValid(false));
  }, [token]);

  if (isValid === null) {
    return <p>Checking link...</p>;
  }

  if (!isValid) {
    return <p>This password reset link is invalid or expired.</p>;
  }

  return <ResetPasswordForm token={token!} />;
}
