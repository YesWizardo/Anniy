import React, { useState, useEffect } from "react";
import { KeyBanner } from "./KeyBanner.js";

export interface BossBarModalProps {
  isOpen: boolean;
  progress: number;
  validPresses: number;
  requiredPresses: number;
  bannerKeyText: string;
  subBannerText: string;
  resetCount: number;
  wrongKeyCount: number;
  wasResetJustNow: boolean;
}

export const BossBarModal: React.FC<BossBarModalProps> = ({
  isOpen,
  progress,
  validPresses,
  requiredPresses,
  bannerKeyText,
  subBannerText,
  resetCount,
  wrongKeyCount,
  wasResetJustNow
}) => {
  if (!isOpen) return null;

  // Intentionally inaccurate counter flicker (Section 17)
  const [flickerOffset, setFlickerOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Random flicker ±1 or 0
      const offset = Math.floor(Math.random() * 3) - 1;
      setFlickerOffset(offset);
    }, 450);
    return () => clearInterval(interval);
  }, []);

  const displayedPresses = Math.max(0, validPresses + flickerOffset);

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div
        className={`w-full max-w-xl bg-gray-950 border-4 ${
          wasResetJustNow
            ? "border-red-600 animate-bounce"
            : "border-rage-pink shadow-[0_0_50px_rgba(255,119,168,0.5)]"
        } rounded-2xl p-6 sm:p-8 flex flex-col items-center text-white relative overflow-hidden`}
      >
        {/* Warning Badge */}
        <div className="absolute top-3 left-4 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
          <span className="text-[11px] font-pixel text-red-400 tracking-wider">
            BOSS BAR ACTIVE
          </span>
        </div>

        {resetCount > 0 && (
          <div className="absolute top-3 right-4 text-xs font-mono bg-red-950/80 text-red-300 border border-red-800 px-2 py-0.5 rounded">
            Resets witnessed: {resetCount}
          </div>
        )}

        <h2 className="text-2xl sm:text-3xl font-black font-bubbly text-rage-pink text-center mt-4">
          THE SECOND BAR
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 font-sans text-center max-w-md mt-1">
          You are 94% through, but the server demands biological verification. Mash the required key to achieve 100%!
        </p>

        {/* Inverted Key Banner */}
        <KeyBanner
          bannerKeyText={bannerKeyText}
          subBannerText={subBannerText}
        />

        {/* Boss Progress Bar */}
        <div className="w-full mt-2">
          <div className="flex justify-between items-center text-xs font-pixel mb-1 px-1">
            <span className="text-rage-neon">BOSS PROGRESS</span>
            <span className="text-yellow-400 font-bold">{progress}%</span>
          </div>

          <div className="w-full h-8 bg-gray-900 border-2 border-gray-700 rounded-lg overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-red-600 via-yellow-400 to-rage-neon transition-all duration-75 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(-45deg, #000 0, #000 8px, transparent 8px, transparent 16px)"
                }}
              />
            </div>
          </div>
        </div>

        {/* Counter and Telemetry Stats */}
        <div className="w-full mt-4 flex items-center justify-between text-xs font-mono text-gray-400 px-1 border-t border-gray-800 pt-3">
          <div>
            Valid Presses:{" "}
            <span className="text-white font-bold">{displayedPresses}</span> / {requiredPresses}
          </div>
          <div>
            Wrong Keys:{" "}
            <span className="text-red-400 font-bold">{wrongKeyCount}</span>
          </div>
        </div>

        {wasResetJustNow && (
          <div className="w-full mt-3 py-1.5 px-3 bg-red-950 border border-red-500 rounded text-center text-xs font-pixel text-red-200">
            💀 YOU STOPPED TYPING! RESET TO 0%!
          </div>
        )}
      </div>
    </div>
  );
};
