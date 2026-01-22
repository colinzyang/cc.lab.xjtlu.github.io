import React, { createContext, useContext, useState } from 'react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbContextType {
  items: BreadcrumbItem[];
  setBreadcrumbs: (items: BreadcrumbItem[]) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(undefined);

export const BreadcrumbProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<BreadcrumbItem[]>([]);

  return (
    <BreadcrumbContext.Provider value={{ items, setBreadcrumbs: setItems }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const useBreadcrumb = () => {
  const context = useContext(BreadcrumbContext);
  if (!context) {
    throw new Error('useBreadcrumb must be used within BreadcrumbProvider');
  }
  return context;
};
