import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar.js";
import { RageMeterHUD } from "../components/RageMeterHUD.js";
import { LabelSwapper } from "../components/LabelSwapper.js";
import { DecorativeRulesList } from "../components/DecorativeRulesList.js";
import { RageButton } from "../rage/components/RageButton.js";
import { RageLink } from "../rage/components/RageLink.js";
import { loginUser } from "../lib/supabaseClient.js";
import { useRage } from "../rage/RageProvider.js";

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { setCurrentUser } = useRage();
  const navigate = useNavigate();

  const handleLoginSubmit = async () => {
    setErrorMsg("");
    if (!email || !password) {
      setErrorMsg("Please provide both email and password.");
      return;
    }

    try {
      const user = await loginUser(email, password);
      setCurrentUser(user);
      navigate("/browse");
    } catch (err: any) {
      setErrorMsg(err.message || "Login failed. The universe rejected your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-rage-paper flex flex-col justify-between pb-24">
      <Navbar />

      <main className="max-w-md mx-auto w-full px-4 py-12">
        <div className="bg-white border-4 border-black rounded-2xl p-6 sm:p-8 shadow-[8px_8px_0px_#000] rotate-[-1deg]">
          <div className="text-center mb-6">
            <span className="text-4xl inline-block mb-1">🔐</span>
            <h1 className="font-bubbly text-2xl text-rage-blood">
              ENTER THE REGRET PORTAL
            </h1>
            <p className="font-sans text-xs text-gray-600 mt-1">
              Authenticate to track your emotional despair in our cloud database.
            </p>
          </div>

          {errorMsg && (
            <div className="bg-red-100 border border-red-500 text-red-700 text-xs p-3 rounded-lg mb-4 font-mono">
              ⚠️ {errorMsg}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <div className="mb-1">
                <LabelSwapper
                  originalLabel="Email Address"
                  alternateLabels={["Favorite Sadness", "Digital Address of Regret", "Inbox Destination"]}
                />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sufferer@readrage.test"
                className="w-full px-3 py-2 text-sm font-mono border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-rage-pink bg-rage-paper"
              />
            </div>

            <div>
              <div className="mb-1">
                <LabelSwapper
                  originalLabel="Password"
                  alternateLabels={["Soul Secret", "Forbidden Sequence", "Existential Key"]}
                />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 text-sm font-mono border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-rage-pink bg-rage-paper"
              />
            </div>

            <DecorativeRulesList passwordValue={password} />

            <RageButton
              variant="primary"
              onClick={handleLoginSubmit}
              className="w-full py-3 text-base mt-2"
            >
              Sign In (Triggers Boss Bar) 🔓
            </RageButton>
          </div>

          <div className="mt-6 pt-4 border-t-2 border-gray-100 text-center text-xs font-sans">
            Don't have an account in our torture vault?{" "}
            <RageLink to="/register" className="text-rage-blood font-bold underline">
              Create New Sufferer Profile
            </RageLink>
          </div>
        </div>
      </main>

      <RageMeterHUD />
    </div>
  );
};
