import React, { useState } from "react";
import { RageButton } from "../rage/components/RageButton.js";

export const FakePopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 left-6 z-50 max-w-sm bg-yellow-200 border-4 border-black p-4 rounded-xl shadow-[8px_8px_0px_#000] rotate-[-2deg]">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-pixel text-xs text-rage-blood">
          SPECIAL DELUSION OFFER!
        </h4>
        {/* Tiny close button that triggers the loader */}
        <RageButton
          variant="secondary"
          onClick={() => setIsOpen(false)}
          className="!p-0.5 !text-[9px] !h-5 !w-5"
          title="Close (Takes 5 seconds to dismiss)"
        >
          x
        </RageButton>
      </div>
      <p className="font-sans text-xs text-black leading-tight mb-3">
        Claim <strong>0% off</strong> all out-of-stock items today! Enter your credit card to reserve your disappointment.
      </p>
      <div className="flex gap-2">
        <RageButton
          canVanish={true}
          variant="primary"
          onClick={() => setIsOpen(false)}
          className="text-xs py-1"
        >
          Claim Nothing
        </RageButton>
      </div>
    </div>
  );
};
