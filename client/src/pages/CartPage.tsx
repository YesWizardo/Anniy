import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar.js";
import { RageMeterHUD } from "../components/RageMeterHUD.js";
import { RageButton } from "../rage/components/RageButton.js";
import { RageLink } from "../rage/components/RageLink.js";
import { PriceFlicker } from "../components/PriceFlicker.js";
import { api } from "../lib/api.js";
import { useNavigate } from "react-router-dom";

export const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCart = () => {
    setLoading(true);
    api.getCart()
      .then((res) => {
        setCartItems(res.items);
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Failed to load cart:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (productId: string) => {
    try {
      await api.removeFromCart(productId);
      fetchCart();
    } catch (err) {
      console.warn("Remove failed:", err);
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => {
    const p = Number(item.product?.price_amount) || 0;
    return acc + p * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-rage-paper flex flex-col justify-between pb-24 relative overflow-x-hidden">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8 w-full">
        <div className="bg-white border-4 border-black rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_#000] rotate-[-0.6deg]">
          <div className="flex items-center justify-between pb-4 border-b-2 border-black mb-6">
            <div>
              <h1 className="font-bubbly text-2xl sm:text-3xl text-rage-blood">
                YOUR BASKET OF DISAPPOINTMENT
              </h1>
              <p className="font-sans text-xs text-gray-600 mt-1">
                Notice: Items will visually fall out of this cart. They remain out of stock in the database.
              </p>
            </div>
            <span className="text-3xl">🛒</span>
          </div>

          {loading ? (
            <div className="p-12 text-center font-pixel text-xs text-gray-500">
              Gathering your non-existent items...
            </div>
          ) : cartItems.length === 0 ? (
            <div className="p-12 text-center space-y-4">
              <span className="text-6xl block">📭</span>
              <h3 className="font-bubbly text-xl text-gray-700">
                Your cart is completely devoid of regrets.
              </h3>
              <p className="text-xs text-gray-500 font-sans">
                Browse our catalog to add books you will never receive.
              </p>
              <RageLink
                to="/browse"
                className="bg-rage-blood text-white font-bubbly text-sm px-6 py-2.5 rounded-xl border-2 border-black inline-block"
              >
                Go to Catalog
              </RageLink>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-yellow-50 border-2 border-black rounded-xl flex flex-wrap items-center justify-between gap-4 relative overflow-hidden cart-item-falling"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-4xl bg-white p-2 rounded-lg border border-black">
                      {item.product?.image_emoji || "📕"}
                    </span>
                    <div>
                      <h4 className="font-bubbly text-base text-rage-blood">
                        {item.product?.title || "Phantasmagorical Manuscript"}
                      </h4>
                      <p className="text-xs font-serif text-gray-600">
                        Qty: {item.quantity} (Strictly 0 available)
                      </p>
                      <div className="text-xs mt-1">
                        <PriceFlicker
                          baseAmount={item.product?.price_amount || 0}
                          baseCurrency={item.product?.price_currency_symbol}
                        />
                      </div>
                    </div>
                  </div>

                  <RageButton
                    variant="danger"
                    onClick={() => handleRemove(item.product_id)}
                    className="!py-1.5 !px-3 text-xs"
                  >
                    Discard 🗑️
                  </RageButton>
                </div>
              ))}

              {/* Total & Checkout */}
              <div className="pt-6 border-t-2 border-black flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-gray-500 block">Subtotal (Delusion Amount):</span>
                  <span className="text-2xl">
                    <PriceFlicker baseAmount={totalPrice} />
                  </span>
                </div>

                <RageButton
                  variant="primary"
                  onClick={() => navigate("/checkout")}
                  className="w-full sm:w-auto px-8 py-3 text-base"
                >
                  Proceed to Fake Checkout 💳
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
