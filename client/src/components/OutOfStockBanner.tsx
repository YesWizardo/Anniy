import React from "react";

export interface OutOfStockBannerProps {
  excuse?: string;
  restockEta?: string;
}

export const OutOfStockBanner: React.FC<OutOfStockBannerProps> = ({
  excuse = "Out of stock because it achieved transcendence and left the warehouse.",
  restockEta = "Never (within standard statistical deviation)."
}) => {
  return (
    <div className="w-full bg-red-100 border-2 border-dashed border-red-500 rounded-xl p-3 sm:p-4 text-red-900 my-3">
      <div className="flex items-center gap-2 font-pixel text-xs text-red-700 font-bold mb-1">
        <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
        <span>100% OUT OF STOCK FOREVER</span>
      </div>
      <p className="text-xs sm:text-sm font-sans italic mb-1">
        "{excuse}"
      </p>
      <div className="text-[11px] font-mono text-red-700 font-semibold">
        Restock Expected: <span className="underline">{restockEta}</span>
      </div>
    </div>
  );
};
