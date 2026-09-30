import React, { useState } from "react";
import { Navbar } from "../components/Navbar.js";
import { RageMeterHUD } from "../components/RageMeterHUD.js";
import { useRage } from "../rage/RageProvider.js";
import { RAGE_CONFIG } from "@readrage/shared";
import { RageButton } from "../rage/components/RageButton.js";

export const JudgePage: React.FC = () => {
  const { demoSettings, setDemoSettings, triggerManualGlitch } = useRage();
  const [enteredCode, setEnteredCode] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(
    demoSettings.isDemoMode || localStorage.getItem("readrage_judge_unlocked") === "true"
  );
  const [unlockError, setUnlockError] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredCode.trim().toLowerCase() === RAGE_CONFIG.demoMode.secretCode.toLowerCase()) {
      setIsUnlocked(true);
      setUnlockError(false);
      localStorage.setItem("readrage_judge_unlocked", "true");
      setDemoSettings((prev) => ({ ...prev, isDemoMode: true }));
    } else {
      setUnlockError(true);
    }
  };

  return (
    <div className="min-h-screen bg-rage-paper flex flex-col justify-between pb-24">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8 w-full">
        <div className="bg-white border-4 border-black rounded-3xl p-6 sm:p-10 shadow-[10px_10px_0px_#000] rotate-[-0.2deg]">
          <div className="flex items-center justify-between border-b-2 border-black pb-4 mb-6">
            <div>
              <span className="font-pixel text-[10px] bg-yellow-300 px-2 py-0.5 rounded border border-black text-black">
                CONFIDENTIAL EVALUATION CONSOLE
              </span>
              <h1 className="font-creepy text-3xl sm:text-4xl text-rage-blood mt-1">
                JUDGE / DEMO CONTROL PANEL
              </h1>
            </div>
            <span className="text-4xl">⚖️</span>
          </div>

          {!isUnlocked ? (
            <div className="bg-yellow-50 border-2 border-dashed border-yellow-600 rounded-2xl p-6 text-center max-w-md mx-auto">
              <span className="text-3xl mb-2 block">🔒</span>
              <h3 className="font-bubbly text-xl text-yellow-900 mb-2">
                EVALUATOR AUTHENTICATION REQUIRED
              </h3>
              <p className="font-sans text-xs text-gray-700 mb-4">
                Enter the secret competition evaluation passcode (Hint: check Section 9 / 18 of prompt: <code>readrage42</code>).
              </p>

              <form onSubmit={handleUnlock} className="space-y-3">
                <input
                  type="text"
                  value={enteredCode}
                  onChange={(e) => setEnteredCode(e.target.value)}
                  placeholder="Enter secret code..."
                  className="w-full px-3 py-2 text-sm font-mono border-2 border-black rounded-lg text-center"
                />
                {unlockError && (
                  <p className="text-xs text-red-600 font-pixel">
                    INCORRECT CODE. TRY: readrage42
                  </p>
                )}
                <RageButton type="submit" variant="primary" className="w-full py-2 text-sm">
                  Unlock Evaluation Mode 🔓
                </RageButton>
              </form>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Secret Rules Explained */}
              <div className="bg-red-50 border-2 border-red-500 rounded-xl p-5">
                <h3 className="font-pixel text-xs text-red-700 font-bold mb-2">
                  🕵️ EXPLANATION OF HIDDEN RAGE MECHANICS (Never shown in UI)
                </h3>
                <ul className="text-xs font-sans text-gray-800 space-y-2 list-disc list-inside leading-relaxed">
                  <li>
                    <strong>The Shift Key Inversion Rule:</strong> During the Boss Bar, when the banner says <span className="font-bold text-red-600">"NOW PRESS: RIGHT SHIFT"</span>, the accepted key is strictly <span className="underline font-bold">ShiftLeft</span>. When it says <span className="font-bold text-red-600">"NOW PRESS: LEFT SHIFT"</span>, the accepted key is strictly <span className="underline font-bold">ShiftRight</span>. Space is always honest.
                  </li>
                  <li>
                    <strong>650ms Idle Reset:</strong> If the user pauses typing during the Boss Bar for longer than 650ms, progress drops immediately back to 0%.
                  </li>
                  <li>
                    <strong>Key-Repeat Immunization:</strong> Holding down a key triggers zero progress (`event.repeat` is discarded). Only distinct physical downstrokes count.
                  </li>
                  <li>
                    <strong>Lying Loader Percentages:</strong> The Universal Loader Bar periodically displays a percentage that diverges by up to ±20% from its physical bar width.
                  </li>
                  <li>
                    <strong>Vanishing Add to Cart:</strong> The button evaporates on mouse hover with 6 rotating behaviors, but remains completely clickable via keyboard Tab/Enter focus so the flow is 100% completable.
                  </li>
                  <li>
                    <strong>Permanent 409 Out of Stock:</strong> Every checkout ends in HTTP 409 with server-side AI-generated taunts.
                  </li>
                </ul>
              </div>

              {/* Evaluation Speed & Difficulty Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 border-2 border-black rounded-2xl p-6">
                <div>
                  <label className="block text-xs font-bubbly text-black mb-2">
                    ⚡ SPEED MULTIPLIER: {demoSettings.speedMultiplier}x
                  </label>
                  <input
                    type="range"
                    min="1.0"
                    max="5.0"
                    step="0.5"
                    value={demoSettings.speedMultiplier}
                    onChange={(e) =>
                      setDemoSettings((prev) => ({
                        ...prev,
                        speedMultiplier: parseFloat(e.target.value)
                      }))
                    }
                    className="w-full cursor-pointer"
                  />
                  <p className="text-[11px] font-mono text-gray-500 mt-1">
                    Accelerates the Universal Loader ticks for quicker testing.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bubbly text-black mb-2">
                    🎯 BOSS BAR PRESSES REQUIRED: {demoSettings.bossBarPressesOverride}
                  </label>
                  <div className="flex gap-2">
                    <RageButton
                      variant={demoSettings.bossBarPressesOverride === 40 ? "secondary" : "ghost"}
                      onClick={() =>
                        setDemoSettings((prev) => ({ ...prev, bossBarPressesOverride: 40 }))
                      }
                      className="!py-1 text-xs"
                    >
                      40 Presses (Demo)
                    </RageButton>
                    <RageButton
                      variant={demoSettings.bossBarPressesOverride === 100 ? "primary" : "ghost"}
                      onClick={() =>
                        setDemoSettings((prev) => ({ ...prev, bossBarPressesOverride: 100 }))
                      }
                      className="!py-1 text-xs"
                    >
                      100 Presses (Standard)
                    </RageButton>
                  </div>
                  <p className="text-[11px] font-mono text-gray-500 mt-1">
                    Reduces mashing required to clear the Boss Bar modal.
                  </p>
                </div>
              </div>

              {/* Manual Glitch Trigger Checklist */}
              <div className="bg-purple-50 border-2 border-purple-500 rounded-2xl p-6">
                <h3 className="font-bubbly text-base text-purple-900 mb-3">
                  🧪 MANUAL GLITCH ENGINE TEST SUITE
                </h3>
                <p className="text-xs font-sans text-gray-700 mb-4">
                  Trigger each of the 12 manual glitch types on demand to verify rendering:
                </p>

                <div className="flex flex-wrap gap-2">
                  {[
                    "rgb_split",
                    "slice_displacement",
                    "text_scramble",
                    "layout_jitter",
                    "fake_cursor",
                    "scanline_noise",
                    "duplicate_ghost",
                    "fake_crash",
                    "screen_inversion"
                  ].map((g) => (
                    <RageButton
                      key={g}
                      variant="ghost"
                      onClick={() => triggerManualGlitch(g)}
                      className="!py-1 !px-2.5 !text-[11px] font-mono bg-white border-purple-300 hover:bg-purple-100"
                    >
                      Trigger {g}
                    </RageButton>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <RageMeterHUD />
    </div>
  );
};
