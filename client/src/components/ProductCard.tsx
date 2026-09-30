import React from "react";
import { RageLink } from "../rage/components/RageLink.js";
import { AddToCartButton } from "./AddToCartButton.js";
import { PriceFlicker } from "./PriceFlicker.js";
import { api } from "../lib/api.js";

export interface ProductCardProps {
  product: {
    id: string;
    title: string;
    author: string;
    description: string;
    price_amount: number | string;
    price_currency_symbol?: string;
    stock_count: number;
    image_emoji: string;
    category_name?: string;
  };
  onAddToCart?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart
}) => {
  const handleAdd = async () => {
    try {
      await api.addToCart(product.id, 1);
      onAddToCart?.();
      alert(`Added "${product.title}" to cart! Notice: It remains strictly out of stock.`);
    } catch {
      alert("Added to cart! (Stock is 0).");
      onAddToCart?.();
    }
  };

  return (
    <div className="bg-white border-3 border-black rounded-xl p-4 sm:p-5 shadow-[5px_5px_0px_#000] flex flex-col justify-between h-full relative overflow-hidden group">
      {/* Category Pill */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-pixel bg-yellow-200 border border-black px-2 py-0.5 rounded-full text-black">
          {product.category_name || "Unclassified Regret"}
        </span>
        <span className="text-[10px] font-mono text-red-600 font-bold bg-red-100 px-1.5 py-0.5 rounded border border-red-300">
          0 IN STOCK
        </span>
      </div>

      {/* Book Graphic Emoji Cover */}
      <RageLink
        to={`/product/${product.id}`}
        className="w-full h-36 sm:h-44 bg-rage-paper border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center text-6xl group-hover:scale-105 transition-transform my-2 shadow-inner"
      >
        <span>{product.image_emoji || "📕"}</span>
      </RageLink>

      {/* Book Metadata */}
      <div className="mt-2 flex-1">
        <RageLink to={`/product/${product.id}`} className="block">
          <h3 className="font-bubbly text-base sm:text-lg text-rage-blood group-hover:underline line-clamp-2 leading-tight">
            {product.title}
          </h3>
        </RageLink>
        <p className="font-serif italic text-xs text-gray-700 mt-1">
          by {product.author}
        </p>
        <p className="font-sans text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Pricing and Vanishing Add to Cart */}
      <div className="mt-4 pt-3 border-t-2 border-gray-100 flex flex-col gap-2.5">
        <div className="flex items-baseline justify-between">
          <span className="text-xs font-mono text-gray-500">Price:</span>
          <PriceFlicker
            baseAmount={product.price_amount}
            baseCurrency={product.price_currency_symbol}
          />
        </div>

        <AddToCartButton
          productId={product.id}
          onAdded={handleAdd}
          className="text-xs !py-2"
        />
      </div>
    </div>
  );
};
