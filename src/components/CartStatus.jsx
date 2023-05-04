import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import useCart from "../hooks/useCart";

export default function CartStatus() {
  const {
    cartQuery: { data: products },
  } = useCart();
  return (
    <div className="relative">
      <FiShoppingCart className="text-3xl " />
      {products && (
        <p className="w-4 h-4 text-center bg-main text-white font-bold rounded-full absolute -top-1 -right-1 leading-none">
          {products.length}
        </p>
      )}
    </div>
  );
}
