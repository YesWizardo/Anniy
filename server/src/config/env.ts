import dotenv from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { envSchema, type EnvConfig } from "@readrage/shared";

// Load server .env
dotenv.config();

let parsedEnv: EnvConfig;

try {
  parsedEnv = envSchema.parse({
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    GEMINI_MODEL: process.env.GEMINI_MODEL,
    AI_TIMEOUT_MS: process.env.AI_TIMEOUT_MS
  });
} catch (error) {
  console.error("❌ Fatal Environment Validation Error:", error);
  process.exit(1);
}

export const env = parsedEnv;
