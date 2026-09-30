import { z } from "zod";

export const rageConfigSchema = z.object({
  loader: z.object({
    tickMinMs: z.number().positive(),
    tickMaxMs: z.number().positive(),
    forwardStepMin: z.number().positive(),
    forwardStepMax: z.number().positive(),
    backwardStepMin: z.number().positive(),
    backwardStepMax: z.number().positive(),
    backwardProbability: z.number().min(0).max(1),
    jumpProbability: z.number().min(0).max(1),
    jumpMin: z.number().positive(),
    jumpMax: z.number().positive(),
    bossTriggerPercent: z.number().min(50).max(99),
    labelChangeEveryTicks: z.number().positive(),
    percentLieProbability: z.number().min(0).max(1)
  }).refine((data) => data.tickMinMs <= data.tickMaxMs, {
    message: "tickMinMs must be less than or equal to tickMaxMs"
  }),
  bossBar: z.object({
    requiredPresses: z.number().positive(),
    idleResetMs: z.number().positive(),
    wrongKeyPenalty: z.number().positive(),
    keySwapMinPresses: z.number().positive(),
    keySwapMaxPresses: z.number().positive(),
    keys: z.array(z.string()).min(1),
    invertShift: z.boolean(),
    ignoreKeyRepeat: z.boolean()
  }).refine((data) => data.keySwapMinPresses <= data.keySwapMaxPresses, {
    message: "keySwapMinPresses must be less than or equal to keySwapMaxPresses"
  }),
  glitch: z.object({
    afterNavigationMinMs: z.number().positive(),
    afterNavigationMaxMs: z.number().positive(),
    randomIntervalMinMs: z.number().positive(),
    randomIntervalMaxMs: z.number().positive(),
    maxFlashesPerSecond: z.number().positive(),
    fakeCrashMaxMs: z.number().positive()
  }).refine((data) => data.afterNavigationMinMs <= data.afterNavigationMaxMs, {
    message: "afterNavigationMinMs must be <= afterNavigationMaxMs"
  }),
  vanish: z.object({
    reappearMinMs: z.number().positive(),
    reappearMaxMs: z.number().positive(),
    behaviors: z.array(z.string()).min(1),
    vanishOnKeyboardFocus: z.boolean()
  }).refine((data) => data.reappearMinMs <= data.reappearMaxMs, {
    message: "reappearMinMs must be <= reappearMaxMs"
  }),
  demoMode: z.object({
    enabledByEnv: z.string(),
    speedMultiplier: z.number().positive(),
    bossBarPressesOverride: z.number().positive(),
    secretCode: z.string()
  })
});

export const RAGE_CONFIG = {
  loader: {
    tickMinMs: 30,
    tickMaxMs: 1200,
    forwardStepMin: 1,
    forwardStepMax: 6,
    backwardStepMin: 2,
    backwardStepMax: 15,
    backwardProbability: 0.35,
    jumpProbability: 0.08,
    jumpMin: 10,
    jumpMax: 30,
    bossTriggerPercent: 94,
    labelChangeEveryTicks: 7,
    percentLieProbability: 0.25
  },
  bossBar: {
    requiredPresses: 100,
    idleResetMs: 650,
    wrongKeyPenalty: 10,
    keySwapMinPresses: 8,
    keySwapMaxPresses: 25,
    keys: ["Space", "ShiftLeft", "ShiftRight"],
    invertShift: true,
    ignoreKeyRepeat: true
  },
  glitch: {
    afterNavigationMinMs: 4000,
    afterNavigationMaxMs: 12000,
    randomIntervalMinMs: 20000,
    randomIntervalMaxMs: 60000,
    maxFlashesPerSecond: 3,
    fakeCrashMaxMs: 1200
  },
  vanish: {
    reappearMinMs: 1500,
    reappearMaxMs: 6000,
    behaviors: ["fade", "shrink", "teleport", "decoy", "slideOff", "niceTry"],
    vanishOnKeyboardFocus: false
  },
  demoMode: {
    enabledByEnv: "VITE_DEMO_MODE",
    speedMultiplier: 2.5,
    bossBarPressesOverride: 40,
    secretCode: "readrage42"
  }
} as const;

// Self-validate configuration at load time
rageConfigSchema.parse(RAGE_CONFIG);

export type RageConfig = typeof RAGE_CONFIG;
