import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../services/axios";
import { UserType } from "../types/user.type";

export type AuthContextType = {
  isLoggedIn: boolean;
  userInfo: UserType;
  checkUserLoginStatus: () => Promise<void>;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState() as any;

  const checkUserLoginStatus = async () => {
    try {
      const data = await axiosInstance.get("/user/api/v1/profile");

      if (data.status === 200) {
        setUserInfo(data?.data?.data);
        setIsLoggedIn(true);
      }
    } catch (error) {
      if (error) {
        setIsLoggedIn(false);
      }
      navigate("/login");
    }
  };

  useEffect(() => {
    checkUserLoginStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userInfo, checkUserLoginStatus }}
    >
      {children}
    </AuthContext.Provider>
  );
};
