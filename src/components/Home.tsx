import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './ui/button';
import { Link, useLocation } from 'react-router-dom';
import { Music, Music2, Mic2, Disc, ArrowRight, Bell, Calendar, Theater, Palette, Check, Video } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { collection, query, onSnapshot, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Courses } from './Courses';
import { Gallery } from './Gallery';
import { Contact } from './Contact';
export const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const { scrollYProgress } = useScroll();
  const [notices, setNotices] = useState<any[]>([]);
  const location = useLocation();
  
  useEffect(() => {
    const q = query(collection(db, 'notices'), orderBy('date', 'desc'), limit(3));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNotices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      console.error("Failed to fetch notices for home page:", error);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    let pendingSection = state?.scrollTo;
    try {
      pendingSection = pendingSection || sessionStorage.getItem('pendingScrollSection');
    } catch (e) {
      console.warn("sessionStorage is not available:", e);
    }
    
    if (pendingSection) {
      try {
        sessionStorage.removeItem('pendingScrollSection');
      } catch (e) {
        console.warn("sessionStorage is not available:", e);
      }
      window.history.replaceState({}, document.title);
      
      setTimeout(() => {
        const element = document.getElementById(pendingSection);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 200);
    }
  }, [location]);

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div className="flex flex-col gap-0 pb-0 musical-vibe">
      {/* Hero Section */}
      <section id="hero" className="scroll-mt-24 lg:scroll-mt-36 relative h-screen flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <motion.img
            style={{ y: y1, paddingLeft: '0px' }}
            src="/Duranta_Grope_Photo.JPG"
            alt="Cultural Background"
            className="absolute inset-0 w-full h-full object-cover opacity-60 border-0"
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

        <div className="container mx-auto px-4 relative z-10 text-center mt-40 md:mt-48 lg:mt-52" style={{ marginLeft: 'clamp(0px, 0.5vw, 6.5px)', marginBottom: '0px' }}>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0.6, duration: 1 }}
            className="text-5xl sm:text-7xl md:text-9xl font-black text-white mb-6 md:mb-8 leading-tight drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
          >
            <span className="inline-block hover:scale-110 transition-transform cursor-default">{t.hero.title.split(' ')[0]}</span>{' '}
            <span className="text-[#fc6625] inline-block hover:rotate-3 transition-transform cursor-default" style={{ fontSize: 'clamp(2.5rem, 8vw, 128px)' }}>{t.hero.title.split(' ').slice(1).join(' ')}</span>
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
            className="flex flex-col sm:flex-row gap-4 md:gap-8 justify-center items-center"
            style={{ height: 'auto', minHeight: '150px', marginTop: '0px', marginBottom: '-23px', width: '100%', maxWidth: '514px', marginLeft: 'auto', marginRight: 'auto', lineHeight: '24px' }}
          >
            <motion.div whileHover={{ scale: 1.1, rotate: -2 }} whileTap={{ scale: 0.9 }} className="w-full sm:w-auto">
              <Button asChild size="lg" className="w-full sm:w-auto bg-marigold text-white hover:bg-secondary transition-all text-xl md:text-2xl px-10 md:px-16 py-8 md:py-12 rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl shadow-marigold/40 border-4 md:border-8 border-white">
                <Link to="/admission" className="flex items-center gap-4">
                  {t.hero.cta} <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1, rotate: 2 }} whileTap={{ scale: 0.9 }} className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/20 border-2 md:border-4 border-white text-black hover:bg-secondary hover:border-secondary text-xl md:text-2xl px-10 md:px-16 py-8 md:py-12 rounded-[1.5rem] md:rounded-[2.5rem] backdrop-blur-md" onClick={(e) => {
                e.preventDefault();
                document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}>
                {t.nav.courses}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="scroll-mt-24 lg:scroll-mt-36 pt-[70px] pb-40 container mx-auto px-4">
        <div className="text-center mb-24">
          <h2 className="text-6xl md:text-8xl font-black mb-8 text-heading">
            {language === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us'}
          </h2>
          <div className="bg-gradient-to-r from-primary via-sky to-secondary mx-auto rounded-full shadow-lg" style={{ width: '100%', maxWidth: '500px', height: '10px' }}></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-stretch max-w-5xl mx-auto">
          {/* Left Column: Logo inside a dynamic rectangular bordered box */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center justify-center border-4 border-dashed border-primary/40 rounded-3xl p-6 lg:p-8 bg-white/5 backdrop-blur-sm hover:border-primary transition-colors duration-300 min-h-[200px] md:min-h-[250px] lg:min-h-full"
          >
            <motion.img 
              whileHover={{ scale: 1.05, rotate: 1 }}
              src="https://i.postimg.cc/BQc1fw58/logo.png" 
              alt="Logo" 
              className="w-32 md:w-40 lg:w-48 h-auto object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.15)]"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Right Column: Key organization credentials */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center space-y-4 md:space-y-6 lg:space-y-8 p-6 lg:p-8 border-4 border-solid border-primary/30 rounded-3xl bg-primary/5 backdrop-blur-sm min-h-[200px] md:min-h-[250px] lg:min-h-full text-left"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-heading tracking-tight">
              {language === 'bn' ? (
                <span><strong>দুরন্ত কালচারাল একাডেমি</strong></span>
              ) : (
                <span><strong>Duronto Cultural Academy</strong></span>
              )}
            </h2>

            <div className="space-y-3 md:space-y-4 lg:space-y-6">
              <h4 className="text-base md:text-lg lg:text-2xl text-body leading-relaxed">
                {language === 'bn' ? (
                  <><strong>মূলমন্ত্র:</strong> শিল্প ও সংস্কৃতি চর্চায় আমরা দুরন্ত</>
                ) : (
                  <><strong>Motto:</strong> We are Duronto in practicing arts & culture</>
                )}
              </h4>

              <h4 className="text-base md:text-lg lg:text-2xl text-body leading-relaxed">
                {language === 'bn' ? (
                  <><strong>স্লোগান:</strong> "পৃথিবীকে গড়তে ভাই, সংস্কৃতিমান মানুষ চাই"</>
                ) : (
                  <><strong>Slogan:</strong> "To build the world, we want cultured humans"</>
                )}
              </h4>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto mt-12 md:mt-16 text-xl md:text-2xl text-[#fc6625] font-medium leading-relaxed text-justify px-4"
        >
          {language === 'bn' ? (
            <p className="text-justify">
              দুরন্ত কালচারাল একাডেমি হলো শিশু-কিশোর ও তরুণদের জন্য এমন একটি সৃজনশীল সাংস্কৃতিক প্ল্যাটফর্ম যেখানে অভিনয়, সংগীত, উপস্থাপনা, আবৃত্তি, চিত্রাঙ্কন ও বিভিন্ন সাংস্কৃতিক কার্যক্রমের মাধ্যমে তাদের মধ্যকার লুকিয়ে থাকা প্রতিভার বিকাশ ঘটানো হয়। আমরা বিশ্বাস করি, একজন মানুষের পূর্ণাঙ্গ বিকাশ শুধুমাত্র প্রাতিষ্ঠানিক শিক্ষার মাধ্যমে সম্ভব নয়; প্রয়োজন সৃজনশীলতা, আত্মবিশ্বাস, নৈতিক মূল্যবোধ এবং সংস্কৃতির চর্চা। সেই লক্ষ্যেই দুরন্ত কালচারাল একাডেমি কাজ করে যাচ্ছে নতুন প্রজন্মকে সংস্কৃতিমনা, আত্মবিশ্বাসী ও মানবিক মানুষ হিসেবে গড়ে তুলতে।
            </p>
          ) : (
            <p className="text-justify">
              Duronto Cultural Academy is a creative cultural platform for children, adolescents, and youth where their hidden talents are nurtured through acting, music, presentation, recitation, drawing, and various cultural activities. We believe that the complete development of a human being is not possible through institutional education alone; it requires creativity, self-confidence, moral values, and cultural practice. With that goal, Duronto Cultural Academy is working to build a cultured, confident, and humane new generation.
            </p>
          )}
        </motion.div>

        {/* Vision and Mission & Objectives Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-stretch max-w-5xl mx-auto mt-12 md:mt-16">
          {/* Left Column: Vision */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col justify-start space-y-4 p-6 lg:p-8 border-4 border-solid border-primary/30 rounded-3xl bg-primary/5 backdrop-blur-sm text-left"
          >
            <h3 className="text-2xl md:text-3xl font-extrabold text-[#fc6625] tracking-tight">
              {language === 'bn' ? (
                <strong>আমাদের ভিশন</strong>
              ) : (
                <strong>Our Vision</strong>
              )}
            </h3>
            <div className="text-base md:text-lg text-body font-medium leading-relaxed text-justify">
              {language === 'bn' ? (
                <p>
                  দুরন্ত কালচারাল একাডেমির ভিশন হলো শিল্প ও সংস্কৃতির চর্চার মাধ্যমে একটি সংস্কৃতিমান, সৃজনশীল ও আত্মবিশ্বাসী প্রজন্ম গড়ে তোলা। আমরা বিশ্বাস করি, প্রতিটি শিশুর মাঝে লুকিয়ে থাকা সৃজনশীল সম্ভাবনাকে সঠিক দিকনির্দেশনা ও প্রশিক্ষণের মাধ্যমে বিকশিত করা সম্ভব।
                  <br /><br />
                  আমরা এমন একটি প্রজন্ম তৈরি করবো, যারা নিজেদের সংস্কৃতি ও ঐতিহ্যকে ধারণ করে সৃজনশীল চিন্তা, মানবিক মূল্যবোধ ও আত্মবিশ্বাসের মাধ্যমে সমাজে ইতিবাচক পরিবর্তন আনতে সক্ষম হবে।
                </p>
              ) : (
                <p>
                  The vision of Duronto Cultural Academy is to build a cultured, creative, and confident generation through the practice of art and culture. We believe that it is possible to develop the creative potential hidden in every child through proper guidance and training.
                  <br /><br />
                  We will create a generation that can bring positive changes to society by holding onto their own culture and heritage with creative thoughts, moral values, and self-confidence.
                </p>
              )}
            </div>
          </motion.div>

          {/* Right Column: Mission & Objectives */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col justify-start space-y-4 p-6 lg:p-8 border-4 border-solid border-primary/30 rounded-3xl bg-primary/5 backdrop-blur-sm text-left"
          >
            <h3 className="text-2xl md:text-3xl font-extrabold text-[#fc6625] tracking-tight">
              {language === 'bn' ? (
                <strong>আমাদের লক্ষ্য ও উদ্দেশ্য</strong>
              ) : (
                <strong>Our Mission & Objectives</strong>
              )}
            </h3>
            <div className="text-base md:text-lg text-body font-medium leading-relaxed text-justify">
              {language === 'bn' ? (
                <p>
                  দুরন্ত কালচারাল একাডেমির লক্ষ্য হলো শিশু-কিশোর ও তরুণদের প্রতিভা বিকাশের সুযোগ তৈরি করা এবং অভিনয়, সংগীত ও সাংস্কৃতিক চর্চার মাধ্যমে তাদের আত্মবিশ্বাস, সৃজনশীলতা ও উপস্থাপনা দক্ষতা বৃদ্ধি করা।
                  <br /><br />
                  আমরা শিক্ষার্থীদের বাংলা সংস্কৃতি ও ঐতিহ্যের সঙ্গে পরিচিত করার পাশাপাশি মঞ্চ, মিডিয়া ও সাংস্কৃতিক অঙ্গনে দক্ষভাবে অংশগ্রহণের জন্য প্রস্তুত করি। একটি নিরাপদ ও আনন্দময় পরিবেশে ভবিষ্যতের দক্ষ শিল্পী, সাংস্কৃতিক কর্মী ও দায়িত্বশীল নাগরিক গড়ে তোলাই আমাদের মূল উদ্দেশ্য।
                </p>
              ) : (
                <p>
                  The goal of Duronto Cultural Academy is to create opportunities for children, adolescents, and youth to develop their talents and increase their self-confidence, creativity, and presentation skills through acting, music, and cultural practice.
                  <br /><br />
                  We prepare students for skilled participation on stage, media, and the cultural arena, alongside introducing them to Bengali culture and heritage. Our main objective is to build future skilled artists, cultural workers, and responsible citizens in a safe and joyful environment.
                </p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Our Major Activities Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full max-w-5xl mx-auto mt-20 md:mt-28 mb-12 px-4"
        >
          <div className="bg-primary/10 border-2 border-primary/20 rounded-3xl p-6 md:p-8 text-center backdrop-blur-sm">
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#fc6625] tracking-wide inline-block">
              {language === 'bn' ? (
                <strong>আমাদের প্রধান কার্যক্রমসমূহ</strong>
              ) : (
                <strong>Our Major Activities</strong>
              )}
            </h3>
          </div>
        </motion.div>

        {/* Major Activities Grid (4 Topics) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto px-4">
          
          {/* 1st Topic: Theater & Acting Practice */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col space-y-4 p-6 lg:p-8 border-4 border-solid border-primary/30 rounded-3xl bg-primary/5 backdrop-blur-sm text-left hover:border-primary/50 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-2xl text-[#fc6625]">
                <Theater size={32} />
              </div>
              <h4 className="text-xl md:text-2xl font-extrabold text-heading">
                {language === 'bn' ? 'থিয়েটার ও নাট্যচর্চা' : 'Theater & Acting Practice'}
              </h4>
            </div>
            
            <ul className="space-y-3 pt-2">
              <li className="flex items-start gap-3 text-base md:text-lg text-body">
                <Check size={20} className="text-emerald-500 shrink-0 mt-1" />
                <span>
                  {language === 'bn' 
                    ? 'অভিনয় দক্ষতা, সৃজনশীলতা ও আত্মবিশ্বাস বৃদ্ধির জন্য নিয়মিত নাট্য প্রশিক্ষণ প্রদান।' 
                    : 'Providing regular theatre training to enhance acting skills, creativity, and self-confidence.'}
                </span>
              </li>
              <li className="flex items-start gap-3 text-base md:text-lg text-body">
                <Check size={20} className="text-emerald-500 shrink-0 mt-1" />
                <span>
                  {language === 'bn' 
                    ? 'গত ১০ বছর ধরে “দুরন্ত থিয়েটার”-এর মাধ্যমে মঞ্চ নাটক ও নাট্যচর্চার আয়োজন।' 
                    : 'Organizing stage plays and theatre practices through "Duronto Theater" for the past 10 years.'}
                </span>
              </li>
              <li className="flex items-start gap-3 text-base md:text-lg text-body">
                <Check size={20} className="text-emerald-500 shrink-0 mt-1" />
                <span>
                  {language === 'bn' 
                    ? 'শিক্ষার্থীদের মঞ্চে অভিনয় ও নিজেদের প্রতিভা প্রকাশের সুযোগ তৈরি।' 
                    : 'Creating opportunities for students to perform on stage and express their talents.'}
                </span>
              </li>
              <li className="flex items-start gap-3 text-base md:text-lg text-body">
                <Check size={20} className="text-emerald-500 shrink-0 mt-1" />
                <span>
                  {language === 'bn' 
                    ? 'নাটকের মাধ্যমে দলীয় কাজ, নেতৃত্ব ও উপস্থাপন দক্ষতা উন্নয়ন।' 
                    : 'Developing teamwork, leadership, and presentation skills through drama.'}
                </span>
              </li>
            </ul>
          </motion.div>

          {/* 2nd Topic: Music Education & Practice */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col space-y-4 p-6 lg:p-8 border-4 border-solid border-primary/30 rounded-3xl bg-primary/5 backdrop-blur-sm text-left hover:border-primary/50 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-2xl text-[#fc6625]">
                <Music2 size={32} />
              </div>
              <h4 className="text-xl md:text-2xl font-extrabold text-heading">
                {language === 'bn' ? 'সংগীত শিক্ষা ও চর্চা' : 'Music Education & Practice'}
              </h4>
            </div>
            
            <ul className="space-y-3 pt-2">
              <li className="flex items-start gap-3 text-base md:text-lg text-body">
                <Check size={20} className="text-emerald-500 shrink-0 mt-1" />
                <span>
                  {language === 'bn' 
                    ? 'কণ্ঠশিল্প, সংগীতের মৌলিক জ্ঞান ও পরিবেশনা কৌশলের প্রশিক্ষণ প্রদান।' 
                    : 'Providing training in vocal arts, basic musical knowledge, and performance techniques.'}
                </span>
              </li>
              <li className="flex items-start gap-3 text-base md:text-lg text-body">
                <Check size={20} className="text-emerald-500 shrink-0 mt-1" />
                <span>
                  {language === 'bn' 
                    ? 'নিয়মিত অনুশীলনের মাধ্যমে শিক্ষার্থীদের সংগীত প্রতিভার বিকাশ।' 
                    : "Developing students' musical talents through regular practice."}
                </span>
              </li>
              <li className="flex items-start gap-3 text-base md:text-lg text-body">
                <Check size={20} className="text-emerald-500 shrink-0 mt-1" />
                <span>
                  {language === 'bn' 
                    ? 'বিভিন্ন সাংস্কৃতিক অনুষ্ঠানে অংশগ্রহণের মাধ্যমে দক্ষতা প্রকাশের সুযোগ।' 
                    : 'Opportunities to showcase skills through participation in various cultural events.'}
                </span>
              </li>
              <li className="flex items-start gap-3 text-base md:text-lg text-body">
                <Check size={20} className="text-emerald-500 shrink-0 mt-1" />
                <span>
                  {language === 'bn' 
                    ? 'আমাদের শিক্ষার্থীরা সংগীতের বিভিন্ন ক্ষেত্রে সফলতার স্বাক্ষর রাখছে।' 
                    : 'Our students are leaving marks of success in various fields of music.'}
                </span>
              </li>
            </ul>
          </motion.div>

          {/* 3rd Topic: Fine Arts & Painting Practice */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col space-y-4 p-6 lg:p-8 border-4 border-solid border-primary/30 rounded-3xl bg-primary/5 backdrop-blur-sm text-left hover:border-primary/50 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-2xl text-[#fc6625]">
                <Palette size={32} />
              </div>
              <h4 className="text-xl md:text-2xl font-extrabold text-heading">
                {language === 'bn' ? 'চারুকলা ও চিত্রাঙ্কন প্রশিক্ষণ' : 'Fine Arts & Painting Training'}
              </h4>
            </div>
            
            <ul className="space-y-3 pt-2">
              <li className="flex items-start gap-3 text-base md:text-lg text-body">
                <Check size={20} className="text-emerald-500 shrink-0 mt-1" />
                <span>
                  {language === 'bn' 
                    ? 'শিক্ষার্থীদের আঁকা, রঙের ব্যবহার ও সৃজনশীল প্রকাশভঙ্গির প্রশিক্ষণ প্রদান।' 
                    : 'Providing training in drawing, color usage, and creative expression.'}
                </span>
              </li>
              <li className="flex items-start gap-3 text-base md:text-lg text-body">
                <Check size={20} className="text-emerald-500 shrink-0 mt-1" />
                <span>
                  {language === 'bn' 
                    ? 'কল্পনাশক্তি, নান্দনিক বোধ ও সৃজনশীল চিন্তার বিকাশে সহায়তা।' 
                    : 'Assisting in the development of imagination, aesthetic sense, and creative thinking.'}
                </span>
              </li>
              <li className="flex items-start gap-3 text-base md:text-lg text-body">
                <Check size={20} className="text-emerald-500 shrink-0 mt-1" />
                <span>
                  {language === 'bn' 
                    ? 'বিভিন্ন শিল্পকর্ম ও চিত্রাঙ্কন কার্যক্রমের মাধ্যমে প্রতিভা বিকাশের সুযোগ।' 
                    : 'Opportunities to develop talents through various artworks and painting activities.'}
                </span>
              </li>
              <li className="flex items-start gap-3 text-base md:text-lg text-body">
                <Check size={20} className="text-emerald-500 shrink-0 mt-1" />
                <span>
                  {language === 'bn' 
                    ? 'শিল্পের প্রতি আগ্রহ ও ভালোবাসা তৈরি করা।' 
                    : 'Building interest and love for art.'}
                </span>
              </li>
            </ul>
          </motion.div>

          {/* 4th Topic: Recitation Training */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col space-y-4 p-6 lg:p-8 border-4 border-solid border-primary/30 rounded-3xl bg-primary/5 backdrop-blur-sm text-left hover:border-primary/50 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-2xl text-[#fc6625]">
                <Mic2 size={32} />
              </div>
              <h4 className="text-xl md:text-2xl font-extrabold text-heading">
                {language === 'bn' ? 'আবৃত্তি শিক্ষা' : 'Recitation Training'}
              </h4>
            </div>
            
            <ul className="space-y-3 pt-2">
              <li className="flex items-start gap-3 text-base md:text-lg text-body">
                <Check size={20} className="text-emerald-500 shrink-0 mt-1" />
                <span>
                  {language === 'bn' 
                    ? 'শুদ্ধ উচ্চারণ, কণ্ঠস্বর নিয়ন্ত্রণ ও আবৃত্তি কৌশলের প্রশিক্ষণ প্রদান।' 
                    : 'Providing training in correct pronunciation, voice control, and recitation techniques.'}
                </span>
              </li>
              <li className="flex items-start gap-3 text-base md:text-lg text-body">
                <Check size={20} className="text-emerald-500 shrink-0 mt-1" />
                <span>
                  {language === 'bn' 
                    ? 'কবিতা ও সাহিত্যের মাধ্যমে ভাষার সৌন্দর্য উপলব্ধিতে সহায়তা।' 
                    : 'Helping realize the beauty of language through poetry and literature.'}
                </span>
              </li>
              <li className="flex items-start gap-3 text-base md:text-lg text-body">
                <Check size={20} className="text-emerald-500 shrink-0 mt-1" />
                <span>
                  {language === 'bn' 
                    ? 'মঞ্চ উপস্থাপনা ও আত্মবিশ্বাস বৃদ্ধির সুযোগ তৈরি।' 
                    : 'Creating opportunities for stage presentation and building self-confidence.'}
                </span>
              </li>
              <li className="flex items-start gap-3 text-base md:text-lg text-body">
                <Check size={20} className="text-emerald-500 shrink-0 mt-1" />
                <span>
                  {language === 'bn' 
                    ? 'বিভিন্ন সাংস্কৃতিক অনুষ্ঠানে অংশগ্রহণের মাধ্যমে দক্ষতা উন্নয়ন।' 
                    : 'Developing skills through participation in various cultural events.'}
                </span>
              </li>
            </ul>
          </motion.div>

        </div>

        {/* Our Platforms Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full max-w-5xl mx-auto mt-20 md:mt-28 mb-12 px-4"
        >
          <div className="bg-primary/10 border-2 border-primary/20 rounded-3xl p-6 md:p-8 text-center backdrop-blur-sm">
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#fc6625] tracking-wide inline-block">
              {language === 'bn' ? (
                <strong>আমাদের প্লাটফর্মসমূহ</strong>
              ) : (
                <strong>Our Platforms</strong>
              )}
            </h3>
          </div>
        </motion.div>

        {/* Platforms Grid (4 Platforms) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto px-4">
          
          {/* 1st Platform: Theatre */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 lg:p-8 border-4 border-solid border-primary/30 rounded-3xl bg-primary/5 backdrop-blur-sm text-left hover:border-primary/50 transition-all duration-300"
          >
            {/* Logo area */}
            <div className="shrink-0 flex items-center justify-center w-20 h-20 bg-gradient-to-tr from-[#fc6625] to-[#ff8f59] text-white rounded-2xl shadow-xl shadow-[#fc6625]/20 hover:scale-110 transition-transform duration-300">
              <Theater size={40} className="stroke-[1.5]" />
            </div>
            {/* Content area */}
            <div className="flex-1 space-y-2 text-center sm:text-left">
              <h4 className="text-xl md:text-2xl font-extrabold text-heading">
                {language === 'bn' ? 'দুরন্ত কিশোর থিয়েটার' : 'Duronto Kishor Theater'}
              </h4>
              <p className="text-base text-body leading-relaxed text-justify">
                {language === 'bn' 
                  ? 'দুরন্ত কালচারাল একাডেমির নাট্যচর্চার অন্যতম একটি শাখা। এর মাধ্যমে নিয়মিত নাটক, মঞ্চায়ন ও অভিনয় প্রশিক্ষণের আয়োজন করা হয় এবং শিশু-কিশোরদের অভিনয় দক্ষতা, সৃজনশীলতা ও আত্মবিশ্বাস বিকাশে কাজ করা হয়।'
                  : 'One of the core wings of Duronto Cultural Academy for theatre practices. It conducts regular drama, staging, and acting training, working to develop the acting skills, creativity, and self-confidence of children and adolescents.'}
              </p>
            </div>
          </motion.div>

          {/* 2nd Platform: Studio */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 lg:p-8 border-4 border-solid border-primary/30 rounded-3xl bg-primary/5 backdrop-blur-sm text-left hover:border-primary/50 transition-all duration-300"
          >
            {/* Logo area */}
            <div className="shrink-0 flex items-center justify-center w-20 h-20 bg-gradient-to-tr from-[#fc6625] to-[#ff8f59] text-white rounded-2xl shadow-xl shadow-[#fc6625]/20 hover:scale-110 transition-transform duration-300">
              <Video size={40} className="stroke-[1.5]" />
            </div>
            {/* Content area */}
            <div className="flex-1 space-y-2 text-center sm:text-left">
              <h4 className="text-xl md:text-2xl font-extrabold text-heading">
                {language === 'bn' ? 'দুরন্ত স্টুডিও' : 'Duronto Studio'}
              </h4>
              <p className="text-base text-body leading-relaxed text-justify">
                {language === 'bn' 
                  ? 'দুরন্ত কালচারাল একাডেমির সৃজনশীল প্রযোজনা ও মিডিয়া কার্যক্রমের একটি গুরুত্বপূর্ণ প্ল্যাটফর্ম। এর মাধ্যমে সংগীত, সাংস্কৃতিক পরিবেশনা, অডিও-ভিজ্যুয়াল কনটেন্ট ও বিভিন্ন সৃজনশীল কার্যক্রম পরিচালনা করা হয়।'
                  : 'A vital platform for creative production and media activities under Duronto Cultural Academy. It manages music, cultural performances, audio-visual content creation, and various innovative projects.'}
              </p>
            </div>
          </motion.div>

          {/* 3rd Platform: Art Institute */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 lg:p-8 border-4 border-solid border-primary/30 rounded-3xl bg-primary/5 backdrop-blur-sm text-left hover:border-primary/50 transition-all duration-300"
          >
            {/* Logo area */}
            <div className="shrink-0 flex items-center justify-center w-20 h-20 bg-gradient-to-tr from-[#fc6625] to-[#ff8f59] text-white rounded-2xl shadow-xl shadow-[#fc6625]/20 hover:scale-110 transition-transform duration-300">
              <Palette size={40} className="stroke-[1.5]" />
            </div>
            {/* Content area */}
            <div className="flex-1 space-y-2 text-center sm:text-left">
              <h4 className="text-xl md:text-2xl font-extrabold text-heading">
                {language === 'bn' ? 'দুরন্ত আর্ট ইন্সটিটিউট' : 'Duronto Art Institute'}
              </h4>
              <p className="text-base text-body leading-relaxed text-justify">
                {language === 'bn' 
                  ? 'চারুকলা ও চিত্রাঙ্কন শিক্ষার জন্য দুরন্ত কালচারাল একাডেমির একটি বিশেষায়িত শাখা। এখানে শিক্ষার্থীদের আঁকা, রং, সৃজনশীল চিন্তা ও বিভিন্ন শিল্পকলার বিষয়ে প্রশিক্ষণ প্রদান করা হয়।'
                  : 'A specialized wing of Duronto Cultural Academy dedicated to fine arts and painting education. It provides training in drawing, colors, creative thinking, and various forms of fine arts.'}
              </p>
            </div>
          </motion.div>

          {/* 4th Platform: Recitation Association */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 lg:p-8 border-4 border-solid border-primary/30 rounded-3xl bg-primary/5 backdrop-blur-sm text-left hover:border-primary/50 transition-all duration-300"
          >
            {/* Logo area */}
            <div className="shrink-0 flex items-center justify-center w-20 h-20 bg-gradient-to-tr from-[#fc6625] to-[#ff8f59] text-white rounded-2xl shadow-xl shadow-[#fc6625]/20 hover:scale-110 transition-transform duration-300">
              <Mic2 size={40} className="stroke-[1.5]" />
            </div>
            {/* Content area */}
            <div className="flex-1 space-y-2 text-center sm:text-left">
              <h4 className="text-xl md:text-2xl font-extrabold text-heading">
                {language === 'bn' ? 'দুরন্ত আবৃত্তি সংসদ' : 'Duronto Recitation Association'}
              </h4>
              <p className="text-base text-body leading-relaxed text-justify">
                {language === 'bn' 
                  ? 'বাংলা ভাষা ও সাহিত্যের চর্চাকে এগিয়ে নিতে গঠিত একটি সাংস্কৃতিক শাখা। এর মাধ্যমে আবৃত্তি প্রশিক্ষণ, কবিতা চর্চা, উপস্থাপনা দক্ষতা বৃদ্ধি ও বিভিন্ন সাংস্কৃতিক আয়োজনে অংশগ্রহণের সুযোগ তৈরি করা হয়।'
                  : 'A cultural wing formed to promote the practice of Bengali language and literature. It creates opportunities for recitation training, poetry appreciation, presentation skill enhancement, and participation in cultural events.'}
              </p>
            </div>
          </motion.div>

        </div>

        {/* Why Duronto Cultural Academy? Unified Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full max-w-5xl mx-auto mt-20 md:mt-28 px-4"
        >
          <div className="p-6 md:p-8 border-4 border-solid border-primary/30 rounded-3xl bg-primary/5 backdrop-blur-sm text-left space-y-6 md:space-y-8">
            {/* Heading inside the card */}
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#fc6625] tracking-wide block border-b-2 border-primary/20 pb-4">
              {language === 'bn' ? (
                <strong>কেন দুরন্ত কালচারাল একাডেমি?</strong>
              ) : (
                <strong>Why Duronto Cultural Academy?</strong>
              )}
            </h3>

            {/* List inside the card */}
            <ul className="space-y-4 md:space-y-6">
              <li className="flex items-start gap-4 text-lg md:text-xl lg:text-2xl text-body font-medium leading-relaxed">
                <span className="text-emerald-500 shrink-0 select-none">✔</span>
                <span>
                  {language === 'bn' 
                    ? 'অভিজ্ঞ প্রশিক্ষকের মাধ্যমে নিয়মিত প্রশিক্ষণ' 
                    : 'Regular training by experienced instructors'}
                </span>
              </li>
              <li className="flex items-start gap-4 text-lg md:text-xl lg:text-2xl text-body font-medium leading-relaxed">
                <span className="text-emerald-500 shrink-0 select-none">✔</span>
                <span>
                  {language === 'bn' 
                    ? 'অভিনয় ও সংগীতের বাস্তব অভিজ্ঞতা অর্জনের সুযোগ' 
                    : 'Opportunity to gain practical experience in acting and music'}
                </span>
              </li>
              <li className="flex items-start gap-4 text-lg md:text-xl lg:text-2xl text-body font-medium leading-relaxed">
                <span className="text-emerald-500 shrink-0 select-none">✔</span>
                <span>
                  {language === 'bn' 
                    ? 'মঞ্চ ও মিডিয়ায় অংশগ্রহণের সুযোগ' 
                    : 'Opportunity to participate on stage and in media'}
                </span>
              </li>
              <li className="flex items-start gap-4 text-lg md:text-xl lg:text-2xl text-body font-medium leading-relaxed">
                <span className="text-emerald-500 shrink-0 select-none">✔</span>
                <span>
                  {language === 'bn' 
                    ? 'সৃজনশীল ও বন্ধুত্বপূর্ণ শিক্ষার পরিবেশ' 
                    : 'Creative and friendly learning environment'}
                </span>
              </li>
              <li className="flex items-start gap-4 text-lg md:text-xl lg:text-2xl text-body font-medium leading-relaxed">
                <span className="text-emerald-500 shrink-0 select-none">✔</span>
                <span>
                  {language === 'bn' 
                    ? 'প্রতিভা বিকাশের জন্য বিশেষ যত্ন ও দিকনির্দেশনা' 
                    : 'Special care and guidance for talent development'}
                </span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Join With Us Unified Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full max-w-5xl mx-auto mt-12 md:mt-16 px-4"
        >
          <div className="p-6 md:p-8 border-4 border-solid border-primary/30 rounded-3xl bg-primary/5 backdrop-blur-sm text-left space-y-6 md:space-y-8">
            {/* Heading inside the card */}
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#fc6625] tracking-wide block border-b-2 border-primary/20 pb-4">
              {language === 'bn' ? (
                <strong>যুক্ত হোন আমাদের সাথে</strong>
              ) : (
                <strong>Join Us</strong>
              )}
            </h3>

            {/* Description inside the card */}
            <div className="text-xl md:text-2xl text-body font-medium leading-relaxed text-justify space-y-4">
              {language === 'bn' ? (
                <>
                  <p>
                    আপনার সন্তানের সৃজনশীল ভবিষ্যতের যাত্রায় দুরন্ত কালচারাল একাডেমি হতে পারে একটি বিশ্বস্ত সঙ্গী।
                  </p>
                  <p>
                    আসুন, শিল্প ও সংস্কৃতির মাধ্যমে গড়ে তুলি একটি আত্মবিশ্বাসী, সৃজনশীল ও সংস্কৃতিমান প্রজন্ম।
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Duronto Cultural Academy can be a trusted companion in your child's journey towards a creative future.
                  </p>
                  <p>
                    Let us build a confident, creative, and cultured generation through art and culture.
                  </p>
                </>
              )}
            </div>
          </div>
        </motion.div>

      </section>

      {/* Courses, Gallery, and Contact Sections */}
      <div id="courses" className="scroll-mt-24 lg:scroll-mt-36">
        <Courses />
      </div>

      <div id="gallery" className="scroll-mt-24 lg:scroll-mt-36">
        <Gallery />
      </div>

      <div id="contact" className="scroll-mt-24 lg:scroll-mt-36">
        <Contact />
      </div>


    </div>
  );
};
