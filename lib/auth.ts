import { validUsernames } from "./data";
import { env } from "@/env";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface User {
    admin: boolean
  }

  interface Session {
    user: {
      name: string
      admin: boolean
    }
  }
}


export const { handlers, signIn, signOut, auth } = NextAuth({

  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, request) => {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }
        console.log(`[auth] ${credentials}`)
        // Check if the username is in our valid usernames list
        const splittedUsername = (credentials.username as string).split("_")
        const isValidUsername = validUsernames.includes(splittedUsername[0] as string);

        // Check if the password matches our environment variable
        const isValidPassword = credentials.password === env.APP_PASSWORD;
        console.log("ADMIN", (credentials.username as string).endsWith("_admin"))

        if (isValidUsername && isValidPassword) {
          return {
            id: splittedUsername[0] as string,
            name: splittedUsername[0] as string,
            admin: (credentials.username as string).endsWith("_admin")
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.admin = user.admin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.name = token.name as string;
        session.user.admin = token.admin as boolean;
      }
      return session;
    },
  },
  secret: env.AUTH_SECRET,
});
