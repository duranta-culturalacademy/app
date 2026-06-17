import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { Music, Drama, ArrowRight, Star, Sparkles, Palette, Heart, Mic2, Music2, Disc, Radio, Bell, Calendar } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { collection, query, onSnapshot, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const { scrollYProgress } = useScroll();
  const [notices, setNotices] = useState<any[]>([]);
  
  useEffect(() => {
    const q = query(collection(db, 'notices'), orderBy('createdAt', 'desc'), limit(3));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNotices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div className="flex flex-col gap-0 pb-0 musical-vibe">
      {/* Hero Section */}
      <section className="relative h-screen flex items-start justify-center overflow-hidden bg-primary pt-6 md:pt-10">
        <div className="absolute inset-0 z-0">
          <motion.img
            style={{ y: y1 }}
            src="https://picsum.photos/seed/culture-heritage/1920/1080"
            alt="Cultural Background"
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/20 to-accent/40"></div>
        </div>

        {/* Floating Musical Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0.2, 0.5, 0.2], 
                scale: [1, 1.3, 1],
                x: [0, Math.random() * 300 - 150, 0],
                y: [0, Math.random() * 300 - 150, 0],
                rotate: [0, 360, 0]
              }}
              transition={{ 
                duration: 10 + Math.random() * 10, 
                repeat: Infinity,
                delay: i * 0.2
              }}
              className="absolute"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                color: i % 4 === 0 ? 'var(--color-secondary)' : i % 4 === 1 ? 'var(--color-krishnachura)' : i % 4 === 2 ? 'var(--color-sky)' : 'var(--color-saffron)'
              }}
            >
              {i % 4 === 0 ? <Music size={24 + i * 2} className="md:w-10 md:h-10" /> : i % 4 === 1 ? <Music2 size={24 + i * 2} className="md:w-10 md:h-10" /> : i % 4 === 2 ? <Mic2 size={24 + i * 2} className="md:w-10 md:h-10" /> : <Disc size={24 + i * 2} className="md:w-10 md:h-10" />}
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0.6, duration: 1 }}
            className="text-5xl sm:text-7xl md:text-9xl font-black text-white mb-6 md:mb-8 leading-tight drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
          >
            <span className="inline-block hover:scale-110 transition-transform cursor-default">{t.hero.title.split(' ')[0]}</span>{' '}
            <span className="text-[#fc6625] inline-block hover:rotate-3 transition-transform cursor-default">{t.hero.title.split(' ').slice(1).join(' ')}</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg sm:text-2xl md:text-3xl text-white max-w-4xl mx-auto mb-10 md:mb-12 font-black leading-relaxed drop-shadow-lg px-4"
          >
            {t.hero.subtitle.includes("শিল্পী সত্তা") ? (
              <>
                {t.hero.subtitle.split("শিল্পী সত্তা")[0]}
                <span className="text-[#24ff4e] whitespace-nowrap">শিল্পী সত্তা</span>
                {t.hero.subtitle.split("শিল্পী সত্তা")[1]}
              </>
            ) : t.hero.subtitle.includes("an artist") ? (
              <>
                {t.hero.subtitle.split("an artist")[0]}
                <span className="text-[#fc6625]">an artist</span>
                {t.hero.subtitle.split("an artist")[1]}
              </>
            ) : t.hero.subtitle}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 md:gap-8 justify-center items-center h-[141px]"
          >
            <motion.div whileHover={{ scale: 1.1, rotate: -2 }} whileTap={{ scale: 0.9 }} className="w-full sm:w-auto">
              <Button asChild size="lg" className="w-full sm:w-auto bg-marigold text-white hover:bg-secondary transition-all text-xl md:text-2xl px-10 md:px-16 py-8 md:py-12 rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl shadow-marigold/40 border-4 md:border-8 border-white">
                <Link to="/admission" className="flex items-center gap-4">
                  {t.hero.cta} <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1, rotate: 2 }} whileTap={{ scale: 0.9 }} className="w-full sm:w-auto">
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto bg-white/20 border-2 md:border-4 border-white text-black hover:bg-secondary hover:border-secondary text-xl md:text-2xl px-10 md:px-16 py-8 md:py-12 rounded-[1.5rem] md:rounded-[2.5rem] backdrop-blur-md">
                <Link to="/courses">{t.nav.courses}</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-40 container mx-auto px-4">
        <div className="text-center mb-24">
          <h2 className="text-6xl md:text-8xl font-black mb-8 text-heading">
            {language === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us'}
          </h2>
          <div className="w-48 h-4 bg-gradient-to-r from-primary via-sky to-secondary mx-auto rounded-full shadow-lg"></div>
        </div>
        <div className="max-w-4xl mx-auto text-2xl text-body font-medium leading-relaxed text-center">
           {language === 'bn' 
            ? 'আমাদের একাডেমি সঙ্গীত এবং সংস্কৃতির চর্চার একটি মিলনস্থল। আমরা বিশ্বাস করি শিল্প সংস্কৃতি জীবনের একটি অপরিহার্য অংশ।' 
            : 'Our academy is a hub for music and cultural pursuits. We believe art and culture are an essential part of life.'
           }
        </div>
      </section>

      {/* Melodious Feedback Section - Temporarily Hidden
      <section className="py-40 container mx-auto px-4 relative overflow-hidden">
        ...
      </section>
      */}

      {/* Notices Section */}
      {notices.length > 0 && (
        <section className="py-24 md:py-40 bg-accent relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
            <Disc size={400} className="animate-spin-slow" />
          </div>
          
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-8">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-3 px-6 py-2 bg-marigold text-black rounded-full text-sm font-black mb-6 shadow-md"
                >
                  <Bell size={20} className="animate-ring" /> Important Updates!
                </motion.div>
                <h2 className="text-5xl md:text-8xl font-black text-heading">{language === 'bn' ? 'আমাদের নোটিশ' : 'Academy Notices'}</h2>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild variant="outline" className="rounded-2xl border-4 border-primary text-primary font-black px-8 py-6 text-lg hover:bg-primary hover:text-white transition-all">
                  <Link to="/contact">Contact for More Info</Link>
                </Button>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {notices.map((notice, index) => (
                <motion.div
                  key={notice.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl border-8 border-white overflow-hidden bg-white group hover:scale-[1.02] transition-all">
                    <div className="h-3 bg-marigold"></div>
                    <CardContent className="p-8 md:p-12">
                      <div className="flex justify-between items-center mb-8">
                        <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center text-marigold shadow-inner">
                          <Bell size={24} />
                        </div>
                        <div className="flex items-center gap-2 text-primary/40 font-black text-xs uppercase tracking-widest">
                          <Calendar size={14} /> {notice.date}
                        </div>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-primary mb-6 group-hover:text-secondary transition-colors">
                        {language === 'bn' ? notice.titleBn : notice.titleEn}
                      </h3>
                      <p className="text-lg text-primary/60 font-black line-clamp-4 leading-relaxed">
                        {language === 'bn' ? notice.contentBn : notice.contentEn}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}


    </div>
  );
};
