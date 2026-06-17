import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { Camera, Sparkles } from 'lucide-react';

export const Gallery: React.FC = () => {
  const { t } = useLanguage();

  const images = [
    { id: 1, src: "https://picsum.photos/seed/art1/800/1000", title: "Music Class", size: "row-span-2" },
    { id: 2, src: "https://picsum.photos/seed/art2/800/600", title: "Drama Rehearsal", size: "" },
    { id: 3, src: "https://picsum.photos/seed/art3/800/600", title: "Annual Program", size: "" },
    { id: 4, src: "https://picsum.photos/seed/art4/800/600", title: "Student Performance", size: "col-span-2" },
    { id: 5, src: "https://picsum.photos/seed/art5/800/800", title: "Workshop", size: "" },
    { id: 6, src: "https://picsum.photos/seed/art6/800/600", title: "Cultural Fest", size: "" },
  ];

  return (
    <div className="container mx-auto px-4 py-16 alpana-pattern">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-24"
      >
        <div className="inline-flex items-center gap-4 px-8 py-4 bg-sky text-white rounded-full text-xl font-black mb-8 shadow-lg">
          <Camera size={24} /> Look at Us!
        </div>
        <h1 className="text-6xl md:text-9xl font-black mb-8 text-heading">
          {t.nav.gallery}
        </h1>
        <p className="text-2xl max-w-2xl mx-auto font-black text-body">
          See all the fun things we do at Duronto!
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 auto-rows-[300px] md:auto-rows-[400px]">
        {images.map((img, index) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -15, rotate: index % 2 === 0 ? 3 : -3 }}
            className={`group relative overflow-hidden rounded-[2rem] md:rounded-[4rem] shadow-2xl cursor-pointer ${img.size} border-[8px] md:border-[12px] border-white`}
          >
            <img
              src={img.src}
              alt={img.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-12">
              <motion.div
                className="space-y-4"
              >
                <div className="flex items-center gap-3 text-secondary">
                  <Sparkles size={24} className="animate-pulse" />
                  <span className="text-lg font-black uppercase tracking-[0.3em]">Fun Times!</span>
                </div>
                <h3 className="text-4xl font-black text-white drop-shadow-lg">{img.title}</h3>
              </motion.div>
            </div>
            
            {/* Playful Border Overlay */}
            <div className="absolute inset-8 border-4 border-white/50 rounded-[3rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
