import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import DashboardLayout from "../../shared/layout/DashboradLayout";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CreateProductPage from "./pages/CreateProductPage";
import EditProductPage from "./pages/EditProductPage";
import AccountUserPage from "./pages/AccountUserPage";
import UsersPage from "./pages/UsersPage";

const DashboardRoutes: React.FC = () => {
  return (
    <DashboardLayout namePage={"/"} routePage={""}>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/products/create" element={<CreateProductPage />} />
        <Route
          path="/products/edit-product/:id"
          element={<EditProductPage />}
        />
        <Route path="/account" element={<AccountUserPage />} />
      </Routes>
    </DashboardLayout>
  );
};

export default DashboardRoutes;
