import React from "react";
import type { JSX } from "react";
import { Navigate } from "react-router-dom"; // ✅ This is the missing import
import { useAuth } from "../services/AuthContext";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
