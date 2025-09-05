import { ContactSelector } from "@/components/messages/contact-selector";
import { StatusBar } from "@/components/phone/status-bar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function NewMessagePage() {
  const session = await auth();

  console.log("NewMessagePage", session);

  if (!session) {
    console.log("NewMessagePage redict");
    redirect("/");
  }
  return (
    <div className=" flex-col h-full">
      <StatusBar />
      <ContactSelector user={session.user} />
    </div>
  );
}
