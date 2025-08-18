// components/CleanFacebookHash.tsx
"use client";
import { useEffect } from "react";

export default function CleanFacebookHash() {
  useEffect(() => {
    if (window.location.hash === "#_=_") {
      history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  return null; // nothing to render
}
