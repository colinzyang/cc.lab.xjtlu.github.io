import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBreadcrumb } from '../src/context/BreadcrumbContext';
import { loadNews, NewsItem } from '../src/lib/dataLoader';
import { useDocumentTitle } from '../src/hooks/useDocumentTitle';
import { ChevronDown, ImageOff } from 'lucide-react';
import { ScrollToTopButton } from './ScrollToTopButton';

// Image component with error handling
const NewsImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 dark:text-subtext">
        <ImageOff className="w-8 h-8 mb-2" />
        <span className="text-xs">Failed to load</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
      loading="lazy"
      onError={() => setError(true)}
    />
  );
};

export const News: React.FC = () => {
  const { setBreadcrumbs } = useBreadcrumb();
  useDocumentTitle('News & Events');
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    setBreadcrumbs([{ label: 'News & Events' }]);
  }, [setBreadcrumbs]);

  useEffect(() => {
    loadNews().then(data => {
      setNewsItems(data);
      setLoading(false);
    }).catch(error => {
      console.error('Error loading news:', error);
      setLoading(false);
    });
  }, []);

  const handleToggle = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-text mb-6">News & Events</h1>
        <p className="text-slate-600 dark:text-text">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-text mb-6">News & Events</h1>
      </motion.div>

      <div className="relative border-l border-gray-200 dark:border-border ml-4 space-y-[30px] pb-12">
        {newsItems.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="pl-8 relative"
          >
            {/* Timeline dot */}
            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-primary dark:bg-primary-dark rounded-full ring-4 ring-white dark:ring-background-dark" />

            <div
              onClick={() => item.images && item.images.length > 0 && handleToggle(idx)}
              className={`cursor-pointer select-none ${
                item.images && item.images.length > 0
                  ? 'hover:bg-gray-50/50 dark:hover:bg-surface/50 rounded-lg -ml-2 pl-2 pr-2 py-2 transition-colors'
                  : ''
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <span className="text-xs font-mono text-primary dark:text-primary-dark uppercase tracking-wider mb-1 block">
                    {item.category} • {item.date}
                  </span>
                  <h3 className="text-2xl font-medium text-slate-900 dark:text-text mb-2">
                    {item.title}
                  </h3>
                </div>
                {item.images && item.images.length > 0 && (
                  <motion.div
                    animate={{ rotate: expandedIndex === idx ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 mt-1"
                  >
                    <ChevronDown className="w-5 h-5 text-slate-400 dark:text-subtext" />
                  </motion.div>
                )}
              </div>
              {item.excerpt && (
                <p className="text-slate-600 dark:text-subtext leading-relaxed">
                  {item.excerpt}
                </p>
              )}
            </div>

            {/* Expandable image drawer */}
            <AnimatePresence initial={false}>
              {expandedIndex === idx && item.images && item.images.length > 0 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-border">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {item.images.map((img, imgIdx) => {
                        const imgSrc = typeof img === 'string' ? img : img.src;
                        return (
                          <div
                            key={imgIdx}
                            className="aspect-video bg-gray-100 dark:bg-surface1 rounded-lg overflow-hidden"
                          >
                            <NewsImage src={imgSrc} alt={`${item.title} - image ${imgIdx + 1}`} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
      <ScrollToTopButton />
    </div>
  );
};
