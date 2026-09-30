import { Router } from "express";

export const healthRouter = Router();

healthRouter.get("/", (_req, res) => {
  res.json({
    status: "ok",
    app: "ReadRage API",
    tagline: "We value your time so much that we are taking all of it.",
    timestamp: new Date().toISOString()
  });
});
