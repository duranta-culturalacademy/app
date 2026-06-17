import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { Sparkles, Star } from 'lucide-react';

export const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-16 alpana-pattern">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-16 md:mb-24">
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-9xl font-black mb-6 md:mb-8 whitespace-nowrap text-heading">{t.about.title}</h1>
          <div className="w-32 md:w-48 h-2 md:h-4 bg-gradient-to-r from-krishnachura via-marigold to-secondary mx-auto rounded-full shadow-lg"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center mb-24 md:mb-40">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="relative"
          >
            <div className="absolute -inset-4 md:-inset-8 bg-krishnachura rounded-[2rem] md:rounded-[4rem] blur-2xl md:blur-3xl opacity-20 animate-pulse"></div>
            <img
              src="https://picsum.photos/seed/academy-fun/800/600"
              alt="Academy"
              className="relative rounded-[2rem] md:rounded-[4rem] shadow-2xl border-[8px] md:border-[16px] border-white rotate-3 hover:rotate-0 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="space-y-6 md:space-y-10 text-center lg:text-left">
            <h2 className="text-4xl md:text-6xl font-black leading-tight text-heading">
              We Love <span className="text-krishnachura">Art!</span>
            </h2>
            <p className="text-lg md:text-2xl leading-relaxed font-black text-body">
              {t.hero.subtitle}
            </p>
            <p className="text-lg md:text-2xl leading-relaxed font-black text-body">
              Founded to make every child a star! Duronto Cultural Academy is a happy place where we learn music and acting while having the best time ever!
            </p>
            <div className="flex flex-wrap gap-4 md:gap-6 justify-center lg:justify-start">
              <motion.div whileHover={{ scale: 1.1, rotate: -5 }} className="px-6 md:px-8 py-3 md:py-4 bg-krishnachura text-white rounded-[1.5rem] md:rounded-[2rem] font-black text-lg md:text-xl shadow-lg">Traditional</motion.div>
              <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="px-6 md:px-8 py-3 md:py-4 bg-sky text-white rounded-[1.5rem] md:rounded-[2rem] font-black text-lg md:text-xl shadow-lg">Modern</motion.div>
              <motion.div whileHover={{ scale: 1.1, rotate: -5 }} className="px-6 md:px-8 py-3 md:py-4 bg-paddy text-white rounded-[1.5rem] md:rounded-[2rem] font-black text-lg md:text-xl shadow-lg">Excellence</motion.div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <motion.div
            whileHover={{ y: -10, rotate: -2 }}
            className="bg-krishnachura p-10 md:p-16 rounded-[2.5rem] md:rounded-[4rem] shadow-2xl text-white relative overflow-hidden group border-[8px] md:border-[12px] border-white"
          >
            <div className="absolute top-0 right-0 p-6 md:p-10 opacity-20 group-hover:scale-150 transition-transform pointer-events-none">
              <Sparkles size={100} className="md:w-[150px] md:h-[150px]" />
            </div>
            <h3 className="text-3xl md:text-5xl font-black mb-6 md:mb-8">{t.about.mission}</h3>
            <p className="text-lg md:text-2xl leading-relaxed font-black">{t.about.missionDesc}</p>
          </motion.div>
          
          <motion.div
            whileHover={{ y: -10, rotate: 2 }}
            className="bg-sky p-10 md:p-16 rounded-[2.5rem] md:rounded-[4rem] shadow-2xl text-white relative overflow-hidden group border-[8px] md:border-[12px] border-white"
          >
            <div className="absolute top-0 right-0 p-6 md:p-10 opacity-20 group-hover:scale-150 transition-transform pointer-events-none">
              <Star size={100} className="md:w-[150px] md:h-[150px]" />
            </div>
            <h3 className="text-3xl md:text-5xl font-black mb-6 md:mb-8">{t.about.vision}</h3>
            <p className="text-lg md:text-2xl leading-relaxed font-black">{t.about.visionDesc}</p>
          </motion.div>
        </div>

        <div className="mt-24 md:mt-40 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-10 md:12">Our Big Boss!</h2>
          <div className="flex flex-col items-center">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 1 }}
              className="w-32 h-32 md:w-48 md:h-48 bg-secondary rounded-[2rem] md:rounded-[3rem] mb-6 md:mb-8 overflow-hidden border-[8px] md:border-[12px] border-white shadow-2xl"
            >
              <img src="https://picsum.photos/seed/founder-fun/200/200" alt="Founder" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </motion.div>
            <h4 className="text-3xl md:text-4xl font-black text-heading">John Doe</h4>
            <p className="text-xl md:text-2xl text-krishnachura font-black uppercase tracking-widest mt-2">Director & Lead Instructor</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
