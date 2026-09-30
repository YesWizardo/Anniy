import React from "react";
import { useRage } from "../RageProvider.js";
import { useVanishButton } from "../hooks/useVanishButton.js";

export interface RageButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  canVanish?: boolean;
  vanishBehavior?: string;
  variant?: "primary" | "secondary" | "danger" | "ghost" | "absurd";
}

export const RageButton: React.FC<RageButtonProps> = ({
  children,
  onClick,
  canVanish = false,
  variant = "primary",
  className = "",
  disabled,
  ...props
}) => {
  const { triggerRageAction, logRageEvent } = useRage();

  const {
    isVanished,
    toastMessage,
    vanishStyle,
    handleMouseEnter,
    handleFocus
  } = useVanishButton({
    enabled: canVanish,
    onVanish: (b) => logRageEvent("button_vanished", { behavior: b })
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (disabled || isVanished) return;

    triggerRageAction(() => {
      onClick?.(e);
    });
  };

  const variantStyles = {
    primary:
      "bg-rage-blood hover:bg-red-800 text-white border-2 border-black font-bubbly shadow-[3px_3px_0px_#000]",
    secondary:
      "bg-yellow-300 hover:bg-yellow-400 text-black border-2 border-black font-pixel shadow-[3px_3px_0px_#000]",
    danger:
      "bg-red-600 hover:bg-red-700 text-white border-2 border-yellow-300 font-pixel shadow-[3px_3px_0px_#000]",
    ghost:
      "bg-transparent hover:bg-black/10 text-rage-dark border border-dashed border-gray-500 font-sans",
    absurd:
      "bg-rage-neon text-rage-dark font-creepy text-lg tracking-widest border-4 border-rage-pink shadow-[4px_4px_0px_#ff77a8]"
  };

  return (
    <div className="relative inline-block" style={vanishStyle}>
      {toastMessage && (
        <div className="nice-try-toast">{toastMessage}</div>
      )}
      <button
        {...props}
        disabled={disabled}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onFocus={handleFocus}
        className={`px-4 py-2.5 rounded-lg active:translate-x-0.5 active:translate-y-0.5 transition-colors cursor-pointer select-none text-sm font-semibold flex items-center justify-center gap-2 ${variantStyles[variant]} ${className}`}
      >
        {children}
      </button>
    </div>
  );
};
