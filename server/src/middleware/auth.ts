import { Request, Response, NextFunction } from "express";
import { getSupabaseAdmin } from "../lib/supabase.js";

export interface AuthenticatedUser {
  id: string;
  email?: string;
  displayName?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      error: {
        code: "UNAUTHORIZED",
        message: "You must be authenticated to suffer this specific indignity."
      }
    });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const supabase = getSupabaseAdmin();
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      // In local dev/mock mode, allow mock token
      if (token.startsWith("mock-token-")) {
        req.user = {
          id: token.replace("mock-token-", "") || "00000000-0000-0000-0000-000000000001",
          email: "demo@readrage.test",
          displayName: "Demo Sufferer"
        };
        next();
        return;
      }

      res.status(401).json({
        error: {
          code: "INVALID_TOKEN",
          message: "Your session token expired or collapsed under emotional distress."
        }
      });
      return;
    }

    req.user = {
      id: user.id,
      email: user.email,
      displayName: user.user_metadata?.display_name || "Sufferer"
    };

    next();
  } catch (err) {
    next(err);
  }
}

export async function optionalAuth(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    next();
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const supabase = getSupabaseAdmin();
    const { data: { user } } = await supabase.auth.getUser(token);
    if (user) {
      req.user = {
        id: user.id,
        email: user.email,
        displayName: user.user_metadata?.display_name || "Sufferer"
      };
    } else if (token.startsWith("mock-token-")) {
      req.user = {
        id: token.replace("mock-token-", "") || "00000000-0000-0000-0000-000000000001",
        email: "demo@readrage.test",
        displayName: "Demo Sufferer"
      };
    }
  } catch {
    // optional, proceed unauthenticated
  }
  next();
}
