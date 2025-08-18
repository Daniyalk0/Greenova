"use client"
import { changePasswordSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

const ChangePasswordForm = () => {
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true)
        const [showPassword, setShowPassword] = useState(false);
    const { data: session } = useSession()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ChangePasswordFormData>({
        resolver: zodResolver(changePasswordSchema),
    });

    const submit = async (data: ChangePasswordFormData) => {
        setMessage("")
        setLoading(true)
        setShowPassword(false)
        try {

            const { oldPassword, newPassword } = data;
            const res = await fetch('/api/auth/changePassword', {
                method: 'POST',
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ oldPassword, newPassword })
            })
            const returnedData = await res.json();

            if (!res.ok) {
                // API returned an error
                setMessage(returnedData.error || "Something went wrong. Please try again.");
            } else {
                setMessage(returnedData.message); // success message
                redirect('/')
            }
        } catch (err) {
            console.error("change password error:", err);
            setMessage("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

       const EyeIcon = showPassword ? EyeClosed : Eye;

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10">
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>
            <form onSubmit={handleSubmit(submit)} className="space-y-4">
                {/* Old password */}
                <div>
                    <label className="block text-sm font-medium mb-1">Old Password</label>
                    <input
                        type="password"
                        placeholder="Enter old password"
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("oldPassword")}
                    />
                    {errors.oldPassword && (
                        <p className="text-red-500 text-sm mb-2">{errors.oldPassword.message}</p>
                    )}
                </div>

                {/* New password */}
                <div>
                    <label className="block text-sm font-medium mb-1">New Password</label>
                    <input
                        type="password"
                        placeholder="Enter new password"
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register("newPassword")}
                    />
                    {errors.newPassword && (
                        <p className="text-red-500 text-sm mb-2">{errors.newPassword.message}</p>
                    )}
                </div>

                {/* Confirm new password */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Confirm New Password
                    </label>
                       <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("confirmPassword")}
              className="w-full mb-1 p-2 border rounded"
            />
            <EyeIcon
              className="absolute top-[25%] right-[0%] w-[10%] h-[35%] cursor-pointer text-emerald-700"
              onClick={() => setShowPassword((prev) => !prev)}
            />
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mb-2">{errors.confirmPassword.message}</p>
                    )}
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-cyan-500 h-10 text-white py-2 rounded hover:bg-cyan-600 flex items-center justify-center"
                >
                    {loading ? (
                        <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                    ) : (
                        "Change Password"
                    )}
                </button>
                {message && (
                    <p className={`text-sm ${message.includes("incorrect") ? "text-red-500" : "text-green-600"}`}>
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
};

export default ChangePasswordForm;
