import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
  }, [location.pathname]);

  return <AppRoutes />;
}
