import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "./hooks";

export const AuthGuard = ({ children }) => {
  const auth = useAuth();
  const token = localStorage.getItem("token");
  if (!auth || !token) {
    return <Navigate to="/admin/login" />;
  }
  return <>{children}</>;
};
