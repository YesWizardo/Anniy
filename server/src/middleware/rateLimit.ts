import rateLimit from "express-rate-limit";

export const generalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: {
      code: "TOO_MANY_REQUESTS",
      message: "You are experiencing too much rage per minute. Please calm down."
    }
  }
});

export const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: {
      code: "AI_QUOTA_COOLDOWN",
      message: "Mr. Bookworm needs a moment to catch his breath before insulting you further."
    }
  }
});
