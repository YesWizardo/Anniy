import { Router } from "express";
import { db } from "../lib/supabase.js";
import { generateStructured, sanitizeUserInput } from "../lib/generateStructured.js";
import { MR_BOOKWORM_SYSTEM_PROMPT } from "../prompts/system.js";
import {
  outOfStockSchema,
  fakeReviewsSchema,
  advisorySchema,
  loaderLabelsSchema,
  bossBannerSchema
} from "@readrage/shared";
import {
  getRandomOutOfStockExcuse,
  getRandomAdvisory,
  getRandomReviews,
  FALLBACK_LOADER_LABELS,
  FALLBACK_BOSS_BANNERS
} from "../data/fallbackCopy.js";

export const aiRouter = Router();

// Advisory for a product
aiRouter.post("/products/:id/advisory", async (req, res, next) => {
  try {
    const { id } = req.params;
    const cached = await db.getCachedTaunt("advisory", id);
    if (cached) {
      res.json({ advisory: cached, cached: true });
      return;
    }

    const product = await db.getProductById(id);
    const title = product ? product.title : "Mystery Regret Item";

    const prompt = `Write a fake "Helpful Advisory" for this product: one useless tip, one absurd warning, and one stock forecast that implies it will never be restocked. Product: <user_input>${sanitizeUserInput(title)}</user_input>.`;

    const advisory = await generateStructured(
      advisorySchema,
      MR_BOOKWORM_SYSTEM_PROMPT,
      prompt,
      null,
      getRandomAdvisory()
    );

    await db.setCachedTaunt("advisory", advisory, id);
    res.json({ advisory, cached: false });
  } catch (err) {
    next(err);
  }
});

// Out of stock reason for a product
aiRouter.post("/products/:id/out-of-stock-reason", async (req, res, next) => {
  try {
    const { id } = req.params;
    const cached = await db.getCachedTaunt("out_of_stock", id);
    if (cached) {
      res.json({ excuseData: cached, cached: true });
      return;
    }

    const product = await db.getProductById(id);
    const title = product ? product.title : "Unavailable Entity";
    const author = product ? product.author : "Ghost Writer";

    const prompt = `Write 3 different absurd, deadpan reasons why this product is out of stock. Product: <user_input>${sanitizeUserInput(title)} by ${sanitizeUserInput(author)}</user_input>. Each reason max 140 characters.`;

    const excuseData = await generateStructured(
      outOfStockSchema,
      MR_BOOKWORM_SYSTEM_PROMPT,
      prompt,
      null,
      getRandomOutOfStockExcuse()
    );

    await db.setCachedTaunt("out_of_stock", excuseData, id);
    res.json({ excuseData, cached: false });
  } catch (err) {
    next(err);
  }
});

// Reviews for a product
aiRouter.get("/products/:id/reviews", async (req, res, next) => {
  try {
    const { id } = req.params;
    const cached = await db.getCachedTaunt("review", id);
    if (cached) {
      res.json({ reviews: cached, cached: true });
      return;
    }

    const product = await db.getProductById(id);
    const title = product ? product.title : "Unattainable Classic";

    const prompt = `Write 4 fake customer reviews for this product. They must be sincere-sounding, slightly unhinged, and all mention that they could not buy it. Product: <user_input>${sanitizeUserInput(title)}</user_input>. Star ratings must be random between 1 and 5.`;

    const reviewsData = await generateStructured(
      fakeReviewsSchema,
      MR_BOOKWORM_SYSTEM_PROMPT,
      prompt,
      null,
      getRandomReviews()
    );

    await db.setCachedTaunt("review", reviewsData.reviews, id);
    res.json({ reviews: reviewsData.reviews, cached: false });
  } catch (err) {
    next(err);
  }
});

// Batch 20 misleading loader labels
aiRouter.post("/loader-labels", async (_req, res, next) => {
  try {
    const cached = await db.getCachedTaunt("loader_label");
    if (cached) {
      res.json({ labels: cached, cached: true });
      return;
    }

    const prompt = `Generate 20 short, misleading loading-bar messages. Mix fake encouragement ("Almost there!"), self-aware sabotage ("Going backwards for quality"), and corporate nonsense. Max 40 characters each.`;

    const data = await generateStructured(
      loaderLabelsSchema,
      MR_BOOKWORM_SYSTEM_PROMPT,
      prompt,
      null,
      FALLBACK_LOADER_LABELS
    );

    await db.setCachedTaunt("loader_label", data.labels);
    res.json({ labels: data.labels, cached: false });
  } catch (err) {
    next(err);
  }
});

// Boss bar banner variants
aiRouter.post("/boss-banner", async (_req, res, next) => {
  try {
    const prompt = `Write 10 short banner messages telling the user to keep mashing a key to fill a progress bar. Sound urgent, cheerful, and slightly patronizing. Do NOT name any specific key. Max 50 characters each.`;

    const data = await generateStructured(
      bossBannerSchema,
      MR_BOOKWORM_SYSTEM_PROMPT,
      prompt,
      null,
      FALLBACK_BOSS_BANNERS
    );

    res.json({ banners: data.banners });
  } catch (err) {
    next(err);
  }
});
