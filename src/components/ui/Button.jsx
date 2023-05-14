import React from "react";

export default function Button({ text, onClick, accent }) {
  return (
    <button
      className={`${
        accent ? "bg-accent" : "bg-main"
      }  py-2 px-2 text-white rounded-sm hover:brightness-110`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
