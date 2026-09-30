import React from "react";

export interface UniversalLoaderBarProps {
  isVisible: boolean;
  progress: number;
  displayedPercent: number;
  label: string;
}

export const UniversalLoaderBar: React.FC<UniversalLoaderBarProps> = ({
  isVisible,
  progress,
  displayedPercent,
  label
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] pointer-events-auto bg-black border-b-4 border-rage-neon shadow-2xl">
      {/* Top Banner with Label and Lying Percentage */}
      <div className="flex items-center justify-between px-4 py-1.5 text-xs font-pixel text-white bg-rage-dark">
        <div className="flex items-center gap-2 truncate">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-rage-neon animate-ping" />
          <span className="text-rage-neon font-bold">LOADING:</span>
          <span className="text-rage-pink truncate">{label}</span>
        </div>
        <div className="flex items-center gap-3 shrink-0 pl-2">
          {/* Section 4.1: Percentage text must sometimes disagree with the bar's visual width */}
          <span className="text-yellow-300 font-bold tracking-widest text-sm">
            {displayedPercent}%
          </span>
          <span className="text-[10px] text-gray-400 hidden sm:inline">
            (Actual: {Math.round(progress)}%)
          </span>
        </div>
      </div>

      {/* Primary Progress Bar Track */}
      <div className="w-full h-4 bg-gray-900 overflow-hidden relative border-t border-black">
        <div
          className="h-full bg-gradient-to-r from-rage-blood via-rage-pink to-rage-neon transition-all duration-100 ease-out relative"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        >
          {/* Animated Barber Pole Stripes */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #000 0, #000 10px, transparent 10px, transparent 20px)",
              backgroundSize: "28px 28px"
            }}
          />
        </div>
      </div>
    </div>
  );
};
