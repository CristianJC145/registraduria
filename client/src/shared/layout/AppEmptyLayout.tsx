import React, { ReactNode } from 'react';
import AppFooter from './AppFooter';
interface VshowcaseLayoutProps {
  children: ReactNode;
}

const AppEmptyLayout: React.FC<VshowcaseLayoutProps> = ({ children }) => {
  return (
    <>
      <main className="mainContent">
        {children}
      </main>
      <AppFooter></AppFooter>
    </>
  );
};

export default AppEmptyLayout;