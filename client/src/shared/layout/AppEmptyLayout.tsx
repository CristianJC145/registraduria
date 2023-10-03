import React, { ReactNode } from 'react';
import AppFooter from './AppFooter';
import AppHeader from './AppHeader'
import './css/Main.css'
interface VshowcaseLayoutProps {
  children: ReactNode;
}

const AppEmptyLayout: React.FC<VshowcaseLayoutProps> = ({ children }) => {
  return (
    <>
      <AppHeader></AppHeader>
      <main className="mainContent">
        {children}
      </main>
      <AppFooter></AppFooter>
    </>
  );
};

export default AppEmptyLayout;