import { User } from "next-auth";
import { redis } from "./db";
import { Chat, ChatPreview } from "@/types/types";

export async function getUserChats(userId: string): Promise<ChatPreview[]> {
    const chats = await redis.lrange<ChatPreview>(`user:${userId}:chats`, 0, -1);
    return chats
}

export async function getUserChat(userId: string, contactId: string): Promise<Chat | null> {
    const chat = await redis.get<Chat>(`chat:${userId}:${contactId}`);
    return chat
}