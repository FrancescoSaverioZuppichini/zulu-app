"use client"

import { ContactsProvider } from "@/providers/contacts-provider"
import type { ReactNode } from "react"

interface LayoutWrapperProps {
  children: ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  return <ContactsProvider>{children}</ContactsProvider>
}
