import React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export const ScrollProgressVisualizer: React.FC = () => {
  const { language } = useLanguage();
  const { scrollYProgress } = useScroll();
  
  // Smooth spring motion for progress
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transform scaleX (0 to 1) to percentage string for CSS positioning
  const progressPercent = useTransform(scaleX, (value) => `${Math.min(Math.max(value * 100, 0), 100)}%`);
  
  // Transform scaleX to rotation angle for floating butterfly
  const butterflyY = useTransform(scaleX, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, -4, 2, -5, 3, 0]);
  const flowerScale = useTransform(scaleX, [0, 0.1, 1], [0.8, 1, 1.15]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] pointer-events-none select-none h-4">
      {/* Background Track */}
      <div className="w-full h-2.5 bg-sky-200/50 dark:bg-slate-800/60 backdrop-blur-sm border-b border-sky-300/30">
        
        {/* Growing Vine / Gradient Progress Line */}
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 via-amber-400 to-[#fc6625] rounded-r-full shadow-[0_0_10px_rgba(252,102,37,0.5)] origin-left relative"
          style={{ scaleX }}
        >
          {/* Internal Vine Leaf Pattern Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/30 to-transparent" />
        </motion.div>
      </div>

      {/* Floating Animated Child-Friendly Plant & Butterfly Mascot at the Progress Tip */}
      <motion.div
        className="absolute top-0 -translate-x-1/2 -mt-1 flex flex-col items-center pointer-events-auto group cursor-pointer"
        style={{ left: progressPercent }}
      >
        {/* Floating Butterfly above */}
        <motion.div 
          style={{ y: butterflyY }}
          animate={{ rotate: [-8, 8, -8], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="mb-0.5 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
        >
          <svg width="22" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12C12 12 8 4 3 6C-2 8 1 15 5 15C9 15 12 12 12 12Z" fill="#FF6B6B" />
            <path d="M12 12C12 12 16 4 21 6C26 8 23 15 19 15C15 15 12 12 12 12Z" fill="#4D96FF" />
            <path d="M12 12C12 12 9 17 6 18C3 19 3 22 7 21C11 20 12 12 12 12Z" fill="#FFD93D" />
            <path d="M12 12C12 12 15 17 18 18C21 19 21 22 17 21C13 20 12 12 12 12Z" fill="#6BCB77" />
            <circle cx="12" cy="12" r="1.5" fill="#2C3E50" />
          </svg>
        </motion.div>

        {/* Growing Plant / Flower Head */}
        <motion.div 
          style={{ scale: flowerScale }}
          whileHover={{ scale: 1.3, rotate: 15 }}
          className="relative filter drop-shadow-[0_3px_6px_rgba(0,0,0,0.3)]"
        >
          {/* Vibrant Flower SVG */}
          <svg width="26" height="26" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Green Leaves at base */}
            <path d="M10 24C6 22 4 18 8 16C12 14 14 20 10 24Z" fill="#2ECC71" />
            <path d="M22 24C26 22 28 18 24 16C20 14 18 20 22 24Z" fill="#2ECC71" />
            {/* Stem */}
            <rect x="14.5" y="16" width="3" height="12" rx="1.5" fill="#27AE60" />
            {/* Petals */}
            <circle cx="16" cy="7" r="5" fill="#FF4757" />
            <circle cx="23" cy="12" r="5" fill="#FFA502" />
            <circle cx="21" cy="20" r="5" fill="#2E86DE" />
            <circle cx="11" cy="20" r="5" fill="#9B59B6" />
            <circle cx="9" cy="12" r="5" fill="#FF6B81" />
            {/* Flower Center */}
            <circle cx="16" cy="14" r="5.5" fill="#FFDD59" stroke="#E58E26" strokeWidth="1.5" />
            {/* Cute Happy Face in Center */}
            <circle cx="14" cy="13" r="0.9" fill="#2C3E50" />
            <circle cx="18" cy="13" r="0.9" fill="#2C3E50" />
            <path d="M14.5 15.5C14.5 15.5 15.5 17 17.5 15.5" stroke="#2C3E50" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </motion.div>

        {/* Tooltip on Hover */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute top-full mt-1 bg-slate-900/90 text-white text-[10px] font-bold py-1 px-2 rounded-full whitespace-nowrap shadow-lg border border-amber-400/40">
          🌱 {language === 'bn' ? 'দুরন্ত সফর' : 'Duranta Journey'}
        </div>
      </motion.div>

      {/* Decorative Milestone Dots across the bar (25%, 50%, 75%, 100%) */}
      <div className="absolute top-0 left-0 w-full h-2.5 flex justify-between px-[25%] pointer-events-none">
        <div className="w-1.5 h-1.5 rounded-full bg-white/70 border border-emerald-500 shadow-sm mt-0.5" />
        <div className="w-1.5 h-1.5 rounded-full bg-white/70 border border-amber-500 shadow-sm mt-0.5" />
        <div className="w-1.5 h-1.5 rounded-full bg-white/70 border border-orange-500 shadow-sm mt-0.5" />
      </div>
    </div>
  );
};
