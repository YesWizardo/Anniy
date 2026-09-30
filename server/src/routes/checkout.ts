import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { getRandomOutOfStockExcuse } from "../data/fallbackCopy.js";

export const checkoutRouter = Router();

checkoutRouter.post("/", requireAuth, async (req, res) => {
  const excuse = getRandomOutOfStockExcuse();
  res.status(409).json({
    error: {
      code: "OUT_OF_STOCK",
      message: "Checkout failed because everything in your cart is permanently out of stock.",
      excuse: excuse.excuses[Math.floor(Math.random() * excuse.excuses.length)],
      restockEta: excuse.restockEta,
      advice: "Please redirect your soul to /out-of-stock immediately."
    }
  });
});
