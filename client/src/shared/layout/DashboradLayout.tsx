import React, { ReactNode } from 'react';
import AppSidebar from './AppSidebar';
import AppFooter from './AppFooter';
import AppHeader from './AppHeader';
interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <>
      <AppHeader></AppHeader>
      <AppSidebar></AppSidebar>
      <main style={{marginLeft: '230px'}}>
        {children}
      </main>
      <AppFooter></AppFooter>
    </>
  );
};

export default DashboardLayout;