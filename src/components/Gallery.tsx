import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Sparkles, X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

export const Gallery: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedImg, setSelectedImg] = React.useState<any | null>(null);

  const images = [
    {
       id: 1,
       src: "https://i.postimg.cc/GmRsRgCj/1.jpg",
       fallback: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&q=80&w=1200",
       title: "Stage Perform 2018",
       description: "Natok 'Antanagar Express' Moment's",
       size: ""
     },
     {
       id: 2,
       src: "https://i.postimg.cc/jSTJT3bX/2.jpg",
       fallback: "https://images.unsplash.com/photo-1503095391758-11200cf53674?auto=format&fit=crop&q=80&w=1200",
       title: "Stage Perform 2018",
       description: "Natok 'Antanagar Express' Moment's",
       size: ""
     },
     {
       id: 3,
       src: "https://i.postimg.cc/JzQHz3rj/3.jpg",
       fallback: "https://images.unsplash.com/photo-1460881680858-30d872d5b530?auto=format&fit=crop&q=80&w=1200",
       title: "Natok 'Antanagar Express'",
       description: "Chief Guest 'Dilara Zaman' Moment's",
       size: ""
     },
     {
       id: 4,
       src: "https://i.postimg.cc/mgVhsbj6/4.jpg",
       fallback: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1200",
       title: "Stage Perform 2019",
       description: "Natok 'Fera' Moment's",
       size: ""
     },
     {
       id: 5,
       src: "https://i.postimg.cc/rwgzk8j7/5.jpg",
       fallback: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1200",
       title: "Natok 'Fera'",
       description: "Chief Guest 'Dilara Zaman' Moment's",
       size: ""
     },
     {
       id: 6,
       src: "https://i.postimg.cc/nrvcwZM2/6.jpg",
       fallback: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1200",
       title: "Stage Perform 2022",
       description: "Natok 'Antanagar Express' Moment's",
       size: ""
     },
     {
       id: 7,
       src: "https://i.postimg.cc/Fzjsnm1D/7.jpg",
       fallback: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
       title: "Natok 'Antanagar Express'",
       description: "Chief Guest 'Justice Abdur Rauf' Moment's",
       size: ""
     },
     {
       id: 8,
       src: "https://i.postimg.cc/dVQtnbF9/8.jpg",
       fallback: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1200",
       title: "Stage Perform 2023",
       description: "Natok 'Megher Kole Rod' Moment's",
       size: ""
     },
     {
       id: 9,
       src: "https://i.postimg.cc/T32YQzx0/9.jpg",
       fallback: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200",
       title: "Stage Perform 2023",
       description: "Natok 'Megher Kole Rod' Moment's",
       size: ""
     },
     {
       id: 10,
       src: "https://i.postimg.cc/0y52ZTvZ/10.jpg",
       fallback: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&q=80&w=1200",
       title: "Natok 'Megher Kole Rod'",
       description: "Chief Guest 'Advocate Bodruddoza' Moment's",
       size: ""
     }
  ];

  const [modalImgSrc, setModalImgSrc] = React.useState<string>('');
  const [isModalLoading, setIsModalLoading] = React.useState<boolean>(true);
  const [zoomScale, setZoomScale] = React.useState<number>(1);

  const touchStartDistRef = React.useRef<number | null>(null);
  const initialZoomRef = React.useRef<number>(1);
  const lastTapRef = React.useRef<number>(0);

  React.useEffect(() => {
    if (selectedImg) {
      const initialSrc = selectedImg.activeSrc || selectedImg.fallback || selectedImg.src;
      setModalImgSrc(initialSrc);
      setIsModalLoading(true);
      setZoomScale(1);

      // Fallback timer if initial image takes too long to respond
      const timer = setTimeout(() => {
        setIsModalLoading(false);
      }, 2500);

      return () => clearTimeout(timer);
    } else {
      setZoomScale(1);
    }
  }, [selectedImg]);

  // Handle pinch gesture and double tap on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      touchStartDistRef.current = dist;
      initialZoomRef.current = zoomScale;
    } else if (e.touches.length === 1) {
      const now = Date.now();
      if (now - lastTapRef.current < 300) {
        // Toggle double-tap zoom
        setZoomScale((prev) => (prev > 1.2 ? 1 : 2.5));
      }
      lastTapRef.current = now;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && touchStartDistRef.current !== null) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      const factor = dist / touchStartDistRef.current;
      const newScale = Math.min(Math.max(initialZoomRef.current * factor, 1), 3.5);
      setZoomScale(newScale);
    }
  };

  const handleTouchEnd = () => {
    touchStartDistRef.current = null;
  };

  // Lock body scroll when modal is active
  React.useEffect(() => {
    if (selectedImg) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [selectedImg]);

  // Handle ESC key to close modal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImg(null);
      }
    };
    if (selectedImg) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImg]);

  return (
    <div className="container mx-auto px-4 py-16 alpana-pattern">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-16"
      >
        <h1 className="text-6xl md:text-9xl font-black mb-8 text-heading">
          {language === 'bn' ? 'গ্যালারি' : 'Memories Gallery'}
        </h1>
      </motion.div>
      
      <div className="grid grid-cols-2 gap-4 md:gap-12 auto-rows-[160px] sm:auto-rows-[300px] md:auto-rows-[400px]">
        {images.map((img, index) => {
          return (
            <GalleryItem key={img.id} img={img} index={index} onSelect={(activeSrc) => setSelectedImg({ ...img, activeSrc })} />
          );
        })}
      </div>

      {/* Interactive Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-6 md:p-8 overflow-hidden"
            onClick={() => setSelectedImg(null)}
          >
            {/* Screen Backdrop Top-Right Close Button */}
            <button
              type="button"
              aria-label="Close photo viewer"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white hover:text-[#fc6625] transition-colors p-3 bg-white/10 hover:bg-white/25 rounded-full backdrop-blur-md cursor-pointer z-[210] border border-white/30 shadow-xl"
              onClick={() => setSelectedImg(null)}
            >
              <X size={28} className="stroke-[2.5]" />
            </button>

            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              drag={zoomScale === 1 ? 'y' : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.6}
              onDragEnd={(_e, info) => {
                if (Math.abs(info.offset.y) > 90 || Math.abs(info.velocity.y) > 400) {
                  setSelectedImg(null);
                }
              }}
              className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center bg-slate-900/95 p-3 sm:p-6 rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] border-2 border-white/20 shadow-2xl backdrop-blur-2xl touch-pan-y select-none"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Swipe Down Drag Indicator for Mobile */}
              <div className="w-12 h-1.5 bg-white/30 hover:bg-white/50 rounded-full mb-2 cursor-grab active:cursor-grabbing sm:hidden" />

              {/* Corner Cross Button on Photo Card Top-Right */}
              <button
                type="button"
                aria-label="Close photo view"
                className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 z-[220] bg-[#fc6625] hover:bg-[#e05316] text-white p-2.5 sm:p-3.5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer border-2 border-white flex items-center justify-center"
                onClick={() => setSelectedImg(null)}
              >
                <X size={24} className="stroke-[3]" />
              </button>

              {/* Image Frame with Pinch Zoom */}
              <div
                className="relative w-full flex items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl min-h-[220px] max-h-[65vh] bg-black/80 border border-white/10 touch-none select-none cursor-grab active:cursor-grabbing"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {isModalLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 text-white gap-3 z-10">
                    <div className="w-10 h-10 border-4 border-[#fc6625] border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs font-bold text-gray-300 tracking-wider">
                      {language === 'bn' ? 'ছবি লোড হচ্ছে...' : 'Loading Photo...'}
                    </span>
                  </div>
                )}
                <motion.img
                  key={modalImgSrc}
                  src={modalImgSrc || selectedImg.fallback}
                  alt={selectedImg.title}
                  onLoad={() => setIsModalLoading(false)}
                  onError={() => {
                    setIsModalLoading(false);
                    if (selectedImg && modalImgSrc !== selectedImg.fallback) {
                      setModalImgSrc(selectedImg.fallback);
                    }
                  }}
                  animate={{ scale: zoomScale }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className={`max-h-[65vh] w-auto max-w-full object-contain rounded-xl sm:rounded-2xl shadow-2xl transition-opacity duration-300 origin-center ${
                    isModalLoading ? 'opacity-0' : 'opacity-100'
                  }`}
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Zoom Controls & Gesture Hint Bar */}
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white text-xs z-20 mt-2">
                <button
                  type="button"
                  onClick={() => setZoomScale((prev) => Math.max(1, prev - 0.5))}
                  className="p-1 hover:text-[#fc6625] transition-colors"
                  title="Zoom out"
                >
                  <ZoomOut size={16} />
                </button>
                <span className="font-mono text-[11px] w-12 text-center select-none font-bold">
                  {Math.round(zoomScale * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomScale((prev) => Math.min(3.5, prev + 0.5))}
                  className="p-1 hover:text-[#fc6625] transition-colors"
                  title="Zoom in"
                >
                  <ZoomIn size={16} />
                </button>
                {zoomScale > 1 && (
                  <button
                    type="button"
                    onClick={() => setZoomScale(1)}
                    className="p-1 text-gray-400 hover:text-white transition-colors ml-1"
                    title="Reset zoom"
                  >
                    <RotateCcw size={14} />
                  </button>
                )}
                <span className="hidden sm:inline text-[10px] text-gray-400 border-l border-white/20 pl-2 ml-1">
                  {language === 'bn' ? 'চিমটি কেটে জুম করুন • সোয়াইপ ডাউন করে বন্ধ করুন' : 'Pinch or double tap to zoom • Swipe down to dismiss'}
                </span>
              </div>

              {/* Title & Description */}
              <div className="text-center mt-2 sm:mt-3 text-white max-w-2xl px-2">
                <h3 className="text-lg sm:text-2xl md:text-3xl font-black mb-1 text-[#fc6625] tracking-wide">
                  {selectedImg.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-200 font-semibold leading-relaxed">
                  {selectedImg.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface GalleryItemProps {
  img: {
    id: number;
    src: string;
    fallback: string;
    title: string;
    description: string;
    size: string;
  };
  index: number;
  onSelect: (activeSrc: string) => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ img, index, onSelect }) => {
  // প্রক্সি ফাংশনটি বাদ দিয়ে সরাসরি আসল ইমেজ লিংক ব্যবহার করা হয়েছে
  const [currentSrc, setCurrentSrc] = React.useState(img.src);
  const [hasError, setHasError] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    setCurrentSrc(img.src);
    setHasError(false);
    setIsLoaded(false);
  }, [img.src]);

  const handleImageError = () => {
    if (!hasError) {
      setCurrentSrc(img.fallback);
      setHasError(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", bounce: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -15, rotate: index % 2 === 0 ? 1 : -1 }}
      onClick={() => onSelect(currentSrc)}
      className={`group relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[4rem] shadow-2xl cursor-pointer ${img.size} border-4 md:border-[12px] border-white bg-neutral-100 dark:bg-neutral-800`}
    >
      {/* Elegant Loading Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 animate-pulse flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-primary/30">
            <Camera className="animate-bounce" size={32} />
            <span className="text-[10px] uppercase tracking-wider font-bold">Loading...</span>
          </div>
        </div>
      )}

      <img
        src={currentSrc}
        alt={img.title}
        onError={handleImageError}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
        className={`w-full h-full object-cover transition-all duration-700 ${
          isLoaded ? 'opacity-100 scale-100 group-hover:scale-110' : 'opacity-0 scale-95'
        }`}
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4 sm:p-8 md:p-12">
        <motion.div className="space-y-1 sm:space-y-3">
          <div className="flex items-center gap-1 sm:gap-2 text-secondary">
            <Sparkles size={16} className="animate-pulse text-[#fc6625]" />
            <span className="text-[10px] sm:text-sm font-black uppercase tracking-[0.2em] text-[#fc6625]">Memorable Moment</span>
          </div>
          <h3 className="text-sm sm:text-2xl md:text-3.5xl font-extrabold text-white leading-tight drop-shadow-md">
            {img.title}
          </h3>
          <p className="hidden sm:block text-xs md:text-lg text-gray-200 font-medium leading-relaxed">
            {img.description}
          </p>
        </motion.div>
      </div>
      
      {/* Playful Border Overlay */}
      <div className="absolute inset-4 sm:inset-8 border-2 sm:border-4 border-white/50 rounded-[1rem] sm:rounded-[3rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </motion.div>
  );
};
