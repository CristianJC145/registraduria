import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import DashboardLayout from "../../shared/layout/DashboradLayout";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import AccountUserPage from "./pages/AccountUserPage";
import UsersPage from "./pages/UsersPage";
import AdminProductsPage from "./pages/AdminProductsPage";
import EmployeesPage from "./pages/EmployeesPage";
import ProtectedRoute from "../../ProtectedRoute";
const DashboardRoutes: React.FC = () => {
  return (
    <DashboardLayout namePage={"/"} routePage={""}>
      <Routes>
        <Route index path="/home" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route element={<ProtectedRoute allowedRoles={[1]}/>}>
          <Route path="/users" element={<UsersPage />} />
          <Route path="/admin-products" element={<AdminProductsPage />} />
          <Route path="/employees" element={<EmployeesPage />} />
        </Route>
        <Route path="/account-settings" element={<AccountUserPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </DashboardLayout>
  );
};

export default DashboardRoutes;
