"use client";

import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// import { AuthContext } from "@/app/contexts/AuthContext";
import { loginSchema } from "../lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from 'next-auth/react';
import Link from "next/link";
import { Eye, EyeClosed } from "lucide-react";


type LoginInput = z.infer<typeof loginSchema>;


const LoginForm = () => {

  const router = useRouter();
  const pathname = usePathname();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)
  const [providerName, setProviderName] = useState<string | null>(null);
  const [emailForSetPassword, setEmailForSetPassword] = useState<string | number | boolean>("")

  const onSubmit = async (data: LoginInput) => {
    setShowPassword(false)
    setLoading(true);
    setError(""); // reset error before login attempt

    try {
      const res = await signIn("credentials", {
        ...data,
        redirect: false, // prevent auto redirect
      });

      if (res?.error) {
        if (res.error.startsWith("OAUTH_NO_PASSWORD::")) {
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


  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-sm mx-auto mt-10 bg-white p-6 rounded-lg shadow"
      >
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <div className="flex w-full items-center justify-center gap-3 my-4 ">
          <button className="border-b-[1px] border-black" type="button" onClick={() => signIn("google", { callbackUrl: "/" })}>Continue with Google</button>
          <button className="border-b-[1px] border-black" type="button" onClick={() => signIn("facebook", { callbackUrl: "/" })}>Continue with Facebook</button>
        </div>

        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-full mb-1 p-2 border rounded"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mb-3">{errors.email.message}</p>
        )}

        <div className="flex w-full relative">

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
            className="w-full mb-1 p-2 border rounded"
          />
          <EyeIcon
            className="absolute top-[25%] right-[0%] w-[10%] h-[35%] cursor-pointer text-emerald-700"
            onClick={() => setShowPassword((prev) => !prev)}
          />
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs mb-3">{errors.password.message}</p>
        )}

        <Link href={"/forgotPassword"} className="">
          forgot Password?
        </Link>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-cyan-500 h-10 text-white py-2 rounded hover:bg-cyan-600 flex items-center justify-center"
        >
          {loading ? (
            <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
          ) : (
            "Login"
          )}
        </button>

        <p className="text-center my-1 text-[0.8rem]">Already have an account? <Link href={'/signup'} className="underline">Signup</Link></p>

        {providerName && (
          <div className="mt-4 p-4 border rounded bg-yellow-100">
            <p>
              It looks like you signed up using <b>{providerName}</b>. Please set a
              password to enable email/password sign-in.
            </p>
            <button
              onClick={() => router.push(`/set-password?provider=${providerName}&email=${encodeURIComponent(emailForSetPassword)}`)}
              type="button"
              className="mt-2 px-4 py-2 bg-cyan-600 text-white rounded"
            >
              Set Password
            </button>
          </div>
        )}
        {error && !error.startsWith("OAUTH_NO_PASSWORD:") && (
          <p className="text-red-500">Invalid credentials</p>
        )}
      </form>


    </>
  );
};

export default LoginForm;
