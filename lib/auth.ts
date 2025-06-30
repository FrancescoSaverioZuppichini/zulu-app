import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { validUsernames } from "./data";
import { env } from "@/env";

export const authOptions: NextAuthOptions = {

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        // Check if the username is in our valid usernames list
        const isValidUsername = validUsernames.includes(credentials.username);

        // Check if the password matches our environment variable
        const isValidPassword = credentials.password === env.APP_PASSWORD;

        if (isValidUsername && isValidPassword) {
          return {
            id: credentials.username,
            name: credentials.username,
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
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.name = token.name as string;
      }
      return session;
    },
  },
  secret: env.AUTH_SECRET,
};
