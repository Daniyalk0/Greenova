"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

/* ---------- helpers ---------- */

const getInitials = (name?: string | null, email?: string | null) => {
  if (name) {
    const parts = name.trim().split(" ");
    return (
      (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")
    ).toUpperCase();
  }
  return email ? email[0].toUpperCase() : "U";
};

// deterministic pastel color based on email
const getPastelColor = (seed: string) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = hash % 360;
  return `hsl(${hue}, 70%, 80%)`; // pastel
};

/* ---------- component ---------- */

const UserMenu = () => {
  const { data: session } = useSession();
  const [open, setOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [loggingOut, setLoggingOut] = React.useState(false);

  const handleLogout = async () => {
    if (loggingOut) return;

    try {
      setLoggingOut(true);
      await signOut();
    } finally {
      setLoggingOut(false);
    }
  };


  if (!session?.user) {
    return (
      <Link
        href="/login"
        className="px-4 mr-2 py-3 rounded-lg text-sm font-dmsans_semibold
             bg-lime-500 text-white hover:bg-lime-600
             transition inline-flex items-center"
      >
        Sign in
      </Link>
    );
  }

  const { email, name, image } = session.user;
  const initials = getInitials(name, email);
  const pastelBg = getPastelColor(email ?? name ?? "user");

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-200
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />


      <div ref={menuRef} className="relative inline-block">
        {/* Header avatar */}
        <button
          onClick={() => setOpen((p) => !p)}
          className="w-10 h-10 rounded-full overflow-hidden border border-gray-300
                   focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          {image ? (
            <img src={image} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center
                       text-sm font-semibold text-gray-700"
              style={{ backgroundColor: pastelBg }}
            >
              {initials}
            </div>
          )}
        </button>

        {/* Popup */}
        <div
          className={`z-[2000] absolute right-0 mt-3 w-56 sm:w-72 bg-white rounded-xl
            shadow-xl border border-gray-200
            transform transition-all duration-200 origin-top-right
            ${open
              ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
              : "opacity-0 scale-95 -translate-y-1 pointer-events-none"}`}
        >
          {/* Large avatar */}
          <div
            className="flex items-center gap-3 px-4 pt-4 pb-3
             sm:flex-col sm:items-center sm:gap-0 sm:px-0"
          >

            <div
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden
             flex items-center justify-center text-lg
             font-semibold text-gray-800"
              style={{ backgroundColor: pastelBg }}
            >

              {image ? (
                <img
                  src={image}
                  alt="Profile"
                  className="w-full  h-full object-cover"
                />
              ) : (
                initials
              )}
            </div>

            <div className="text-left sm:text-center">
              <p className="text-sm font-monasans_semibold text-gray-900 truncate">
                {name}
              </p>
              <p className="text-[0.7rem] font-dmsans_light sm:text-xs text-gray-500 truncate">
                {email}
              </p>
            </div>

          </div>

          <div className="border-t border-gray-200" />

          {/* Actions */}
          <div className="flex flex-col">
            <button
              onClick={() => {
                setOpen(false);
                window.location.href = "/change-password";
              }}
              className="px-5 py-2 sm:py-3 text-left text-sm font-dmsans_semibold text-gray-700
                         hover:bg-gray-100 transition"
            >
              Change Password
            </button>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className={`px-5 py-2 sm:py-3 text-left text-sm font-dmsans_semibold transition ${loggingOut
                ? "text-red-400 cursor-not-allowed"
                : "text-red-600 hover:bg-red-50"}`}
            >
              <span className="inline-flex items-center gap-2">
                {loggingOut && (
                  <span className="w-4 h-4 border-2 border-red-300 border-t-transparent rounded-full animate-spin" />
                )}
                {loggingOut ? "Logging out..." : "Logout"}
              </span>

            </button>

          </div>
        </div>
        {/* )} */}
      </div>
    </>
  );
};

export default UserMenu;
