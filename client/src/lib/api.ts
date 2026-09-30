import type {
  RageEventType,
  OutOfStockData,
  FakeReviewsData,
  AdvisoryData,
  LoaderLabelsData,
  SupportReplyData
} from "@readrage/shared";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api/v1";

let authToken: string | null = localStorage.getItem("readrage_auth_token");

export function setAuthToken(token: string | null) {
  authToken = token;
  if (token) {
    localStorage.setItem("readrage_auth_token", token);
  } else {
    localStorage.removeItem("readrage_auth_token");
  }
}

export function getAuthToken(): string | null {
  return authToken || localStorage.getItem("readrage_auth_token");
}

async function fetchJson<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {})
  };

  const token = getAuthToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });

  const data = await res.json();
  if (!res.ok) {
    const error = new Error(data?.error?.message || "Server Error") as any;
    error.status = res.status;
    error.data = data?.error;
    throw error;
  }

  return data as T;
}

export const api = {
  // Categories & Products
  getCategories: () => fetchJson<{ categories: any[] }>("/categories"),
  getProducts: (params?: { category?: string; q?: string; page?: number }) => {
    const query = new URLSearchParams();
    if (params?.category) query.set("category", params.category);
    if (params?.q) query.set("q", params.q);
    if (params?.page) query.set("page", String(params.page));
    return fetchJson<{ products: any[]; total: number }>(`/products?${query.toString()}`);
  },
  getProduct: (id: string) => fetchJson<{ product: any }>(`/products/${id}`),

  // Cart
  getCart: () => fetchJson<{ items: any[]; count: number }>("/cart"),
  addToCart: (productId: string, quantity = 1) =>
    fetchJson<{ item: any; message: string }>("/cart", {
      method: "POST",
      body: JSON.stringify({ productId, quantity })
    }),
  removeFromCart: (productId: string) =>
    fetchJson<{ success: boolean; message: string }>(`/cart/${productId}`, {
      method: "DELETE"
    }),

  // Checkout (Always 409 OUT_OF_STOCK)
  checkout: () =>
    fetchJson<{ success: boolean }>("/checkout", {
      method: "POST"
    }),

  // Rage Telemetry
  initSession: (userId?: string) =>
    fetchJson<{ sessionId: string }>("/rage/session", {
      method: "POST",
      body: JSON.stringify({ userId })
    }),
  sendEvents: (sessionId: string, events: { type: RageEventType; meta?: Record<string, unknown> }[]) =>
    fetchJson<{ success: boolean; currentScore: number }>("/rage/events", {
      method: "POST",
      body: JSON.stringify({ sessionId, events })
    }),
  endSession: (sessionId: string, secondsWasted: number) =>
    fetchJson<{ session: any }>("/rage/session/" + sessionId + "/end", {
      method: "POST",
      body: JSON.stringify({ secondsWasted })
    }),
  getLeaderboard: () => fetchJson<{ leaderboard: any[] }>("/rage/leaderboard"),

  // AI
  getAdvisory: (productId: string) =>
    fetchJson<{ advisory: AdvisoryData }>("/ai/products/" + productId + "/advisory", {
      method: "POST"
    }),
  getOutOfStockReason: (productId: string) =>
    fetchJson<{ excuseData: OutOfStockData }>("/ai/products/" + productId + "/out-of-stock-reason", {
      method: "POST"
    }),
  getReviews: (productId: string) =>
    fetchJson<{ reviews: any[] }>("/ai/products/" + productId + "/reviews"),
  getLoaderLabels: () =>
    fetchJson<{ labels: string[] }>("/ai/loader-labels", { method: "POST" }),
  sendSupportChat: (message: string) =>
    fetchJson<SupportReplyData>("/support/chat", {
      method: "POST",
      body: JSON.stringify({ message })
    })
};
