"use server"
import { redis } from "./db";
import { Chat } from "@/types/types";

export async function createChat(userId: string, contactId: string): Promise<string> {
    const id = crypto.randomUUID();
    const chatKey = `chat:${userId}:${contactId}`;
    const existingChat = await redis.get<Chat>(chatKey);
    if (existingChat) {
        return existingChat.id;
    }
    const chatData = {
        id,
        contactId,
        createdAt: new Date().toISOString()
    };

    await redis.lpush(`user:${userId}:chats`, JSON.stringify(chatData));
    await redis.set(chatKey, JSON.stringify({ ...chatData, messages: [] }));

    return id;
}

export async function resetUserChatMessages(userId: string, contactId: string) {
    const key = `chat:${userId}:${contactId}`;
    const chat = await redis.get<Chat>(key);
    await redis.set(key, JSON.stringify({ ...chat, messages: [] }));
}


export async function resetUserChatProgress(userId: string, contactId: string) {
    const key = `mission:${userId}:${contactId}`;
    await redis.del(key)
}


export async function storeImage(image: Blob): Promise<{ url: str }> {


}