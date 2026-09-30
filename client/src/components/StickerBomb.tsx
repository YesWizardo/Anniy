import React from "react";

export const StickerBomb: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-10 opacity-70">
      {/* Scattered Emojis and Doodles */}
      <span className="sticker text-3xl top-24 left-4 rotate-12">💀</span>
      <span className="sticker text-2xl top-1/3 right-8 -rotate-12">💔</span>
      <span className="sticker text-4xl bottom-32 left-10 rotate-45">📕</span>
      <span className="sticker text-2xl top-1/2 left-2 -rotate-6">🪱</span>
      <span className="sticker text-3xl bottom-16 right-24 rotate-6">💸</span>
      <span className="sticker text-2xl top-44 right-1/4 rotate-18">⚠️</span>
    </div>
  );
};
