import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar.js";
import { RageMeterHUD } from "../components/RageMeterHUD.js";
import { WatchingEyes } from "../components/WatchingEyes.js";
import { StickerBomb } from "../components/StickerBomb.js";
import { PriceFlicker } from "../components/PriceFlicker.js";
import { OutOfStockBanner } from "../components/OutOfStockBanner.js";
import { AddToCartButton } from "../components/AddToCartButton.js";
import { FakeViewersBadge } from "../components/FakeViewersBadge.js";
import { RageLink } from "../rage/components/RageLink.js";
import { api } from "../lib/api.js";

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [advisory, setAdvisory] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [outOfStockReason, setOutOfStockReason] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    api.getProduct(id)
      .then((res) => {
        setProduct(res.product);
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Product fetch failed:", err);
        setLoading(false);
      });

    // Load AI Advisory
    api.getAdvisory(id)
      .then((res) => setAdvisory(res.advisory))
      .catch((err) => console.warn("Advisory fetch failed:", err));

    // Load AI Out of Stock Reason
    api.getOutOfStockReason(id)
      .then((res) => setOutOfStockReason(res.excuseData))
      .catch((err) => console.warn("Excuse fetch failed:", err));

    // Load Fake Customer Reviews
    api.getReviews(id)
      .then((res) => setReviews(res.reviews))
      .catch((err) => console.warn("Reviews fetch failed:", err));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-rage-paper flex items-center justify-center font-pixel text-xs">
        Summoning unpurchasable item details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-rage-paper flex flex-col items-center justify-center p-6 text-center">
        <h1 className="font-bubbly text-3xl text-rage-blood">Item Vanished Completely</h1>
        <p className="font-sans text-sm text-gray-600 my-4">
          This product never existed, or it escaped into another dimension.
        </p>
        <RageLink to="/browse" className="text-blue-800 underline font-semibold">
          Return to Catalog
        </RageLink>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rage-paper flex flex-col justify-between pb-24 relative">
      <Navbar />
      <StickerBomb />
      <WatchingEyes />

      <main className="max-w-6xl mx-auto px-4 py-8 w-full">
        {/* Breadcrumb */}
        <div className="mb-4 text-xs font-mono text-gray-600 flex items-center gap-2">
          <RageLink to="/browse" className="underline hover:text-black">
            Catalog
          </RageLink>
          <span>/</span>
          <span className="text-gray-400">{product.category_name}</span>
          <span>/</span>
          <span className="text-black font-semibold truncate max-w-xs">{product.title}</span>
        </div>

        {/* Product Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-white border-4 border-black rounded-3xl p-6 sm:p-10 shadow-[8px_8px_0px_#000] rotate-[-0.4deg]">
          {/* Left Column: Emoji Cover */}
          <div className="md:col-span-5 flex flex-col items-center justify-center bg-yellow-50 border-3 border-dashed border-gray-400 rounded-2xl p-8 shadow-inner min-h-[320px]">
            <span className="text-8xl sm:text-9xl select-none filter drop-shadow-xl animate-pulse">
              {product.image_emoji || "📕"}
            </span>
            <div className="mt-6">
              <FakeViewersBadge />
            </div>
          </div>

          {/* Right Column: Metadata, Pricing, Vanishing Button */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] font-pixel bg-pink-100 border border-pink-400 text-pink-900 px-2 py-0.5 rounded-full">
                {product.category_name}
              </span>

              <h1 className="font-bubbly text-2xl sm:text-4xl text-rage-blood mt-2 leading-tight">
                {product.title}
              </h1>

              <p className="font-serif italic text-sm text-gray-700 mt-1">
                Authored by: <span className="font-bold">{product.author}</span>
              </p>

              <div className="my-4 p-3 bg-rage-paper border-2 border-black rounded-xl text-xs sm:text-sm font-sans text-gray-800 leading-relaxed">
                {product.description}
              </div>

              {/* Price & Out Of Stock Banner */}
              <div className="flex items-baseline gap-3 my-2">
                <span className="font-mono text-sm text-gray-500">Retail Price:</span>
                <span className="text-2xl">
                  <PriceFlicker
                    baseAmount={product.price_amount}
                    baseCurrency={product.price_currency_symbol}
                  />
                </span>
              </div>

              <OutOfStockBanner
                excuse={outOfStockReason?.excuses?.[0]}
                restockEta={outOfStockReason?.restockEta}
              />
            </div>

            {/* Vanishing Add to Cart Button */}
            <div className="pt-2">
              <AddToCartButton
                productId={product.id}
                onAdded={() => alert(`Added "${product.title}" to cart! (Stock is 0).`)}
              />
              <p className="text-[10px] font-mono text-gray-500 mt-1.5 text-center">
                ⚠️ Button evaporates upon casual cursor contact. Fast reflexes or Tab key required.
              </p>
            </div>
          </div>
        </div>

        {/* AI Fake Advisory Box (Section 15.3 & 17) */}
        {advisory && (
          <div className="mt-8 bg-blue-50 border-3 border-blue-600 rounded-2xl p-6 shadow-[6px_6px_0px_#003366] rotate-[0.6deg]">
            <div className="flex items-center gap-2 font-pixel text-xs text-blue-900 mb-3 font-bold">
              <span>🤖 MR. BOOKWORM'S FAKE ADVISORY BOX</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
              <div className="p-3 bg-white border border-blue-200 rounded-xl">
                <span className="font-bold text-blue-800 block mb-1">💡 Useless Tip:</span>
                <p className="text-gray-700">{advisory.tip}</p>
              </div>

              <div className="p-3 bg-white border border-red-200 rounded-xl">
                <span className="font-bold text-red-700 block mb-1">⚠️ Absurd Warning:</span>
                <p className="text-gray-700">{advisory.warning}</p>
              </div>

              <div className="p-3 bg-white border border-purple-200 rounded-xl">
                <span className="font-bold text-purple-800 block mb-1">🔮 Stock Forecast:</span>
                <p className="text-gray-700">{advisory.stockForecast}</p>
              </div>
            </div>
          </div>
        )}

        {/* Fake Customer Reviews (Section 15.2 & 17) */}
        {reviews.length > 0 && (
          <div className="mt-8 bg-white border-3 border-black rounded-2xl p-6 sm:p-8 shadow-[6px_6px_0px_#000]">
            <h2 className="font-bubbly text-xl sm:text-2xl text-rage-blood mb-4">
              CUSTOMER REVIEWS (All Verified Non-Buyers)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reviews.map((rev, idx) => (
                <div key={idx} className="p-4 bg-rage-paper border-2 border-gray-300 rounded-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono font-bold text-xs text-black">
                        {rev.reviewerName}
                      </span>
                      <span className="text-yellow-500 text-xs">
                        {"★".repeat(rev.stars)}
                        {"☆".repeat(5 - rev.stars)}
                      </span>
                    </div>
                    <h4 className="font-sans font-bold text-xs text-gray-900 mb-1">
                      "{rev.headline}"
                    </h4>
                    <p className="font-sans text-xs text-gray-600 leading-relaxed">
                      {rev.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <RageMeterHUD />
    </div>
  );
};
