import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-gray-100 dark:border-gray-800 mt-auto bg-white dark:bg-background-dark">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-slate-900 dark:text-gray-300">
            © 2024 University Bioinformatics Research Lab.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Department of Computer Science & Biology
          </p>
        </div>

        <div className="flex items-center gap-6">
          <FooterLink href="#">Twitter</FooterLink>
          <div className="w-px h-3 bg-gray-300 dark:bg-gray-700" />
          <FooterLink href="#">LinkedIn</FooterLink>
          <div className="w-px h-3 bg-gray-300 dark:bg-gray-700" />
          <FooterLink href="#">Scholar</FooterLink>
        </div>
      </div>
    </footer>
  );
};

const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a
    href={href}
    className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-primary transition-colors duration-200"
  >
    {children}
  </a>
);