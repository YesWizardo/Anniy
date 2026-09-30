import React, { useState, useEffect } from "react";

export const FakeCountdown: React.FC = () => {
  const [secondsLeft, setSecondsLeft] = useState(47);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          // Restart countdown automatically (Section 4.5)
          return 59;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="inline-flex items-center gap-2 bg-red-100 border border-red-500 text-red-700 px-3 py-1 rounded-full text-xs font-pixel shadow-sm animate-pulse">
      <span>⏳ HURRY! DEALS EXPIRE IN:</span>
      <span className="font-bold font-mono text-sm text-red-900">
        00:{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </span>
    </div>
  );
};
