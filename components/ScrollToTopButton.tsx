import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

interface ScrollToTopButtonProps {
  threshold?: number;
}

export const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({
  threshold = 300
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(48);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // 显示/隐藏逻辑
      setIsVisible(window.scrollY > threshold);

      // 动态计算底部偏移，让按钮黏在 footer 上方
      const footerHeight = 100; // footer 大致高度
      const scrollBottom = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const distanceToBottom = pageHeight - scrollBottom;

      if (distanceToBottom < footerHeight + 16) {
        // 接近底部时，增加偏移量
        setBottomOffset(footerHeight + 16 - distanceToBottom + 48);
      } else {
        setBottomOffset(32);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          ref={buttonRef}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{
            duration: 0.25,
            ease: [0.16, 1, 0.3, 1]
          }}
          onClick={scrollToTop}
          className="hidden md:flex fixed right-8 w-12 h-12 items-center justify-center text-slate-400 dark:text-subtext hover:text-primary dark:hover:text-primary-dark transition-colors z-40 cursor-pointer"
          style={{ bottom: bottomOffset }}
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-8 h-8 transition-transform group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
