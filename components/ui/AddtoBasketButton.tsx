"use client";

import { useBasketStore } from "@/app/(store)/store";
import { Product } from "@/sanity.types";
import { useEffect, useState } from "react";

interface AddtoBasketButtonProps {
  product: Product;
  disabled?: boolean;
}

export default function AddtoBasketButton({
  product,
  disabled,
}: AddtoBasketButtonProps) {
  const { addItem, removeItem, getItemCount } = useBasketStore();
  const itemCount = getItemCount(product._id);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={() => removeItem(product._id)}
        className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 ${itemCount === 0 ? "cursor-not-allowed bg-gray-100" : "bg-gray-200 hover:bg-gray-300"}`}
        disabled={itemCount === 0 || disabled}
      >
        <span
          className={`text-xl font-bold ${itemCount === 0 ? "text-gray-400" : "text-gray-600"}`}
        >
          -
        </span>
      </button>
      <span className="w-8 text-center font-semibold">{itemCount}</span>
      <button
        onClick={() => addItem(product)}
        className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 ${disabled ? "cursor-not-allowed bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
        disabled={disabled}
      >
        <span className={"text-xl font-bold text-white"}>+</span>
      </button>
    </div>
  );
}
