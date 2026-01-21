"use client";

import { UIProvider } from "@/src/context/ui-context";

// import { UIProvider } from "@/context/ui-context";

export default function UIProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UIProvider>{children}</UIProvider>;
}
