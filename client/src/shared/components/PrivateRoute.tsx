import React from 'react';
import { Route, Navigate, RouteProps } from 'react-router-dom';
import { useAuth } from '../../shared/contexts/AuthContext';

interface PrivateRouteProps {
    path: string;
    element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, path }) => {
    const { isLoggedIn } = useAuth();

    return (
        <Route
            path={path}
            element={isLoggedIn ? element : <Navigate to="/login" replace />}
        />
    );
};

export default PrivateRoute;