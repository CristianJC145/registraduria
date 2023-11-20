import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import DashboardLayout from '../../shared/layout/DashboradLayout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CreateProductPage from './pages/CreateProductPage';
import EditProductPage from './pages/EditProductPage';
import { BreadcrumbsProvider } from '../../shared/contexts/BreadCrumbsContext';


const DashboardRoutes: React.FC = () => {
    return (
        <BreadcrumbsProvider>
            <DashboardLayout namePage={'/'} routePage={''}>
                <Routes>
                    <Route path="/home" element={<HomePage/> } />
                    <Route path="/products" element={ <ProductsPage />} />
                    <Route path="/products/create" element={ <CreateProductPage/> } />
                    <Route path="/products/edit-product/:id" element={ <EditProductPage/> } />
                </Routes>
            </DashboardLayout>
        </BreadcrumbsProvider>
    );
};

export default DashboardRoutes;