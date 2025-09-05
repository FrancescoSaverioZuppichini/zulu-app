"use client";

import { useContacts } from "@/providers/contacts-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTransition } from "react";
import { createChat } from "@/lib/actions";
import { Session, User } from "next-auth";

export function ContactsList({ user }: { user: Session["user"] }) {
  const { contacts } = useContacts();

  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const selectContact = (contactId: string) => {
    startTransition(async () => {
      if (user) {
        const chatId = await createChat(user.name || "unkown", contactId);
        router.push(`/home/messages/${contactId}`);
      }
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4 border-b">
        <Link href="/home">
          <Button variant="ghost" size="icon" className="mr-2">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-semibold">Contacts</h1>
      </div>

      <div className="flex-1 overflow-auto">
        {contacts
          .filter((contact) => contact.id === user.name.split("_").at(0) || "")
          .map((contact) => (
            <div
              key={contact.id}
              className="flex items-center justify-between p-4 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage
                    src={contact.avatar || "/placeholder.svg"}
                    alt={contact.name}
                  />
                  <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{contact.name}</h3>
                  <p className="text-sm text-gray-500">{contact.phone}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => selectContact(contact.id)}
                aria-label={`Chat with ${contact.name}`}
                className="[&_svg]:size-5"
              >
                <MessageSquare className="h-5 w-5 text-blue-500" />
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
}
