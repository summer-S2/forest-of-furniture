import React from "react";
import { Link } from "react-router-dom";
import { TbPencilPlus } from "react-icons/tb";
import User from "./User";
import Button from "./ui/Button";
import { useAuthContext } from "../context/AuthContext";
import CartStatus from "./CartStatus";
import GuideButton from "./GuideButton";

export default function NavBar() {
  const { user, logout } = useAuthContext();
  return (
    <header className="bg-[#EEE] fixed z-50 text-main flex w-full justify-between p-2 border-b border-b-main/50 ">
      <div className="flex justify-center items-center gap-2">
        {/* 햄버거 버튼 */}
        <GuideButton />

        {/* 로고 */}
        <Link to="/" className="flex items-center font-bold">
          <img src="/images/logo.svg" alt="logo" />
          <h1 className="hidden sm:block sm:text-xl">Forest Of Furniture</h1>
        </Link>
      </div>

      <div className="flex items-center font-semibold gap-2 sm:gap-4">
        {/* 장바구니 */}
        {user && (
          <Link to="carts">
            <CartStatus />
          </Link>
        )}

        {/* 제품 추가 - 어드민 */}
        {user &&
          user.isAdmin && ( // user가 있고 user가 admin계정일때만 수정아이콘 보이기
            <Link to="/products/new" className="text-2xl">
              <TbPencilPlus className="text-4xl" />
            </Link>
          )}

        {/* 로그인 유저 아이콘과 닉네임(md이상) */}
        {user && <User user={user} />}

        {/* 로그인/로그아웃 버튼 */}
        {!user && (
          <Link to="/login">
            <Button text={"로그인"} />
          </Link>
        )}
        {user && <Button text={"로그아웃"} onClick={logout} />}
      </div>
    </header>
  );
}
