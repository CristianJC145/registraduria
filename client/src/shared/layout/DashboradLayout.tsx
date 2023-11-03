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
  const [smallSidebar, setSmallSidebar] = useState<any>();

  const onSmallSidebar = (value: any) => {
    setSmallSidebar(value)
  }

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };
  return (
    <>
      <AppSidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} onSmallSidebar={onSmallSidebar}></AppSidebar>
      <main className={`vs-main-content ${smallSidebar ? 'small-sidebar' : ''}`}>
        <AppNavbar toggleSidebar={toggleSidebar}></AppNavbar>
        <div className="vs-content">
          {children}
        </div>
        <AppFooter></AppFooter>
      </main>
    </>
  );
};

export default DashboardLayout;