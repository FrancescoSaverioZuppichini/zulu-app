"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ImageIcon, Plus, Send } from "lucide-react"
import { useRouter } from "next/navigation"
import type { Contact } from "@/lib/types"
import { useChat } from '@ai-sdk/react';
import { cn } from "@/lib/utils"

interface Message {
  id: string
  text: string
  sent: boolean
  timestamp: Date
}

interface MessageChatProps {
  contact: Contact
}

export function MessageChat({ contact }: MessageChatProps) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({});
  const [showTimestamp, setShowTimestamp] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Format time for message bubbles
  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center p-2 border-b">
        <Button variant="ghost" size="sm" onClick={() => router.push("/messages")} className="text-blue-500">
          <ChevronLeft className="h-4 w-4 mr-1" />
          <span>Messages</span>
        </Button>
        <div className="flex flex-col items-center mx-auto">
          <h2 className="font-semibold">{contact.name}</h2>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto p-2 bg-gray-100">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-2 p-4">
            <Avatar className="h-16 w-16 mb-2">
              <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
              <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h3 className="font-medium text-gray-700">{contact.name}</h3>
            <p className="text-sm text-center mt-4">This is the beginning of your conversation with {contact.name}</p>
          </div>
        ) : (
          messages.map(message => (
            <div key={message.id} className="space-y-1 mb-4">
              <div className="flex justify-center mb-2">
                <div className="bg-gray-200 text-gray-500 text-xs px-2 py-1 rounded-full">
                  {new Date(message.createdAt || Date.now()).toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })}
                </div>
              </div>

              <div className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl ${message.role === "user" ? "bg-blue-500 text-white rounded-tr-sm" : "bg-gray-300 text-black rounded-tl-sm"
                    }`}
                >
                  <p>{message.content}</p>
                  {showTimestamp && (
                    <div
                      className={`text-[10px] ${message.role === "user" ? "text-blue-100" : "text-gray-500"} mt-1 text-right`}
                    >
                      {formatMessageTime(new Date(message.createdAt || Date.now()))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Compose area */}
      <div className="p-2 bg-gray-100 border-t">
        <form onSubmit={handleSubmit} className="inline-flex items-center items-end bg-white rounded-full border border-gray-300 px-2">
          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 text-blue-500">
            <Plus className="h-5 w-5" />
          </Button>
          <Input
            name="prompt"
            value={input}
            onChange={handleInputChange}
            placeholder="iMessage"
            className="border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 h-10"
          />
          {input.trim() ? (
            <Button
              variant="ghost"
              type="submit"
              size="icon"
              className="rounded-full h-8 w-8 text-blue-500"
            >
              <Send className="h-5 w-5" />
            </Button>
          ) : (
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 text-blue-500">
              <ImageIcon className="h-4 w-4" />
            </Button>
          )}
        </form>
      </div>
    </div>
  )
}