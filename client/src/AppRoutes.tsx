import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VshowcaseRutes from "./modules/vshowcase/VshowcaseRoutes"
import DashboardRoutes from "./modules/dashboard/DashboardRoutes"


const AppRouting: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*"  element={ <VshowcaseRutes/> } />
        <Route path="/dashboard/*"  element={ <DashboardRoutes/> } />
      </Routes>
    </Router>
  );
};

export default AppRouting;