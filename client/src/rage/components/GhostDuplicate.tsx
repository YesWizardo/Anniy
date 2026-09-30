import React from "react";

export interface GhostDuplicateProps {
  children: React.ReactNode;
  isActive?: boolean;
}

export const GhostDuplicate: React.FC<GhostDuplicateProps> = ({
  children,
  isActive = false
}) => {
  if (!isActive) return <>{children}</>;

  return (
    <div className="relative inline-block">
      {/* Primary Element */}
      {children}

      {/* Ghost unclickable duplicate offset slightly */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 select-none filter blur-[1px] translate-x-3 translate-y-2 z-0"
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
};
