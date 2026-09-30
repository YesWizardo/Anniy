import React from "react";
import { RageButton } from "../rage/components/RageButton.js";

export interface AddToCartButtonProps {
  productId: string;
  onAdded?: () => void;
  className?: string;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  productId: _productId,
  onAdded,
  className = ""
}) => {
  return (
    <RageButton
      canVanish={true}
      variant="primary"
      onClick={() => onAdded?.()}
      className={`w-full py-3 text-base font-bubbly uppercase tracking-wider bg-rage-blood text-white border-2 border-black hover:bg-red-900 ${className}`}
      title="Add to Cart (Moves if you hesitate!)"
    >
      🛒 Add to Cart (Out of Stock)
    </RageButton>
  );
};
