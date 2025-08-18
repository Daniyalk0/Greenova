"use client";

import { signOut } from "next-auth/react";

export async function handleLogout(setLoading: (val: boolean) => void) {
  setLoading(true);
  try {
    await signOut({ callbackUrl: "/" });
  } catch (error) {
    console.error("Logout failed:", error);
  } finally {
    setLoading(false);
  }
}
