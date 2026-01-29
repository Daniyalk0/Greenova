import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import FacebookProvider from "next-auth/providers/facebook";
import bcrypt from "bcryptjs";
import type { NextAuthOptions, Profile } from "next-auth";
import { User as PrismaUser } from "@prisma/client";

interface FacebookProfile extends Profile {
  picture?: {
    data?: {
      url?: string;
    };
  };
}

export const authConfig: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile",
        },
      },
    }),

    // Twitter OAuth
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "email public_profile",
        },
      },
    }),
    // Credentials (email + password)
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        // Fetch user with linked OAuth accounts
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { accounts: true },
        });

        if (!user) return null;

        // If user has no password, but has OAuth accounts, show provider name in error
        if (!user.password) {
          if (user.accounts.length > 0) {
            const providerName =
              user.accounts[0].provider.charAt(0).toUpperCase() +
              user.accounts[0].provider.slice(1);
            console.log("providerName", providerName);
            console.log("user.email", user.email);

            throw new Error(
              `OAUTH_NO_PASSWORD::${providerName}::${user.email}`,
            );
          } else {
            throw new Error(`OAUTH_NO_PASSWORD::unknown::${user.email}`);
          }
        }

        if (!user.emailVerified) {
          throw new Error("PLEASE_VERIFY_EMAIL");
        }

        // Verify password with bcrypt
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt", // JWT for speed and simplicity
  },

  callbacks: {
    async jwt({ token, user, account }) {
      // When user logs in (first time JWT call)
      if (user) {
        token.id = user.id as number;
        token.role = (user as any).role ?? "customer";
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as number;
        session.user.role = token.role as string;
      }
      return session;
    },

    async signIn({ user, account, profile }) {
      // Account linking on OAuth sign-in
      if (account && account.provider !== "credentials") {
        if (!user.email) throw new Error("Email is required");

        // Find existing user by email (if any)
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
          include: { accounts: true },
        });

        const imageUrl =
          account.provider === "facebook"
            ? ((profile as any)?.picture?.data?.url ?? "")
            : ((profile as any)?.picture ?? profile?.image ?? "");

        if (existingUser) {
          // Check if provider is already linked
          const isLinked = existingUser.accounts.some(
            (acc: any) => acc.provider === account.provider,
          );

          if (!isLinked) {
            // Link new OAuth account to existing user
            await prisma.account.create({
              data: {
                userId: existingUser.id,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                refresh_token: account.refresh_token ?? undefined,
                access_token: account.access_token ?? undefined,
                expires_at: account.expires_at ?? undefined,
                token_type: account.token_type ?? undefined,
                scope: account.scope ?? undefined,
                id_token: account.id_token ?? undefined,
                session_state: account.session_state ?? undefined,
              },
            });
          }
          await prisma.user.update({
            where: { id: existingUser.id },
            data: {
              name: profile?.name ?? user.name ?? "",
              image: imageUrl,
              emailVerified: existingUser.emailVerified ?? new Date(),
            },
          });
          // Override user.id to unify session as existing user
          user.id = existingUser.id;
          (user as PrismaUser).emailVerified =
            existingUser.emailVerified ?? new Date();
        }else {
        // For new OAuth users, set the image too
        user.image = imageUrl;
      }
      } 
      return true;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,

  debug: process.env.NODE_ENV === "development",
};
