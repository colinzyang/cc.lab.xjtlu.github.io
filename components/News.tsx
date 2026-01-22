import React from 'react';
import { motion } from 'framer-motion';
import { NEWS_ITEMS } from '../src/data/news';
import { useBreadcrumb } from '../src/context/BreadcrumbContext';

export const News: React.FC = () => {
  const { setBreadcrumbs } = useBreadcrumb();

  React.useEffect(() => {
    setBreadcrumbs([{ label: 'News & Events' }]);
  }, [setBreadcrumbs]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">News & Events</h1>
      </motion.div>

      <div className="relative border-l border-gray-200 dark:border-gray-800 ml-4 space-y-12 pb-12">
        {NEWS_ITEMS.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="pl-8 relative"
          >
            {/* Timeline dot */}
            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-primary rounded-full ring-4 ring-white dark:ring-background-dark" />
            
            <span className="text-xs font-mono text-primary uppercase tracking-wider mb-1 block">
              {item.category} • {item.date}
            </span>
            <h3 className="text-2xl font-medium text-slate-900 dark:text-white hover:text-primary cursor-pointer transition-colors">
              {item.title}
            </h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
};