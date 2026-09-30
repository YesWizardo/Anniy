import React from "react";
import { RageButton } from "../rage/components/RageButton.js";

export const FakeAdBanner: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-r from-rage-pink via-purple-600 to-rage-blood text-white p-3 border-4 border-dashed border-yellow-300 rounded-xl my-6 flex flex-wrap items-center justify-between gap-4 shadow-lg rotate-[0.5deg]">
      <div className="flex items-center gap-3">
        <span className="text-3xl animate-spin">🌪️</span>
        <div>
          <span className="bg-yellow-400 text-black text-[10px] font-pixel px-1.5 py-0.5 rounded font-bold">
            SPONSORED DESPAIR
          </span>
          <h4 className="font-bubbly text-base sm:text-lg text-white">
            TIRED OF SLEEPING AT NIGHT?
          </h4>
          <p className="text-xs text-yellow-100 font-sans">
            Try overthinking our entire catalog in 4K high definition!
          </p>
        </div>
      </div>

      <RageButton
        canVanish={true}
        variant="secondary"
        onClick={() => alert("Congratulations! You subscribed to 1,000 marketing telepathic pulses.")}
        className="text-xs shrink-0"
      >
        Sign Up Immediately
      </RageButton>
    </div>
  );
};
