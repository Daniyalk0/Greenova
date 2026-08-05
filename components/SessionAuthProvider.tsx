// components/SessionAuthProvider.tsx
"use client";

import { store } from "@/src/store/store";
import { SessionProvider, useSession } from "next-auth/react";
import { ReactNode } from "react";
import { Provider } from "react-redux";


export default function SessionAuthProvider({ children, session }: { children: ReactNode; session:any }) {
  return (

    <Provider store={store}>
      <SessionProvider session={session}>

        {children}
      </SessionProvider>
    </Provider>
  );
}
