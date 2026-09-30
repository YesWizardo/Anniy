import React, { useState, useEffect } from "react";

export interface PriceFlickerProps {
  baseAmount: number | string;
  baseCurrency?: string;
}

const CURRENCIES = ["₹", "$", "€", "¥", "BTC", "💀", "Pounds of Regret", "Z$"];

export const PriceFlicker: React.FC<PriceFlickerProps> = ({
  baseAmount,
  baseCurrency = "₹"
}) => {
  const [currency, setCurrency] = useState(baseCurrency);

  useEffect(() => {
    const interval = setInterval(() => {
      // 30% chance to flicker currency symbol
      if (Math.random() < 0.35) {
        const nextCur = CURRENCIES[Math.floor(Math.random() * CURRENCIES.length)];
        setCurrency(nextCur);
      } else {
        setCurrency(baseCurrency);
      }
    }, 1800);

    return () => clearInterval(interval);
  }, [baseCurrency]);

  return (
    <span className="price-flicker font-mono font-bold tracking-tight text-rage-blood select-none">
      <span className="text-xs mr-1 opacity-80">{currency}</span>
      {typeof baseAmount === "number"
        ? baseAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })
        : baseAmount}
    </span>
  );
};
