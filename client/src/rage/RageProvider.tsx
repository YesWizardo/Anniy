import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import { useRageLoader } from "./hooks/useRageLoader.js";
import { useBossBar } from "./hooks/useBossBar.js";
import { useGlitchScheduler } from "./hooks/useGlitchScheduler.js";
import { UniversalLoaderBar } from "./components/UniversalLoaderBar.js";
import { BossBarModal } from "./components/BossBarModal.js";
import { GlitchLayer } from "./components/GlitchLayer.js";
import { api } from "../lib/api.js";
import { getCurrentUser, type ReadRageUser } from "../lib/supabaseClient.js";
import type { RageEventType } from "@readrage/shared";

interface RageMetrics {
  totalClicks: number;
  loaderRegressions: number;
  bossResets: number;
  wrongKeys: number;
  vanishChases: number;
  rageScore: number;
  secondsWasted: number;
}

interface DemoSettings {
  isDemoMode: boolean;
  speedMultiplier: number;
  bossBarPressesOverride: number;
}

interface RageContextValue {
  metrics: RageMetrics;
  demoSettings: DemoSettings;
  setDemoSettings: React.Dispatch<React.SetStateAction<DemoSettings>>;
  currentUser: ReadRageUser | null;
  setCurrentUser: (user: ReadRageUser | null) => void;
  triggerRageAction: (action: () => void) => void;
  logRageEvent: (type: RageEventType, meta?: Record<string, unknown>) => void;
  activeGlitches: ReturnType<typeof useGlitchScheduler>["activeGlitches"];
  triggerManualGlitch: (type: any) => void;
}

const RageContext = createContext<RageContextValue | null>(null);

export const RageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<ReadRageUser | null>(getCurrentUser);
  const [sessionId, setSessionId] = useState<string | null>(null);

  // Metrics
  const [metrics, setMetrics] = useState<RageMetrics>({
    totalClicks: 0,
    loaderRegressions: 0,
    bossResets: 0,
    wrongKeys: 0,
    vanishChases: 0,
    rageScore: 0,
    secondsWasted: 0
  });

  // Demo settings (Section 9)
  const isEnvDemo = import.meta.env.VITE_DEMO_MODE === "true";
  const [demoSettings, setDemoSettings] = useState<DemoSettings>({
    isDemoMode: isEnvDemo,
    speedMultiplier: isEnvDemo ? 2.5 : 1.0,
    bossBarPressesOverride: isEnvDemo ? 40 : 100
  });

  // Event queue for batch telemetry sending
  const eventQueueRef = useRef<{ type: RageEventType; meta?: Record<string, unknown> }[]>([]);

  // Initialize session
  useEffect(() => {
    api.initSession(currentUser?.id)
      .then((data) => setSessionId(data.sessionId))
      .catch((err) => console.warn("Rage session init failed:", err));
  }, [currentUser?.id]);

  // Track time wasted counter
  useEffect(() => {
    const timer = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        secondsWasted: prev.secondsWasted + 1
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flushEvents = useCallback(async () => {
    if (!sessionId || eventQueueRef.current.length === 0) return;
    const batch = [...eventQueueRef.current];
    eventQueueRef.current = [];

    try {
      const res = await api.sendEvents(sessionId, batch);
      if (res?.currentScore !== undefined) {
        setMetrics((prev) => ({ ...prev, rageScore: res.currentScore }));
      }
    } catch {
      // Re-queue on error
      eventQueueRef.current.unshift(...batch);
    }
  }, [sessionId]);

  const logRageEvent = useCallback(
    (type: RageEventType, meta?: Record<string, unknown>) => {
      eventQueueRef.current.push({ type, meta });

      // Update local metrics immediately for live HUD
      setMetrics((prev) => {
        const next = { ...prev };
        if (type === "loader_started") next.totalClicks += 1;
        if (type === "loader_regressed") next.loaderRegressions += 1;
        if (type === "boss_bar_reset") next.bossResets += 1;
        if (type === "wrong_key") next.wrongKeys += 1;
        if (type === "button_vanished") next.vanishChases += 1;
        return next;
      });

      if (eventQueueRef.current.length >= 5) {
        flushEvents();
      }
    },
    [flushEvents]
  );

  // Periodic telemetry flush
  useEffect(() => {
    const interval = setInterval(flushEvents, 4000);
    return () => clearInterval(interval);
  }, [flushEvents]);

  // Boss bar hook
  const [isBossBarActive, setIsBossBarActive] = useState(false);

  const bossBar = useBossBar({
    isActive: isBossBarActive,
    requiredPresses: demoSettings.bossBarPressesOverride,
    onComplete: () => {
      logRageEvent("boss_bar_completed");
      setIsBossBarActive(false);
      loader.resumeAfterBoss();
    },
    onReset: () => logRageEvent("boss_bar_reset"),
    onWrongKey: () => logRageEvent("wrong_key"),
    onKeySwap: () => logRageEvent("key_swapped")
  });

  // Loader hook
  const loader = useRageLoader({
    speedMultiplier: demoSettings.speedMultiplier,
    onBossTrigger: () => {
      logRageEvent("boss_bar_spawned");
      setIsBossBarActive(true);
    },
    onRegressed: () => logRageEvent("loader_regressed"),
    onJumped: () => logRageEvent("loader_jumped")
  });

  // Universal action trigger for buttons and links
  const triggerRageAction = useCallback(
    (action: () => void) => {
      logRageEvent("loader_started");
      loader.startLoader(action);
    },
    [loader, logRageEvent]
  );

  // Glitch scheduler
  const { activeGlitches, triggerManualGlitch } = useGlitchScheduler((type) => {
    logRageEvent("glitch_triggered", { type });
  });

  const value: RageContextValue = {
    metrics,
    demoSettings,
    setDemoSettings,
    currentUser,
    setCurrentUser,
    triggerRageAction,
    logRageEvent,
    activeGlitches,
    triggerManualGlitch
  };

  return (
    <RageContext.Provider value={value}>
      {/* 4.1 Universal Rage Loader Bar */}
      <UniversalLoaderBar
        isVisible={loader.isLoading}
        progress={loader.progress}
        displayedPercent={loader.displayedPercent}
        label={loader.label}
      />

      {/* 4.2 & 4.3 Boss Bar Modal */}
      <BossBarModal
        isOpen={isBossBarActive}
        progress={bossBar.progress}
        validPresses={bossBar.validPresses}
        requiredPresses={bossBar.requiredPresses}
        bannerKeyText={bossBar.bannerKeyText}
        subBannerText={bossBar.subBannerText}
        resetCount={bossBar.resetCount}
        wrongKeyCount={bossBar.wrongKeyCount}
        wasResetJustNow={bossBar.wasResetJustNow}
      />

      {/* 4.4 Manual Glitch Layer */}
      <GlitchLayer activeGlitches={activeGlitches} />

      {/* Main app content with dynamic glitch class toggles */}
      <div
        className={`w-full min-h-screen transition-all ${
          activeGlitches.rgbSplit ? "glitch-rgb" : ""
        } ${activeGlitches.sliceDisplacement ? "glitch-slice" : ""} ${
          activeGlitches.layoutJitter ? "glitch-jitter" : ""
        } ${activeGlitches.screenInversion ? "glitch-hue-invert" : ""}`}
      >
        {children}
      </div>
    </RageContext.Provider>
  );
};

export function useRage() {
  const context = useContext(RageContext);
  if (!context) {
    throw new Error("useRage must be used within a RageProvider");
  }
  return context;
}
