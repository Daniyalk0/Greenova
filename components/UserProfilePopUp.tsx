"use client";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { handleLogout } from "@/lib/logout";

type UserProfilePopUpProps = {
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
  pfpRef: RefObject<HTMLDivElement | null>;
};

export default function UserProfilePopUp({ isProfileOpen, setIsProfileOpen, pfpRef }: UserProfilePopUpProps) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

    const popupRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
    if (
      popupRef.current &&
      !popupRef.current.contains(event.target as Node) && // click outside popup
      pfpRef.current &&
      !pfpRef.current.contains(event.target as Node) // click outside toggle
    ) {
      setIsProfileOpen(false); // close popup
    }
  }

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [setIsProfileOpen]);


  if (!session) return null;

  const name = session.user.name || "User";
  const email = session.user.email || "example@email.com";


  return (
    <div
    ref={popupRef}
      className={`absolute mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-50 top-12 right-0
    transform transition-all duration-200 ease-out
    ${isProfileOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
  `}
    >
      {/* User info */}
      <div className="flex flex-col gap-1">
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-gray-500">{email}</p>
      </div>

      {/* Divider */}
      <hr className="my-3 border-gray-200" />

      {/* Actions */}
      <div className="flex flex-col gap-2">
        <Link
          href={"/change-password"}
          className="px-3 py-2 text-left hover:bg-gray-100 rounded"
          onClick={() => setIsProfileOpen(false)}
        >
          Change Password
        </Link>
        <button
          onClick={() => handleLogout(setLoading)}
          disabled={loading}
          className="px-3 h-10 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-2"
        >
          {loading ? (
            <>
  
            <>
              Logging out
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
            </>
            </>
          ) : (
            "Logout"
          )}
        </button>

      </div>
    </div>
  );
}
