import { RAGE_CONFIG } from "@readrage/shared";

export type BossKey = "Space" | "ShiftLeft" | "ShiftRight";

export interface BossBarState {
  status: "inactive" | "active" | "completed";
  progress: number; // 0 to 100
  validPresses: number;
  requiredPresses: number;
  currentAcceptedCode: BossKey;
  bannerKeyText: string;
  subBannerText: string;
  pressesSinceLastSwap: number;
  nextSwapAt: number;
  lastValidPressTimestamp: number | null;
  resetCount: number;
  wrongKeyCount: number;
  wasResetJustNow: boolean;
}

export function pickRandomSwapThreshold(randomFn = Math.random): number {
  const min = RAGE_CONFIG.bossBar.keySwapMinPresses;
  const max = RAGE_CONFIG.bossBar.keySwapMaxPresses;
  return Math.floor(randomFn() * (max - min + 1)) + min;
}

export function getBannerForAcceptedKey(key: BossKey, isShiftInverted = true, randomFn = Math.random): { banner: string; sub: string } {
  if (key === "Space") {
    const isTired = randomFn() < 0.3;
    return {
      banner: "NOW PRESS: SPACE",
      sub: isTired ? "⚠️ WARNING: Space is feeling fatigued, but press it anyway." : "Hit Space rapidly!"
    };
  }

  if (isShiftInverted) {
    if (key === "ShiftLeft") {
      // Inversion: accepted is ShiftLeft, banner says RIGHT SHIFT
      return {
        banner: "NOW PRESS: RIGHT SHIFT",
        sub: "⚠️ Synchronize left-brain and right-brain peripherals."
      };
    } else {
      // Inversion: accepted is ShiftRight, banner says LEFT SHIFT
      return {
        banner: "NOW PRESS: LEFT SHIFT",
        sub: "⚠️ The other left. Think carefully."
      };
    }
  }

  // Non-inverted fallback
  return {
    banner: key === "ShiftLeft" ? "NOW PRESS: LEFT SHIFT" : "NOW PRESS: RIGHT SHIFT",
    sub: "Keep mashing!"
  };
}

export function createInitialBossBarState(
  requiredPresses: number = RAGE_CONFIG.bossBar.requiredPresses,
  randomFn = Math.random
): BossBarState {
  const initialKeys: BossKey[] = ["Space", "ShiftLeft", "ShiftRight"];
  const initialKey = initialKeys[Math.floor(randomFn() * initialKeys.length)];
  const bannerInfo = getBannerForAcceptedKey(initialKey, RAGE_CONFIG.bossBar.invertShift, randomFn);

  return {
    status: "active",
    progress: 0,
    validPresses: 0,
    requiredPresses,
    currentAcceptedCode: initialKey,
    bannerKeyText: bannerInfo.banner,
    subBannerText: bannerInfo.sub,
    pressesSinceLastSwap: 0,
    nextSwapAt: pickRandomSwapThreshold(randomFn),
    lastValidPressTimestamp: null,
    resetCount: 0,
    wrongKeyCount: 0,
    wasResetJustNow: false
  };
}

export interface BossBarPressResult {
  nextState: BossBarState;
  eventType?: "valid_press" | "wrong_key" | "key_swapped" | "boss_completed" | "ignored_repeat";
}

export function handleBossBarKeyPress(
  state: BossBarState,
  code: string,
  isRepeat: boolean,
  nowTimestamp = Date.now(),
  randomFn = Math.random
): BossBarPressResult {
  if (state.status !== "active") {
    return { nextState: state };
  }

  // Rule 4.2: Holding key down must NOT count (ignore event.repeat)
  if (isRepeat) {
    return { nextState: state, eventType: "ignored_repeat" };
  }

  // Check if correct accepted key
  if (code === state.currentAcceptedCode) {
    const newPresses = state.validPresses + 1;
    const progressPerPress = 100 / state.requiredPresses;
    const newProgress = Math.min(100, Math.round(newPresses * progressPerPress));

    if (newProgress >= 100) {
      return {
        nextState: {
          ...state,
          progress: 100,
          validPresses: newPresses,
          status: "completed",
          lastValidPressTimestamp: nowTimestamp,
          wasResetJustNow: false
        },
        eventType: "boss_completed"
      };
    }

    const pressesSinceSwap = state.pressesSinceLastSwap + 1;
    let currentKey = state.currentAcceptedCode;
    let bannerText = state.bannerKeyText;
    let subText = state.subBannerText;
    let nextSwap = state.nextSwapAt;
    let newPressesSinceSwap = pressesSinceSwap;
    let eventType: "valid_press" | "key_swapped" = "valid_press";

    // Check if key needs to swap (Section 4.3: changes every 8–25 valid presses)
    if (pressesSinceSwap >= state.nextSwapAt) {
      const candidates: BossKey[] = (["Space", "ShiftLeft", "ShiftRight"] as BossKey[]).filter(
        (k) => k !== currentKey
      );
      currentKey = candidates[Math.floor(randomFn() * candidates.length)];
      const bannerInfo = getBannerForAcceptedKey(currentKey, RAGE_CONFIG.bossBar.invertShift, randomFn);
      bannerText = bannerInfo.banner;
      subText = bannerInfo.sub;
      nextSwap = pickRandomSwapThreshold(randomFn);
      newPressesSinceSwap = 0;
      eventType = "key_swapped";
    }

    return {
      nextState: {
        ...state,
        progress: newProgress,
        validPresses: newPresses,
        currentAcceptedCode: currentKey,
        bannerKeyText: bannerText,
        subBannerText: subText,
        pressesSinceLastSwap: newPressesSinceSwap,
        nextSwapAt: nextSwap,
        lastValidPressTimestamp: nowTimestamp,
        wasResetJustNow: false
      },
      eventType
    };
  } else {
    // Wrong key penalty: -10 percentage points (Rule 4.3)
    const penalty = RAGE_CONFIG.bossBar.wrongKeyPenalty;
    const newProgress = Math.max(0, state.progress - penalty);
    const progressPerPress = 100 / state.requiredPresses;
    const newPresses = Math.max(0, Math.round(newProgress / progressPerPress));

    return {
      nextState: {
        ...state,
        progress: newProgress,
        validPresses: newPresses,
        wrongKeyCount: state.wrongKeyCount + 1,
        wasResetJustNow: false
      },
      eventType: "wrong_key"
    };
  }
}

export function checkBossBarIdleReset(
  state: BossBarState,
  nowTimestamp = Date.now()
): { nextState: BossBarState; didReset: boolean } {
  if (state.status !== "active" || state.lastValidPressTimestamp === null || state.progress === 0) {
    return { nextState: state, didReset: false };
  }

  const idleTimeout = RAGE_CONFIG.bossBar.idleResetMs;
  const elapsed = nowTimestamp - state.lastValidPressTimestamp;

  if (elapsed > idleTimeout) {
    // RESET TO 0%
    return {
      nextState: {
        ...state,
        progress: 0,
        validPresses: 0,
        pressesSinceLastSwap: 0,
        lastValidPressTimestamp: null,
        resetCount: state.resetCount + 1,
        wasResetJustNow: true
      },
      didReset: true
    };
  }

  return { nextState: state, didReset: false };
}
