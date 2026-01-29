"use client";

// import { AuthContext } from "@/app/contexts/AuthContext";
import { useState, useContext } from "react";
import { signupSchema } from "../lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import generatePassword from "@/lib/passwordGenerator";
import { Eye, EyeClosed } from "lucide-react";
import OAuthSignIn from "./OAuthSignIn";
import ErrorModal from "./ui/ErrorModal";
import AuthButton from "./ui/AuthButton";

const SignupForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
    const [OAuthLoading, setOAuthLoading] = useState("")

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });
  type SignupInput = z.infer<typeof signupSchema>;

const onSubmit = async (data: SignupInput) => {
  setError("");
  setLoading(true);
  setShowPassword(false);

  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      setError(result.error || "Signup failed");
      return;
    }

    // ✅ NO AUTO LOGIN
    // ✅ SHOW MESSAGE INSTEAD
    setSuccess(
      "Account created! Please verify your email before logging in."
    );

  } catch (err) {
    console.error("Signup error:", err);
    setError("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};


  const handleGeneratePassword = () => {
    const newPass = generatePassword(8);
    setValue("password", newPass, { shouldValidate: true }); // ✅ updates input + runs validation
  };
  const EyeIcon = showPassword ? EyeClosed : Eye;

  return (
    <>
   <form
  onSubmit={handleSubmit(onSubmit)}
  className="w-full max-w-md mx-auto px-4 sm:px-0"
>
  <div className=" bg-white rounded-2xl border shadow-sm p-6 sm:p-8">
    {/* Heading */}
    <h2 className="text-2xl font-semibold text-gray-900 text-center font-monasans_semibold">
      Create an account
    </h2>
    <p className="text-sm text-gray-500 text-center mt-1 font-dmsans_light">
      Get started in a few seconds!
    </p>

    {/* OAuth */}
    <div className="mt-6">
      <OAuthSignIn
        OAuthLoading={OAuthLoading}
        setOAuthLoading={setOAuthLoading}
      />
    </div>

    {/* Divider */}
    <div className="flex items-center gap-3 my-6">
      <div className="flex-1 h-px bg-gray-200" />
      <span className="text-xs text-gray-400 font-dmsans_light font-semibold">OR</span>
      <div className="flex-1 h-px bg-gray-200" />
    </div>

    {/* Name */}
    <div className="flex flex-col justify-center items-center gap-2 sm:gap-3 w-full">
    <div className="space-y-1 relative w-full">
      <input
        type="text"
        placeholder="Full name"
        {...register("name")}
        className="w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 font-dmsans_light "
      />
      {errors.name && (
        <p className="text-xs text-red-500 font-dmsans_light left-0 absolute">{errors.name.message}</p>
      )}
    </div>

    {/* Email */}
    <div className="mt-4 space-y-1 relative w-full">
      <input
        type="email"
        placeholder="Email address"
        {...register("email")}
        onChange={() => {
          if (error) setError("");
        }}
        className="w-full font-dmsans_light  rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />
      {errors.email && (
        <p className="text-xs left-0 text-red-500 font-dmsans_light absolute">{errors.email.message}</p>
      )}
    </div>

    {/* Password */}
    <div className="mt-4 space-y-1 w-full">
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          {...register("password")}
          className="w-full rounded-lg border px-3 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 font-dmsans_light "
        />
        <EyeIcon
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 cursor-pointer text-gray-400 hover:text-gray-600"
        />
      </div>

      {/* Password error + generator */}
      <div className="flex items-center justify-end relative">
        <p
          className={`text-xs absolute left-0 text-red-500 transition-opacity font-dmsans_light ${
            errors.password ? "opacity-100" : "opacity-0"
          }`}
        >
          {errors?.password?.message}
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
    </div>

    {/* Submit */}
    {/* <button
      type="submit"
      disabled={loading}
      className="mt-6 w-full h-11 rounded-lg bg-cyan-600 text-sm font-medium text-white hover:bg-cyan-700 disabled:opacity-70 flex items-center justify-center gap-2 font-monasans_semibold"
    >
      {loading ? (
        <>
          Signing up
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent font-monasans_semibold" />
        </>
      ) : (
        "Sign up"
      )}
    </button> */}
    <AuthButton type="submit" loading={loading} loadingText="Signing up...">Sign up</AuthButton>

    {/* Login */}
    <p className="mt-4 text-center text-xs text-gray-500 font-dmsans_light font-semibold">
      Already have an account?{" "}
      <Link href="/login" className="text-cyan-600 hover:underline">
        Login
      </Link>
    </p>

    {/* Feedback */}
    {error && (
    <ErrorModal
  open={!!error}
  message={error ?? ""}
  onClose={() => setError(null)}
/>
    )}
    {success && (
      <p className="mt-3 text-center text-sm text-green-500 font-dmsans_light">{success}</p>
    )}
  </div>
  
</form>

    </>
  );
};

export default SignupForm;
