import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppEmptyLayout from "../../shared/layout/AppEmptyLayout";
import Login from "../auth/Login";

const VshowcaseRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <Navigate to="../auth/login" replace />
        }
      />
      <Route
        path="/auth/*"
        element={
          <AppEmptyLayout>
            <Routes>
              <Route path="login" element={<Login />} />
            </Routes>
          </AppEmptyLayout>
        }
      />
    </Routes>
  );
};

export default VshowcaseRoutes;
