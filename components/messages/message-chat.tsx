"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ImageIcon, Plus, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Contact } from "@/lib/types";
import { useChat } from "@ai-sdk/react";
import { cn } from "@/lib/utils";
import Message from "./message";
import { text } from "stream/consumers";
import { Chat } from "@/types/types";

interface Message {
  id: string;
  text: string;
  sent: boolean;
  timestamp: Date;
}

interface MessageChatProps {
  chat: Chat;
  contact: Contact;
}

export function MessageChat({ chat, contact }: MessageChatProps) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages: chat.messages,
    api: `/api/chat/${contact.id}`,
  });
  const [showTimestamp, setShowTimestamp] = useState(true);
  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setFiles(event.target.files);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearSelectedImage = () => {
    setFiles(undefined);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(event, {
      experimental_attachments: files,
      allowEmptySubmit: true,
    });

    setFiles(undefined);
    setImagePreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center p-2 border-b">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/home/messages")}
          className="text-blue-500"
        >
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
              <AvatarImage
                src={contact.avatar || "/placeholder.svg"}
                alt={contact.name}
              />
              <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h3 className="font-medium text-gray-700">{contact.name}</h3>
            <p className="text-sm text-center mt-4">
              This is the beginning of your conversation with {contact.name}
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <Message message={message} key={message.id} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Compose area */}
      <div className="p-2 bg-gray-100 border-t">
        {/* Image preview */}
        {imagePreview && (
          <div className="mb-2 p-2 bg-white rounded-lg border">
            <div className="flex items-start gap-2">
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSelectedImage}
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  ×
                </Button>
              </div>
            </div>
          </div>
        )}

        <form
          onSubmit={handleFormSubmit}
          className="inline-flex items-end bg-white rounded-full border border-gray-300 px-2 w-full"
        >
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-8 w-8 text-blue-500"
          >
            <Plus className="h-5 w-5" />
          </Button>
          <Input
            name="prompt"
            value={input}
            onChange={handleInputChange}
            placeholder="iMessage"
            className="border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 h-10 grow"
          />
          {input.trim() && (
            <Button
              variant="ghost"
              type="submit"
              size="icon"
              className="rounded-full h-8 w-8 text-blue-500"
            >
              <Send className="h-4 w-4" />
            </Button>
          )}
          {!files && (
            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={handleImageButtonClick}
              className="rounded-full h-8 w-8 text-blue-500"
            >
              <ImageIcon className="h-4 w-4" />
            </Button>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: "none" }}
          />
        </form>
      </div>
    </div>
  );
}
