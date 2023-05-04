import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { emailLogin } from "../api/firebase";

export default function Login() {
  const { user, login } = useAuthContext();
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("123456");
  const [isInvisible, setIsInvisible] = useState(true);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
    return;
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage("이메일과 비밀번호를 입력해 주세요.");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      return;
    }

    emailLogin(email, password);
  };

  return (
    <section className="max-w-lg mx-auto my-8  relative">
      <h1 className="pt-4 font-bold text-3xl text-main text-center">로그인</h1>
      <form className="flex flex-col p-6" onSubmit={handleLogin}>
        <div className="p-4">
          <p>테스트 아이디 : test@example.com</p>
          <p>테스트 비밀번호 : 123456</p>
        </div>
        <div className="flex">
          <label htmlFor="email" className="border-none basis-20">
            이메일:{" "}
          </label>
          <input
            id="email"
            className="grow"
            type="email"
            placeholder="이메일을 입력하세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex">
          <label htmlFor="password" className="border-none basis-20">
            비밀번호:{" "}
          </label>
          <input
            id="password"
            className="grow"
            type={isInvisible ? "password" : "text"}
            placeholder="비밀번호를 입력하세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="bg-main text-white p-2 mt-2">로그인하기</button>
      </form>
      <button
        className="absolute text-main/70 text-2xl right-[35px] bottom-[125px] hover:text-main"
        onClick={() => setIsInvisible(!isInvisible)}
      >
        {isInvisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
      </button>
      <div className="flex justify-between mx-6">
        <div>
          {message && (
            <p className="text-accent text-xl font-bold">{message}</p>
          )}
        </div>
        <div className="">
          <Button text="구글 계정 로그인" onClick={login} />
        </div>
      </div>
    </section>
  );
}
