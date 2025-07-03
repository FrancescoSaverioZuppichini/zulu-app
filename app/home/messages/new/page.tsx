import { ContactSelector } from "@/components/messages/contact-selector";
import { StatusBar } from "@/components/phone/status-bar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const runtime = "edge";
export default async function NewMessagePage() {
  const session = await auth();

  console.log("NewMessagePage", session);

  if (!session?.user) {
    redirect("/");
  }
  return (
    <div className="grid flex-col h-full">
      <StatusBar />
      <ContactSelector />
    </div>
  );
}
