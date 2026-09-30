import { useState, useEffect, useRef, useCallback } from "react";
import {
  createInitialBossBarState,
  handleBossBarKeyPress,
  checkBossBarIdleReset,
  type BossBarState
} from "../machines/bossBarMachine.js";

export interface UseBossBarOptions {
  isActive: boolean;
  requiredPresses?: number;
  onComplete?: () => void;
  onReset?: () => void;
  onWrongKey?: () => void;
  onKeySwap?: () => void;
}

export function useBossBar({
  isActive,
  requiredPresses,
  onComplete,
  onReset,
  onWrongKey,
  onKeySwap
}: UseBossBarOptions) {
  const [state, setState] = useState<BossBarState>(() =>
    createInitialBossBarState(requiredPresses)
  );

  const stateRef = useRef(state);
  stateRef.current = state;

  const callbacksRef = useRef({ onComplete, onReset, onWrongKey, onKeySwap });
  callbacksRef.current = { onComplete, onReset, onWrongKey, onKeySwap };

  // Reset state whenever Boss Bar becomes active
  useEffect(() => {
    if (isActive) {
      setState(createInitialBossBarState(requiredPresses));
    }
  }, [isActive, requiredPresses]);

  // Keydown listener
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Intercept only relevant keys: Space, ShiftLeft, ShiftRight
      if (e.code === "Space" || e.code === "ShiftLeft" || e.code === "ShiftRight") {
        e.preventDefault();
        e.stopPropagation();

        const result = handleBossBarKeyPress(
          stateRef.current,
          e.code,
          e.repeat,
          Date.now()
        );

        setState(result.nextState);

        if (result.eventType === "boss_completed") {
          callbacksRef.current.onComplete?.();
        } else if (result.eventType === "wrong_key") {
          callbacksRef.current.onWrongKey?.();
        } else if (result.eventType === "key_swapped") {
          callbacksRef.current.onKeySwap?.();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown, { capture: true });
    return () => {
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
    };
  }, [isActive]);

  // Idle reset interval timer (checks every 40ms)
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      const { nextState, didReset } = checkBossBarIdleReset(stateRef.current, Date.now());
      if (didReset) {
        setState(nextState);
        callbacksRef.current.onReset?.();
      }
    }, 40);

    return () => clearInterval(interval);
  }, [isActive]);

  return {
    state,
    progress: state.progress,
    validPresses: state.validPresses,
    requiredPresses: state.requiredPresses,
    bannerKeyText: state.bannerKeyText,
    subBannerText: state.subBannerText,
    resetCount: state.resetCount,
    wrongKeyCount: state.wrongKeyCount,
    wasResetJustNow: state.wasResetJustNow
  };
}
