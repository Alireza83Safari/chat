import React, { createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../services/axios";

type AuthContextType = {
  isAuthenticated: boolean;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const navigate = useNavigate();

  const isAuthHandler = async () => {
    try {
      const data = await axiosInstance.get("/user/api/v1/profile");
      console.log(data);

      /*       if (!data.ok) {
        throw new Error("Unauthorized");
      } */
    } catch (error) {
      navigate("/login");
    }
  };

  useEffect(() => {
    isAuthHandler();
  }, []);

  const contextValue: AuthContextType = {
    isAuthenticated: false,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
