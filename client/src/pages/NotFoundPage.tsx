import React, { useState } from "react";
import { Navbar } from "../components/Navbar.js";
import { RageMeterHUD } from "../components/RageMeterHUD.js";
import { RageButton } from "../rage/components/RageButton.js";
import { RageLink } from "../rage/components/RageLink.js";

export const NotFoundPage: React.FC = () => {
  const [subCode, setSubCode] = useState("404-A");

  const handleHop = () => {
    const codes = ["404-B", "404-C", "404-OMEGA", "404-INFINITY"];
    const next = codes[Math.floor(Math.random() * codes.length)];
    setSubCode(next);
  };

  return (
    <div className="min-h-screen bg-rage-paper flex flex-col justify-between pb-24 text-center">
      <Navbar />

      <main className="max-w-xl mx-auto px-4 py-16 w-full">
        <div className="bg-white border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_#000] rotate-[1.5deg]">
          <span className="text-6xl mb-4 block">🌀</span>
          <h1 className="font-creepy text-5xl text-rage-blood mb-2">
            PAGE {subCode} NOT FOUND
          </h1>
          <p className="font-sans text-xs sm:text-sm text-gray-700 my-4 leading-relaxed">
            The page you requested took an unscheduled flight into the cosmic vacuum. Clicking below will redirect you to another 404 page after a mandatory loading cycle.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
            <RageButton variant="primary" onClick={handleHop}>
              🔄 Try Alternate 404 (Triggers Loader)
            </RageButton>
            <RageLink to="/" className="text-xs font-mono text-blue-900 underline">
              Flee to Home Page
            </RageLink>
          </div>
        </div>
      </main>

      <RageMeterHUD />
    </div>
  );
};
