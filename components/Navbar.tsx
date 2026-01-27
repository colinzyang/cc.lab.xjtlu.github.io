import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { name: 'Member', href: '/member' },
  { name: 'Publication', href: '/publication' },
  { name: 'Resources', href: '/resources' },
  { name: 'News', href: '/news' },
  { name: 'Contact', href: '/contact' },
];

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="w-full border-b border-gray-100 dark:border-gray-800 sticky top-0 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md z-50">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 h-20 flex items-center justify-between">
        {/* Logo Area */}
        <Link to="/" className="flex items-center gap-3 select-none cursor-pointer group">
          <span className="material-symbols-outlined text-4xl text-primary group-hover:scale-110 transition-transform duration-300">hexagon</span>
          <h2 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight uppercase leading-none">
            CC Lab
          </h2>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`text-sm font-medium transition-colors duration-200 relative group ${
                isActive(link.href) ? 'text-primary' : 'text-slate-900 dark:text-white hover:text-primary'
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-slate-900 dark:text-white hover:bg-gray-100 rounded-md transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* 蒙版背景 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/45 dark:bg-black/50 z-40 md:hidden"
            />
            {/* 菜单面板 */}
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed right-0 top-0 h-screen w-full bg-white dark:bg-background-dark z-50 flex flex-col p-6 md:hidden"
            >
            <div className="flex justify-end mb-8">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-slate-900 dark:text-white hover:bg-gray-100 rounded-md"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            <nav className="flex flex-col gap-6 items-center justify-center flex-grow">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-2xl font-medium ${
                    isActive(link.href) ? 'text-primary' : 'text-slate-900 dark:text-white hover:text-primary'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};