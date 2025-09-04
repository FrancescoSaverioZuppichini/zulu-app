"use client";

import type React from "react";

import { useState, useRef, useEffect, useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  Plus,
  Send,
  Loader,
} from "lucide-react";
import { useRouter } from "next/navigation";
import type { Contact } from "@/lib/types";
import { useChat } from "@ai-sdk/react";
import { cn } from "@/lib/utils";
import Message from "./message";
import { text } from "stream/consumers";
import { Chat } from "@/types/types";
import { User } from "next-auth";
import { toast } from "sonner";

import {
  uploadImage,
  deleteImage,
  resetUserChatMessages,
  resetUserChatProgress,
} from "@/lib/actions";

interface MessageChatProps {
  chat: Chat;
  contact: Contact;
  userId: string;
  isAdmin?: boolean;
}

interface UploadedImage {
  key: string;
  url: string;
}

export function MessageChat({
  chat,
  contact,
  userId,
  isAdmin = false,
}: MessageChatProps) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    error,
    append,
  } = useChat({
    initialMessages: chat.messages,
    api: `/api/chat/${contact.id}`,
  });
  const [showTimestamp, setShowTimestamp] = useState(true);
  const [pending, startTransaction] = useTransition();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(
    null
  );
  const [isUploading, setIsUploading] = useState(false);

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

  const handleClearMessagesOnClick = () => {
    startTransaction(async () => {
      await resetUserChatMessages(userId, contact.id);
      router.refresh();
    });
  };

  const handleClearProgressOnClick = () => {
    startTransaction(async () => {
      await resetUserChatMessages(userId, contact.id);
      await resetUserChatProgress(userId, contact.id);
      router.refresh();
    });
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Create a preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload the image
    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const result = await uploadImage(formData);
      setUploadedImage(result);
      // Once uploaded, use the signed URL for the preview as well
      setImagePreview(result.url);
    } catch (error) {
      console.error("Failed to upload image:", error);
      toast.error("Upload Failed", {
        description: "The image could not be uploaded. It might be too large.",
      });
      clearSelectedImage(); // Clear preview if upload fails
    }

    setIsUploading(false);
  };

  const clearSelectedImage = async () => {
    if (uploadedImage) {
      // Delete from S3
      await deleteImage(uploadedImage.key);
    }
    setUploadedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const imageUrl = uploadedImage?.url;
    console.log(imageUrl);

    handleSubmit(event, {
      data: imageUrl ? { imageUrl } : undefined,
    });

    // Clear the image states after submitting
    setUploadedImage(null);
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
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push(`/home/messages/${contact.id}/settings`)}
          className="text-blue-500"
        >
          <span>Settings</span>
          <ChevronRight className="h-4 w-4 mr-1" />
        </Button>
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
        {status === "submitted" && (
          <div className="max-w-[80%] px-3 py-2 rounded-2xl text-gray-500 rounded-tl-sm">
            <span className="inline-block overflow-hidden whitespace-nowrap animate-[typing_1s_infinite]">
              typing...
            </span>
          </div>
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
                {isUploading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                    <Loader className="animate-spin text-white" />
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearSelectedImage}
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    ×
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        <form
          onSubmit={handleFormSubmit}
          className="inline-flex items-center items-end bg-white rounded-full border border-gray-300 px-2 w-full"
        >
          <Input
            name="prompt"
            value={input}
            onChange={handleInputChange}
            disabled={status === "submitted" || isUploading}
            placeholder="iMessage"
            className="ml-4 border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 h-12 grow"
          />
          {input.trim() && (
            <Button
              variant="ghost"
              type="submit"
              size="icon"
              className="rounded-full h-10 w-10 text-blue-500 [&_svg]:size-5"
              disabled={status === "submitted" || isUploading}
            >
              <Send className="h-4 w-4" />
            </Button>
          )}
          {!uploadedImage && (
            <Button
              variant="ghost"
              type="button"
              size={"icon"}
              onClick={handleImageButtonClick}
              disabled={status === "submitted" || isUploading}
              className="rounded-full h-10 w-10 text-blue-500 [&_svg]:size-5"
            >
              <ImageIcon />
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
        {isAdmin && (
          <div className="flex justify-center items-center w-full gap-1 mt-2">
            <Button
              variant={"destructive"}
              onClick={handleClearMessagesOnClick}
            >
              Clear Messages
            </Button>

            <Button
              variant={"destructive"}
              onClick={handleClearProgressOnClick}
            >
              Clear All
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
