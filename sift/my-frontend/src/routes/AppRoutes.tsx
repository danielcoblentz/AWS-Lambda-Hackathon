import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Account from '../pages/Account';
import Integrations from '../pages/Integrations';
import Search from '../pages/Search';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/integrations" element={<Integrations />} />
      <Route path="/account" element={<Account />} />
    </Routes>
  );
}
