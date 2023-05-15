import React, { useState } from "react";
import { CgClose, CgMenu } from "react-icons/cg";
import { Link } from "react-router-dom";

const CATEGORYS = [
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
const LINK_STYLE =
  "block md:text-2xl px-4 py-2 m-2 font-bold border-l-4 hover:border-main";

export default function GuideButton() {
  const [active, setActive] = useState(false);
  console.log(active);
  return (
    <>
      {/* 메뉴 버튼 */}
      <div className="flex items-center justify-center">
        <button onClick={() => setActive(true)}>
          <CgMenu className="text-3xl" />
        </button>
      </div>

      {/* 카테고리 */}
      <ul
        className={`${
          !active ? "translate-x-[-200%]" : "translate-x-0"
        } absolute left-0 top-0 w-1/2 md:w-1/3 h-screen transition-all bg-[#eee] text-main`}
        onClick={() => setActive(false)}
      >
        <li className="flex justify-between">
          <Link
            to="/products"
            state={{ category: "전체" }}
            className={`${LINK_STYLE} grow`}
          >
            전체 상품
          </Link>

          {/* 카테고리 닫기 */}
          <button onClick={() => setActive(false)}>
            <CgClose className="text-4xl mr-2" />
          </button>
        </li>
        {CATEGORYS.map((category, index) => (
          <li key={index}>
            <Link to="/products" state={{ category }} className={LINK_STYLE}>
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
