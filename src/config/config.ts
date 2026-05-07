import { z } from "zod";

const envSchema = z.object({
  VITE_SUPABASE_ANON_KEY: z.string().min(1),
  VITE_SUPABASE_URL: z.url(),
});

const parsedEnv = envSchema.safeParse(import.meta.env);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables");
  console.error(parsedEnv.error.format);

  throw new Error("Invalid environment variables");
}

export const env = parsedEnv.data;