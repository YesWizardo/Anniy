import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";
import { cartAddSchema } from "@readrage/shared";
import { db } from "../lib/supabase.js";

export const cartRouter = Router();

cartRouter.use(requireAuth);

cartRouter.get("/", async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const items = await db.getCartItems(userId);
    res.json({
      items,
      count: items.reduce((acc, i) => acc + i.quantity, 0),
      disclaimer: "Items added to cart will visually fall out on screen. Don't panic, they remain safely out of stock in our database."
    });
  } catch (err) {
    next(err);
  }
});

cartRouter.post("/", validateBody(cartAddSchema), async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const { productId, quantity } = req.body;

    const product = await db.getProductById(productId);
    if (!product) {
      res.status(404).json({
        error: {
          code: "PRODUCT_NOT_FOUND",
          message: "Cannot add a phantom item to a phantom cart."
        }
      });
      return;
    }

    const item = await db.addToCart(userId, productId, quantity);
    res.status(201).json({
      item,
      message: "Successfully added to cart. (Stock remains strictly 0)."
    });
  } catch (err) {
    next(err);
  }
});

cartRouter.delete("/:productId", async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const { productId } = req.params;
    const removed = await db.removeFromCart(userId, productId);
    res.json({
      success: removed,
      message: removed
        ? "Item removed from cart. As if you were going to buy it anyway."
        : "Item wasn't even there to begin with."
    });
  } catch (err) {
    next(err);
  }
});
