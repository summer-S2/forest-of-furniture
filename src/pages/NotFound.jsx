import React from "react";
import { CgSmileSad } from "react-icons/cg";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col items-center gap-6 pt-20 text-main animate-mount">
      <CgSmileSad className="text-6xl" />
      <h1 className="text-4xl md:text-6xl">페이지를 찾을 수 없습니다.</h1>
      <div className="">
        <Button text="홈으로 돌아가기" onClick={() => navigate("/")} />
      </div>
    </div>
  );
}
