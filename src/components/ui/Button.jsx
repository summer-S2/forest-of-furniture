import React from "react";

export default function Button({ text, onClick }) {
  return (
    <button
      className="bg-main py-2 px-2 text-white rounded-sm hover:brightness-110"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
