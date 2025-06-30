"use client";

import { ContactSelector } from "@/components/messages/contact-selector";
import { PhoneContainer } from "@/components/phone/phone-container";
import { StatusBar } from "@/components/phone/status-bar";

export default function NewMessagePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <PhoneContainer>
        <div className="flex flex-col h-full">
          <StatusBar />
          <ContactSelector />
        </div>
      </PhoneContainer>
    </main>
  );
}
