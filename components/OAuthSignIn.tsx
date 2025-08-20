"use client"
import { signIn } from 'next-auth/react';
import React from 'react'

interface OAuthprops{
setOAuthLoading: (provider: string) => void;
OAuthLoading: "facebook"|"google"| string
}

const OAuthSignIn = ({setOAuthLoading, OAuthLoading, } : OAuthprops) => {
  return (
     <div className="flex w-full items-center justify-center gap-3 my-4 ">
    
              <button
                className="border-b-[1px] border-black flex items-center gap-2 px-4 py-2"
                type="button"
                onClick={async () => {
                  setOAuthLoading("google");
                  await new Promise((resolve) => setTimeout(resolve, 50));
                  await signIn("google", { callbackUrl: "/" });
                }}
              >
                {OAuthLoading === "google" ? (
                  <>
                    Signing
                    <span className="animate-spin h-5 w-5 border-2 border-black border-t-transparent rounded-full"></span>
                  </>
                ) : (
                  "Continue with Google"
                )}
              </button>
    
    
    
              <button
                className="border-b-[1px] border-black flex items-center gap-2 px-4 py-2"
                type="button"
                onClick={async () => {
                  setOAuthLoading("facebook");
                  await new Promise((resolve) => setTimeout(resolve, 50));
                  await signIn("facebook", { callbackUrl: "/" });
                }}
              >
                {OAuthLoading === "facebook" ? (
                  <>
                    Signing
                    <span className="animate-spin h-5 w-5 border-2 border-black border-t-transparent rounded-full"></span>
                  </>
                ) : (
                  "Continue with Facebook"
                )}
              </button>
            </div>
  )
}

export default OAuthSignIn