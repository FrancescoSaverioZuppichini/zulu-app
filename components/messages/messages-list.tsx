"use client";

import { useContacts } from "@/providers/contacts-provider";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, Edit, Search, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import Link from "next/link";
import { ChatPreview } from "@/types/types";
import { useSession } from "next-auth/react";
import { deleteChat } from "@/lib/actions";

export function MessagesList({ chats }: { chats: ChatPreview[] }) {
  const { contacts } = useContacts();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();

  const startNewMessage = () => {
    router.push("/home/messages/new");
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    if (isToday) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      // If within the last week, show day name
      const daysDiff = Math.floor(
        (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (daysDiff < 7) {
        return date.toLocaleDateString([], { weekday: "short" });
      } else {
        // Otherwise show date
        return date.toLocaleDateString([], { month: "short", day: "numeric" });
      }
    }
  };

  const handleDelete = (contactId: string) => {
    startTransition(async () => {
      await deleteChat(session!.user.name, contactId);
    });
  };

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
          <Button
            variant="ghost"
            size="sm"
            onClick={startNewMessage}
            className="text-blue-500 font-normal text-base [&_svg]:size-5"
          >
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
        {chats.length > 0 ? (
          chats.map((conversation) => {
            const contact = contacts
              .filter((el) => el.id === conversation.contactId)
              .at(0);
            if (!contact) return <></>;
            return (
              <div
                key={conversation.id}
                className="flex items-center px-4 py-2 border-b border-gray-100 active:bg-gray-100"
              >
                <div
                  className="flex items-center flex-1 min-w-0"
                  onClick={() =>
                    router.push(`/home/messages/${conversation.contactId}`)
                  }
                >
                  <Avatar className="h-12 w-12 mr-3">
                    <AvatarImage
                      src={contact.avatar || "/placeholder.svg"}
                      alt={contact.name}
                    />
                    <AvatarFallback>{conversation.id.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h3 className={`font-semibold truncate text-gray-900`}>
                        {contact.name}
                      </h3>
                      <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                        {formatTimestamp(new Date(conversation.createdAt))}
                      </span>
                    </div>
                    <p className={`text-sm truncate text-gray-500`}>
                      {conversation.lastMessage}
                    </p>
                  </div>
                </div>
                {session?.user.admin && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(conversation.contactId)}
                    disabled={isPending}
                    className="ml-2"
                  >
                    {isPending ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Trash2 className="h-5 w-5 text-red-500" />
                    )}
                  </Button>
                )}
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-4 text-gray-500">
            <p className="mb-4">No Messages</p>
          </div>
        )}
      </div>
    </div>
  );
}
