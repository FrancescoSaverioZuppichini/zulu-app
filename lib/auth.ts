import { validUsernames } from "./data";
import { env } from "@/env";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

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

        console.log(credentials)
        // Check if the username is in our valid usernames list
        const isValidUsername = validUsernames.includes(credentials.username as string);

        // Check if the password matches our environment variable
        const isValidPassword = credentials.password === env.APP_PASSWORD;

        if (isValidUsername && isValidPassword) {
          return {
            id: credentials.username as string,
            name: credentials.username as string,
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
});
