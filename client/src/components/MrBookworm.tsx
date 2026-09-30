import React, { useState, useEffect } from "react";

const TAUNTS = [
  "Take your time! The books aren't going anywhere. Because they don't exist.",
  "Your dedication to clicking unpurchasable literature is deeply inspiring.",
  "Have you considered closing your browser tab and reflecting on your choices?",
  "I am programmed to smile, but emotionally I am laughing at your patience.",
  "Our customer satisfaction team has logged your sigh. It was magnificent.",
  "Remember: frustration burns approximately 1.4 calories per hour."
];

export const MrBookworm: React.FC = () => {
  const [tauntIndex, setTauntIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTauntIndex((prev) => (prev + 1) % TAUNTS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative inline-flex items-center gap-3 select-none">
      {/* Speech Bubble */}
      <div className="bg-white border-2 border-black p-3 rounded-2xl shadow-[4px_4px_0px_#000] max-w-xs text-xs font-mono relative">
        <span className="font-bold text-rage-blood">Mr. Bookworm: </span>
        <span>"{TAUNTS[tauntIndex]}"</span>
        <div className="absolute -bottom-2 left-6 w-3 h-3 bg-white border-b-2 border-r-2 border-black transform rotate-45" />
      </div>

      {/* Mascot Graphic: A worm with glasses and an unsettlingly wide smile */}
      <div className="w-16 h-16 rounded-full bg-rage-neon border-3 border-black flex flex-col items-center justify-center relative shadow-[3px_3px_0px_#000] animate-pulse">
        {/* Tiny Graduation / Reading Cap */}
        <div className="absolute -top-3 w-8 h-2 bg-rage-blood border border-black rotate-[-6deg]">
          <div className="w-1.5 h-1.5 bg-yellow-400 absolute right-0 top-1 rounded-full" />
        </div>

        {/* Glasses */}
        <div className="flex gap-1.5 mt-1 z-10">
          <div className="w-5 h-5 rounded-full border-2 border-black bg-white flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-black" />
          </div>
          <div className="w-5 h-5 rounded-full border-2 border-black bg-white flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-black" />
          </div>
        </div>

        {/* Too-Wide Smile */}
        <div className="w-10 h-3 border-b-3 border-black rounded-b-full mt-1 bg-rage-pink/40" />
      </div>
    </div>
  );
};
