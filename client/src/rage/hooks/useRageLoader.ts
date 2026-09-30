import { useState, useRef, useEffect, useCallback } from "react";
import {
  createInitialLoaderState,
  computeNextLoaderTick,
  type LoaderState
} from "../machines/loaderMachine.js";

export interface UseRageLoaderOptions {
  speedMultiplier?: number;
  labels?: string[];
  onBossTrigger?: () => void;
  onComplete?: () => void;
  onRegressed?: () => void;
  onJumped?: () => void;
}

export function useRageLoader({
  speedMultiplier = 1.0,
  labels,
  onBossTrigger,
  onComplete,
  onRegressed,
  onJumped
}: UseRageLoaderOptions = {}) {
  const [state, setState] = useState<LoaderState>(() => createInitialLoaderState(labels));
  const stateRef = useRef(state);
  stateRef.current = state;

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const pendingActionRef = useRef<(() => void) | null>(null);

  const callbacksRef = useRef({ onBossTrigger, onComplete, onRegressed, onJumped });
  callbacksRef.current = { onBossTrigger, onComplete, onRegressed, onJumped };

  const cancelPendingTicks = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const scheduleNextTick = useCallback((delayMs: number) => {
    cancelPendingTicks();
    timerRef.current = setTimeout(() => {
      const prevProgress = stateRef.current.progress;
      const result = computeNextLoaderTick(
        stateRef.current,
        labels,
        speedMultiplier
      );

      setState(result.nextState);

      // Check for telemetry events
      if (result.nextState.progress < prevProgress) {
        callbacksRef.current.onRegressed?.();
      } else if (result.nextState.progress - prevProgress > 10) {
        callbacksRef.current.onJumped?.();
      }

      if (result.shouldPauseForBoss) {
        callbacksRef.current.onBossTrigger?.();
        return; // Pauses here!
      }

      if (result.isComplete) {
        callbacksRef.current.onComplete?.();
        if (pendingActionRef.current) {
          const action = pendingActionRef.current;
          pendingActionRef.current = null;
          action();
        }
        // Return to idle after a brief moment
        setTimeout(() => {
          setState(createInitialLoaderState(labels));
        }, 300);
        return;
      }

      scheduleNextTick(result.nextDelayMs);
    }, delayMs);
  }, [labels, speedMultiplier]);

  const startLoader = useCallback((onFinished?: () => void) => {
    cancelPendingTicks();
    if (onFinished) {
      pendingActionRef.current = onFinished;
    }

    const initial = createInitialLoaderState(labels);
    initial.status = "loading";
    setState(initial);

    // Initial small delay
    scheduleNextTick(80);
  }, [labels, scheduleNextTick]);

  const resumeAfterBoss = useCallback(() => {
    // Unpause the loader, jump it to 99% and then finish
    setState((prev) => ({
      ...prev,
      status: "loading",
      progress: 99,
      displayedPercent: 99,
      label: "BOSS CONQUERED. FINALIZING TRAUMA...",
      bossTriggered: true
    }));

    scheduleNextTick(150);
  }, [scheduleNextTick]);

  useEffect(() => {
    return () => cancelPendingTicks();
  }, []);

  return {
    state,
    isLoading: state.status === "loading" || state.status === "paused_for_boss",
    isPausedForBoss: state.status === "paused_for_boss",
    progress: state.progress,
    displayedPercent: state.displayedPercent,
    label: state.label,
    startLoader,
    resumeAfterBoss
  };
}
