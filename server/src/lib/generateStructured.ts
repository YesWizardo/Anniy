import { ZodSchema } from "zod";
import { ai, GEMINI_MODEL } from "./gemini.js";
import { env } from "../config/env.js";

export function sanitizeUserInput(input: string): string {
  if (!input) return "";
  return input
    .slice(0, 300)
    .replace(/[\x00-\x1F\x7F]/g, "")
    .trim();
}

export async function generateStructured<T>(
  schema: ZodSchema<T>,
  systemInstruction: string,
  userPrompt: string,
  _responseJsonSchema: unknown,
  fallback: T
): Promise<T> {
  if (!ai) {
    return fallback;
  }

  const timeoutMs = env.AI_TIMEOUT_MS || 6000;

  async function executeCall(): Promise<T> {
    const callPromise = (async () => {
      const response = await ai!.models.generateContent({
        model: GEMINI_MODEL,
        contents: userPrompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          temperature: 1.0,
          maxOutputTokens: 1000
        }
      });

      const text = response.text?.trim() || "";
      const parsedJson = JSON.parse(text);
      return schema.parse(parsedJson);
    })();

    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error("AI generation timeout exceeded")), timeoutMs);
    });

    return Promise.race([callPromise, timeoutPromise]);
  }

  // Attempt 1
  try {
    return await executeCall();
  } catch (err1) {
    console.warn("Gemini AI attempt 1 failed, retrying once...", err1);
    // Attempt 2 (retry once)
    try {
      return await executeCall();
    } catch (err2) {
      console.warn("Gemini AI attempt 2 failed. Falling back to local copy.", err2);
      return fallback;
    }
  }
}
