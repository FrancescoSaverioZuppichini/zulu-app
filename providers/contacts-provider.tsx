"use client"

import type { Contact } from "@/lib/types"
import { createContext, useContext, type ReactNode } from "react"
import { contacts as contactsData } from "@/lib/data"

interface ContactsContextType {
  contacts: Contact[]
}

const ContactsContext = createContext<ContactsContextType>({
  contacts: [],
})

interface ContactsProviderProps {
  children: ReactNode
}

export function ContactsProvider({ children }: ContactsProviderProps) {
  return <ContactsContext.Provider value={{ contacts: contactsData }}>{children}</ContactsContext.Provider>
}

export const useContacts = () => useContext(ContactsContext)
