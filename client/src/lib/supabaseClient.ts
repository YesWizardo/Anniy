import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { setAuthToken } from "./api.js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://mock-readrage.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "mock-anon-key-readrage";

const isRealSupabase =
  Boolean(supabaseUrl) &&
  !supabaseUrl.includes("mock-readrage") &&
  Boolean(supabaseAnonKey) &&
  !supabaseAnonKey.includes("mock-anon-key");

export const supabase: SupabaseClient | null = isRealSupabase
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface ReadRageUser {
  id: string;
  email: string;
  displayName: string;
}

const LOCAL_STORAGE_USER_KEY = "readrage_user_profile";

export async function registerUser(email: string, password: string, displayName: string): Promise<ReadRageUser> {
  if (supabase) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName }
      }
    });
    if (error) throw error;
    const token = data.session?.access_token || "";
    setAuthToken(token);
    const user: ReadRageUser = {
      id: data.user?.id || crypto.randomUUID(),
      email: data.user?.email || email,
      displayName
    };
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
    return user;
  }

  // Fallback dev mode auth
  const userId = crypto.randomUUID();
  const token = `mock-token-${userId}`;
  setAuthToken(token);
  const user: ReadRageUser = { id: userId, email, displayName };
  localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
  return user;
}

export async function loginUser(email: string, password: string): Promise<ReadRageUser> {
  if (supabase) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error;
    const token = data.session?.access_token || "";
    setAuthToken(token);
    const user: ReadRageUser = {
      id: data.user?.id || crypto.randomUUID(),
      email: data.user?.email || email,
      displayName: data.user?.user_metadata?.display_name || email.split("@")[0]
    };
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
    return user;
  }

  // Fallback dev mode auth
  const userId = "00000000-0000-0000-0000-000000000001";
  const token = `mock-token-${userId}`;
  setAuthToken(token);
  const user: ReadRageUser = {
    id: userId,
    email,
    displayName: email.split("@")[0] || "Brave Sufferer"
  };
  localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
  return user;
}

export async function logoutUser(): Promise<void> {
  if (supabase) {
    await supabase.auth.signOut();
  }
  setAuthToken(null);
  localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
}

export function getCurrentUser(): ReadRageUser | null {
  const cached = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
  if (!cached) return null;
  try {
    return JSON.parse(cached);
  } catch {
    return null;
  }
}
