import z from "zod";

const envSchema = z.object({
  APP_PASSWORD: z.string(),
  UPSTASH_REDIS_REST_URL: z.string(),
  UPSTASH_REDIS_REST_TOKEN: z.string(),
  GOOGLE_GENERATIVE_AI_API_KEY: z.string(),
  AUTH_SECRET: z.string(),
});

function createEnv() {
  return envSchema.parse(process.env);
}

export const env = createEnv();
