import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button as soon as user starts scrolling past the top hero section (250px)
      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    window.addEventListener('resize', toggleVisibility, { passive: true });
    toggleVisibility();

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      window.removeEventListener('resize', toggleVisibility);
    };
  }, [location.pathname]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[9999]"
        >
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to Top"
            title="Back to Top"
            className="group relative flex items-center justify-center p-3.5 md:p-4 rounded-full bg-[#ff7d31] text-white shadow-[0_10px_30px_rgba(255,125,49,0.45)] hover:shadow-[0_15px_35px_rgba(255,125,49,0.65)] hover:bg-[#e0651f] transition-all duration-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#ff7d31] focus:ring-offset-2"
          >
            <ArrowUp className="w-6 h-6 md:w-7 md:h-7 transition-transform duration-300 group-hover:-translate-y-1" />
            <span className="sr-only">Back to Top</span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
