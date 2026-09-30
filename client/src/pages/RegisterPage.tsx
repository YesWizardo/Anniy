import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar.js";
import { RageMeterHUD } from "../components/RageMeterHUD.js";
import { LabelSwapper } from "../components/LabelSwapper.js";
import { DecorativeRulesList } from "../components/DecorativeRulesList.js";
import { FakeCaptcha } from "../components/FakeCaptcha.js";
import { RageButton } from "../rage/components/RageButton.js";
import { RageLink } from "../rage/components/RageLink.js";
import { registerUser } from "../lib/supabaseClient.js";
import { useRage } from "../rage/RageProvider.js";

export const RegisterPage: React.FC = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaOk, setCaptchaOk] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { setCurrentUser } = useRage();
  const navigate = useNavigate();

  const handleRegister = async () => {
    setErrorMsg("");
    if (!captchaOk) {
      setErrorMsg("Please prove to the algorithm that you are not a bound hardcover book.");
      return;
    }
    if (!email || !password || !displayName) {
      setErrorMsg("All fields are mandatory. Your suffering cannot be anonymous.");
      return;
    }
    if (password.length < 8) {
      setErrorMsg("Password must be at least 8 characters.");
      return;
    }

    try {
      const user = await registerUser(email, password, displayName);
      setCurrentUser(user);
      navigate("/browse");
    } catch (err: any) {
      setErrorMsg(err.message || "Registration failed.");
    }
  };

  return (
    <div className="min-h-screen bg-rage-paper flex flex-col justify-between pb-24">
      <Navbar />

      <main className="max-w-md mx-auto w-full px-4 py-8">
        <div className="bg-white border-4 border-black rounded-2xl p-6 sm:p-8 shadow-[8px_8px_0px_#000] rotate-[1deg]">
          <div className="text-center mb-6">
            <span className="text-4xl inline-block mb-1">✍️</span>
            <h1 className="font-bubbly text-2xl text-rage-blood">
              JOIN THE CATALOG OF REGRET
            </h1>
            <p className="font-sans text-xs text-gray-600 mt-1">
              Sign up today to permanently never receive a delivery.
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
                  originalLabel="Display Name"
                  alternateLabels={["Sufferer Alias", "Pseudonym of Sorrow", "Legal Moniker"]}
                />
              </div>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. Sisyphus99"
                className="w-full px-3 py-2 text-sm font-mono border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-rage-pink bg-rage-paper"
              />
            </div>

            <div>
              <div className="mb-1">
                <LabelSwapper
                  originalLabel="Email Address"
                  alternateLabels={["Spam Destination", "Electronic Mailbox", "Favorite Sadness"]}
                />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="reader@readrage.test"
                className="w-full px-3 py-2 text-sm font-mono border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-rage-pink bg-rage-paper"
              />
            </div>

            <div>
              <div className="mb-1">
                <LabelSwapper
                  originalLabel="Password"
                  alternateLabels={["Soul Secret", "Forbidden Passcode", "Existential Key"]}
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
            <FakeCaptcha onVerified={setCaptchaOk} />

            <RageButton
              variant="primary"
              onClick={handleRegister}
              className="w-full py-3 text-base mt-2"
            >
              Register &amp; Suffer (Loader Guaranteed) 🚀
            </RageButton>
          </div>

          <div className="mt-6 pt-4 border-t-2 border-gray-100 text-center text-xs font-sans">
            Already registered your suffering?{" "}
            <RageLink to="/login" className="text-rage-blood font-bold underline">
              Sign In Instead
            </RageLink>
          </div>
        </div>
      </main>

      <RageMeterHUD />
    </div>
  );
};
