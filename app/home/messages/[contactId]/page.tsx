import { PhoneContainer } from "@/components/phone/phone-container";
import { StatusBar } from "@/components/phone/status-bar";
import { getContactById } from "@/lib/data";
import { notFound, redirect } from "next/navigation";
import { MessageChat } from "@/components/messages/message-chat";
import { getUserChat } from "@/lib/crud";
import { auth } from "@/lib/auth";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ contactId: string }>;
}) {
  const { contactId } = await params;

  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const chat = await getUserChat(session?.user?.name || "unkown", contactId);
  if (!chat) return notFound();

  const contact = getContactById(contactId);

  if (!contact) {
    redirect("/home/messages");
  }

  return (
    <main className="grid min-h-screen ">
      <div className="flex flex-col h-full">
        <StatusBar />
        <MessageChat
          chat={chat}
          contact={contact}
          userId={session?.user?.name || "unkown"}
        />
      </div>
    </main>
  );
}
