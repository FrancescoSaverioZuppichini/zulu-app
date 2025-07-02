"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { createChat } from "@/lib/actions"

export function ChatInput() {
  const [inputValue, setInputValue] = useState("")
  const router = useRouter()

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim() === "/new") {
      const newChat = await createChat()
      if (newChat) {
        router.push(`/home/messages/${newChat.id}`)
      }
    }
  }

  return (
    <Input
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Type /new to start a new chat..."
      className="w-full bg-black border-green-500 text-green-500 placeholder-green-500"
    />
  )
}
