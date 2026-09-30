import React, { useState } from "react";

export const FakeCaptcha: React.FC<{ onVerified: (val: boolean) => void }> = ({ onVerified }) => {
  const [checked, setChecked] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleToggle = () => {
    if (checked) return;
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      setChecked(true);
      onVerified(true);
    }, 1800);
  };

  return (
    <div className="bg-white border-2 border-gray-400 p-3 rounded-lg flex items-center justify-between gap-4 my-3 shadow-inner">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleToggle}
          disabled={checked || isVerifying}
          className={`w-6 h-6 border-2 border-gray-600 rounded flex items-center justify-center transition-all ${
            checked ? "bg-rage-neon border-black text-black font-bold" : "bg-white"
          }`}
        >
          {isVerifying && <span className="animate-spin text-xs">⏳</span>}
          {checked && <span>✓</span>}
        </button>

        <span className="font-sans text-xs text-gray-800 font-semibold select-none">
          I verify that I am a human and not a bound hardcover book
        </span>
      </div>

      <div className="flex flex-col items-center opacity-60">
        <span className="text-lg">📕</span>
        <span className="text-[8px] font-pixel text-gray-500">BookCaptcha</span>
      </div>
    </div>
  );
};
