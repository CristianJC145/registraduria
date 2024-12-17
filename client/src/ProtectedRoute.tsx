import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './shared/contexts/AuthContext'; 

interface ProtectedRouteProps {
  allowedRoles: number[]; // Lista de roles permitidos
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn || !user || !allowedRoles.includes(user.idRole)) {
    return <Navigate to="/dashboard" replace />; // Redirige a la página principal del dashboard
  }

  return <Outlet />;
};

export default ProtectedRoute;
