import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar.js";
import { RageMeterHUD } from "../components/RageMeterHUD.js";
import { MrBookworm } from "../components/MrBookworm.js";
import { RageButton } from "../rage/components/RageButton.js";
import { RageLink } from "../rage/components/RageLink.js";

const ROTATING_EXCUSES = [
  "The books became aware of their own price and went into hiding in the mountains.",
  "A rogue silverfish with a doctorate in philosophy digested the last inventory sheet.",
  "Our delivery drones achieved spiritual enlightenment and refuse all material freight.",
  "The warehouse manager sneezed, creating a micro-black hole that absorbed the shipping bay.",
  "The item was seized by the International Tribunal of Regretful Transactions."
];

export const OutOfStockPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const urlExcuse = searchParams.get("excuse");
  const urlEta = searchParams.get("eta");
  const navigate = useNavigate();

  const [excuseIndex, setExcuseIndex] = useState(0);

  const activeExcuse = urlExcuse || ROTATING_EXCUSES[excuseIndex];
  const activeEta = urlEta || "Never. In fact, fewer copies will exist tomorrow.";

  const handleShuffleExcuse = () => {
    setExcuseIndex((prev) => (prev + 1) % ROTATING_EXCUSES.length);
  };

  return (
    <div className="min-h-screen bg-rage-paper flex flex-col justify-between pb-24 text-center">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 py-12 w-full">
        <div className="bg-red-50 border-4 border-red-600 rounded-3xl p-8 sm:p-12 shadow-[10px_10px_0px_#8b0000] rotate-[-1deg] relative">
          <div className="text-7xl mb-4 animate-bounce">
            🚫
          </div>

          <h1 className="font-creepy text-4xl sm:text-6xl text-rage-blood leading-tight">
            PERMANENTLY OUT OF STOCK!
          </h1>

          <div className="my-6 p-4 bg-white border-2 border-dashed border-red-400 rounded-xl text-sm font-sans italic text-red-900 leading-relaxed shadow-sm">
            "{activeExcuse}"
          </div>

          <div className="text-xs font-mono text-gray-700 mb-6">
            Projected Restock ETA: <strong className="text-red-700 underline">{activeEta}</strong>
          </div>

          <div className="my-6 flex justify-center">
            <MrBookworm />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
            {/* Section 6: 'try again' loops back with loader */}
            <RageButton
              variant="primary"
              onClick={() => navigate("/browse")}
              className="w-full sm:w-auto px-8 py-3 text-base"
            >
              🔄 Suffer Again (Return to Catalog)
            </RageButton>

            <RageButton
              variant="secondary"
              onClick={handleShuffleExcuse}
              className="w-full sm:w-auto text-xs"
            >
              🎲 Roll Another Excuse
            </RageButton>

            <RageLink
              to="/leaderboard"
              className="text-xs font-pixel text-blue-900 underline mt-2 sm:mt-0"
            >
              Check Your Rage Rank 🏆
            </RageLink>
          </div>
        </div>
      </main>

      <RageMeterHUD />
    </div>
  );
};
