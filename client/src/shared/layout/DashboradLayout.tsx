import React, { ReactNode, useState } from 'react';
import AppSidebar from './AppSidebar';
import AppFooter from './AppFooter';
import AppNavbar from './AppNavbar';
import './css/DashboardLayout.css'
interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };
  console.log(isSidebarOpen);
  return (
    <>
      <AppSidebar isOpen={isSidebarOpen} onClose={handleSidebarClose}></AppSidebar>
      <main className="vs-main-content">
        <AppNavbar toggleSidebar={toggleSidebar}></AppNavbar>
        {children}
        <AppFooter></AppFooter>
      </main>
    </>
  );
};

export default DashboardLayout;