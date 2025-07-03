"use client";

import { ContactSelector } from "@/components/messages/contact-selector";
import { StatusBar } from "@/components/phone/status-bar";

export const runtime = "edge";
export default function NewMessagePage() {
  return (
    <div className="grid flex-col h-full">
      <StatusBar />
      <ContactSelector />
    </div>
  );
}
