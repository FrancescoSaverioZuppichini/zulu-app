import { StatusBar } from "@/components/phone/status-bar";
import { getContactById } from "@/lib/data";
import { notFound, redirect } from "next/navigation";
import { MessageChat } from "@/components/messages/message-chat";
import { getUserChat, getUserMission } from "@/lib/crud";
import { auth } from "@/lib/auth";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { missions } from "@/lib/missions";
import { getUserActiveMissions } from "@/lib/utils";

export const runtime = "edge";

export default async function ChatSettingsPage({
  params,
}: {
  params: Promise<{ contactId: string }>;
}) {
  const { contactId } = await params;

  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }
  const contact = getContactById(contactId);
  if (!contact) {
    redirect("/home/messages");
  }
  const userId = session?.user?.name || "unkown";
  const userMissions = missions[userId];
  const completedMissionsIds = (await getUserMission(userId, contactId)) || [];

  const activeMissions = getUserActiveMissions(
    userMissions,
    completedMissionsIds
  );
  console.log("completedMissionsIds", completedMissionsIds);
  console.log("activeMissions", activeMissions);

  return (
    <main className="grid min-h-screen ">
      <div className="flex flex-col h-full">
        <StatusBar />
        <div className="flex flex-col h-full bg-white">
          <div className="flex items-center p-2 border-b">
            <Link href={`/home/messages/${contactId}`}>
              <Button variant="ghost" size="sm" className="text-blue-500">
                <ChevronLeft className="h-4 w-4 mr-1" />
                <span>Chat</span>
              </Button>
            </Link>
            <div className="flex flex-col items-center mx-auto">
              <h2 className="font-semibold">{contact.name}</h2>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-2 bg-gray-100">
            <pre>{JSON.stringify(completedMissionsIds)}</pre>
            <pre>{JSON.stringify(activeMissions)}</pre>
          </div>
        </div>
      </div>
    </main>
  );
}
