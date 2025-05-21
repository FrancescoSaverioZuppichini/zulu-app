"use client"

import { useContacts } from "@/providers/contacts-provider"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MessagesList() {
  const { contacts } = useContacts()

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <Link href="/home">
            <Button variant="ghost" size="icon" className="mr-2">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">Messages</h1>
        </div>
        <Button variant="ghost" size="icon">
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 overflow-auto">
        {contacts.map((contact) => (
          <Link key={contact.id} href={`/messages/${contact.id}`}>
            <div className="flex items-center p-4 hover:bg-gray-100 transition-colors">
              <Avatar className="h-12 w-12 mr-4">
                <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{contact.name}</h3>
                <p className="text-sm text-gray-500 truncate">Tap to start chatting</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
