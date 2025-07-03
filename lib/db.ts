import { Redis } from '@upstash/redis/cloudflare'
export const redis = Redis.fromEnv()
