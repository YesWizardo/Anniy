import { Router } from "express";
import { validateBody } from "../middleware/validate.js";
import { supportChatSchema, supportReplySchema } from "@readrage/shared";
import { generateStructured, sanitizeUserInput } from "../lib/generateStructured.js";
import { MR_BOOKWORM_SYSTEM_PROMPT } from "../prompts/system.js";
import { getRandomSupportReply } from "../data/fallbackCopy.js";

export const supportRouter = Router();

supportRouter.post("/chat", validateBody(supportChatSchema), async (req, res, next) => {
  try {
    const { message } = req.body;
    const sanitized = sanitizeUserInput(message);

    const prompt = `The customer says: <user_input>${sanitized}</user_input>. Reply as a confident, polite, completely unhelpful support agent. Refer them to a page that does not help, or loop them back to the start. Max 3 sentences.`;

    const reply = await generateStructured(
      supportReplySchema,
      MR_BOOKWORM_SYSTEM_PROMPT,
      prompt,
      null,
      getRandomSupportReply()
    );

    res.json(reply);
  } catch (err) {
    next(err);
  }
});
