"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createChat } from "@/lib/actions";
import { useContacts } from "@/providers/contacts-provider";
import { ChevronLeft, Search } from "lucide-react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export function ContactSelector({ user }: { user: Session["user"] }) {
  const { contacts } = useContacts();
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.includes(searchQuery)
  );

  const selectContact = (contactId: string) => {
    startTransition(async () => {
      const chatId = await createChat(user.name, contactId);
      console.log(chatId);
      router.push(`/home/messages/${contactId}`);
    });
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
        <h1 className="text-lg font-semibold mx-auto">New Message</h1>
      </div>

      {/* Search bar */}
      <div className="p-2 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            className="bg-gray-100 pl-10 rounded-full text-sm h-8"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* To: field */}
      <div className="flex items-center px-4 py-2 border-b">
        <span className="text-gray-500 mr-2">To:</span>
        <Input
          className="border-none shadow-none focus-visible:ring-0 p-0 h-auto text-base"
          placeholder="Enter a name"
        />
      </div>

      {/* Contacts list */}
      <div className="flex-1 overflow-auto">
        <div className="px-4 py-2 text-xs text-gray-500 uppercase bg-gray-50 font-semibold">
          Suggested
        </div>
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className="flex items-center px-4 py-2 border-b border-gray-100 active:bg-gray-100"
            onClick={() => selectContact(contact.id)}
          >
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage
                src={contact.avatar || "/placeholder.svg"}
                alt={contact.name}
              />
              <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{contact.name}</h3>
              <p className="text-xs text-gray-500">{contact.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
