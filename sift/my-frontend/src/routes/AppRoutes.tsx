import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Account from '../pages/Account';
import Integrations from '../pages/Integrations';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import MainDashboard from '../pages/DashBoard';



//routes to each of hte pages wihtin the app
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/integrations" element={<Integrations />} />
      <Route path="/account" element={<Account />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={< MainDashboard/>} />
    </Routes>
  );
}
