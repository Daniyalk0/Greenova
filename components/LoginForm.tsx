"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// import { AuthContext } from "@/app/contexts/AuthContext";
import { loginSchema } from "../lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn, useSession } from 'next-auth/react';
import Link from "next/link";
import { Eye, EyeClosed } from "lucide-react";
import OAuthSignIn from "./OAuthSignIn";
import { toast } from "react-toastify";
import AuthButton from "./ui/AuthButton";


type LoginInput = z.infer<typeof loginSchema>;


const LoginForm = () => {

  const router = useRouter();
  const pathname = usePathname();
  const [showPassword, setShowPassword] = useState(false);
  const { data: session } = useSession()

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)
  const [providerName, setProviderName] = useState<string | null>(null);
  const [emailForSetPassword, setEmailForSetPassword] = useState<string | number | boolean>("")
  const [OAuthLoading, setOAuthLoading] = useState("")

  const searchParams = useSearchParams();
  //  const router = useRouter();
  const [showVerified, setShowVerified] = useState(false);


  useEffect(() => {
    if (searchParams.get("verified") === "true") {
      setShowVerified(true);
      // Remove query param from URL without refreshing
      router.replace("/login", { scroll: false });
    }
  }, [searchParams, router]);


  const onSubmit = async (data: LoginInput) => {
    setShowPassword(false)
    setLoading(true);
    setError(""); // reset error before login attempt
    setProviderName("")

    try {
      const res = await signIn("credentials", {
        ...data,
        redirect: false, // prevent auto redirect
      });

      if (res?.error) {
        if (res.error === "PLEASE_VERIFY_EMAIL") {
          setError("Please verify your email first.");
        } else if (res.error.startsWith("OAUTH_NO_PASSWORD::")) {
          const [, provider, email] = res.error.split("::");
          setProviderName(provider || "your account");
          setEmailForSetPassword(email || "");
        } else {
          setError("Invalid credentials");
        }
      } else if (res?.ok) {
        router.push("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const EyeIcon = showPassword ? EyeClosed : Eye;


  const handleResendVerification = async () => {
    const loginEmail = getValues("email");
    if (!loginEmail) {
      toast.error("Please enter your email first.");
      return;
    }

    try {
      const res = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail }),
      });

      const result = await res.json();
      if (res.ok) {
        toast.success("Verification email sent!");
      } else {
        toast.error(result.error || "Could not send verification email");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Try again.");
    }
  };


  return (
    <div className="flex items-center justify-center w-full flex-col">
      {showVerified && (
        <div className="mb-4 text-green-600 text-sm">
          ✅ Email verified successfully. You can now log in.
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md mx-auto px-4 sm:px-0"
      >
        <div className=" bg-white rounded-2xl border shadow-sm p-6 sm:p-8">
          {/* Heading */}
          <h2 className="text-2xl font-semibold text-gray-900 text-center font-monasans_semibold">
            Welcome back!
          </h2>
          <p className="text-sm text-gray-500 text-center mt-1 font-dmsans_light">
            Sign in to your account
          </p>

          {/* OAuth */}
          <div className="mt-6">
            <OAuthSignIn
              setOAuthLoading={setOAuthLoading}
              OAuthLoading={OAuthLoading}
            />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-dmsans_light font-semibold">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <input
              type="email"
              placeholder="Email address"
              {...register("email")}
              className="w-full rounded-lg font-dmsans_semibold border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="mt-4 space-y-1">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password")}
                className="w-full rounded-lg font-dmsans_semibold border px-3 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <EyeIcon
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 cursor-pointer text-gray-400 hover:text-gray-600"
              />
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 font-dmsans_light">{errors.password.message}</p>
            )}
          </div>

          {/* Forgot password */}
          <div className="mt-3 text-right">
            <Link
              href="/forgotPassword"
              className="text-xs text-cyan-600 hover:underline font-dmsans_light font-semibold"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          {/* <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full font-monasans_semibold h-11 rounded-lg bg-cyan-600 text-sm font-medium text-white hover:bg-cyan-700 disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                Logging in
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent font-monasans_semibold" />
              </>
            ) : (
              "Login"
            )}
          </button> */}

              <AuthButton type="submit" loading={loading} loadingText="Logging in...">Log in</AuthButton>

          {/* Signup */}
          <p className="mt-4 text-center text-xs text-gray-500 font-dmsans_light font-semibold">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-cyan-600 hover:underline">
              Sign up
            </Link>
          </p>

          {/* OAuth password notice */}
          {providerName && (
            <div className="mt-6 rounded-lg border border-yellow-300 bg-yellow-50 p-4 text-sm">
              <p className="text-gray-700 font-dmsans_semibold">
                You signed up using <b>{providerName}</b>. Set a password to enable
                email login.
              </p>
              <button
                type="button"
                onClick={() =>
                  router.push(
                    `/set-password?provider=${providerName}&email=${encodeURIComponent(
                      emailForSetPassword
                    )}`
                  )
                }
                className="mt-3 w-full rounded-lg bg-cyan-600 py-2 text-white hover:bg-cyan-700 font-monasans_semibold"
              >
                Set Password
              </button>
            </div>
          )}

          {/* Error */}
          {error && !error.startsWith("OAUTH_NO_PASSWORD:") && (
            <div className="mt-3 text-center text-sm text-red-500 font-dmsans_light">
              {error === "PLEASE_VERIFY_EMAIL" ? (
                <>
                  <p>Please verify your email first.</p>
                  <button
                    type="button"
                    className="mt-1 text-blue-600 hover:underline"
                    onClick={() => handleResendVerification}
                  >
                    Resend verification email
                  </button>
                </>
              ) : (
                <p>Invalid credentials</p>
              )}
            </div>
          )}

        </div>
      </form>



    </div>
  );
};

export default LoginForm;
