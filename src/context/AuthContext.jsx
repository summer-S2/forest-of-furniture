import { createContext, useContext, useEffect, useState } from "react";
import { login, logout, onUserStateChange } from "../api/firebase";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    // app이 실행돼서 로그인한 사용자 세션이 남아있거나 사용자가 로그인했다면 user 객체를 전달, 로그아웃했다면 null 전달
    onUserStateChange((user) => {
      setUser(user);
      // console.log(user);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, uid: user && user.uid, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
