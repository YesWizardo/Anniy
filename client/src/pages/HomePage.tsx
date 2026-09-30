import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar.js";
import { Marquee } from "../components/Marquee.js";
import { MrBookworm } from "../components/MrBookworm.js";
import { WatchingEyes } from "../components/WatchingEyes.js";
import { FakePopup } from "../components/FakePopup.js";
import { FakeAdBanner } from "../components/FakeAdBanner.js";
import { FakeCountdown } from "../components/FakeCountdown.js";
import { FakeViewersBadge } from "../components/FakeViewersBadge.js";
import { ChaosGrid } from "../components/ChaosGrid.js";
import { ProductCard } from "../components/ProductCard.js";
import { RageMeterHUD } from "../components/RageMeterHUD.js";
import { StickerBomb } from "../components/StickerBomb.js";
import { CursorChanger } from "../components/CursorChanger.js";
import { RageLink } from "../rage/components/RageLink.js";
import { RageButton } from "../rage/components/RageButton.js";
import { api } from "../lib/api.js";

export const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getProducts({ page: 1 })
      .then((res) => {
        setFeaturedProducts(res.products.slice(0, 6));
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Failed to load products on Home:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen pb-24 flex flex-col justify-between relative bg-rage-paper">
      <Navbar />
      <Marquee />
      <StickerBomb />
      <CursorChanger />
      <WatchingEyes />
      <FakePopup />

      {/* Hero Section with Clashing Aesthetic */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:py-12 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 border-4 border-black rounded-3xl p-6 sm:p-10 shadow-[10px_10px_0px_#000] rotate-[-0.8deg]">
          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <FakeCountdown />
              <FakeViewersBadge />
            </div>

            <h1 className="font-creepy text-4xl sm:text-6xl text-rage-blood tracking-wide leading-none">
              BUY BOOKS YOU CAN NEVER OWN.
            </h1>

            <p className="font-bubbly text-base sm:text-xl text-rage-blue">
              The world's premier digital bookstore where every title is guaranteed 100% permanently out of stock.
            </p>

            <p className="font-sans text-xs sm:text-sm text-gray-700 max-w-lg leading-relaxed">
              We take pride in our award-winning latency, unclickable purchasing interfaces, and biologically demanding boss obstacles.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <RageLink
                to="/browse"
                className="bg-rage-blood hover:bg-red-800 text-white font-bubbly text-base px-6 py-3 rounded-xl border-3 border-black shadow-[4px_4px_0px_#000]"
              >
                Browse Unavailable Books 📚
              </RageLink>

              <RageLink
                to="/support"
                className="bg-yellow-300 hover:bg-yellow-400 text-black font-pixel text-xs px-4 py-3 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000]"
              >
                Complain to AI 🤖
              </RageLink>
            </div>
          </div>

          <div className="shrink-0 flex flex-col items-center">
            <MrBookworm />
          </div>
        </div>

        <FakeAdBanner />

        {/* Featured Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-12 mb-6 border-b-3 border-black pb-3">
          <div>
            <h2 className="font-bubbly text-2xl sm:text-3xl text-rage-blood">
              CURATED UNAVAILABILITY
            </h2>
            <p className="font-sans text-xs text-gray-600 mt-0.5">
              These books are highly recommended by people who were also unable to purchase them.
            </p>
          </div>

          <RageLink
            to="/browse"
            className="text-xs font-pixel text-rage-blood hover:underline flex items-center gap-1"
          >
            View Entire Chaotic Catalog &gt;&gt;
          </RageLink>
        </div>

        {/* Featured Products Grid */}
        {loading ? (
          <div className="p-12 text-center font-pixel text-xs text-gray-600">
            Summoning unavailable books...
          </div>
        ) : (
          <ChaosGrid>
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ChaosGrid>
        )}

        {/* Competition Footer Notice */}
        <div className="mt-16 p-4 bg-yellow-100 border-2 border-dashed border-yellow-600 rounded-xl text-center text-xs font-mono text-yellow-900">
          ⚠️ <strong>COMPETITION SUBMISSION:</strong> This app is intentionally terrible. It is entered in the competition for <em>"Most Rage-Baited Application."</em>
          <div className="mt-1">
            <RageLink to="/judge" className="text-blue-800 underline font-semibold">
              Judges / Evaluators: Open Hidden Judge Panel
            </RageLink>
          </div>
        </div>
      </main>

      <RageMeterHUD />
    </div>
  );
};
