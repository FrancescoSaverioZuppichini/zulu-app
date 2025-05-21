import { MessageChat } from "@/components/messages/message-chat"
import { PhoneContainer } from "@/components/phone/phone-container"
import { StatusBar } from "@/components/phone/status-bar"
import { getContactById } from "@/lib/data"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function ChatPage({ params }: { params: { contactId: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/")
  }

  const contact = getContactById(params.contactId)

  if (!contact) {
    redirect("/messages")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <PhoneContainer>
        <div className="flex flex-col h-full">
          <StatusBar />
          <MessageChat contact={contact} />
        </div>
      </PhoneContainer>
    </main>
  )
}
