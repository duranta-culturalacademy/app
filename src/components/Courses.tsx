import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { useNavigate, Link } from 'react-router-dom';
import { Clock, CreditCard, ArrowRight, Music2, Mic2, Disc, Drama, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';


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
  const [expandedStates, setExpandedStates] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();

  const toggleExpanded = (courseId: string) => {
    setExpandedStates(prev => ({ ...prev, [courseId]: !prev[courseId] }));
  };

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
        <h1 className="text-4xl sm:text-6xl md:text-[110px] md:leading-[120px] font-black mb-6 md:mb-8 flex flex-wrap items-center justify-center gap-4 md:gap-6 px-4 text-heading">
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
              <Card className={`overflow-hidden rounded-[2.5rem] md:rounded-[4rem] shadow-2xl border-[10px] md:border-[12px] border-white group transition-all duration-500 hover:scale-105 ${index === 0 ? 'bg-[#b7f9f4]' : 'bg-[#f5bdb9]'}`}>
                <div className="p-8 md:p-12 flex flex-col items-center h-[540px]">
                  <div className={`bg-white/70 backdrop-blur-md px-4 py-2 md:px-6 md:py-3 rounded-full text-primary shadow-lg flex items-center justify-center gap-3 border-2 ${index % 2 === 0 ? 'border-sky' : 'border-krishnachura'} w-fit`}>
                    <div className={`${index % 2 === 0 ? 'text-sky' : 'text-krishnachura'} w-6 h-6 md:w-8 md:h-8`}>
                      {course.id === 'music-course' ? <Music2 className="w-full h-full" /> : <Drama className="w-full h-full" />}
                    </div>
                    <h2 className={`font-black text-3xl md:text-4xl whitespace-nowrap ${index === 0 ? 'text-[#000308]' : 'text-[#030000]'}`}>
                      {language === 'bn' ? course.titleBn : course.titleEn}
                    </h2>
                  </div>

                  <div className="w-full mt-8 p-6 md:p-8 bg-white/50 rounded-[2rem] border-x-4 border-b-4 border-t-0 border-accent text-primary font-black space-y-4">
                    <h4 className={`text-[24px] font-black mb-4 text-center ${index === 0 ? 'text-[#000307]' : 'text-[#000e1c]'}`}>ভর্তি সংক্রান্ত তথ্য</h4>
                    <ul className="space-y-3 text-base md:text-lg font-bold">
                      <li className="flex gap-2"><span>*</span> <span className="text-left font-bold">সময়সীমা: ০১ জুলাই’২৬ - ১৬ জুলাই’২৬</span></li>
                      <li className="flex gap-2"><span>*</span> <span className="font-bold">ভর্তি ফি: ৫০০/-</span></li>
                      <li className="flex gap-2"><span>*</span> <span className="font-bold">ভর্তি যোগ্যতা: ৩য় শ্রেণি থেকে ৮ম শ্রেণির শিক্ষার্থী হতে হবে</span></li>
                    </ul>
                    {index === 0 ? (
                      <div className="mt-6 p-4 bg-accent/50 rounded-2xl text-primary font-black border-2 border-[#00ffe8] text-center">
                        একসাথে দুটি কোর্স এ ভর্তি হলে ভর্তি ফি ৯০০/-
                      </div>
                    ) : (
                      <div className="mt-6 p-4 bg-accent/50 rounded-2xl text-primary font-black border-2 border-[#ad1900] text-center md:text-left md:w-[267px] md:h-[66px] md:pl-[16px] md:ml-[0px] flex items-center justify-center">
                        একসাথে দুটি কোর্স এ ভর্তি হলে ভর্তি ফি ৯০০/-
                      </div>
                    )}
                  </div>
                </div>
                
                {expandedStates[course.id] && (
                  <CardContent className="p-8 md:p-16 pt-[25px] pb-[40px] space-y-8 md:space-y-10">
                    {course.id === 'music-course' ? (
                      <div className="space-y-8 md:space-y-10">
                        {/* Point 1: কোর্স সংক্রান্ত তথ্য */}
                        <div className="p-6 md:p-8 bg-white/50 rounded-[2rem] border-4 border-accent text-primary font-black space-y-4">
                          <h3 className="text-2xl md:text-3xl font-black mb-4 text-[#070000]">কোর্স সংক্রান্ত তথ্য</h3>
                          <ul className="space-y-3 text-base md:text-lg font-bold">
                            <li className="flex gap-2"><span>*</span> <span className="font-bold">কোর্স শুরু: ১৭ জুলাই ২০ ২৬</span></li>
                            <li className="flex gap-2"><span>*</span> <span className="font-bold">ক্লাসের সময়:  শুক্রবার সকাল ৯:৩০ মিনিট</span></li>
                            <li className="flex gap-2"><span>*</span> <span className="font-bold">ক্লাসের স্থান: School of the Nation (SON), Banasree</span></li>
                            <li className="flex gap-2"><span>*</span> <span className="font-bold">মাসিক ফি: ৫০০/-</span></li>
                          </ul>
                        </div>

                        {/* Point 2: বিশেষ সুযোগ */}
                        <div className="p-6 md:p-8 bg-white/50 rounded-[2rem] border-4 border-accent text-primary font-black space-y-4">
                          <h3 className="text-2xl md:text-3xl font-black mb-4 text-[#000000]">বিশেষ সুযোগ</h3>
                          <ul className="space-y-3 text-base md:text-lg font-bold">
                            <li className="flex gap-2"><span>*</span> <span className="font-bold">সংগীতের বেসিক, সুর, তাল ও কণ্ঠচর্চার প্রশিক্ষণ</span></li>
                            <li className="flex gap-2"><span>*</span> <span className="font-bold">কণ্ঠস্বরের সৌন্দর্য বৃদ্ধি ও আত্মবিশ্বাসের সাথে গান পরিবেশন শেখানো</span></li>
                            <li className="flex gap-2"><span>*</span> <span className="font-bold">কোর্স শেষে বিশেষ Theme Song এ অংশগ্রহণের সুযোগ</span></li>
                            <li className="flex gap-2"><span>*</span> <span className="font-bold">কোর্স শেষে থাকছে আকর্ষনীয় সার্টিফিকেট</span></li>
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-8 md:space-y-10">
                        {/* Point 1: কোর্স সংক্রান্ত তথ্য */}
                        <div className="p-6 md:p-8 bg-white/50 rounded-[2rem] border-4 border-accent text-primary font-black space-y-4">
                          <h3 className="text-2xl md:text-3xl font-black mb-4 text-[#000a19]">কোর্স সংক্রান্ত তথ্য</h3>
                          <ul className="space-y-3 text-base md:text-lg font-bold">
                            <li className="flex gap-2"><span>*</span> <span className="font-bold">কোর্স শুরু: ১৮ জুলাই ২০২৬</span></li>
                            <li className="flex gap-2"><span>*</span> <span className="font-bold">ক্লাসের সময়: শনিবার সকাল ৯:৩০ মিনিট</span></li>
                            <li className="flex gap-2"><span>*</span> <span className="font-bold">ক্লাসের স্থান: School of the Nation (SON), Banasree</span></li>
                            <li className="flex gap-2"><span>*</span> <span className="font-bold">মাসিক ফি: ৫০০/-</span></li>
                          </ul>
                        </div>

                        {/* Point 2: বিশেষ সুযোগ */}
                        <div className="p-6 md:p-8 bg-white/50 rounded-[2rem] border-4 border-accent text-primary font-black space-y-4">
                          <h3 className="text-2xl md:text-3xl font-black mb-4 text-[#000f1f]">বিশেষ সুযোগ</h3>
                          <ul className="space-y-3 text-base md:text-lg font-bold">
                            <li className="flex gap-2"><span>*</span> <span className="font-bold">অভিনয় বেসিক, মুখের অভিব্যক্তি, সংলাপ উপস্থাপন ও চরিত্র অভিনয়ের প্রশিক্ষণ</span></li>
                            <li className="flex gap-2"><span>*</span> <span className="font-bold">আত্মভিশ্বাস বৃদ্ধি ও মঞ্চে পারফরম্যান্স দক্ষতা উন্নয়ন</span></li>
                            <li className="flex gap-2"><span>*</span> <span className="font-bold">কোর্স শেষে মঞ্চনাটকে অভিনয় করার বিশেষ সুযোগ</span></li>
                            <li className="flex gap-2"><span>*</span> <span className="font-bold">কোর্স শেষে থাকছে আকর্ষনীয় সার্টিফিকেট</span></li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </CardContent>
                )}

                
                <CardFooter className="p-8 md:p-16 pt-0 flex gap-4 h-[150px] border-0 items-center">
                  <Button 
                    onClick={() => expandedStates[course.id] ? navigate('/admission') : toggleExpanded(course.id)}
                    className="flex-1 bg-blue-600 text-white hover:bg-orange-500 py-6 md:py-8 rounded-[1.2rem] md:rounded-[2.2rem] text-xl md:text-2xl font-black transition-all shadow-2xl shadow-blue-500/30 border-none flex items-center justify-center gap-4"
                  >
                    {expandedStates[course.id] ? "ভর্তি হোন!" : "বিস্তারিত দেখুন"} <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
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
