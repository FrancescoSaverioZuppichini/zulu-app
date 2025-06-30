export interface Contact {
  id: string
  name: string
  phone: string
  avatar: string
}

export interface Message {
  id: string
  senderId: string
  receiverId: string
  text: string
  timestamp: Date
}

