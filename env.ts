import z from "zod";

const envSchema = z.object({
  APP_PASSWORD: z.string(),
  UPSTASH_REDIS_REST_URL: z.string(),
  UPSTASH_REDIS_REST_TOKEN: z.string(),
  GOOGLE_GENERATIVE_AI_API_KEY: z.string(),
  AUTH_SECRET: z.string(),
  R2_ACCOUNT_ID: z.string(),
  R2_ACCESS_KEY_ID: z.string(),
  R2_SECRET_ACCESS_KEY: z.string(),
  R2_BUCKET_NAME: z.string(),
});

function createEnv() {
  return envSchema.parse(process.env);
}

export const env = createEnv();
