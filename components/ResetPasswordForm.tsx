"use client"
import generatePassword from '@/lib/passwordGenerator';
import { setPasswordSchema } from '@/lib/validation';
import { Eye, EyeClosed } from 'lucide-react';
import React, { useState } from 'react'

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
  if (!token) return <p>Invalid or missing token.</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
      <form onSubmit={handleReset}>
        <div className="flex w-full relative">

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => handlePasswordChange(e.target.value)}
            value={password}
            className="w-full mb-1 p-2 border rounded"
          />
          <EyeIcon
            className="absolute top-[25%] right-[0%] w-[10%] h-[35%] cursor-pointer text-zinc-400"
            onClick={() => setShowPassword((prev) => !prev)}
          />
        </div>
        <div className="flex items-center justify-between mb-3">
          <p className={`text-red-500 text-xs  ${errors ? 'opacity-1' : 'opacity-0'}`}>{errors}</p>

             <button
            type="button"
            onClick={handleGeneratePassword}
            className="bg-blue-500 text-[0.6rem] sm:text-[0.8rem] text-white p-1 sm:px-3  rounded"
          >
            Generate Password
          </button>
        </div>
        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-cyan-500 h-10 text-white py-2 rounded hover:bg-cyan-600 flex items-center justify-center"
        >
          {loading ? (
            <>
              Resetting
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
            </>
          ) : (
            "Reset Password"
          )}
        </button>

      </form>
      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
}

export default ResetPasswordForm