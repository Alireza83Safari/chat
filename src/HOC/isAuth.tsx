import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/store";

interface WithAuthProps {}

export function withAuth(Component: React.ComponentType) {
  return function WithAuthWrapper(props: WithAuthProps) {
    const isLoggedIn = useAppSelector((state) => state.auth?.isLoggedIn);

    if (!isLoggedIn) {
      <Navigate to="/login" />;
    }

    return <Component {...props} />;
  };
}
