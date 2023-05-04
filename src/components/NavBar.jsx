import React from "react";
import { Link } from "react-router-dom";
import { TbPencilPlus } from "react-icons/tb";
import User from "./User";
import Button from "./ui/Button";
import { useAuthContext } from "../context/AuthContext";
import CartStatus from "./CartStatus";

export default function NavBar() {
  const { user, logout } = useAuthContext();
  return (
    <header className="bg-[#EEE] fixed z-50 text-main flex w-full justify-between p-2 border-b border-b-main/50 ">
      <Link to="/" className="flex items-center font-bold">
        <img src="/images/logo.svg" alt="logo" />
        <h1 className="hidden sm:block sm:text-xl">Forest Of Furniture</h1>
      </Link>
      <nav className="flex items-center font-semibold gap-2 sm:gap-4">
        {/* <Link className="text-lg" to="/products">
          모든 제품
        </Link> */}
        {user && (
          <Link to="carts">
            <CartStatus />
          </Link>
        )}

        {user &&
          user.isAdmin && ( // user가 있고 user가 admin계정일때만 수정아이콘 보이기
            <Link to="/products/new" className="text-2xl">
              <TbPencilPlus className="text-4xl" />
            </Link>
          )}
        {user && <User user={user} />}
        {!user && (
          <Link to="/login">
            <Button text={"로그인"} />
          </Link>
        )}
        {user && <Button text={"로그아웃"} onClick={logout} />}
      </nav>
    </header>
  );
}
