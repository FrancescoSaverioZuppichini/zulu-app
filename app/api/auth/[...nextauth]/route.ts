import NextAuth from "next-auth"
import { handlers } from "@/lib/auth"

export const runtime = 'edge'

export const { GET, POST } = handlers

