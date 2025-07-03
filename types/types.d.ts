import { createMissionSchema } from "@/lib/schemas";
import { Message } from "ai";
import { z } from "zod";

export type Mission = z.infer<typeof createMissionSchema>;

export type Persona = {
  name: string;
  description: string;
  guidelines: string[];
  interaction: string;
  initialization?: string;
};

export type ChatPreview = {
  id: string
  contactId: string
  createdAt: Date
}

export type Chat = ChatPreview & {
  messages: Message[]
}