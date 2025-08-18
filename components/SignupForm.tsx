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

const SignupForm = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);

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
    setError('')
    setLoading(false)
    setShowPassword(false)
    try {

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.error) {
        setError(result.error);
      } else {
        // Auto-login after successful signup
        const loginResult = await signIn("credentials", {
          redirect: false,
          email: data.email,
          password: data.password,
        });

        if (loginResult?.error) {
          setError(loginResult.error);
        } else {
          // Redirect to dashboard or home
          window.location.href = "/";
        }
      }
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
        className="max-w-sm mx-auto mt-10 bg-white p-6 rounded-lg shadow"
      >
        <h2 className="text-2xl font-semibold mb-4">SignUp</h2>

        <div className="flex w-full items-center justify-center gap-3 my-4 ">
          <button className="border-b-[1px] border-black" type="button" onClick={() => signIn("google")}>Continue with Google</button>
          <button className="border-b-[1px] border-black" type="button" onClick={() => signIn("facebook")}>Continue with Facebook</button>
        </div>
        <input
          type="text"
          placeholder="Name"
          {...register("name")}
          className="w-full mb-1 p-2 border rounded"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mb-3">{errors.name.message}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          onChange={(e) => {
            // clear apiError if input changes and apiError is not empty
            if (error) setError("");
          }}
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
        <div className="flex items-center justify-between mb-3">
          <p className={`text-red-500 text-xs  ${errors.password ? 'opacity-1' : 'opacity-0'}`}>{errors?.password?.message}</p>

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
          className="w-full h-10 bg-cyan-500 text-white rounded hover:bg-cyan-600 flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
          ) : (
            "Signup"
          )}
        </button>

        <p className="text-center my-1 text-[0.8rem]">Already have an account? <Link href={'/login'} className="underline">Login</Link></p>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
      </form>
    </>
  );
};

export default SignupForm;
