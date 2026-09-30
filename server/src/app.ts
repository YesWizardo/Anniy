import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env.js";
import { generalLimiter, aiLimiter } from "./middleware/rateLimit.js";
import { errorHandler } from "./middleware/errorHandler.js";

// Routes
import { healthRouter } from "./routes/health.js";
import { productsRouter, categoriesRouter } from "./routes/products.js";
import { cartRouter } from "./routes/cart.js";
import { checkoutRouter } from "./routes/checkout.js";
import { rageRouter } from "./routes/rage.js";
import { aiRouter } from "./routes/ai.js";
import { supportRouter } from "./routes/support.js";

export const app = express();

// Security and middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

const allowedOrigins = [
  env.CLIENT_ORIGIN,
  "http://localhost:5173",
  "http://127.0.0.1:5173"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Allow dev access gracefully
    }
  },
  credentials: true
}));

app.use(express.json({ limit: "50kb" }));

// Request-ID logger
app.use((req, res, next) => {
  const reqId = crypto.randomUUID().slice(0, 8);
  req.headers["x-request-id"] = reqId;
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (process.env.NODE_ENV !== "test") {
      console.log(`[${reqId}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
    }
  });
  next();
});

// General rate limiter
app.use(generalLimiter);

// API v1 Router
const apiRouter = express.Router();

apiRouter.use("/health", healthRouter);
apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/cart", cartRouter);
apiRouter.use("/checkout", checkoutRouter);
apiRouter.use("/rage", rageRouter);
apiRouter.use("/ai", aiLimiter, aiRouter);
apiRouter.use("/support", aiLimiter, supportRouter);

app.use("/api/v1", apiRouter);

// 404 handler for API routes
app.use("/api/v1/*", (_req, res) => {
  res.status(404).json({
    error: {
      code: "ROUTE_NOT_FOUND",
      message: "The requested API endpoint has taken an indefinite unpaid sabbatical."
    }
  });
});

// Central Error Handler
app.use(errorHandler);
