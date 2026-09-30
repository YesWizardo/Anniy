import React from "react";

export const Marquee: React.FC = () => {
  const announcements = [
    "🔥 FLASH SALE: 100% OF CATALOG CONFIRMED OUT OF STOCK",
    "📢 SHIPPING UPDATE: PACKAGES ARE BEING TELEPORTED INTO ADJACENT REALITIES",
    "⚠️ ALERT: HOLDING SHIFT KEY WILL NOT SAVE YOU",
    "💀 OVER 4,000 SHOPPERS ARE CURRENTLY STUCK ON STEP 3 OF CHECKOUT",
    "☕ PRO TIP: MR. BOOKWORM IS JUDGING YOUR POSTURE RIGHT NOW",
    "📚 NOTICE: BLANK BOOKS ARE CURRENTLY OUR BESTSELLER BY VOLUME"
  ];

  const fullText = announcements.join("   ★   ");

  return (
    <div className="w-full bg-rage-dark border-y-2 border-rage-neon py-1.5 overflow-hidden whitespace-nowrap select-none">
      <div className="marquee-content font-pixel text-xs text-rage-neon">
        <span>{fullText} &nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>{fullText} &nbsp;&nbsp;&nbsp;&nbsp;</span>
      </div>
    </div>
  );
};
