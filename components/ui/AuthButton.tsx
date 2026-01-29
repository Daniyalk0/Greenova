"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { ButtonHTMLAttributes } from "react";

interface AuthButtonProps extends HTMLMotionProps<"button"> {
  loading?: boolean;
  loadingText?: string;
}

export default function AuthButton({
  children,
  loading = false,
  loadingText = 'please wait...',
  disabled,
  type = "submit",
  ...props
}: AuthButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300 }}
      disabled={disabled || loading}
      type={type}
      className={`
        w-full font-dmsans_light rounded-lg px-4 py-2 font-medium text-white
        bg-gradient-to-r from-emerald-500 to-green-600
        hover:from-emerald-600 hover:to-green-700
        disabled:opacity-60 disabled:cursor-not-allowed
        shadow-md
      `}
      {...props}
    >
      {loading ? loadingText : children}
    </motion.button>
  );
}
