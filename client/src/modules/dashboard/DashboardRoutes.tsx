import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DashboardLayout from '../../shared/layout/DashboradLayout';
import HomePage from './pages/HomePage';

const DashboardRoutes: React.FC = () => {
    return (
        <DashboardLayout>
            <Routes>
                    <Route path="/home" element={ <HomePage />} />
            </Routes>
        </DashboardLayout>
    );
};

export default DashboardRoutes;