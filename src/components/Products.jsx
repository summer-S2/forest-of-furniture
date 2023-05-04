import React from "react";
import ProductCard from "./ProductCard";
import useProducts from "../hooks/useProducts";
import Spinner from "./ui/Spinner";

export default function Products() {
  const {
    // 쿼리를 가지고있는 객체
    productsQuery: { isLoading, error, data: products },
  } = useProducts();
  return (
    <>
      {isLoading && <Spinner />}
      {error && <p>{error}</p>}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-4">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </ul>
    </>
  );
}
