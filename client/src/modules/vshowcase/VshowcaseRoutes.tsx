import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import VshowcaseLayout from '../../shared/layout/VshowcaseLayout';
import RegisterUser from '../auth/Register';
import RegisterLanding from './pages/RegisterPage'
import AppEmptyLayout from '../../shared/layout/AppEmptyLayout';
import Login from '../auth/Login';
import ProductPage from './pages/ProductPage';

const VshowcaseRoutes: React.FC = () => {
  return (
      <Routes>
          <Route path="/*" element={ 
            <VshowcaseLayout>
              <Routes>
                <Route index element= {<HomePage/>}/>
                <Route path=':id' element = {<ProductPage/>}></Route>
              </Routes>
            </VshowcaseLayout>
          } />
          <Route path="/register/*" element={ 
            <AppEmptyLayout>
              <Routes>
                <Route path='landing/' element= {<RegisterLanding/>} />
                <Route path='count/personal' element = {<RegisterUser/>}/>
                <Route path='count/business' element = {<RegisterUser/>}/>
              </Routes>
            </AppEmptyLayout>
          } />
          <Route path="/auth/*" element={
            <AppEmptyLayout>
              <Routes>
                <Route path='login' element = {<Login/>} />
              </Routes>
            </AppEmptyLayout>
          } />

      </Routes>
  );
};

export default VshowcaseRoutes;