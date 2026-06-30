import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import loaderConfig from '../loader.config.json';

interface Particle {
  id: number;
  x: number;
  y: number;
  scale: number;
  duration: number;
  delay: number;
}

interface LoaderProps {
  onComplete?: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    // Generate particles only on the client-side to prevent hydration mismatch
    const generated: Particle[] = Array.from({ length: loaderConfig.particleCount }).map((_, i) => {
      // Angle and distance to place particles in a circle around the logo
      const angle = (i * (360 / loaderConfig.particleCount)) * (Math.PI / 180);
      const distance = 80 + Math.random() * 120; // Radius range
      return {
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        scale: 0.4 + Math.random() * 0.8,
        duration: 3 + Math.random() * 4,
        delay: Math.random() * 1.5,
      };
    });
    setParticles(generated);

    // Timeline for showing text after logo animates
    const textTimer = setTimeout(() => {
      setTextVisible(true);
    }, (loaderConfig.fadeInDuration + loaderConfig.revealDuration) * 1000);

    // Timeline for completing the preloader
    const completeTimer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, loaderConfig.holdDuration * 1000);

    // Disable body scrolling while the loader is active
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
      clearTimeout(textTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: loaderConfig.fadeOutDuration, ease: [0.645, 0.045, 0.355, 1.0] }
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#030a16] to-[#01040a] select-none overflow-hidden"
    >
      {/* Dynamic Ambient Background Glow */}
      <div 
        className="absolute w-[450px] h-[450px] rounded-full filter blur-[100px] opacity-30 animate-pulse transition-all duration-3000 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${loaderConfig.glowColor} 0%, transparent 70%)`,
        }}
      />

      {/* Main Animation Container */}
      <div className="relative flex flex-col items-center justify-center px-4 max-w-lg text-center">
        
        {/* Particle System Container */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              animate={{
                x: [0, p.x, p.x * 1.2, p.x],
                y: [0, p.y, p.y * 1.2, p.y],
                opacity: [0, 0.8, 0.4, 0],
                scale: [0, p.scale, p.scale * 1.5, 0],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="absolute left-1/2 top-1/2 -ml-1 -mt-1 w-2.5 h-2.5 rounded-full bg-secondary/80 shadow-[0_0_10px_#ff7d31]"
            />
          ))}
        </div>

        {/* Pulsating Logo Glow Halo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: [0, 0.5, 0.3, 0.6], 
            scale: [0.8, 1.05, 0.98, 1.02]
          }}
          transition={{
            duration: loaderConfig.glowDuration,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute w-36 h-36 md:w-44 md:h-44 rounded-full blur-2xl pointer-events-none opacity-40"
          style={{ backgroundColor: '#ff7d31' }}
        />

        {/* Central Logo */}
        <div className="relative z-10 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.4, rotate: -15 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotate: 0,
            }}
            transition={{
              duration: loaderConfig.fadeInDuration,
              ease: [0.34, 1.56, 0.64, 1], // Custom bouncy spring easing
            }}
            className="w-28 h-28 md:w-36 md:h-36 flex items-center justify-center bg-white/5 backdrop-blur-md p-4 rounded-[2rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative group overflow-hidden"
          >
            {/* Glossy sheen effect across logo */}
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ delay: loaderConfig.fadeInDuration + 0.2, duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 z-20 pointer-events-none"
            />
            
            <img
              src={loaderConfig.logoUrl}
              alt="Duranta Cultural Academy Logo"
              className="w-full h-full object-contain relative z-10 select-none pointer-events-none filter drop-shadow-[0_8px_16px_rgba(252,102,37,0.3)]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        {/* Cinematic Title & Subtitle Reveal */}
        <div className="h-28 flex flex-col justify-start relative z-10">
          <AnimatePresence>
            {textVisible && (
              <div className="space-y-3">
                {/* Title */}
                <div className="overflow-hidden">
                  <motion.h2
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.215, 0.610, 0.355, 1.0] }}
                    className="text-2xl md:text-3.5xl font-extrabold tracking-wide text-white font-sans drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                  >
                    {loaderConfig.titleText}
                  </motion.h2>
                </div>

                {/* Subtitle */}
                <div className="overflow-hidden">
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.15, ease: [0.215, 0.610, 0.355, 1.0] }}
                    className="text-xs md:text-sm font-semibold tracking-widest text-secondary uppercase opacity-90 font-sans"
                  >
                    {loaderConfig.subtitleText}
                  </motion.p>
                </div>

                {/* Aesthetic accent line */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                  className="w-16 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mt-2"
                />
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Subtle Bottom Technical/Creative Academy Branding */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 text-[10px] uppercase tracking-[0.25em] text-white/60 font-mono"
      >
        Art &bull; Culture &bull; Theatre
      </motion.div>
    </motion.div>
  );
};
