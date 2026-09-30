import React from "react";
import { useNavigate } from "react-router-dom";
import { useRage } from "../RageProvider.js";
import { useVanishButton } from "../hooks/useVanishButton.js";

export interface RageLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  canVanish?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const RageLink: React.FC<RageLinkProps> = ({
  to,
  canVanish = false,
  className = "",
  children,
  onClick,
  ...props
}) => {
  const navigate = useNavigate();
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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isVanished) return;

    triggerRageAction(() => {
      onClick?.(e);
      navigate(to);
    });
  };

  return (
    <div className="relative inline-block" style={vanishStyle}>
      {toastMessage && <div className="nice-try-toast">{toastMessage}</div>}
      <a
        href={to}
        {...props}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onFocus={handleFocus}
        className={`cursor-pointer inline-flex items-center gap-1.5 transition-colors select-none ${className}`}
      >
        {children}
      </a>
    </div>
  );
};
