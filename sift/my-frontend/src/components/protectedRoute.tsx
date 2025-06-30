import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("idToken");

  if (!token) {
    console.warn("🔒 No token found — redirecting to /login");
    return <Navigate to="/login" />;
  }

  console.log("🔓 Authenticated — rendering protected route");
  return <>{children}</>;
}
