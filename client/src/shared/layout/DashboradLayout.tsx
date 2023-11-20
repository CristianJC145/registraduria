import React, { ReactNode, useState, useEffect } from 'react';

import AppSidebar from './AppSidebar';
import AppFooter from './AppFooter';
import AppNavbar from './AppNavbar';
import './css/DashboardLayout.css'

import { BreadcrumbsProvider, useBreadcrumbs } from '../contexts/BreadCrumbsContext';

interface DashboardLayoutProps {
  children: ReactNode;
  namePage: string, 
  routePage: string, 
  level?: number;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, namePage, routePage, level = 1}) => {  
  const { updateBreadcrumbs } = useBreadcrumbs();
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

  useEffect(() => {
    updateBreadcrumbs((prevBreadcrumbs) => [
      ...prevBreadcrumbs,
      { name: namePage, route: routePage, level },
    ]);
  }, [namePage, routePage, level, updateBreadcrumbs]);
  return (
    <BreadcrumbsProvider>
      <AppSidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} onSmallSidebar={onSmallSidebar}></AppSidebar>
      <main className={`vs-main-content ${smallSidebar ? 'small-sidebar' : ''}`}>
        <AppNavbar toggleSidebar={toggleSidebar}></AppNavbar>
        <div className="vs-content">
          {children}
        </div>
        <AppFooter></AppFooter>
      </main>
    </BreadcrumbsProvider>
  );
};

export default DashboardLayout;