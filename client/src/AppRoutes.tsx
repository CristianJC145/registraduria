import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import VshowcaseRutes from "./modules/vshowcase/VshowcaseRoutes"
import DashboardRoutes from "./modules/dashboard/DashboardRoutes"
import { useAuth } from './shared/contexts/AuthContext';


const AppRouting: React.FC = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/*"  element={ <VshowcaseRutes/> } />
        <Route path="/dashboard/*"  element={isLoggedIn ? <DashboardRoutes/> : <Navigate to="../auth/login" replace /> } />
      </Routes>
    </Router>
  );
};

export default AppRouting;