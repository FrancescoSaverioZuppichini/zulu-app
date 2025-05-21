import { ContactsList } from "@/components/contacts/contacts-list"
import { PhoneContainer } from "@/components/phone/phone-container"
import { StatusBar } from "@/components/phone/status-bar"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export default async function ContactsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <PhoneContainer>
        <div className="flex flex-col h-full">
          <StatusBar />
          <ContactsList />
        </div>
      </PhoneContainer>
    </main>
  )
}
