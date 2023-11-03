import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DashboardLayout from '../../shared/layout/DashboradLayout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';

const DashboardRoutes: React.FC = () => {
    return (
        <DashboardLayout>
            <Routes>
                    <Route path="/home" element={ <HomePage />} />
                    <Route path="/products" element={ <ProductsPage />} />
            </Routes>
        </DashboardLayout>
    );
};

export default DashboardRoutes;