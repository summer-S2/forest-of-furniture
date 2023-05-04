import React, { useState } from "react";
import { TbSquareRoundedPlus, TbSquareRoundedMinus } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";
import useCart from "../hooks/useCart";

const ICON_CLASS =
  "transition-all cursor-pointer text-main/80 hover:text-main hover:scale-105 mx-2";

export default function CartItem({
  product,
  product: { id, image, title, option, quantity, price },
}) {
  const [inform, setInform] = useState(false);
  const { addOrUpdateItem, removeItem } = useCart();
  const handleMinus = () => {
    if (quantity < 2) {
      setInform(true);
      setTimeout(() => {
        setInform(false);
      }, 2000);
      return;
    }
    addOrUpdateItem.mutate({ ...product, quantity: quantity - 1 });
  };
  const handlePlus = () =>
    addOrUpdateItem.mutate({ ...product, quantity: quantity + 1 });

  const handleDelete = () => {
    if (window.confirm("선택한 상품을 삭제하시겠습니까?")) {
      alert("삭제되었습니다.");
      removeItem.mutate(id);
    } else {
      alert("취소되었습니다.");
    }
  };
  return (
    <li className="flex justify-between my-2 items-center">
      <img className="w-24 md:w-48 rounded-lg" src={image} alt={title} />
      <div className="flex-1 flex flex-col md:flex-row justify-between ml-4">
        <div className="basis-3/5">
          <p className="text-lg">상품명: {title}</p>
          <p className="text-xl font-bold text-main ">옵션: {option}</p>
          <p>￦ {price}</p>
        </div>
        <div className="relative flex items-center">
          <div className="text-2xl flex items-center">
            <TbSquareRoundedMinus
              className={ICON_CLASS}
              onClick={handleMinus}
            />
            <span className="font-b">{quantity}</span>
            <TbSquareRoundedPlus className={ICON_CLASS} onClick={handlePlus} />
            <RiDeleteBinLine className={ICON_CLASS} onClick={handleDelete} />
          </div>
          {inform && (
            <p className="absolute rounded-xl py-1 px-4 top-[100%] md:w-full text-center text-sm text-white bg-main">
              최소 주문 수량입니다.
            </p>
          )}
        </div>
      </div>
    </li>
  );
}
