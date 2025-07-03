import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/providers/auth-provider";
import { ContactsProvider } from "@/providers/contacts-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "iPhone App",
  description: "iPhone-style app with messaging",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <ContactsProvider>{children}</ContactsProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
