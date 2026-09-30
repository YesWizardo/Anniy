import React, { useState, useEffect } from "react";

export interface KeyBannerProps {
  bannerKeyText: string;
  subBannerText: string;
}

export const KeyBanner: React.FC<KeyBannerProps> = ({
  bannerKeyText,
  subBannerText
}) => {
  // Occasionally flip font and color scheme to make it harder to parse (Section 4.3)
  const [chaosStyleIndex, setChaosStyleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setChaosStyleIndex((prev) => (prev + 1) % 4);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const styles = [
    "bg-yellow-400 text-black font-pixel border-black",
    "bg-rage-blood text-white font-creepy tracking-wider border-rage-neon",
    "bg-rage-pink text-rage-dark font-bubbly border-black",
    "bg-rage-neon text-rage-blood font-serif italic border-black"
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center my-4">
      <div
        className={`px-6 py-4 rounded-xl border-4 shadow-2xl transition-all duration-300 text-center ${styles[chaosStyleIndex]}`}
      >
        <div className="text-xl sm:text-2xl font-black uppercase drop-shadow-md select-none">
          {bannerKeyText}
        </div>
        <p className="text-xs sm:text-sm mt-1 opacity-90 font-sans font-semibold">
          {subBannerText}
        </p>
      </div>
      <p className="text-[11px] text-gray-400 mt-2 font-mono italic text-center">
        (Do NOT stop spamming for &gt;650ms or your progress is instantly obliterated)
      </p>
    </div>
  );
};
