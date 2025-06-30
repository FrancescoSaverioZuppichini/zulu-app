import { User } from "next-auth";
import { redis } from "./db";
import { Chat, ChatPreview } from "@/types/types";
import { Message } from "ai";

export async function getUserChats(userId: string): Promise<ChatPreview[]> {
    const chats = await redis.lrange<ChatPreview>(`user:${userId}:chats`, 0, -1);
    return chats
}

export async function getUserChat(userId: string, contactId: string): Promise<Chat | null> {
    const chat = await redis.get<Chat>(`chat:${userId}:${contactId}`);
    return chat
}

export async function saveUserChat(userId: string, contactId: string, messages: Message[]) {
    const chatKey = `chat:${userId}:${contactId}`;
    const chat = await redis.get<Chat>(chatKey);
    await redis.set(chatKey, JSON.stringify({ ...chat, messages }));
}