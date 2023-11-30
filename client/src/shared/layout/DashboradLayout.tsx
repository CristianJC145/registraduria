import React, { ReactNode, useState, useEffect } from "react";
import styled from "styled-components";

import AppSidebar from "./AppSidebar";
import AppFooter from "./AppFooter";
import AppNavbar from "./AppNavbar";

interface DashboardLayoutProps {
  children: ReactNode;
  namePage: string;
  routePage: string;
  level?: number;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [smallSidebar, setSmallSidebar] = useState<any>();

  const onSmallSidebar = (value: any) => {
    setSmallSidebar(value);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <DashboardLayoutStyles>
      <AppSidebar
        isOpen={isSidebarOpen}
        onClose={handleSidebarClose}
        onSmallSidebar={onSmallSidebar}
      ></AppSidebar>
      <main
        className={`vs-main-content ${smallSidebar ? "small-sidebar" : ""}`}
      >
        <AppNavbar toggleSidebar={toggleSidebar}></AppNavbar>
        <div className="vs-content">{children}</div>
        <AppFooter></AppFooter>
      </main>
    </DashboardLayoutStyles>
  );
};

export default DashboardLayout;

const DashboardLayoutStyles = styled.div`
  .vs-main-content {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  .vs-content {
    padding: var(--p-6) var(--p-6);
    flex-grow: 1;
    background-color: #fff;
  }
  @media (min-width: 992px) {
    .vs-content {
      padding: var(--p-6) var(--p-8);
    }
    .vs-main-content {
      margin-left: 220px;
      transition: all 0.3s ease;
    }
    .vs-main-content.small-sidebar {
      margin-left: 72px;
    }
  }
`;
