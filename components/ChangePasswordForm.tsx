"use client"
import { changePasswordSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AuthButton from "./ui/AuthButton";

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

const ChangePasswordForm = () => {
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false)
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ChangePasswordFormData>({
        resolver: zodResolver(changePasswordSchema),
    });

    const submit = async (data: ChangePasswordFormData) => {
        setLoading(true)
        setMessage("")
        setShowOld(false)
        setShowNew(false)
        setShowConfirm(false)
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

    const OldEyeIcon = showOld ? EyeClosed : Eye;
    const NewEyeIcon = showNew ? EyeClosed : Eye;
    const ConfirmEyeIcon = showConfirm ? EyeClosed : Eye;

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 via-white to-green-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                {/* Header */}
                <div className="mb-6 text-center">
                    <h2 className="text-2xl text-gray-800 font-monasans_semibold">
                        Change Password
                    </h2>
                    <p className="mt-1 text-sm text-gray-500 font-dmsans_light">
                        Make sure your new password is strong and secure
                    </p>
                </div>

                <form onSubmit={handleSubmit(submit)} className="space-y-7">
                    {/* Old password */}
                    <div className="relative">
                        <label className="mb-1 block text-sm font-dmsans_semibold text-gray-700">
                            Current Password
                        </label>
                        <div className="relative">
                            <input
                                type={showOld ? "text" : "password"}
                                placeholder="Enter current password"
                                {...register("oldPassword")}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 font-dmsans_light"
                            />
                            <OldEyeIcon
                                onClick={() => setShowOld((p) => !p)}
                                className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
                            />
                        </div>
                        {errors.oldPassword && (
                            <p className="mt-1 text-xs text-red-500 font-dmsans_light absolute ">
                                {errors.oldPassword.message}
                            </p>
                        )}
                    </div>

                    {/* New password */}
                    <div>
                        <label className="mb-1 block text-sm font-dmsans_semibold text-gray-700">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showNew ? "text" : "password"}
                                placeholder="Create a new password"
                                {...register("newPassword")}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 font-dmsans_light"
                            />
                            <NewEyeIcon
                                onClick={() => setShowNew((p) => !p)}
                                className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
                            />
                        </div>
                        {errors.newPassword && (
                            <p className="mt-1 absolute text-xs text-red-500 font-dmsans_light">
                                {errors.newPassword.message}
                            </p>
                        )}
                    </div>

                    {/* Confirm password */}
                    <div className="relative">
                        <label className="mb-1 block text-sm font-dmsans_semibold text-gray-700">
                            Confirm New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirm ? "text" : "password"}
                                placeholder="Re-enter new password"
                                {...register("confirmPassword")}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 font-dmsans_light"
                            />
                            <ConfirmEyeIcon
                                onClick={() => setShowConfirm((p) => !p)}
                                className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
                            />
                        </div>
                        {errors.confirmPassword && (
                            <p className="mt-1 absolute text-xs text-red-500 font-dmsans_light">
                                {errors.confirmPassword.message}
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
          Updating
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        </span>
      ) : (
        "Update Password"
      )}
    </button> */}

                    <AuthButton type="submit" loading={loading} loadingText="Updating...">Update Password</AuthButton>

                    {/* Feedback */}
                    {message && (
                        <p
                            className={`text-center text-sm ${message.includes("incorrect")
                                    ? "text-red-500"
                                    : "text-emerald-600"
                                }`}
                        >
                            {message}
                        </p>
                    )}
                </form>
            </div>
        </div>

    );
};

export default ChangePasswordForm;
