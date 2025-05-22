"use client"

import { useContacts } from "@/providers/contacts-provider"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, Edit, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Link from "next/link"

export function MessagesList() {
  const { contacts } = useContacts()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const startNewMessage = () => {
    router.push("/messages/new")
  }

  // Generate fake last messages and timestamps for the demo
  const conversationsWithPreview = contacts.map((contact) => ({
    ...contact,
    lastMessage: `Hey, this is a message from ${contact.name}`,
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 10000000)),
    unread: Math.random() > 0.7,
  }))

  // Format timestamp to match iOS style
  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const isToday =
      date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()

    if (isToday) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } else {
      // If within the last week, show day name
      const daysDiff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
      if (daysDiff < 7) {
        return date.toLocaleDateString([], { weekday: "short" })
      } else {
        // Otherwise show date
        return date.toLocaleDateString([], { month: "short", day: "numeric" })
      }
    }
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-4 pt-2 pb-0">
        <div className="flex items-center justify-between mb-2">
          <Link href="/home">
            <Button variant="ghost" size="icon" className="mr-2">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Messages</h1>
          <Button variant="ghost" size="sm" onClick={startNewMessage} className="text-blue-500 font-normal text-base">
            <Edit className="h-5 w-5" />
          </Button>
        </div>

        {/* Search bar */}
        <div className="relative mb-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            className="bg-gray-100 pl-10 rounded-full text-sm h-8"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Conversations list */}
      <div className="flex-1 overflow-auto">
        {conversationsWithPreview.length > 0 ? (
          conversationsWithPreview.map((conversation) => (
            <div
              key={conversation.id}
              className="flex items-center px-4 py-2 border-b border-gray-100 active:bg-gray-100"
              onClick={() => router.push(`/messages/${conversation.id}`)}
            >
              <Avatar className="h-12 w-12 mr-3">
                <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3 className={`font-semibold truncate ${conversation.unread ? "text-black" : "text-gray-900"}`}>
                    {conversation.name}
                  </h3>
                  <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                    {formatTimestamp(conversation.timestamp)}
                  </span>
                </div>
                <p className={`text-sm truncate ${conversation.unread ? "text-black" : "text-gray-500"}`}>
                  {conversation.lastMessage}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-4 text-gray-500">
            <p className="mb-4">No Messages</p>
          </div>
        )}
      </div>
    </div>
  )
}
