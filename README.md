# ReadRage — The Worst Online Book Store Ever Built

> *"We value your time so much that we are taking all of it."* — Mr. Bookworm

ReadRage is an Amazon-style online book store engineered specifically to be technically flawless as software, yet **emotionally infuriating by design**. Built for the competition for **"Most Rage-Baited Application."**

---

## 🏆 Key Rage Mechanics

| Mechanic | Description | Code Location |
|---|---|---|
| **Universal Rage Loader** | Fires on **EVERY** click/navigation. Regresses backward ($P=0.35$), jumps forward ($P=0.08$), shows lying percentages ($P=0.25$), and rotates misleading labels. | [`shared/rageConfig.ts`](file:///c:/Anti%20gravity/shared/src/rageConfig.ts), [`client/src/rage/machines/loaderMachine.ts`](file:///c:/Anti%20gravity/client/src/rage/machines/loaderMachine.ts) |
| **Boss Bar ("The Second Bar")** | Pauses loader at $\ge 94\%$. Requires 100 valid keystrokes. **Resets to 0% after 650ms idle.** Ignores held-key repeats. | [`client/src/rage/machines/bossBarMachine.ts`](file:///c:/Anti%20gravity/client/src/rage/machines/bossBarMachine.ts), [`client/src/rage/components/BossBarModal.tsx`](file:///c:/Anti%20gravity/client/src/rage/components/BossBarModal.tsx) |
| **Shift Key Inversion** | Changes target key every 8–25 presses. When banner says **"RIGHT SHIFT"**, only **`ShiftLeft`** is accepted; when banner says **"LEFT SHIFT"**, only **`ShiftRight`** is accepted. Wrong key = -10%. | [`client/src/rage/machines/bossBarMachine.ts`](file:///c:/Anti%20gravity/client/src/rage/machines/bossBarMachine.ts) |
| **Manual Glitch Engine** | 12 manual glitches without third-party libraries: RGB split, horizontal slice displacement, text scramble, layout jitter, fake cursor, font swap, scanlines, duplicate ghosts, fake crash overlay (max 1.2s), slow hue inversion, button swap, scroll jump. | [`client/src/rage/machines/glitchScheduler.ts`](file:///c:/Anti%20gravity/client/src/rage/machines/glitchScheduler.ts), [`client/src/styles/glitch.css`](file:///c:/Anti%20gravity/client/src/styles/glitch.css) |
| **Vanishing Buttons** | "Add to Cart" and action buttons vanish on hover via 6 rotating behaviors (fade, shrink, teleport, decoy, slide-off, "nice try"). Accessible via keyboard focus. | [`client/src/rage/hooks/useVanishButton.ts`](file:///c:/Anti%20gravity/client/src/rage/hooks/useVanishButton.ts), [`client/src/rage/components/RageButton.tsx`](file:///c:/Anti%20gravity/client/src/rage/components/RageButton.tsx) |
| **100% Out of Stock** | Catalog of 42 absurd items. Stock count is strictly 0 forever. Checkout always returns HTTP 409 OUT_OF_STOCK with AI excuses. | [`server/src/routes/checkout.ts`](file:///c:/Anti%20gravity/server/src/routes/checkout.ts), [`client/src/pages/OutOfStockPage.tsx`](file:///c:/Anti%20gravity/client/src/pages/OutOfStockPage.tsx) |
| **AI Mascot Taunts** | Server-side Gemini 2.5 Flash generates deadpan excuses, fake customer reviews, useless support replies, and advisories, with instant local fallback copy. | [`server/src/lib/generateStructured.ts`](file:///c:/Anti%20gravity/server/src/lib/generateStructured.ts), [`server/src/data/fallbackCopy.ts`](file:///c:/Anti%20gravity/server/src/data/fallbackCopy.ts) |
| **Global Rage Leaderboard** | Real-time score tracking: clicks, regressions, resets, wrong keys. Hovering rows on `/leaderboard` reshuffles them. Anti-cheat scoring clamp on server. | [`server/src/services/scoring.ts`](file:///c:/Anti%20gravity/server/src/services/scoring.ts), [`client/src/pages/LeaderboardPage.tsx`](file:///c:/Anti%20gravity/client/src/pages/LeaderboardPage.tsx) |
| **Hidden Judge / Demo Mode** | Reachable at `/judge` or unlocked via code `readrage42`. Explains hidden rules, provides speed multiplier slider (1x–5x), 40-press boss override, and glitch triggers. | [`client/src/pages/JudgePage.tsx`](file:///c:/Anti%20gravity/client/src/pages/JudgePage.tsx) |

---

## 🛠️ Tech Stack

- **Monorepo**: npm workspaces (`shared`, `server`, `client`)
- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Lucide React
- **Backend**: Node.js, Express, TypeScript, Helmet, CORS, Rate Limiters
- **Database & Auth**: Supabase PostgreSQL + Row Level Security (RLS) + In-Memory Fallback
- **AI**: Google GenAI SDK (`@google/genai`) on Gemini 2.5 Flash
- **Validation**: Zod (100% of API endpoints, env variables, AI payloads)
- **Testing**: Vitest (pure unit tests for all state machines)

---

## 🚀 Running Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Build Shared Workspace
```bash
npm run build --workspace=shared
```

### 3. Run Unit Tests (State Machines)
```bash
npm test
```

### 4. Start Full Stack Concurrently
```bash
# Starts Express backend (port 4000) and Vite frontend (port 5173)
npm run dev:all
```

- Open frontend: [http://localhost:5173](http://localhost:5173)
- API Health: [http://localhost:4000/api/v1/health](http://localhost:4000/api/v1/health)

---

## 🚢 Production Deployment

### Frontend (Vercel / Netlify)
```bash
npm run build --workspace=shared
npm run build --workspace=client
# Deploy the 'client/dist' directory
```

Environment variables on frontend host:
```env
VITE_API_BASE_URL=https://your-backend-domain.com/api/v1
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_DEMO_MODE=false
```

### Backend (Render / Railway)
```bash
npm run build --workspace=shared
npm run build --workspace=server
# Start command: node server/dist/index.js
```

Environment variables on backend host:
```env
PORT=4000
NODE_ENV=production
CLIENT_ORIGIN=https://your-frontend-domain.com
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
GEMINI_API_KEY=your-gemini-api-key
GEMINI_MODEL=gemini-2.5-flash
```

---

## 🛡️ Safety & Accessibility

- **Photosensitivity Safeguard**: No visual flashing exceeds 3 flashes per second (`maxFlashesPerSecond = 3`).
- **Reduced Motion**: Respects `prefers-reduced-motion` by disabling displacement and heavy screen shifts.
- **Completable By Design**: No dead ends. Keyboard focus never triggers vanishing buttons.
