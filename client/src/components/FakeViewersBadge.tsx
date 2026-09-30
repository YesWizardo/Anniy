import React, { useState, useEffect } from "react";

export const FakeViewersBadge: React.FC = () => {
  const [viewers, setViewers] = useState(14);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fluctuates randomly between 8 and 32
      setViewers(Math.floor(Math.random() * 25) + 8);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-1.5 bg-orange-100 border border-orange-400 text-orange-800 text-[11px] font-sans font-semibold px-2 py-0.5 rounded-md shadow-sm">
      <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
      <span>{viewers} desperate shoppers are viewing this right now</span>
    </div>
  );
};
