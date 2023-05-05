import React from "react";

export default function PriceCard({ price, text }) {
  return (
    <div className="px-4 sm:px-10 p-2 md:p-8 md:mx-2 rounded-2xl text-center text-lg md:texl-xl">
      <p className="text-sm md:text-xl">{text}</p>
      <p className="font-bold text-main text-sm md:text-2xl">￦ {price}</p>
    </div>
  );
}
