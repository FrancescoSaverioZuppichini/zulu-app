"use server"
import { User } from "next-auth";
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
    await redis.set(chatKey, JSON.stringify(chatData));

    return id;
}

