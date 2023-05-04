import React from "react";

export default function HomeBanner() {
  return (
    <section className="h-96 relative bg-[#609966]">
      <div className="w-full h-full bg-cover bg-banner opacity-60"></div>
      <div className="absolute w-full top-32 text-center text-white drop-shadow-2xl">
        <h2 className="mb-4 text-5xl lg:text-6xl ">숲을 품은 가구</h2>
        <p className="text-xl lg:2xl">
          취향 가득한 자연의 가구들로 공간을 채워보세요.
        </p>
      </div>
    </section>
  );
}
