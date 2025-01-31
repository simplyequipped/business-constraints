import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';

import Layout from './pages/Layout';
import Performance from './pages/Performance';
import EconomicData from './pages/EconomicData';
import Account from './pages/Account';
import PageNotFound from './pages/PageNotFound';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Performance />} />
          <Route path="economy" element={<EconomicData />} />
          <Route path="account" element={<Account />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
