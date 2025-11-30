// types/next-auth.d.ts
import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: number
      role: string
      name?: string | null
      email?: string | null
      image?: string | null
      needsPassword?: boolean | undefined,
    }
  }

  interface User {
    id: number
    role: string
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number
    role: string
  }
}
