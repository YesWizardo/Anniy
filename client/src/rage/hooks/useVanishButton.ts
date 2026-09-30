import { useState, useRef, useEffect, useCallback } from "react";
import { RAGE_CONFIG } from "@readrage/shared";

export type VanishBehavior = "fade" | "shrink" | "teleport" | "decoy" | "slideOff" | "niceTry";

export interface UseVanishButtonOptions {
  enabled?: boolean;
  onVanish?: (behavior: VanishBehavior) => void;
}

export function useVanishButton(options: UseVanishButtonOptions = {}) {
  const { enabled = true, onVanish } = options;
  const [isVanished, setIsVanished] = useState(false);
  const [currentBehavior, setCurrentBehavior] = useState<VanishBehavior>("fade");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [teleportOffset, setTeleportOffset] = useState({ x: 0, y: 0 });
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const behaviorIndexRef = useRef(0);

  const behaviors: VanishBehavior[] = [
    "fade",
    "shrink",
    "teleport",
    "decoy",
    "slideOff",
    "niceTry"
  ];

  const triggerVanish = useCallback(() => {
    if (!enabled || isVanished) return;

    // Pick next behavior
    const behavior = behaviors[behaviorIndexRef.current % behaviors.length];
    behaviorIndexRef.current += 1;
    setCurrentBehavior(behavior);
    setIsVanished(true);

    if (behavior === "teleport") {
      const offsetX = (Math.random() - 0.5) * 160;
      const offsetY = (Math.random() - 0.5) * 80;
      setTeleportOffset({ x: offsetX, y: offsetY });
    }

    if (behavior === "niceTry") {
      setToastMessage("Nice try!");
      setTimeout(() => setToastMessage(null), 1200);
    }

    if (onVanish) {
      onVanish(behavior);
    }

    // Schedule reappearance after 1.5 - 6s (Section 4.6 & Section 9)
    const minDelay = RAGE_CONFIG.vanish.reappearMinMs;
    const maxDelay = RAGE_CONFIG.vanish.reappearMaxMs;
    const delay = Math.floor(minDelay + Math.random() * (maxDelay - minDelay));

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsVanished(false);
      // Give a slight displacement upon reappearance so it moves
      const newOffsetX = (Math.random() - 0.5) * 60;
      const newOffsetY = (Math.random() - 0.5) * 30;
      setTeleportOffset({ x: newOffsetX, y: newOffsetY });
    }, delay);
  }, [enabled, isVanished, onVanish]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Compute CSS style according to current behavior
  let vanishStyle: React.CSSProperties = {
    transition: "all 0.15s ease-out"
  };

  if (isVanished) {
    switch (currentBehavior) {
      case "fade":
        vanishStyle = { opacity: 0, pointerEvents: "none" };
        break;
      case "shrink":
        vanishStyle = { transform: "scale(0)", opacity: 0, pointerEvents: "none" };
        break;
      case "teleport":
        vanishStyle = {
          transform: `translate(${teleportOffset.x}px, ${teleportOffset.y}px)`,
          transition: "transform 0.05s ease-in-out"
        };
        break;
      case "slideOff":
        vanishStyle = { transform: "translateX(250%)", opacity: 0, pointerEvents: "none" };
        break;
      case "decoy":
      case "niceTry":
        vanishStyle = { opacity: 0.1, pointerEvents: "none" };
        break;
    }
  } else if (teleportOffset.x !== 0 || teleportOffset.y !== 0) {
    vanishStyle = {
      transform: `translate(${teleportOffset.x}px, ${teleportOffset.y}px)`,
      transition: "transform 0.2s ease-out"
    };
  }

  return {
    isVanished,
    currentBehavior,
    toastMessage,
    vanishStyle,
    handleMouseEnter: () => triggerVanish(),
    // KEY RULE Section 4.6 & Section 18:
    // Keyboard focus must NOT trigger vanishing so the app stays technically completable!
    handleFocus: () => {
      /* intentionally safe */
    }
  };
}
