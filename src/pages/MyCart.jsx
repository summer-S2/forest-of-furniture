import React from "react";
import CartItem from "../components/CartItem";
import PriceCard from "../components/PriceCard";
import { FaEquals, FaPlus } from "react-icons/fa";
import Button from "../components/ui/Button";
import useCart from "../hooks/useCart";
import Spinner from "../components/ui/Spinner";

const SHIPPING = 3000;

export default function MyCart() {
  const {
    cartQuery: { isLoading, data: products },
  } = useCart();

  if (isLoading) return <Spinner />;

  const hasProducts = products && products.length > 0;
  const totalPrice = products.reduce(
    (prev, current) => prev + parseInt(current.price) * current.quantity,
    0
  );
  return (
    <section className="px-2 py-4 md:p-8 flex flex-col animate-mount">
      <p className="text-2xl text-center font-bold pb-4 border-b border-gray-300">
        내 장바구니
      </p>
      {!hasProducts && (
        <p className="p-10 text-center">장바구니에 상품이 없습니다.</p>
      )}
      {hasProducts && (
        <>
          <ul className="border-b border-gray-300 mb-8 p-4 px-2 md:px-8">
            {products &&
              products.map((product) => (
                <CartItem key={product.id} product={product} />
              ))}
          </ul>
          <div className="flex justify-between items-center mb-6 px-2 md:px-8 lg:px-16">
            <PriceCard text="상품 총액" price={totalPrice} />
            <FaPlus className="shrink-0 text-main" />
            <PriceCard text="배송액" price={SHIPPING} />
            <FaEquals className="shrink-0 text-main" />
            <PriceCard text="총가격" price={totalPrice + SHIPPING} />
          </div>
          <Button text="주문하기" />
        </>
      )}
    </section>
  );
}
