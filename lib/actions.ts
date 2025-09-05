"use server";
import { redis } from "./db";
import { Chat, ChatPreview } from "@/types/types";
import { r2 } from "./r2";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

import { env } from "@/env";
import { personas } from "./personas";

export async function deleteChat(userId: string, contactId: string) {
  const chatKey = `chat:${userId}:${contactId}`;
  await redis.del(chatKey);

  const userChats = await redis.lrange<Chat>(`user:${userId}:chats`, 0, -1);
  if (!userChats) return;

  const filteredChats = userChats
    .filter((chat) => chat.contactId !== contactId);

  await redis.del(`user:${userId}:chats`);
  if (filteredChats.length > 0) {
    await redis.lpush(
      `user:${userId}:chats`,
      ...filteredChats.map((chat) => JSON.stringify(chat)),
    );
  }
  await resetUserChatProgress(userId, contactId)

  revalidatePath("/home/messages");
  return {}
}

export async function createChat(
  userId: string,
  contactId: string,
): Promise<string> {
  const id = crypto.randomUUID();
  const chatKey = `chat:${userId}:${contactId}`;
  const existingChat = await redis.get<Chat>(chatKey);
  if (existingChat) {
    return existingChat.id;
  }
  const initMessage = { "role": "assistant", "parts": [{ "type": "text", text: personas[contactId].initialization }] }
  const chatData: ChatPreview = {
    id,
    contactId,
    createdAt: new Date(),
    lastMessage: personas[contactId].initialization || ''
  };

  await redis.lpush(`user:${userId}:chats`, JSON.stringify(chatData));
  await redis.set(chatKey, JSON.stringify({ ...chatData, messages: [initMessage] }));

  return id;
}

export async function resetUserChatMessages(userId: string, contactId: string) {
  const key = `chat:${userId}:${contactId}`;
  const chat = await redis.get<Chat>(key);
  await redis.set(key, JSON.stringify({ ...chat, messages: [] }));
}

export async function resetUserChatProgress(userId: string, contactId: string) {
  const key = `mission:${userId}:${contactId}`;
  await redis.del(key);
}

const R2_URL = `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;

export async function uploadImage(formData: FormData) {
  const file = formData.get("image") as File;
  if (!file) throw new Error("No file provided");

  const key = `chats/${crypto.randomUUID()}-${file.name}`;
  const arrayBuffer = await file.arrayBuffer();

  // Upload with aws4fetch
  const uploadResponse = await r2.fetch(`${R2_URL}/${env.R2_BUCKET_NAME}/${key}`, {
    method: "PUT",
    body: arrayBuffer,
    headers: {
      "Content-Type": file.type,
    },
  });

  if (!uploadResponse.ok) {
    throw new Error(`Upload failed: ${uploadResponse.status}`);
  }

  // Generate signed URL for viewing (7 days)
  const signedRequest = await r2.sign(
    new Request(`${R2_URL}/${env.R2_BUCKET_NAME}/${key}?X-Amz-Expires=604800`),
    { aws: { signQuery: true } }
  );

  return { key, url: signedRequest.url };
}

export async function deleteImage(key: string) {
  const response = await r2.fetch(`${R2_URL}/${env.R2_BUCKET_NAME}/${key}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Delete failed: ${response.status}`);
  }
}