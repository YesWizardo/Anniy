import { GoogleGenAI } from "@google/genai";
import { env } from "../config/env.js";

export const ai = env.GEMINI_API_KEY && env.GEMINI_API_KEY.trim().length > 0
  ? new GoogleGenAI({ apiKey: env.GEMINI_API_KEY })
  : null;

export const GEMINI_MODEL = env.GEMINI_MODEL || "gemini-2.5-flash";
