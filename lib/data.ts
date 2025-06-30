import type { Contact } from "./types"

// List of valid usernames that can log in
export const validUsernames = ["user1", "user2", "user3", "user4", "user5"]

// Hardcoded contacts data
export const contacts: Contact[] = [
  {
    id: "1",
    name: "Mamal Pod",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

// Helper function to get a contact by ID
export function getContactById(id: string): Contact | undefined {
  return contacts.find((contact) => contact.id === id)
}
