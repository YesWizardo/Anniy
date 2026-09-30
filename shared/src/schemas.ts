import { z } from "zod";

// Environment validation schema
export const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  CLIENT_ORIGIN: z.string().default("http://localhost:5173"),
  SUPABASE_URL: z.string().url().default("https://mock-readrage.supabase.co"),
  SUPABASE_ANON_KEY: z.string().min(1).default("mock-anon-key-readrage"),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).default("mock-service-role-key-readrage"),
  GEMINI_API_KEY: z.string().optional().default(""),
  GEMINI_MODEL: z.string().default("gemini-2.5-flash"),
  AI_TIMEOUT_MS: z.coerce.number().default(6000)
});

export type EnvConfig = z.infer<typeof envSchema>;

// Auth schemas
export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(72),
  displayName: z.string().min(1).max(40)
}).strict();

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
}).strict();

// Catalog & Product schemas
export const productQuerySchema = z.object({
  category: z.string().max(60).optional(),
  q: z.string().max(80).optional(),
  page: z.coerce.number().int().min(1).default(1)
});

export const productItemSchema = z.object({
  id: z.string().uuid(),
  category_id: z.string().uuid(),
  category_name: z.string().optional(),
  title: z.string(),
  author: z.string(),
  description: z.string(),
  price_amount: z.number().or(z.string()),
  price_currency_symbol: z.string().default("₹"),
  stock_count: z.number().int().default(0),
  image_emoji: z.string().default("📕"),
  created_at: z.string().optional()
});

export const categoryItemSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  name: z.string(),
  created_at: z.string().optional()
});

// Cart schemas
export const cartAddSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().min(1).max(99).default(1)
}).strict();

export const cartItemSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string(),
  product_id: z.string().uuid(),
  quantity: z.number().int().min(1).max(99),
  product: productItemSchema.optional()
});

// Rage Telemetry Schemas
export const rageEventTypeEnum = z.enum([
  "loader_started",
  "loader_regressed",
  "loader_jumped",
  "boss_bar_spawned",
  "boss_bar_reset",
  "boss_bar_completed",
  "wrong_key",
  "key_swapped",
  "button_vanished",
  "glitch_triggered",
  "out_of_stock_seen",
  "support_chat_used"
]);

export type RageEventType = z.infer<typeof rageEventTypeEnum>;

export const rageEventSchema = z.object({
  type: rageEventTypeEnum,
  meta: z.record(z.unknown()).optional()
}).strict();

export const rageEventBatchSchema = z.object({
  sessionId: z.string().uuid(),
  events: z.array(rageEventSchema).max(50)
}).strict();

export const rageSessionInitSchema = z.object({
  userId: z.string().uuid().optional()
}).strict();

export const rageSessionEndSchema = z.object({
  secondsWasted: z.number().min(0).default(0)
}).strict();

// Support Chat Schema
export const supportChatSchema = z.object({
  message: z.string().min(1).max(300)
}).strict();

// AI Structured Response Schemas (Section 15)
export const outOfStockSchema = z.object({
  excuses: z.array(z.string().max(140)).length(3),
  restockEta: z.string().max(60)
});
export type OutOfStockData = z.infer<typeof outOfStockSchema>;

export const fakeReviewsSchema = z.object({
  reviews: z.array(
    z.object({
      reviewerName: z.string().max(30),
      stars: z.number().int().min(1).max(5),
      headline: z.string().max(60),
      body: z.string().max(220)
    })
  ).length(4)
});
export type FakeReviewsData = z.infer<typeof fakeReviewsSchema>;

export const advisorySchema = z.object({
  tip: z.string().max(140),
  warning: z.string().max(140),
  stockForecast: z.string().max(100)
});
export type AdvisoryData = z.infer<typeof advisorySchema>;

export const loaderLabelsSchema = z.object({
  labels: z.array(z.string().max(40)).length(20)
});
export type LoaderLabelsData = z.infer<typeof loaderLabelsSchema>;

export const supportReplySchema = z.object({
  reply: z.string().max(320),
  suggestedRoute: z.enum(["/", "/browse", "/login", "/out-of-stock", "/support"]),
  ticketNumber: z.string().max(20)
});
export type SupportReplyData = z.infer<typeof supportReplySchema>;

export const bossBannerSchema = z.object({
  banners: z.array(z.string().max(50)).length(10)
});
export type BossBannerData = z.infer<typeof bossBannerSchema>;
