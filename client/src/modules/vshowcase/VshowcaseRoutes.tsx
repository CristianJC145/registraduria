import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import VshowcaseLayout from '../../shared/layout/VshowcaseLayout';
import RegisterUser from './pages/RegisterUser';

const VshowcaseRoutes: React.FC = () => {
  return (
    <VshowcaseLayout>
      <Routes>
          <Route path="/" element={ <HomePage />} />
          <Route path="/register" element={ <RegisterUser/>} />
      </Routes>
    </VshowcaseLayout>
  );
};

export default VshowcaseRoutes;