import { env } from '@/env'
import { Redis } from '@upstash/redis/cloudflare'
export const redis = new Redis({
    url: env.UPSTASH_REDIS_REST_URL,
    token: env.UPSTASH_REDIS_REST_TOKEN,
})
