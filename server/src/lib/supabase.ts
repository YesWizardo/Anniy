import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { env } from "../config/env.js";
import { SEED_CATEGORIES, SEED_PRODUCTS, type Category, type Product } from "../data/seedProducts.js";
import type { RageEventType } from "@readrage/shared";

let supabaseAdmin: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (!supabaseAdmin) {
    supabaseAdmin = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
  }
  return supabaseAdmin;
}

// In-Memory store for standalone zero-config / fallback execution
interface InMemoryCartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
}

interface InMemorySession {
  id: string;
  user_id: string | null;
  started_at: string;
  ended_at: string | null;
  total_clicks: number;
  boss_bar_resets: number;
  wrong_keys: number;
  loader_regressions: number;
  vanish_chases: number;
  rage_score: number;
}

interface InMemoryEvent {
  id: number;
  session_id: string;
  user_id: string | null;
  event_type: RageEventType;
  meta: Record<string, unknown>;
  created_at: string;
}

class ReadRageDb {
  private categories: Category[] = [...SEED_CATEGORIES];
  private products: Product[] = [...SEED_PRODUCTS];
  private cartItems: InMemoryCartItem[] = [];
  private sessions: Map<string, InMemorySession> = new Map();
  private events: InMemoryEvent[] = [];
  private tauntCache: Map<string, unknown> = new Map();
  private isSupabaseConfigured = false;

  constructor() {
    this.isSupabaseConfigured =
      Boolean(env.SUPABASE_URL) &&
      !env.SUPABASE_URL.includes("mock-readrage") &&
      Boolean(env.SUPABASE_SERVICE_ROLE_KEY) &&
      !env.SUPABASE_SERVICE_ROLE_KEY.includes("mock-");

    // Initialize mock sessions for leaderboard demonstration
    this.seedMockLeaderboard();
  }

  private seedMockLeaderboard() {
    const mockLeaders = [
      { name: "BrokenKeyboard_99", score: 4850, clicks: 820, regressions: 45, resets: 28, wrong: 110, vanish: 62 },
      { name: "DespairEnjoyer", score: 3920, clicks: 650, regressions: 38, resets: 22, wrong: 84, vanish: 49 },
      { name: "ShiftKeyInversionVictim", score: 3410, clicks: 580, regressions: 31, resets: 19, wrong: 76, vanish: 41 },
      { name: "PatientSisyphus", score: 2890, clicks: 510, regressions: 29, resets: 14, wrong: 63, vanish: 35 },
      { name: "MrBookwormHater", score: 2150, clicks: 420, regressions: 22, resets: 11, wrong: 49, vanish: 28 },
      { name: "SpaceWasTired", score: 1840, clicks: 360, regressions: 18, resets: 9, wrong: 38, vanish: 21 },
      { name: "HoverReflexFailed", score: 1420, clicks: 290, regressions: 14, resets: 7, wrong: 29, vanish: 19 },
      { name: "Out_Of_Stock_Forever", score: 980, clicks: 210, regressions: 10, resets: 4, wrong: 18, vanish: 12 }
    ];

    for (const [idx, leader] of mockLeaders.entries()) {
      const id = `00000000-0000-0000-0000-0000000000${(idx + 10).toString(16)}`;
      this.sessions.set(id, {
        id,
        user_id: id,
        started_at: new Date(Date.now() - (idx + 1) * 3600000).toISOString(),
        ended_at: new Date(Date.now() - idx * 3600000).toISOString(),
        total_clicks: leader.clicks,
        boss_bar_resets: leader.resets,
        wrong_keys: leader.wrong,
        loader_regressions: leader.regressions,
        vanish_chases: leader.vanish,
        rage_score: leader.score
      });
    }
  }

  async getCategories(): Promise<Category[]> {
    if (this.isSupabaseConfigured) {
      try {
        const client = getSupabaseAdmin();
        const { data, error } = await client.from("categories").select("*").order("name");
        if (!error && data && data.length > 0) return data;
      } catch (err) {
        console.warn("Supabase categories fetch failed, using fallback:", err);
      }
    }
    return this.categories;
  }

