// context/AuthContext.tsx (converted to TypeScript)
'use client';

import { useRouter } from "next/navigation";
import { createContext, useState, ReactNode } from "react";

interface AuthContextType {
  user: any;
  loginUser: (userData: any) => void;
  logoutUser: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const loginUser = (userData: any) => setUser(userData);

  const logoutUser = () => {
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
