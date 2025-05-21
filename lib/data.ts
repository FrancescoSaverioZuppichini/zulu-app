import type { Contact } from "./types"

// List of valid usernames that can log in
export const validUsernames = ["user1", "user2", "user3", "user4", "user5"]

// Hardcoded contacts data
export const contacts: Contact[] = [
  {
    id: "1",
    name: "John Doe",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Jane Smith",
    phone: "+1 (555) 987-6543",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Alex Johnson",
    phone: "+1 (555) 456-7890",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Sarah Williams",
    phone: "+1 (555) 789-0123",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "Michael Brown",
    phone: "+1 (555) 234-5678",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

// Helper function to get a contact by ID
export function getContactById(id: string): Contact | undefined {
  return contacts.find((contact) => contact.id === id)
}
