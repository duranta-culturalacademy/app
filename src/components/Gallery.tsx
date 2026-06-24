import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Sparkles, X } from 'lucide-react';

export const Gallery: React.FC = () => {
  const { t } = useLanguage();
  const [selectedImg, setSelectedImg] = React.useState<any | null>(null);

  const images = [
    {
      id: 1,
      src: "https://1024terabox.com/s/1oQ1bWinuxFwSJeocBpvDXQ",
      fallback: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800",
      title: "Stage Perform 2018",
      description: "Natok 'Antanagar Express' Moment's",
      size: ""
    },
    {
      id: 2,
      src: "https://1024terabox.com/s/1omx6jtbril7pNKXYMtEGrA",
      fallback: "https://images.unsplash.com/photo-1503095391758-11200cf53674?auto=format&fit=crop&q=80&w=800",
      title: "Stage Perform 2018",
      description: "Natok 'Antanagar Express' Moment's",
      size: ""
    },
    {
      id: 3,
      src: "https://1024terabox.com/s/1WNirq9DveGZEhQQaOArOgg",
      fallback: "https://images.unsplash.com/photo-1460881680858-30d872d5b530?auto=format&fit=crop&q=80&w=800",
      title: "Natok 'Antanagar Express'",
      description: "Chief Guest 'Dilara Zaman' Moment's",
      size: ""
    },
    {
      id: 4,
      src: "https://1024terabox.com/s/1tFt2DK74-HOUgSyZ3V6TFA",
      fallback: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800",
      title: "Stage Perform 2019",
      description: "Natok 'Fera' Moment's",
      size: ""
    },
    {
      id: 5,
      src: "https://1024terabox.com/s/1Dbyei6-FE5drsc1-EHygJA",
      fallback: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800",
      title: "Natok 'Fera'",
      description: "Chief Guest 'Dilara Zaman' Moment's",
      size: ""
    },
    {
      id: 6,
      src: "https://1024terabox.com/s/1OQyAqyQgW9SMHZ2zeKzBgQ",
      fallback: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
      title: "Stage Perform 2022",
      description: "Natok 'Antanagar Express' Moment's",
      size: ""
    },
    {
      id: 7,
      src: "https://1024terabox.com/s/1soua5YcSSMYrAAO-eiGdhQ",
      fallback: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
      title: "Natok 'Antanagar Express'",
      description: "Chief Guest 'Justice Abdur Rauf' Moment's",
      size: ""
    },
    {
      id: 8,
      src: "https://1024terabox.com/s/1tQGcACo4Ta6m4FKxZKjM6g",
      fallback: "https://images.unsplash.com/photo-1460881680858-30d872d5b530?auto=format&fit=crop&q=80&w=800",
      title: "Stage Perform 2023",
      description: "Natok 'Megher Kole Rod' Moment's",
      size: ""
    },
    {
      id: 9,
      src: "https://1024terabox.com/s/1x5oAvIUsNS2ICEiIuXJJmQ",
      fallback: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800",
      title: "Stage Perform 2023",
      description: "Natok 'Megher Kole Rod' Moment's",
      size: ""
    },
    {
      id: 10,
      src: "https://1024terabox.com/s/1-0fW0PAs6ApkSPNnREygaQ",
      fallback: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800",
      title: "Natok 'Megher Kole Rod'",
      description: "Chief Guest 'Advocate Bodruddoza' Moment's",
      size: ""
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 alpana-pattern">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-16"
      >
        <h1 className="text-6xl md:text-9xl font-black mb-8 text-heading">
          {t.nav.gallery}
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-8"
            onClick={() => setSelectedImg(null)}
          >
            <button
              className="absolute top-6 right-6 text-white hover:text-[#fc6625] transition-colors p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md cursor-pointer z-50"
              onClick={() => setSelectedImg(null)}
            >
              <X size={28} />
            </button>
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImg.activeSrc}
                alt={selectedImg.title}
                className="max-h-[70vh] object-contain rounded-2xl md:rounded-[2.5rem] border-4 border-white shadow-2xl bg-black"
                referrerPolicy="no-referrer"
              />
              <div className="text-center mt-6 text-white max-w-2xl px-4">
                <h3 className="text-2xl md:text-4xl font-black mb-2 text-[#fc6625]">
                  {selectedImg.title}
                </h3>
                <p className="text-sm md:text-lg text-gray-300 font-bold leading-relaxed">
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
  const getProxyUrl = (src: string) => {
    if (src.startsWith('http')) {
      return `/api/proxy-image?url=${encodeURIComponent(src)}`;
    }
    return src;
  };

  const [currentSrc, setCurrentSrc] = React.useState(getProxyUrl(img.src));
  const [hasError, setHasError] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    setCurrentSrc(getProxyUrl(img.src));
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
