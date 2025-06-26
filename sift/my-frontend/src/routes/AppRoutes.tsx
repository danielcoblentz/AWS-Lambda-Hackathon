import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Account from '../pages/Account';
import Integrations from '../pages/Integrations';


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/integrations" element={<Integrations />} />
      <Route path="/account" element={<Account />} />
    </Routes>
  );
}
