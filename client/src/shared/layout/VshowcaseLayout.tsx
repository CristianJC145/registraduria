import React, { ReactNode } from 'react';
interface VshowcaseLayoutProps {
  children: ReactNode;
}

const VshowcaseLayout: React.FC<VshowcaseLayoutProps> = ({ children }) => {
  return (
    <main className="content">
      {children}
    </main>
  );
};

export default VshowcaseLayout;