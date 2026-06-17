import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { Music, Drama, Clock, CreditCard, CheckCircle2, Sparkles, ArrowRight, Music2, Mic2, Disc, Radio, BookOpen, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestore-errors';

export const Courses: React.FC = () => {
  const { t, language } = useLanguage();
  
  // Define hardcoded courses based on translations
  const courses = [
    {
      id: 'music-course',
      titleEn: t.courses.music.title,
      titleBn: t.courses.music.title,
      descriptionEn: t.courses.music.desc,
      descriptionBn: t.courses.music.desc,
      duration: t.courses.music.duration,
      fee: t.courses.music.fee,
      instructor: t.courses.instructor || 'TBD'
    },
    {
      id: 'acting-course',
      titleEn: t.courses.acting.title,
      titleBn: t.courses.acting.title,
      descriptionEn: t.courses.acting.desc,
      descriptionBn: t.courses.acting.desc,
      duration: t.courses.acting.duration,
      fee: t.courses.acting.fee,
      instructor: t.courses.instructor || 'TBD'
    }
  ];

  const [loading, setLoading] = useState(false); // No longer fetching from Firebase directly
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);

  // Remainder of component...
  return (
    <div className="container mx-auto px-4 py-16 musical-vibe min-h-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-16 md:mb-24 relative"
      >
        <div className="absolute -top-10 md:-top-20 left-1/2 -translate-x-1/2 opacity-10 pointer-events-none">
          <Disc size={100} className="md:w-[200px] md:h-[200px] animate-spin-slow" />
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-9xl font-black mb-6 md:mb-8 flex flex-wrap items-center justify-center gap-4 md:gap-6 px-4 text-heading">
          <Music2 className="text-krishnachura hidden sm:block" /> {t.courses.title} <Mic2 className="text-sky hidden sm:block" />
        </h1>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 max-w-6xl mx-auto">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", bounce: 0.4, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden rounded-[2.5rem] md:rounded-[4rem] shadow-2xl border-[8px] md:border-[12px] border-white group bg-white hover:scale-105 transition-all duration-500">
                <div className="relative h-64 md:h-96 overflow-hidden">
                  <div className={`absolute inset-0 ${index % 2 === 0 ? 'bg-sky' : 'bg-krishnachura'} opacity-50 transition-opacity`}></div>
                  <div className="absolute top-6 md:top-10 right-6 md:right-10 bg-white p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] text-primary shadow-2xl transform">
                    <div className={`${index % 2 === 0 ? 'text-sky' : 'text-krishnachura'} w-8 h-8 md:w-12 md:h-12`}>
                      <BookOpen className="w-full h-full" />
                    </div>
                  </div>
                  <div className="absolute bottom-6 md:bottom-10 left-6 md:left-12">
                    <h3 className="text-3xl md:text-5xl font-black text-white drop-shadow-lg">
                      {language === 'bn' ? course.titleBn : course.titleEn}
                    </h3>
                  </div>
                </div>
                
                <CardContent className="p-8 md:p-16 space-y-8 md:space-y-10">
                  <p className="text-lg md:text-2xl text-primary/70 leading-relaxed font-black whitespace-pre-line">
                    {language === 'bn' ? course.descriptionBn : course.descriptionEn}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                    <div className="flex items-center gap-4 md:gap-5 p-4 md:p-6 bg-accent rounded-[1.5rem] md:rounded-[2rem] shadow-inner">
                      <Clock className="w-8 h-8 md:w-10 md:h-10 text-marigold" />
                      <div>
                        <div className="text-[10px] md:text-sm uppercase tracking-widest text-primary/40 font-black">Time</div>
                        <div className="font-black text-xl md:text-2xl text-primary">{course.duration}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 md:gap-5 p-4 md:p-6 bg-accent rounded-[1.5rem] md:rounded-[2rem] shadow-inner">
                      <CreditCard className="w-8 h-8 md:w-10 md:h-10 text-paddy" />
                      <div>
                        <div className="text-[10px] md:text-sm uppercase tracking-widest text-primary/40 font-black">Fee</div>
                        <div className="font-black text-xl md:text-2xl text-primary">{course.fee}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="p-8 md:p-16 pt-0 flex gap-4">
                  <Button asChild className="flex-1 bg-krishnachura text-black hover:bg-paddy hover:text-white py-8 md:py-12 rounded-[1.5rem] md:rounded-[2.5rem] text-2xl md:text-3xl font-black transition-all shadow-2xl shadow-krishnachura/30 border-none">
                    <Link to="/admission" className="flex items-center justify-center gap-4">
                      Join Now! <ArrowRight className="w-8 h-8 md:w-10 md:h-10" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Course Details Dialog */}
        <AnimatePresence>
          {selectedCourse && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-primary/80 backdrop-blur-sm"
              onClick={() => setSelectedCourse(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-[3rem] p-8 md:p-16 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
              >
                <button 
                  onClick={() => setSelectedCourse(null)}
                  className="absolute top-8 right-8 p-3 rounded-full bg-accent hover:bg-accent/80 transition-colors text-primary"
                >
                  <X size={32} />
                </button>
                
                <h2 className="text-4xl md:text-6xl font-black text-primary mb-8">
                  {language === 'bn' ? selectedCourse.titleBn : selectedCourse.titleEn}
                </h2>
                
                <div className="prose prose-lg md:prose-xl max-w-none text-primary/80 font-medium space-y-6">
                  <p className="whitespace-pre-line text-2xl md:text-3xl font-black text-primary">
                    {language === 'bn' ? selectedCourse.descriptionBn : selectedCourse.descriptionEn}
                  </p>
                </div>
                
                <div className="mt-12 pt-12 border-t-8 border-accent">
                  <Button asChild className="w-full bg-krishnachura text-black hover:bg-paddy hover:text-white py-8 md:py-10 rounded-[2rem] text-2xl md:text-3xl font-black uppercase tracking-widest shadow-xl border-none">
                    <Link to="/admission" className="flex items-center justify-center gap-4">
                      ভর্তি হোন <ArrowRight className="w-8 h-8 md:w-10 md:h-10" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };
