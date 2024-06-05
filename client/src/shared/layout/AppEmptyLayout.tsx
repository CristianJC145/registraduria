import React, { ReactNode } from 'react';
import AppFooter from './AppFooter';
import AppHeader from './AppHeader'
import styled from 'styled-components';
interface VshowcaseLayoutProps {
  children: ReactNode;
}

const AppEmptyLayout: React.FC<VshowcaseLayoutProps> = ({ children }) => {
  return (
    <AppEmptyLayoutStyle>
      <main className="mainContent">
        <AppHeader></AppHeader>
        <div className="vs-content">{children}</div>
        <AppFooter></AppFooter>
      </main>
    </AppEmptyLayoutStyle>
  );
};

export default AppEmptyLayout;

const AppEmptyLayoutStyle = styled.div `
  .mainContent {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  .vs-content {
    padding: var(--p-6) var(--p-6);
    flex-grow: 1;
    background-color: #fff;
  }
`