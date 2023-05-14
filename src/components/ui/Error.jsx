import React from "react";
import { BsEmojiDizzy } from "react-icons/bs";

export default function Error({ error }) {
  return (
    <>
      <div className="w-full flex justify-center p-2">
        <BsEmojiDizzy className="mr-2" />
        <p>에러가 발생했습니다. 잠시 후에 재시도 해주세요.</p>
      </div>
      <div className="text-center mx-auto">에러 내용: {error}</div>
    </>
  );
}
