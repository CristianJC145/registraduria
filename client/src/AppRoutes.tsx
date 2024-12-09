import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import DashboardRoutes from "./modules/dashboard/DashboardRoutes"
import { useAuth } from './shared/contexts/AuthContext';
import AuthRoutes from './modules/auth/AuthRoutes';


const AppRouting: React.FC = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/*"  element={ <AuthRoutes/> } />
        <Route path="/dashboard/*"  element={isLoggedIn ? <DashboardRoutes/> : <Navigate to="../" replace /> } />
      </Routes>
    </Router>
  );
};

export default AppRouting;