import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RageButton } from "../rage/components/RageButton.js";

export const WelcomeWarningPage: React.FC = () => {
  const navigate = useNavigate();
  const [hasHoveredOnce, setHasHoveredOnce] = useState(false);

  const handleAccept = () => {
    localStorage.setItem("readrage_warning_accepted", "true");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-rage-dark text-white flex flex-col items-center justify-center p-6 select-none">
      <div className="max-w-2xl bg-black border-4 border-yellow-400 p-8 rounded-2xl shadow-[0_0_50px_rgba(255,234,0,0.3)] text-center relative overflow-hidden">
        {/* Warning Icon */}
        <div className="text-5xl mb-4 animate-bounce">⚠️</div>

        <h1 className="font-pixel text-xl sm:text-2xl text-yellow-300 mb-4 leading-relaxed">
          PHOTOSENSITIVITY & PSYCHOLOGICAL ADVISORY
        </h1>

        <div className="text-xs sm:text-sm font-sans text-gray-300 space-y-4 text-left border-y-2 border-gray-800 py-4 my-4 leading-relaxed">
          <p>
            <strong>1. Visual Effects Notice:</strong> This application contains intentional graphic glitches, chromatic aberrations, hue alterations, and visual jitter. All flashing effects are strictly hardware-limited to strictly <strong>below 3 flashes per second</strong> to adhere to photosensitive seizure safety guidelines.
          </p>
          <p>
            <strong>2. Designed for Emotionally Infuriating Friction:</strong> Every bug, slowdown, disappearing button, key inversion, or lying loading bar is an <strong>intentional, engineered feature</strong> entered in a competition for <em>"Most Rage-Baited Application."</em>
          </p>
          <p>
            <strong>3. Nothing Is Truly Broken:</strong> The application is 100% technically completable. Every flow can be finished with sufficient patience, perseverance, and rapid typing.
          </p>
        </div>

        <p className="text-xs font-mono text-rage-pink italic mb-6">
          "We value your time so much that we are taking all of it." — Mr. Bookworm
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Section 6: Accept button vanishes on hover (once) */}
          <RageButton
            canVanish={!hasHoveredOnce}
            variant="absurd"
            onMouseEnter={() => setHasHoveredOnce(true)}
            onClick={handleAccept}
            className="w-full sm:w-auto px-8 py-3 text-base"
          >
            I Accept the Emotional Suffering
          </RageButton>

          <RageButton
            variant="ghost"
            onClick={() => {
              alert("Wise choice. Farewell.");
              window.location.href = "https://www.google.com";
            }}
            className="text-gray-400 hover:text-white"
          >
            Flee to Safety
          </RageButton>
        </div>
      </div>
    </div>
  );
};
