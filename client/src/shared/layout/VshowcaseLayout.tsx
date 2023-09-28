import React, { ReactNode } from 'react';
import AppFooter from './AppFooter';
import AppNavbarProducts from './AppNavbarProducts'
interface VshowcaseLayoutProps {
  children: ReactNode;
}

const VshowcaseLayout: React.FC<VshowcaseLayoutProps> = ({ children }) => {
  return (
    <>
      <AppNavbarProducts></AppNavbarProducts>
      <main className="mainContent">
        {children}
      </main>
      <AppFooter></AppFooter>
    </>
  );
};

export default VshowcaseLayout;