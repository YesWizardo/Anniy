import { app } from "./app.js";
import { env } from "./config/env.js";

const PORT = env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`
  📚 ============================================
  🔥 READRAGE SERVER RUNNING ON PORT ${PORT}
  💀 "We value your time so much that we are taking all of it."
  🌐 Client Origin: ${env.CLIENT_ORIGIN}
  🤖 Gemini Model: ${env.GEMINI_MODEL}
  📦 Database: PostgreSQL (with active fallback)
  ============================================
  `);
});
