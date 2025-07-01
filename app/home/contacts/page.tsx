import { PhoneContainer } from "@/components/phone/phone-container";
import { StatusBar } from "@/components/phone/status-bar";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ContactsList } from "@/components/contacts/contacts-list";

export default async function ContactsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex flex-col h-full">
      <StatusBar />
      <ContactsList />
    </div>
  );
}
