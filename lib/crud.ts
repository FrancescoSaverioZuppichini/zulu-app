import { User } from "next-auth";
import { redis } from "./db";
import { Chat, ChatPreview } from "@/types/types";
import { MyUIMessage } from "./types";

export async function getUserChats(userId: string): Promise<ChatPreview[]> {
    const chats = await redis.lrange<ChatPreview>(`user:${userId}:chats`, 0, -1);
    return chats
}

export async function getUserChat(userId: string, contactId: string): Promise<Chat | null> {
    const chat = await redis.get<Chat>(`chat:${userId}:${contactId}`);
    return chat
}

export async function saveUserChat(userId: string, contactId: string, messages: MyUIMessage[]) {
    if (messages.length === 0) return
    const key = `chat:${userId}:${contactId}`;
    const chat = await redis.get<Chat>(key);
    const existingMessages = chat?.messages || [];
    const lastMessage = messages.at(-1)
    if (lastMessage && lastMessage.id === "") lastMessage.id = crypto.randomUUID()
    // we need to check for `id` since we can have two messages with the same content
    const existingIds = new Set(existingMessages.map(m => m.id));
    const newMessages = messages.filter(m => !existingIds.has(m.id));
    if (newMessages.length === 0) return;

    const updatedMessages = [...existingMessages, ...newMessages];
    await redis.set(key, JSON.stringify({ ...chat, messages: updatedMessages }));
}

export async function saveUserMission(userId: string, contactId: string, missionId: string) {
    const key = `mission:${userId}:${contactId}`
    await redis.lpush(key, missionId)
}

export async function getUserMission(userId: string, contactId: string): Promise<string[]> {
    const key = `mission:${userId}:${contactId}`
    const missions = await redis.lrange(key, 0, -1)
    return missions
}