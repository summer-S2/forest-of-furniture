import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/ui/Button";
import useCart from "../hooks/useCart";
import { useAuthContext } from "../context/AuthContext";

export default function ProductDetail() {
  const { user } = useAuthContext();
  const { addOrUpdateItem } = useCart();
  const {
    state: {
      product: { id, image, title, description, category, price, options },
    },
  } = useLocation();
  const [success, setSuccess] = useState();
  const [selected, setSelected] = useState(options && options[0]);
  const handleSelect = (e) => setSelected(e.target.value);
  const handleClick = () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }
    // 장바구니에 추가
    const product = { id, image, title, price, option: selected, quantity: 1 };
    addOrUpdateItem.mutate(product, {
      onSuccess: () => {
        setSuccess("장바구니에 추가되었습니다.");
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      },
    });
  };
  // console.log(selected);
  return (
    <>
      <p className="mx-10 pt-4 text-lg text-main">카테고리: {category}</p>
      <section className="flex flex-col md:flex-row p-4">
        <img
          className="w-full md:w-1/2 px-4 basis-7/12"
          src={image}
          alt={title}
        />
        <div className="w-full basis-5/12 flex flex-col p-4">
          <h2 className="text-3xl font-bold py-2">{title}</h2>
          <p className="text-2xl font-bold py-2  border-b border-main">
            ￦ {price}
          </p>
          <p className="py-4 text-lg">{description}</p>
          <div className="flex items-center">
            <label
              className="shrink-0 text-main font-bold border-none"
              htmlFor="select"
            >
              옵션:
            </label>
            <select
              className="p-2 m-4 flex-1 border-2 border-dashed border-main outline-none cursor-pointer"
              id="select"
              onChange={handleSelect}
              value={selected}
            >
              {options &&
                options.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
            </select>
          </div>
          <Button
            text={success ? "추가중..." : "장바구니에 추가"}
            onClick={handleClick}
          />
          {success && (
            <p className="rounded-xl py-1 px-4 mt-2 w-full text-center font-semibold text-main">
              {success}
            </p>
          )}
        </div>
      </section>
    </>
  );
}
