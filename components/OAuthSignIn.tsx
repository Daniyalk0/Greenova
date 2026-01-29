"use client"
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

import Facebook from 'next-auth/providers/facebook';
import { signIn } from 'next-auth/react';
import React from 'react'

interface OAuthprops {
  setOAuthLoading: (provider: string) => void;
  OAuthLoading: "facebook" | "google" | string
}

const OAuthSignIn = ({ setOAuthLoading, OAuthLoading, }: OAuthprops) => {
  return (
<div className="flex flex-col gap-3 my-6">
  {/* Google */}
  <button
    type="button"
    onClick={async () => {
      setOAuthLoading("google");
      await new Promise((r) => setTimeout(r, 50));
      await signIn("google", { callbackUrl: "/" });
    }}
    disabled={!!OAuthLoading}
    className="w-full h-11 font-dmsans_light rounded-lg border flex items-center justify-center gap-3 text-sm font-medium
               hover:bg-gray-50 transition disabled:opacity-60"
  >
    {OAuthLoading === "google" ? (
      <>
        <ImSpinner2 className="h-4 w-4 animate-spin" />
        Signing in…
      </>
    ) : (
      <>
        <FcGoogle className="h-5 w-5" />
        Continue with Google
      </>
    )}
  </button>

  {/* Facebook */}
  <button
    type="button"
    onClick={async () => {
      setOAuthLoading("facebook");
      await new Promise((r) => setTimeout(r, 50));
      await signIn("facebook", { callbackUrl: "/" });
    }}
    disabled={!!OAuthLoading}
    className="w-full h-11  font-dmsans_light rounded-lg border flex items-center justify-center gap-3 text-sm font-medium
               hover:bg-gray-50 transition disabled:opacity-60"
  >
    {OAuthLoading === "facebook" ? (
      <>
        <ImSpinner2 className="h-4 w-4 animate-spin" />
        Signing in…
      </>
    ) : (
      <>
        <FaFacebookF className="h-4 w-4 text-blue-600" />
        Continue with Facebook
      </>
    )}
  </button>
</div>


  )
}

export default OAuthSignIn