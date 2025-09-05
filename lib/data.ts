import type { Contact } from "./types"

// List of valid usernames that can log in
export const validUsernames = ["xofb", "xofa", "test", "admin"]

// Hardcoded contacts data
export const contacts: Contact[] = [
  {
    id: "xofa",
    name: "XO",
    phone: "+1-703-482-7739",
    avatar: "/xofa.webp",
  },
  {
    id: "xofb",
    name: "Henrique Lawman",
    phone: "+1-703-851-2604",
    avatar: "/xofb.webp",
  },
]

// Helper function to get a contact by ID
export function getContactById(id: string): Contact | undefined {
  return contacts.find((contact) => contact.id === id)
}
