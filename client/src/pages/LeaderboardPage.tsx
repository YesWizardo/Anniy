import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar.js";
import { RageMeterHUD } from "../components/RageMeterHUD.js";
import { api } from "../lib/api.js";

export const LeaderboardPage: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getLeaderboard()
      .then((res) => {
        setLeaderboard(res.leaderboard);
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Leaderboard fetch failed:", err);
        setLoading(false);
      });
  }, []);

  // Section 6 Rage Mechanic: "Rows reshuffle when hovered"
  const handleRowHover = (hoveredIndex: number) => {
    setLeaderboard((prev) => {
      if (prev.length < 3) return prev;
      const copy = [...prev];
      // Swap hovered index with a random neighbor
      const targetIndex = (hoveredIndex + 1) % copy.length;
      [copy[hoveredIndex], copy[targetIndex]] = [copy[targetIndex], copy[hoveredIndex]];
      return copy;
    });
  };

  return (
    <div className="min-h-screen bg-rage-paper flex flex-col justify-between pb-24">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-8 w-full">
        <div className="bg-white border-4 border-black rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_#000] rotate-[-0.3deg]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-black mb-6">
            <div>
              <h1 className="font-creepy text-3xl sm:text-5xl text-rage-blood">
                GLOBAL RAGE LEADERBOARD
              </h1>
              <p className="font-sans text-xs text-gray-600 mt-1">
                Honoring the brave sufferers who endured the most regressions, resets, and vanish-chases.
              </p>
            </div>
            <div className="text-right">
              <span className="text-4xl">🏆</span>
              <p className="text-[10px] font-pixel text-red-600 mt-1">
                ⚠️ HOVERING ROWS WILL RESHUFFLE THEM
              </p>
            </div>
          </div>

          {/* Scoring Formula Box */}
          <div className="bg-yellow-50 border-2 border-dashed border-yellow-500 rounded-xl p-3 sm:p-4 mb-6 text-xs font-mono">
            <span className="font-bold text-yellow-900 block mb-1">
              📊 OFFICIAL RAGE CALCULATION FORMULA:
            </span>
            <code className="text-gray-800 block overflow-x-auto whitespace-pre">
              score = clicks*1 + loader_regressions*3 + boss_bar_resets*25 + wrong_keys*5 + vanish_chases*4 + floor(seconds_wasted/10)
            </code>
          </div>

          {loading ? (
            <div className="p-16 text-center font-pixel text-xs text-gray-500">
              Gathering hall of eternal agony...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="bg-rage-dark text-rage-neon border-b-2 border-black">
                    <th className="p-3">RANK</th>
                    <th className="p-3">SUFFERER</th>
                    <th className="p-3 text-right">RAGE SCORE</th>
                    <th className="p-3 text-right">CLICKS</th>
                    <th className="p-3 text-right">REGRESSIONS</th>
                    <th className="p-3 text-right">BOSS RESETS</th>
                    <th className="p-3 text-right">WRONG KEYS</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, idx) => (
                    <tr
                      key={entry.id || idx}
                      onMouseEnter={() => handleRowHover(idx)}
                      className={`border-b border-gray-200 transition-colors cursor-crosshair ${
                        idx === 0
                          ? "bg-yellow-100 font-bold"
                          : idx % 2 === 0
                          ? "bg-white"
                          : "bg-gray-50"
                      } hover:bg-pink-100`}
                    >
                      <td className="p-3 font-pixel">
                        {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `#${idx + 1}`}
                      </td>
                      <td className="p-3 font-semibold text-rage-blood truncate max-w-[150px]">
                        {entry.displayName || `Sufferer_${idx + 1}`}
                      </td>
                      <td className="p-3 text-right font-bold text-rage-blood text-sm">
                        {entry.rageScore}
                      </td>
                      <td className="p-3 text-right text-gray-600">{entry.totalClicks}</td>
                      <td className="p-3 text-right text-red-600 font-bold">
                        {entry.regressionsWitnessed}
                      </td>
                      <td className="p-3 text-right text-orange-600 font-bold">
                        {entry.bossResets}
                      </td>
                      <td className="p-3 text-right text-purple-600 font-bold">
                        {entry.wrongKeys}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <RageMeterHUD />
    </div>
  );
};
