import React from "react";
import { useRage } from "../rage/RageProvider.js";
import { RageLink } from "../rage/components/RageLink.js";

export const RageMeterHUD: React.FC = () => {
  const { metrics } = useRage();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 text-white border-t-2 border-rage-neon px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs font-mono shadow-2xl backdrop-blur-md">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-1.5 font-pixel text-rage-pink text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
          <span>RAGE HUD</span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-gray-400">Score:</span>
          <span className="font-bold text-yellow-300 text-sm">{metrics.rageScore}</span>
        </div>

        <div className="hidden sm:flex items-center gap-1">
          <span className="text-gray-400">Clicks:</span>
          <span className="font-bold text-white">{metrics.totalClicks}</span>
        </div>

        <div className="flex items-center gap-1 text-red-400">
          <span>Regressions:</span>
          <span className="font-bold">{metrics.loaderRegressions}</span>
        </div>

        <div className="flex items-center gap-1 text-orange-400">
          <span>Boss Resets:</span>
          <span className="font-bold">{metrics.bossResets}</span>
        </div>

        <div className="hidden md:flex items-center gap-1 text-purple-400">
          <span>Wrong Keys:</span>
          <span className="font-bold">{metrics.wrongKeys}</span>
        </div>

        <div className="hidden lg:flex items-center gap-1 text-rage-neon">
          <span>Vanish Chases:</span>
          <span className="font-bold">{metrics.vanishChases}</span>
        </div>

        <div className="hidden sm:flex items-center gap-1 text-blue-300">
          <span>Time Wasted:</span>
          <span className="font-bold">{metrics.secondsWasted}s</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <RageLink
          to="/leaderboard"
          className="text-yellow-400 hover:text-yellow-200 underline font-pixel text-[10px]"
        >
          🏆 Global Leaderboard
        </RageLink>
      </div>
    </div>
  );
};
