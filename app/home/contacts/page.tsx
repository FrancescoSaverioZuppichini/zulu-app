import { PhoneContainer } from "@/components/phone/phone-container";
import { StatusBar } from "@/components/phone/status-bar";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { ContactsList } from "@/components/contacts/contacts-list";

export const runtime = "edge";

export default async function ContactsPage() {
  const session = await auth();

  if (!session?.user) {
    console.log("ContactsPage redirect");
    redirect("/");
  }

  return (
    <div className="flex flex-col h-full">
      <StatusBar />
      <ContactsList user={session.user} />
    </div>
  );
}
