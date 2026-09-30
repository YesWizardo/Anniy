import { Router } from "express";
import { db } from "../lib/supabase.js";
import { productQuerySchema } from "@readrage/shared";

export const productsRouter = Router();
export const categoriesRouter = Router();

categoriesRouter.get("/", async (_req, res, next) => {
  try {
    const categories = await db.getCategories();
    res.json({ categories });
  } catch (err) {
    next(err);
  }
});

productsRouter.get("/", async (req, res, next) => {
  try {
    const query = productQuerySchema.parse(req.query);
    const products = await db.getProducts({
      category: query.category,
      q: query.q,
      page: query.page
    });

    const categories = await db.getCategories();
    const enriched = products.map((p) => {
      const cat = categories.find((c) => c.id === p.category_id);
      return {
        ...p,
        category_name: cat ? cat.name : "Unclassified Sufferings"
      };
    });

    res.json({
      products: enriched,
      total: enriched.length,
      note: "Catalog is shuffled on every single request. Enjoy finding things twice."
    });
  } catch (err) {
    next(err);
  }
});

productsRouter.get("/:id", async (req, res, next) => {
  try {
    const product = await db.getProductById(req.params.id);
    if (!product) {
      res.status(404).json({
        error: {
          code: "PRODUCT_NOT_FOUND",
          message: "This product does not exist, never did, and certainly will never be in stock."
        }
      });
      return;
    }

    const categories = await db.getCategories();
    const cat = categories.find((c) => c.id === product.category_id);

    res.json({
      product: {
        ...product,
        category_name: cat ? cat.name : "Unclassified Sufferings"
      }
    });
  } catch (err) {
    next(err);
  }
});
