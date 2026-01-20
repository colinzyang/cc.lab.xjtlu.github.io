import React from 'react';
import { motion } from 'framer-motion';

const NEWS_ITEMS = [
  {
    date: "October 24, 2024",
    title: "Machine learning approaches for protein folding prediction published in Nature CS",
    category: "Publication"
  },
  {
    date: "September 12, 2024",
    title: "Dr. Smith awarded the National Science Grant to study membrane proteins",
    category: "Award"
  },
  {
    date: "August 05, 2024",
    title: "CC Lab presents three posters at the International Conference on Computational Biology",
    category: "Conference"
  },
  {
    date: "July 20, 2024",
    title: "Welcome our new summer interns, Michael and Jessica!",
    category: "Team"
  },
  {
    date: "May 15, 2024",
    title: "New high-performance computing cluster 'Alpha' is now online",
    category: "Infrastructure"
  }
];

export const News: React.FC = () => {
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