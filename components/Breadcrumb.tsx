import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useBreadcrumb } from '../src/context/BreadcrumbContext';

export const Breadcrumb: React.FC = () => {
  const { items } = useBreadcrumb();

  return (
    <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
      <Link
        to="/"
        className="flex items-center gap-1 text-slate-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
      >
        <Home className="w-4 h-4" />
        <span>Home</span>
      </Link>

      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-4 h-4 text-slate-400 dark:text-gray-600" />
          {item.path ? (
            <Link
              to={item.path}
              className="text-slate-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-900 dark:text-white font-medium">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
