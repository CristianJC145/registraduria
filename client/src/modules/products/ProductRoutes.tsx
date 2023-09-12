import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductCatalog from './pages/ProductCatalog';
import ProductsLayout from '../../shared/layout/ProductsLayout';

const ProductRoutes: React.FC = () => {
  return (
    <ProductsLayout>
      <Routes>
          <Route path="/" element={ <ProductCatalog />} />
      </Routes>
    </ProductsLayout>
  );
};

export default ProductRoutes;