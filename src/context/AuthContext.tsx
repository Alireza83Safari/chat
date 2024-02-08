import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../services/axios";

export type AuthContextType = {
  isLogin: boolean;
  userInfo: any;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState("");

  const isAuthHandler = async () => {
    try {
      const data = await axiosInstance.get("/user/api/v1/profile");
      console.log(data);

      if (data.status === 200) {
        setUserInfo(data?.data?.data);
        setIsLogin(true);
      }
    } catch (error) {
      if (error) {
        setIsLogin(false);
      }
      navigate("/login");
    }
  };

  useEffect(() => {
    isAuthHandler();
  }, []);

  return (
    <AuthContext.Provider value={{ isLogin, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
