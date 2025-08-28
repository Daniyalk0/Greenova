// components/SessionAuthProvider.tsx
"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { ReactNode } from "react";
import { Provider } from "react-redux";

function SessionLoader({ children }: { children: ReactNode }) {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-cyan-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return <>{children}</>;
}

export default function SessionAuthProvider({ children }: { children: ReactNode }) {
  return (


    <SessionProvider>
      <SessionLoader>{children}</SessionLoader>
    </SessionProvider>

  );
}
