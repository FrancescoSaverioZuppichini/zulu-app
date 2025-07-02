"use client";

import { ContactSelector } from "@/components/messages/contact-selector";
import { PhoneContainer } from "@/components/phone/phone-container";
import { StatusBar } from "@/components/phone/status-bar";

export default function NewMessagePage() {
  return (
    <div className="grid flex-col h-full">
      <StatusBar />
      <ContactSelector />
    </div>
  );
}
