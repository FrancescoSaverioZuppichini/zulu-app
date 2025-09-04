"use server";
import { redis } from "./db";
import { Chat } from "@/types/types";
import { s3 } from "./s3";
import {
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from "@/env";

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
  const chatData = {
    id,
    contactId,
    createdAt: new Date().toISOString(),
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
  await redis.del(key);
}

export async function uploadImage(formData: FormData) {
  const file = formData.get("image") as File;
  if (!file) {
    throw new Error("No file provided");
  }
  const filename = file.name;
  const contentType = file.type;

  const key = `chats/${crypto.randomUUID()}-${filename}`;

  // Upload the file
  const putCommand = new PutObjectCommand({
    Bucket: env.R2_BUCKET_NAME,
    Key: key,
    Body: Buffer.from(await file.arrayBuffer()),
    ContentType: contentType,
  });
  await s3.send(putCommand);

  // Get a signed URL for viewing
  const getCommand = new GetObjectCommand({
    Bucket: env.R2_BUCKET_NAME,
    Key: key,
  });
  // The URL will be valid for 7 days.
  const url = await getSignedUrl(s3, getCommand, { expiresIn: 604800 });

  return { key, url };
}

export async function deleteImage(key: string) {
  const command = new DeleteObjectCommand({
    Bucket: env.R2_BUCKET_NAME,
    Key: key,
  });

  await s3.send(command);
}
