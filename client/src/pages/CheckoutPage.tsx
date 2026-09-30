import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar.js";
import { RageMeterHUD } from "../components/RageMeterHUD.js";
import { RageButton } from "../rage/components/RageButton.js";
import { LabelSwapper } from "../components/LabelSwapper.js";
import { api } from "../lib/api.js";
import { useRage } from "../rage/RageProvider.js";

export const CheckoutPage: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [shippingStreet, setShippingStreet] = useState("404 Void Boulevard");
  const [shippingRegret, setShippingRegret] = useState("Not studying computer science earlier");
  const [paymentChoice, setPaymentChoice] = useState("monopoly");
  const [isProcessing, setIsProcessing] = useState(false);
  const { logRageEvent } = useRage();
  const navigate = useNavigate();

  const handleStep1Next = () => {
    setStep(2);
  };

  const handleStep2Next = () => {
    setStep(3);
  };

  const handleFinalOrderSubmit = async () => {
    setIsProcessing(true);
    try {
      await api.checkout();
      // Even if by miracle it succeeded, go to out-of-stock
      navigate("/out-of-stock");
    } catch (err: any) {
      logRageEvent("out_of_stock_seen");
      // The API always returns 409 OUT_OF_STOCK!
      const excuse = err?.data?.excuse || "The supply chain AI folded into a higher-dimensional origami shape.";
      const restock = err?.data?.restockEta || "Never.";
      navigate(`/out-of-stock?excuse=${encodeURIComponent(excuse)}&eta=${encodeURIComponent(restock)}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-rage-paper flex flex-col justify-between pb-24">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 py-8 w-full">
        <div className="bg-white border-4 border-black rounded-3xl p-6 sm:p-10 shadow-[8px_8px_0px_#000] rotate-[-0.3deg]">
          {/* Stepper Progress */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-gray-200 text-xs font-pixel">
            <span className={step >= 1 ? "text-rage-blood font-bold" : "text-gray-400"}>
              1. SHIPPING
            </span>
            <span>&gt;&gt;</span>
            <span className={step >= 2 ? "text-rage-blood font-bold" : "text-gray-400"}>
              2. PAYMENT
            </span>
            <span>&gt;&gt;</span>
            <span className={step === 3 ? "text-rage-blood font-bold" : "text-gray-400"}>
              3. DISAPPOINTMENT
            </span>
          </div>

          {/* STEP 1: Shipping Address */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-bubbly text-2xl text-rage-blood">
                STEP 1: WHERE SHALL WE NOT SEND THIS?
              </h2>
              <p className="font-sans text-xs text-gray-600">
                Please enter the exact delivery coordinates where you would most like a non-delivery to occur.
              </p>

              <div>
                <div className="mb-1">
                  <LabelSwapper
                    originalLabel="Physical Street Address"
                    alternateLabels={["Coordinate of Hopelessness", "Where You Dwell", "Delivery Mirage"]}
                  />
                </div>
                <input
                  type="text"
                  value={shippingStreet}
                  onChange={(e) => setShippingStreet(e.target.value)}
                  className="w-full px-3 py-2 text-sm font-mono border-2 border-black rounded-lg focus:outline-none bg-rage-paper"
                />
              </div>

              <div>
                <label className="block text-xs font-bubbly text-rage-blood mb-1">
                  Closest Philosophical Regret (Mandatory for Customs):
                </label>
                <input
                  type="text"
                  value={shippingRegret}
                  onChange={(e) => setShippingRegret(e.target.value)}
                  className="w-full px-3 py-2 text-sm font-mono border-2 border-black rounded-lg focus:outline-none bg-rage-paper"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <RageButton variant="primary" onClick={handleStep1Next} className="px-6 py-2.5">
                  Continue to Payment Simulation &gt;&gt;
                </RageButton>
              </div>
            </div>
          )}

          {/* STEP 2: Payment Simulation */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-bubbly text-2xl text-rage-blood">
                STEP 2: HOW DO YOU WISH TO RELINQUISH WEALTH?
              </h2>
              <p className="font-sans text-xs text-gray-600">
                Pick a fraudulent or symbolic monetary instrument.
              </p>

              <div className="space-y-2">
                {[
                  { id: "monopoly", label: "Monopoly Money (Acceptable in all 50 states)" },
                  { id: "debt", label: "Credit Card of Infinite Compounding Guilt" },
                  { id: "bribe", label: "Direct Bribe to Mr. Bookworm (Guarantees Nothing)" }
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={`block p-3 border-2 rounded-xl cursor-pointer font-sans text-xs transition-colors ${
                      paymentChoice === opt.id
                        ? "bg-yellow-100 border-black font-bold"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={opt.id}
                      checked={paymentChoice === opt.id}
                      onChange={() => setPaymentChoice(opt.id)}
                      className="mr-2"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>

              <div className="pt-4 flex justify-between">
                <RageButton variant="ghost" onClick={() => setStep(1)} className="px-4 py-2">
                  &lt;&lt; Back to Address
                </RageButton>
                <RageButton variant="primary" onClick={handleStep2Next} className="px-6 py-2.5">
                  Review &amp; Place Order &gt;&gt;
                </RageButton>
              </div>
            </div>
          )}

          {/* STEP 3: Review and Final Inevitable 409 Fail */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="font-bubbly text-2xl text-rage-blood">
                STEP 3: FINAL MOMENTS BEFORE FAILURE
              </h2>
              <p className="font-sans text-xs text-gray-600">
                You are on the threshold of placing an order on ReadRage. Clicking below will transmit your request to the server, where it will be promptly rejected with HTTP 409.
              </p>

              <div className="bg-yellow-50 border-2 border-dashed border-yellow-500 rounded-xl p-4 text-xs font-mono space-y-1">
                <div><strong>Destination:</strong> {shippingStreet}</div>
                <div><strong>Regret:</strong> {shippingRegret}</div>
                <div><strong>Payment:</strong> {paymentChoice}</div>
                <div><strong>Expected Delivery:</strong> Not within this lifetime</div>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <RageButton variant="ghost" onClick={() => setStep(2)}>
                  &lt;&lt; Back
                </RageButton>

                <RageButton
                  variant="primary"
                  onClick={handleFinalOrderSubmit}
                  disabled={isProcessing}
                  className="px-8 py-3 text-base !bg-rage-blood animate-pulse"
                >
                  {isProcessing ? "Failing..." : "💥 PLACE ORDER (Out of Stock Guaranteed)"}
                </RageButton>
              </div>
            </div>
          )}
        </div>
      </main>

      <RageMeterHUD />
    </div>
  );
};
