import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const POSTS = [
  {
    id: 1,
    category: 'Publication',
    date: 'Oct 24, 2024',
    title: 'Machine learning approaches for protein folding prediction',
    link: '#'
  },
  {
    id: 2,
    category: 'News',
    date: 'Sep 12, 2024',
    title: 'Dr. Smith awarded the National Science Grant',
    link: '#'
  },
  {
    id: 3,
    category: 'Event',
    date: 'Aug 05, 2024',
    title: 'International Conference on Computational Biology 2024',
    link: '#'
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const RecentPosts: React.FC = () => {
  return (
    <motion.div
      className="w-full mt-24 border-t border-gray-200 dark:border-gray-800 pt-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="flex justify-between items-baseline mb-8">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          Latest Updates
        </h3>
        <a href="#" className="text-xs font-bold uppercase tracking-widest text-primary hover:text-slate-900 dark:hover:text-white transition-colors">
          View Archive
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {POSTS.map((post) => (
          <motion.a
            key={post.id}
            href={post.link}
            className="group block"
            variants={itemVariants}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 bg-gray-100 dark:bg-gray-800 text-slate-600 dark:text-slate-300 rounded-sm">
                {post.category}
              </span>
              <span className="text-[10px] font-mono text-gray-400">
                {post.date}
              </span>
            </div>
            <h4 className="text-lg font-medium text-slate-900 dark:text-white leading-snug group-hover:text-primary transition-colors pr-6 relative">
              {post.title}
              <ArrowUpRight className="absolute top-0.5 right-0 w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
            </h4>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};