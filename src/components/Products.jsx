import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import useProducts from "../hooks/useProducts";
import Spinner from "./ui/Spinner";
import Error from "./ui/Error";
import { useLocation } from "react-router-dom";

const CATEGORYS = [
  "전체",
  "의자",
  "화장대",
  "책상",
  "조명",
  "옷장",
  "침대",
  "수납장",
  "장식",
  "식탁",
];
export default function Products({ home }) {
  const { state } = useLocation();
  const [selected, setSelected] = useState(CATEGORYS[0]);
  const {
    // 쿼리를 가지고있는 객체
    productsQuery: { isLoading, error, data: products },
  } = useProducts();

  // 가이드버튼에서 전달된 state가 바뀔때마다 selected 재설정 - 리랜더링
  useEffect(() => {
    setSelected(state ? state.category : CATEGORYS[0]);
  }, [state]);

  if (!products) {
    return <Spinner />;
  }
  console.log(state);
  return (
    <>
      {/* 홈이 아닌 경우에만 카테고리버튼 활성화 */}
      {!home && (
        <div className="flex justify-end items-center gap-2 pt-2 mr-6 text-lg md:text-xl lg:text-2xl">
          <label className="border-none " htmlFor="select">
            카테고리 :
          </label>
          <select
            className="outline-none cursor-pointer px-2 text-white font-semibold rounded-lg bg-main"
            id="select"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {CATEGORYS.map((category, index) => (
              <option key={index}>{category}</option>
            ))}
          </select>
        </div>
      )}
      {isLoading && <Spinner />}
      {error && <Error error={error} />}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-4">
        {products && selected === "전체"
          ? products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          : products
              .filter((product) => product.category === selected)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
      </ul>
    </>
  );
}
