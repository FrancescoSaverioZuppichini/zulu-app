import { PhoneContainer } from "@/components/phone/phone-container";
import { StatusBar } from "@/components/phone/status-bar";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { MessagesList } from "@/components/messages/messages-list";
import { getUserChats } from "@/lib/crud";

export const runtime = "edge";
export default async function MessagesPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const chats = await getUserChats(session.user.name || "unknown");

  return (
    <div className="flex flex-col h-full">
      <StatusBar />
      <MessagesList chats={chats} />
    </div>
  );
}
