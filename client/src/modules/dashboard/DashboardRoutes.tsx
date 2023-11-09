import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DashboardLayout from '../../shared/layout/DashboradLayout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CreateProductPage from './pages/CreateProductPage';

const DashboardRoutes: React.FC = () => {
    return (
        <DashboardLayout>
            <Routes>
                    <Route path="/home" element={ <HomePage />} />
                    <Route path="/products" element={ <ProductsPage />} />
                    <Route path="/products/create" element={ <CreateProductPage/> } />
            </Routes>
        </DashboardLayout>
    );
};

export default DashboardRoutes;