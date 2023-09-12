import React, { ReactNode } from 'react';
interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <main className="content">
      {children}
    </main>
  );
};

export default DashboardLayout;