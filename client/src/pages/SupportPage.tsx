import React, { useState } from "react";
import { Navbar } from "../components/Navbar.js";
import { RageMeterHUD } from "../components/RageMeterHUD.js";
import { RageButton } from "../rage/components/RageButton.js";
import { RageLink } from "../rage/components/RageLink.js";
import { api } from "../lib/api.js";
import { useRage } from "../rage/RageProvider.js";

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
  suggestedRoute?: string;
  ticketNumber?: string;
}

export const SupportPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "bot",
      text: "Greetings! I am Mr. Bookworm's automated lackey. How may I completely fail to assist you today?",
      ticketNumber: "TICKET-VOID-001"
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { logRageEvent } = useRage();

  const handleSend = async () => {
    if (!inputVal.trim() || isSending) return;
    const text = inputVal.trim();
    setInputVal("");
    logRageEvent("support_chat_used");

    setMessages((prev) => [...prev, { sender: "user", text }]);
    setIsSending(true);

    try {
      const res = await api.sendSupportChat(text);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: res.reply,
          suggestedRoute: res.suggestedRoute,
          ticketNumber: res.ticketNumber
        }
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Thank you for reaching out! Your message was carefully printed on recycled paper and gently dropped into our office compost bin.",
          suggestedRoute: "/",
          ticketNumber: "FAIL-404"
        }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-rage-paper flex flex-col justify-between pb-24">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 py-8 w-full">
        <div className="bg-white border-4 border-black rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_#000] rotate-[0.5deg]">
          <div className="flex items-center justify-between border-b-2 border-black pb-4 mb-4">
            <div>
              <h1 className="font-bubbly text-2xl sm:text-3xl text-rage-blood">
                USELESS AI CUSTOMER SUPPORT
              </h1>
              <p className="font-sans text-xs text-gray-600">
                100% of complaints are solved by being confidently ignored.
              </p>
            </div>
            <span className="text-3xl animate-bounce">🤖</span>
          </div>

          {/* Chat Messages Log */}
          <div className="h-80 overflow-y-auto space-y-4 p-4 bg-gray-50 border-2 border-gray-300 rounded-xl mb-4 text-xs font-mono">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${
                  m.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-md p-3 rounded-2xl border-2 border-black shadow-sm ${
                    m.sender === "user"
                      ? "bg-yellow-200 text-black rounded-br-none"
                      : "bg-purple-100 text-purple-950 rounded-bl-none"
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>

                  {m.ticketNumber && (
                    <div className="mt-2 text-[10px] text-gray-500 font-pixel">
                      Reference: {m.ticketNumber}
                    </div>
                  )}

                  {m.suggestedRoute && (
                    <div className="mt-2 pt-1 border-t border-purple-200">
                      <span className="text-[10px] text-gray-600 block">Helpful Referral:</span>
                      <RageLink
                        to={m.suggestedRoute}
                        className="text-rage-blood font-bold underline font-sans text-xs"
                      >
                        Navigate to {m.suggestedRoute} &gt;&gt;
                      </RageLink>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isSending && (
              <div className="text-gray-500 italic text-xs animate-pulse">
                Mr. Bookworm is crafting an unhelpful response...
              </div>
            )}
          </div>

          {/* Chat Input Form */}
          <div className="flex gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="State your grievance into the void..."
              className="flex-1 px-4 py-2 text-sm font-mono border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-rage-pink bg-rage-paper"
            />
            <RageButton
              variant="primary"
              onClick={handleSend}
              disabled={isSending}
              className="!py-2 !px-5 text-sm"
            >
              Send 💬
            </RageButton>
          </div>
        </div>
      </main>

      <RageMeterHUD />
    </div>
  );
};
