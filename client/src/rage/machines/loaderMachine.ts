import { RAGE_CONFIG } from "@readrage/shared";

export type LoaderStatus = "idle" | "loading" | "paused_for_boss" | "completed";

export interface LoaderState {
  status: LoaderStatus;
  progress: number; // 0 to 100
  displayedPercent: number; // May lie about true progress
  label: string;
  ticksCount: number;
  bossTriggered: boolean;
}

const DEFAULT_LABELS = [
  "Almost there!",
  "Reticulating pages…",
  "Just kidding.",
  "Hmm.",
  "Going backwards for quality.",
  "Verifying emotional stability…",
  "Please wait slower.",
  "Inverting progress metrics…",
  "Consulting the Oracle of Latency…",
  "Compressing user patience…",
  "Generating fake hope…",
  "Checking for existential compliance…",
  "Reversing gears for safety…"
];

export function createInitialLoaderState(labels = DEFAULT_LABELS): LoaderState {
  return {
    status: "idle",
    progress: 0,
    displayedPercent: 0,
    label: labels[0],
    ticksCount: 0,
    bossTriggered: false
  };
}

export interface LoaderTickResult {
  nextState: LoaderState;
  shouldPauseForBoss: boolean;
  isComplete: boolean;
  nextDelayMs: number;
}

export function computeNextLoaderTick(
  currentState: LoaderState,
  labels = DEFAULT_LABELS,
  speedMultiplier = 1.0,
  randomFn = Math.random
): LoaderTickResult {
  if (currentState.status !== "loading") {
    return {
      nextState: currentState,
      shouldPauseForBoss: false,
      isComplete: currentState.status === "completed",
      nextDelayMs: 500
    };
  }

  const cfg = RAGE_CONFIG.loader;
  const newTicksCount = currentState.ticksCount + 1;
  let newProgress = currentState.progress;

  // Decide if we jump forward, step backward, or step forward
  const roll = randomFn();

  if (!currentState.bossTriggered && roll < cfg.jumpProbability) {
    // Fake hope sudden jump forward
    const jump = cfg.jumpMin + randomFn() * (cfg.jumpMax - cfg.jumpMin);
    newProgress += jump;
  } else if (!currentState.bossTriggered && roll < cfg.jumpProbability + cfg.backwardProbability) {
    // Regression backward!
    const regression = cfg.backwardStepMin + randomFn() * (cfg.backwardStepMax - cfg.backwardStepMin);
    newProgress = Math.max(0, newProgress - regression);
  } else {
    // Normal forward tick
    const forward = cfg.forwardStepMin + randomFn() * (cfg.forwardStepMax - cfg.forwardStepMin);
    newProgress += forward;
  }

  // Check boss bar trigger (≥94%)
  if (!currentState.bossTriggered && newProgress >= cfg.bossTriggerPercent) {
    return {
      nextState: {
        ...currentState,
        status: "paused_for_boss",
        progress: Math.min(95, newProgress),
        displayedPercent: 94,
        label: "HOLD ON. BOSS OBSTACLE DETECTED!",
        ticksCount: newTicksCount,
        bossTriggered: true
      },
      shouldPauseForBoss: true,
      isComplete: false,
      nextDelayMs: 0
    };
  }

  // Check completion (if boss already beaten)
  if (currentState.bossTriggered && newProgress >= 100) {
    return {
      nextState: {
        ...currentState,
        status: "completed",
        progress: 100,
        displayedPercent: 100,
        label: "Done! (Allegedly)",
        ticksCount: newTicksCount
      },
      shouldPauseForBoss: false,
      isComplete: true,
      nextDelayMs: 0
    };
  }

  // Cap at 99.9 if boss not yet beaten
  if (!currentState.bossTriggered && newProgress >= cfg.bossTriggerPercent) {
    newProgress = cfg.bossTriggerPercent;
  }

  // Calculate lying percentage
  let displayed = Math.round(newProgress);
  if (randomFn() < cfg.percentLieProbability) {
    // Lying offset between -15% and +20%
    const lieOffset = Math.floor(randomFn() * 36) - 15;
    displayed = Math.max(0, Math.min(98, displayed + lieOffset));
  }

  // Rotate label every labelChangeEveryTicks
  let label = currentState.label;
  if (newTicksCount % cfg.labelChangeEveryTicks === 0) {
    const labelIdx = Math.floor(randomFn() * labels.length);
    label = labels[labelIdx];
  }

  // Compute next tick delay
  const rawDelay = cfg.tickMinMs + randomFn() * (cfg.tickMaxMs - cfg.tickMinMs);
  const nextDelayMs = Math.max(20, Math.round(rawDelay / speedMultiplier));

  return {
    nextState: {
      ...currentState,
      progress: Math.min(99.9, newProgress),
      displayedPercent: displayed,
      label,
      ticksCount: newTicksCount
    },
    shouldPauseForBoss: false,
    isComplete: false,
    nextDelayMs
  };
}
