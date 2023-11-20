import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface Breadcrumb {
  name: string;
  route: string;
  level: number;
}

interface BreadcrumbsContextProps {
  breadcrumbs: Breadcrumb[];
  updateBreadcrumbs: Dispatch<SetStateAction<Breadcrumb[]>>;
}

const BreadcrumbsContext = createContext<BreadcrumbsContextProps | undefined>(undefined);

export const BreadcrumbsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [breadcrumbs, updateBreadcrumbs] = useState<Breadcrumb[]>([]);

  const contextValue: BreadcrumbsContextProps = {
    breadcrumbs,
    updateBreadcrumbs,
  };

  return (
    <BreadcrumbsContext.Provider value={contextValue}>
      {children}
    </BreadcrumbsContext.Provider>
  );
};

export const useBreadcrumbs = () => {
  const context = useContext(BreadcrumbsContext);

  if (!context) {
    throw new Error('useBreadcrumbs debe utilizarse dentro de un BreadcrumbsProvider');
  }

  return context;
};