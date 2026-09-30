import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "../components/Navbar.js";
import { ChaosGrid } from "../components/ChaosGrid.js";
import { ProductCard } from "../components/ProductCard.js";
import { RageMeterHUD } from "../components/RageMeterHUD.js";
import { StickerBomb } from "../components/StickerBomb.js";
import { WatchingEyes } from "../components/WatchingEyes.js";
import { RageButton } from "../rage/components/RageButton.js";
import { api } from "../lib/api.js";

export const BrowsePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get("category") || "";
  const currentQuery = searchParams.get("q") || "";

  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories
  useEffect(() => {
    api.getCategories()
      .then((res) => setCategories(res.categories))
      .catch((err) => console.warn("Failed to load categories:", err));
  }, []);

  // Fetch products (shuffled server-side per request)
  useEffect(() => {
    setLoading(true);
    api.getProducts({ category: currentCategory, q: currentQuery })
      .then((res) => {
        setProducts(res.products);
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Failed to fetch products:", err);
        setLoading(false);
      });
  }, [currentCategory, currentQuery]);

  const handleSelectCategory = (slug: string) => {
    const params = new URLSearchParams(searchParams);
    if (slug) {
      params.set("category", slug);
    } else {
      params.delete("category");
    }
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-rage-paper flex flex-col justify-between pb-24 relative">
      <Navbar />
      <StickerBomb />
      <WatchingEyes />

      <main className="max-w-7xl mx-auto px-4 py-8 w-full">
        {/* Page Header */}
        <div className="bg-white border-4 border-black rounded-2xl p-6 mb-8 shadow-[6px_6px_0px_#000] rotate-[-0.5deg]">
          <h1 className="font-creepy text-3xl sm:text-5xl text-rage-blood">
            CHAOTIC CATALOG OF UNAVAILABILITY
          </h1>
          <p className="font-sans text-xs sm:text-sm text-gray-700 mt-2 max-w-2xl leading-relaxed">
            Every item on this page is guaranteed to be 100% permanently out of stock. Products are reshuffled at random on every single request to ensure you cannot build a predictable mental map.
          </p>

          {/* Category Filter Pills (wrapped in RageButton so each filter click triggers the loader!) */}
          <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t-2 border-dashed border-gray-300">
            <RageButton
              variant={!currentCategory ? "primary" : "ghost"}
              onClick={() => handleSelectCategory("")}
              className="text-xs !py-1.5 !px-3"
            >
              All Categories ({products.length})
            </RageButton>

            {categories.map((cat) => (
              <RageButton
                key={cat.id}
                variant={currentCategory === cat.slug ? "primary" : "ghost"}
                onClick={() => handleSelectCategory(cat.slug)}
                className="text-xs !py-1.5 !px-3"
              >
                {cat.name}
              </RageButton>
            ))}
          </div>
        </div>

        {/* Catalog Grid */}
        {loading ? (
          <div className="p-16 text-center font-pixel text-xs text-gray-500 animate-pulse">
            Reshuffling reality and catalog inventory...
          </div>
        ) : products.length === 0 ? (
          <div className="p-16 text-center font-bubbly text-xl text-rage-blood bg-white border-3 border-black rounded-2xl">
            No items matched your search query. Even nothing was unavailable.
          </div>
        ) : (
          <ChaosGrid>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ChaosGrid>
        )}
      </main>

      <RageMeterHUD />
    </div>
  );
};
