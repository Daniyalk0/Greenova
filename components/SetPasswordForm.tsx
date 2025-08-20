"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { setPasswordSchema } from "@/lib/validation";
import { Eye, EyeClosed } from "lucide-react";
import generatePassword from "@/lib/passwordGenerator";

type FormData = z.infer<typeof setPasswordSchema>;

interface SetPasswordFormProps {
  email: string;
  provider: string;
}

export default function SetPasswordForm({ email, provider }: SetPasswordFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState("")
   const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(setPasswordSchema),
  });

  const onSubmit = async (data: FormData) => {
    setServerError("");
    setServerMessage("");
    setInputError("")
    setShowPassword(false)
    try {

      const res = await fetch("/api/auth/setPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, provider, newPassword: data.newPassword }),
      });

      const json = await res.json();

      if (res.ok) {
        setServerMessage(json.message);
        reset();
        router.push("/login");
      } else {
        setServerError(json.error || "Something went wrong");
      }
    } catch (err) {
      console.error("set password error:", err);
      setServerMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleGeneratePassword = () => {
    const newPass = generatePassword(8);
    setValue("newPassword", newPass, { shouldValidate: true }); // ✅ updates input + runs validation
  };
    const EyeIcon = showPassword ? EyeClosed : Eye;

  return (
    <main className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10">
      <h1 className="mb-10 text-xl">Set Password</h1>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="example@gmail.com"
          value={email}
          readOnly
          style={{ marginBottom: 12, padding: 8, background: "#f5f5f5" }}
        />

        <label htmlFor="newPassword">New Password</label>
         <div className="flex w-full relative">

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("newPassword")}
            className="w-full mb-1 p-2 border rounded"
          />
          <EyeIcon
            className="absolute top-[25%] right-[0%] w-[10%] h-[35%] cursor-pointer text-zinc-400"
            onClick={() => setShowPassword((prev) => !prev)}
          />
        </div>
        <div className="flex items-center justify-between mb-3">
          <p className={`text-red-500 text-xs  ${errors.newPassword ? 'opacity-1' : 'opacity-0'}`}>{errors?.newPassword?.message}</p>

          <button
            type="button"
            onClick={handleGeneratePassword}
            className="bg-blue-500 text-white px-3 rounded"
          >
            Generate
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-cyan-500 h-10 text-white py-2 rounded hover:bg-cyan-600 flex items-center justify-center"
        >
          {loading ? (
           <>
              Changing
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
            </>
          ) : (
            "Change Password"
          )}
        </button>
      </form>

      {serverMessage && <p style={{ color: "green", marginTop: 12 }}>{serverMessage}</p>}
      {serverError && <p style={{ color: "red", marginTop: 12 }}>{serverError}</p>}
    </main>
  );
}
