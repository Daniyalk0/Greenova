"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { forgotPasswordSchema } from "@/lib/validation";
import AuthButton from "./ui/AuthButton";

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;


export default function ForgotPasswordForm() {
  const [serverMessage, setServerMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setLoading(true);
    setServerMessage("");

    try {
      const res = await fetch("/api/auth/forgotPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await res.json();
      setServerMessage(result.message || "Check your email for reset instructions");
    } catch (err) {
      console.error("Forgot password error:", err);
      setServerMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
 <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 via-white to-green-100 flex items-center justify-center px-4">
  <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
    {/* Header */}
    <div className="mb-8 text-center">
      <h1 className="text-2xl font-semibold text-gray-800 font-monasans_semibold">
        Forgot Password
      </h1>
      <p className="mt-1 text-sm text-gray-500 font-dmsans_light">
        We’ll send you a password reset link
      </p>
    </div>

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Email */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700 font-dmsans_semibold">
          Email address
        </label>
        <input
          type="email"
          placeholder="you@example.com"
          {...register("email")}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 font-dmsans_light"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500 font-dmsans_light">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Submit */}
      {/* <button
        type="submit"
        disabled={loading}
        className="flex h-11 w-full items-center justify-center rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 text-sm font-medium text-white transition hover:from-emerald-600 hover:to-green-700 disabled:opacity-60"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            Sending
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          </span>
        ) : (
          "Send Reset Link"
        )}
      </button> */}
      <AuthButton
       type="submit" loading={loading} loadingText="Sending...">Send Reset Link</AuthButton>
    </form>

    {/* Server feedback */}
    {serverMessage && (
      <p className="mt-4 text-center text-sm text-emerald-600 font-monasans_semibold">
        {serverMessage}
      </p>
    )}
  </div>
</div>

  );
}