  async getProducts(params?: { category?: string; q?: string; page?: number }): Promise<Product[]> {
    let result = [...this.products];

    if (params?.category) {
      const cat = this.categories.find(
        (c) => c.slug === params.category || c.id === params.category
      );
      if (cat) {
        result = result.filter((p) => p.category_id === cat.id);
      }
    }

    if (params?.q) {
      const term = params.q.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.author.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
      );
    }

    // Per Section 12: "order is shuffled server-side per request" (Rage mechanic: chaotic browsing)
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
  }

  async getProductById(id: string): Promise<Product | null> {
    const product = this.products.find((p) => p.id === id);
    return product || null;
  }

  async getCartItems(userId: string): Promise<(InMemoryCartItem & { product: Product })[]> {
    const items = this.cartItems.filter((i) => i.user_id === userId);
    return items
      .map((item) => {
        const prod = this.products.find((p) => p.id === item.product_id);
        return prod ? { ...item, product: prod } : null;
      })
      .filter((i): i is InMemoryCartItem & { product: Product } => i !== null);
  }

  async addToCart(userId: string, productId: string, quantity: number): Promise<InMemoryCartItem> {
    const existing = this.cartItems.find((i) => i.user_id === userId && i.product_id === productId);
    if (existing) {
      existing.quantity = Math.min(99, existing.quantity + quantity);
      return existing;
    }
    const newItem: InMemoryCartItem = {
      id: crypto.randomUUID(),
      user_id: userId,
      product_id: productId,
      quantity,
      created_at: new Date().toISOString()
    };
    this.cartItems.push(newItem);
    return newItem;
  }

  async removeFromCart(userId: string, productId: string): Promise<boolean> {
    const index = this.cartItems.findIndex((i) => i.user_id === userId && i.product_id === productId);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      return true;
    }
    return false;
  }

  async createRageSession(userId?: string): Promise<string> {
    const sessionId = crypto.randomUUID();
    const session: InMemorySession = {
      id: sessionId,
      user_id: userId || null,
      started_at: new Date().toISOString(),
      ended_at: null,
      total_clicks: 0,
      boss_bar_resets: 0,
      wrong_keys: 0,
      loader_regressions: 0,
      vanish_chases: 0,
      rage_score: 0
    };
    this.sessions.set(sessionId, session);
    return sessionId;
  }

  async addRageEvents(
    sessionId: string,
    events: { type: RageEventType; meta?: Record<string, unknown> }[],
    scoreDelta: number
  ): Promise<InMemorySession | null> {
    const session = this.sessions.get(sessionId);
    if (!session) return null;

    for (const ev of events) {
      this.events.push({
        id: this.events.length + 1,
        session_id: sessionId,
        user_id: session.user_id,
        event_type: ev.type,
        meta: ev.meta || {},
        created_at: new Date().toISOString()
      });

      if (ev.type === "loader_started") session.total_clicks += 1;
      if (ev.type === "loader_regressed") session.loader_regressions += 1;
      if (ev.type === "boss_bar_reset") session.boss_bar_resets += 1;
      if (ev.type === "wrong_key") session.wrong_keys += 1;
      if (ev.type === "button_vanished") session.vanish_chases += 1;
    }

    session.rage_score += scoreDelta;
    return session;
  }

  async endRageSession(sessionId: string, secondsWasted: number): Promise<InMemorySession | null> {
    const session = this.sessions.get(sessionId);
    if (!session) return null;
    session.ended_at = new Date().toISOString();
    // seconds_wasted bonus points
    session.rage_score += Math.floor(secondsWasted / 10);
    return session;
  }

  async getLeaderboard(limit = 50): Promise<InMemorySession[]> {
    const all = Array.from(this.sessions.values());
    all.sort((a, b) => b.rage_score - a.rage_score);
    return all.slice(0, limit);
  }

  async getCachedTaunt(kind: string, productId?: string): Promise<unknown | null> {
    const key = `${kind}:${productId || "global"}`;
    return this.tauntCache.get(key) || null;
  }

  async setCachedTaunt(kind: string, content: unknown, productId?: string): Promise<void> {
    const key = `${kind}:${productId || "global"}`;
    this.tauntCache.set(key, content);
  }
}

export const db = new ReadRageDb();
