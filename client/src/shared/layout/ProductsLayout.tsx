import React, { ReactNode } from 'react';
interface ProductLayoutProps {
  children: ReactNode;
}

const ProductLayout: React.FC<ProductLayoutProps> = ({ children }) => {
  return (
    <main className="content">
      {children}
    </main>
  );
};

export default ProductLayout;