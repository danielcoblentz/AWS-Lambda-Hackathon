import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Account from "../pages/Account";
import Integrations from "../pages/Integrations";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/DashBoard";
import Scan from "../pages/Scan";
import Verify from "../pages/verify";
import ProtectedRoute from "../components/protectedRoute";

export default function AppRoutes() {
  console.log("✅ AppRoutes initialized");

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify" element={<Verify />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        }
      />
      <Route
        path="/integrations"
        element={
          <ProtectedRoute>
            <Integrations />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/scan"
        element={
          <ProtectedRoute>
            <Scan />
          </ProtectedRoute>
        }
      />

      {/* Catch-all 404 */}
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
}
