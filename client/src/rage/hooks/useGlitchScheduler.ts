import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import {
  createInitialActiveGlitches,
  pickNavigationGlitchBurst,
  pickRandomGlitchType,
  getNextRandomGlitchDelay,
  type ActiveGlitches,
  type GlitchType
} from "../machines/glitchScheduler.js";

export function useGlitchScheduler(onGlitchTriggered?: (type: string) => void) {
  const [activeGlitches, setActiveGlitches] = useState<ActiveGlitches>(createInitialActiveGlitches);
  const location = useLocation();
  const burstTimerRef = useRef<NodeJS.Timeout | null>(null);
  const randomTimerRef = useRef<NodeJS.Timeout | null>(null);
  const onGlitchTriggeredRef = useRef(onGlitchTriggered);
  onGlitchTriggeredRef.current = onGlitchTriggered;

  // Detect prefers-reduced-motion
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  // Post-Navigation glitch burst (Section 4.4: 4–12 seconds after every navigation)
  useEffect(() => {
    if (burstTimerRef.current) clearTimeout(burstTimerRef.current);

    const burst = pickNavigationGlitchBurst(prefersReducedMotion);
    setActiveGlitches(burst.activeGlitches);
    onGlitchTriggeredRef.current?.("navigation_burst");

    burstTimerRef.current = setTimeout(() => {
      setActiveGlitches(createInitialActiveGlitches());
    }, burst.durationMs);

    return () => {
      if (burstTimerRef.current) clearTimeout(burstTimerRef.current);
    };
  }, [location.pathname, prefersReducedMotion]);

  // Periodic random glitches (every 20–60s)
  useEffect(() => {
    const scheduleNextRandomGlitch = () => {
      const delay = getNextRandomGlitchDelay();
      randomTimerRef.current = setTimeout(() => {
        const type = pickRandomGlitchType();
        onGlitchTriggeredRef.current?.(type);

        setActiveGlitches((prev) => {
          const updated = { ...prev };
          switch (type) {
            case "rgb_split": updated.rgbSplit = true; break;
            case "slice_displacement": updated.sliceDisplacement = !prefersReducedMotion; break;
            case "text_scramble": updated.textScramble = true; break;
            case "layout_jitter": updated.layoutJitter = !prefersReducedMotion; break;
            case "fake_cursor": updated.fakeCursor = true; break;
            case "random_font_swap": updated.randomFontSwap = true; break;
            case "scanline_noise": updated.scanlineNoise = true; break;
            case "duplicate_ghost": updated.duplicateGhost = true; break;
            case "fake_crash": updated.fakeCrash = true; break;
            case "screen_inversion": updated.screenInversion = !prefersReducedMotion; break;
            case "button_swap": updated.buttonSwap = true; break;
            case "scroll_jump": updated.scrollJump = !prefersReducedMotion; break;
          }
          return updated;
        });

        // Clear this single glitch after 2.5s
        setTimeout(() => {
          setActiveGlitches(createInitialActiveGlitches());
        }, 2500);

        scheduleNextRandomGlitch();
      }, delay);
    };

    scheduleNextRandomGlitch();

    return () => {
      if (randomTimerRef.current) clearTimeout(randomTimerRef.current);
    };
  }, [prefersReducedMotion]);

  const triggerManualGlitch = useCallback((type: GlitchType) => {
    setActiveGlitches((prev) => {
      const updated = { ...prev };
      switch (type) {
        case "rgb_split": updated.rgbSplit = true; break;
        case "slice_displacement": updated.sliceDisplacement = true; break;
        case "text_scramble": updated.textScramble = true; break;
        case "layout_jitter": updated.layoutJitter = true; break;
        case "fake_cursor": updated.fakeCursor = true; break;
        case "random_font_swap": updated.randomFontSwap = true; break;
        case "scanline_noise": updated.scanlineNoise = true; break;
        case "duplicate_ghost": updated.duplicateGhost = true; break;
        case "fake_crash": updated.fakeCrash = true; break;
        case "screen_inversion": updated.screenInversion = true; break;
        case "button_swap": updated.buttonSwap = true; break;
        case "scroll_jump": updated.scrollJump = true; break;
      }
      return updated;
    });

    setTimeout(() => {
      setActiveGlitches(createInitialActiveGlitches());
    }, 2000);
  }, []);

  return {
    activeGlitches,
    triggerManualGlitch
  };
}
