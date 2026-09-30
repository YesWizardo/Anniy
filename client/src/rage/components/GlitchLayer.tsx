import React, { useState, useEffect } from "react";
import type { ActiveGlitches } from "../machines/glitchScheduler.js";

export interface GlitchLayerProps {
  activeGlitches: ActiveGlitches;
}

export const GlitchLayer: React.FC<GlitchLayerProps> = ({ activeGlitches }) => {
  // Fake cursor position tracking (offset 40-120px)
  const [fakeCursorPos, setFakeCursorPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    if (!activeGlitches.fakeCursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      setFakeCursorPos({
        x: e.clientX + 64,
        y: e.clientY + 48
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [activeGlitches.fakeCursor]);

  return (
    <>
      {/* 7. Scanline + Noise overlay */}
      {activeGlitches.scanlineNoise && <div className="glitch-scanlines" />}

      {/* 5. Fake cursor ghost */}
      {activeGlitches.fakeCursor && (
        <div
          className="fake-cursor-ghost"
          style={{
            left: `${fakeCursorPos.x}px`,
            top: `${fakeCursorPos.y}px`
          }}
        />
      )}

      {/* 9. Fake Crash / Blue Screen overlay (max 1.2s) */}
      {activeGlitches.fakeCrash && (
        <div className="fake-crash-modal">
          <div className="text-4xl mb-4">:(</div>
          <h1 className="text-lg sm:text-xl font-bold mb-2">
            PAGE CRASHED / MEMORY LEAK
          </h1>
          <p className="text-xs sm:text-sm text-gray-200 max-w-lg mb-6 leading-relaxed">
            A fatal exception 0xDEADBEEF has occurred in ReadRage.dll. Attempting to reconnect to emotional reality...
          </p>
          <div className="w-48 h-3 bg-blue-900 border border-white rounded overflow-hidden">
            <div className="h-full bg-white w-2/3 animate-pulse" />
          </div>
        </div>
      )}
    </>
  );
};
