import React from "react";

export interface ChaosGridProps {
  children: React.ReactNode;
}

export const ChaosGrid: React.FC<ChaosGridProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 p-4">
      {React.Children.map(children, (child, idx) => {
        // Deterministic chaotic rotation per index (-3.5deg to +3.5deg)
        const tilts = [
          "rotate-[-2deg] translate-y-1",
          "rotate-[1.8deg] -translate-y-2",
          "rotate-[-3.5deg] translate-x-1",
          "rotate-[2.5deg] translate-y-3",
          "rotate-[-1.5deg] -translate-x-1",
          "rotate-[3.2deg] translate-y-2"
        ];
        const tiltClass = tilts[idx % tilts.length];

        return (
          <div
            className={`transition-transform hover:scale-[1.02] hover:z-20 ${tiltClass}`}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
};
