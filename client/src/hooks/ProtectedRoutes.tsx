import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

interface ProtectedRouteProps {
  admin?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  admin = false,
}) => {
  const { user } = useAuthContext();

  if (!user) return <Navigate to="/" replace />;

  if (admin && user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
