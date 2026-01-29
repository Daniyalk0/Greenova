"use client"
import generatePassword from '@/lib/passwordGenerator';
import { setPasswordSchema } from '@/lib/validation';
import { Eye, EyeClosed } from 'lucide-react';
import React, { useState } from 'react'
import AuthButton from './ui/AuthButton';

interface ResetPasswordFormProps {
  token: string | null;
}
const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState("")

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setErrors("")


    const result = setPasswordSchema.safeParse({ newPassword: value });
    if (!result.success) {
      setErrors(result.error.errors[0].message);
    } else {
      setErrors(""); // clear if valid
    }
  };


  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowPassword(false)
    setLoading(false);
    setErrors("")
    const validation = setPasswordSchema.safeParse({ newPassword: password });

    if (!validation.success) {
      // Get the first error message from Zod
      setErrors(validation.error.errors[0].message);
      return;
    }
    try {
      const res = await fetch("/api/auth/resetPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      console.error("Reset password error:", err);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const EyeIcon = showPassword ? EyeClosed : Eye;

  const handleGeneratePassword = () => {
    const newPass = generatePassword(8);
    setPassword(newPass);
  };
  if (!token) return <p className="text-red-500 text-center font-dmsans_semibold">Invalid or missing token.</p>;

  return (
<div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 via-white to-green-100 flex items-center justify-center px-4">
  <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
    {/* Header */}
    <div className="mb-8 text-center">
      <h1 className="text-2xl font-semibold text-gray-800 font-dmsans_semibold">
        Reset Password
      </h1>
      <p className="mt-1 text-sm text-gray-500 font-dmsans_light">
        Enter a new password to regain access
      </p>
    </div>

    <form onSubmit={handleReset} className="space-y-5">
      {/* Password */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700 font-dmsans_semibold">
          New Password
        </label>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 font-dmsans_light"
          />
          <EyeIcon
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
          />
        </div>

        <div className="mt-2 flex items-center justify-between">
          <p
            className={`text-xs text-red-500 ${
              errors ? "opacity-100" : "opacity-0"
            }`}
          >
            {errors}
          </p>

           <button
          type="button"
          onClick={handleGeneratePassword}
          className="text-xs sm:text-sm px-3 py-1.5 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200 font-dmsans_light transition-all duration-300 "
        >
          Generate
        </button>
        </div>
      </div>

      {/* Submit */}
      {/* <button
        type="submit"
        disabled={loading}
        className="flex h-11 w-full items-center justify-center rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 text-sm font-medium text-white transition hover:from-emerald-600 hover:to-green-700 disabled:opacity-60"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            Resetting
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          </span>
        ) : (
          "Reset Password"
        )}
      </button> */}
      <AuthButton type="submit" loading={loading} loadingText="Resetting...">Reset Password</AuthButton>
    </form>

    {/* Message */}
    {message && (
      <p className="mt-4 text-center text-sm text-emerald-600 font-dmsans_semibold">
        {message}
      </p>
    )}
  </div>
</div>

  );
}

export default ResetPasswordForm