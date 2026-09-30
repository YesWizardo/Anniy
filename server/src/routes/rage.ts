import { Router } from "express";
import { optionalAuth } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";
import {
  rageEventBatchSchema,
  rageSessionInitSchema,
  rageSessionEndSchema
} from "@readrage/shared";
import { db } from "../lib/supabase.js";
import { computeRageEventDelta } from "../services/scoring.js";

export const rageRouter = Router();

// Start a rage session
rageRouter.post("/session", optionalAuth, validateBody(rageSessionInitSchema), async (req, res, next) => {
  try {
    const userId = req.user?.id || req.body.userId;
    const sessionId = await db.createRageSession(userId);
    res.status(201).json({
      sessionId,
      startedAt: new Date().toISOString(),
      message: "Rage tracking initialized. Suffer productively."
    });
  } catch (err) {
    next(err);
  }
});

// Batch submit rage telemetry events (max 50)
rageRouter.post("/events", validateBody(rageEventBatchSchema), async (req, res, next) => {
  try {
    const { sessionId, events } = req.body;
    const scoreDelta = computeRageEventDelta(events);
    const updated = await db.addRageEvents(sessionId, events, scoreDelta);

    if (!updated) {
      res.status(404).json({
        error: {
          code: "SESSION_NOT_FOUND",
          message: "Could not log agony to a non-existent session."
        }
      });
      return;
    }

    res.json({
      success: true,
      eventsLogged: events.length,
      scoreDelta,
      currentScore: updated.rage_score
    });
  } catch (err) {
    next(err);
  }
});

// End session
rageRouter.post("/session/:id/end", validateBody(rageSessionEndSchema), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { secondsWasted } = req.body;
    const session = await db.endRageSession(id, secondsWasted);

    if (!session) {
      res.status(404).json({
        error: {
          code: "SESSION_NOT_FOUND",
          message: "Session disappeared before final judgment."
        }
      });
      return;
    }

    res.json({
      session,
      message: "Session ended. Your suffering has been immortalized."
    });
  } catch (err) {
    next(err);
  }
});

// Leaderboard: Top 50
rageRouter.get("/leaderboard", async (_req, res, next) => {
  try {
    const topSessions = await db.getLeaderboard(50);
    const formatted = topSessions.map((s, index) => ({
      rank: index + 1,
      id: s.id,
      displayName: s.user_id ? `Sufferer_${s.id.slice(0, 6)}` : `Guest_${s.id.slice(0, 5)}`,
      rageScore: s.rage_score,
      totalClicks: s.total_clicks,
      regressionsWitnessed: s.loader_regressions,
      bossResets: s.boss_bar_resets,
      wrongKeys: s.wrong_keys,
      vanishChases: s.vanish_chases,
      durationMinutes: s.ended_at
        ? Math.max(1, Math.round((new Date(s.ended_at).getTime() - new Date(s.started_at).getTime()) / 60000))
        : 1
    }));

    res.json({
      leaderboard: formatted,
      totalCount: formatted.length,
      note: "Scores update dynamically. Hovering rows in the frontend will reshuffle them on purpose."
    });
  } catch (err) {
    next(err);
  }
});
