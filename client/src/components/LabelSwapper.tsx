import React, { useState, useEffect } from "react";

export interface LabelSwapperProps {
  originalLabel: string;
  alternateLabels: string[];
}

export const LabelSwapper: React.FC<LabelSwapperProps> = ({
  originalLabel,
  alternateLabels
}) => {
  const [currentLabel, setCurrentLabel] = useState(originalLabel);

  useEffect(() => {
    // Random interval between 4s and 9s per Section 9
    const scheduleNextSwap = () => {
      const delay = Math.floor(4000 + Math.random() * 5000);
      const timer = setTimeout(() => {
        if (Math.random() < 0.5) {
          const alt = alternateLabels[Math.floor(Math.random() * alternateLabels.length)];
          setCurrentLabel(alt);
        } else {
          setCurrentLabel(originalLabel);
        }
        scheduleNextSwap();
      }, delay);
      return timer;
    };

    const timer = scheduleNextSwap();
    return () => clearTimeout(timer);
  }, [originalLabel, alternateLabels]);

  return (
    <span className="font-bubbly text-xs text-rage-blood select-none transition-colors">
      {currentLabel}
    </span>
  );
};
