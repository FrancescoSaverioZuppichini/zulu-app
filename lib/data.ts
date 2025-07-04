import type { Contact } from "./types"

// List of valid usernames that can log in
export const validUsernames = ["gnps", "fsln", "test", "admin"]

// Hardcoded contacts data
export const contacts: Contact[] = [
  {
    id: "1",
    name: "Mammal Pod",
    phone: "+1 (555) 123-4567",
    avatar: "/mammalpod.webp",
  },
]

// Helper function to get a contact by ID
export function getContactById(id: string): Contact | undefined {
  return contacts.find((contact) => contact.id === id)
}
