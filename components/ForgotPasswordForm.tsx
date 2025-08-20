"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { forgotPasswordSchema } from "@/lib/validation";

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
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          className="border p-2 w-full mb-1"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-cyan-500 h-10 text-white py-2 rounded hover:bg-cyan-600 flex items-center justify-center"
        >
          {loading ? (
          <>
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
              Loading
            </>
          ) : (
            "Forgot Password"
          )}
        </button>
      </form>

      {serverMessage && (
        <p className="mt-4 text-sm text-gray-700">{serverMessage}</p>
      )}
    </div>
  );
}
