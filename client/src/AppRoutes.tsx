import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductRoutes from "./modules/products/ProductRoutes"
import DashboardRoutes from "./modules/dashboard/DashboardRoutes"


const AppRouting: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/"  element={ <ProductRoutes/> } />
        <Route path="/dashboard/*"  element={ <DashboardRoutes/> } />
      </Routes>
    </Router>
  );
};

export default AppRouting;