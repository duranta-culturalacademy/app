import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Quote, Sparkles, CheckCircle2, Bell, Music, Theater, Calendar, Clock, MapPin, Timer, Flame } from 'lucide-react';

export const Admission: React.FC = () => {
  const { language } = useLanguage();
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Target date for Music Orientation: August 14, 2026, 09:30 AM
  const targetDate = new Date('2026-08-14T09:30:00');

  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => {
    const str = num < 10 ? `0${num}` : `${num}`;
    if (language === 'bn') {
      const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
      return str.split('').map(d => bnDigits[parseInt(d, 10)] || d).join('');
    }
    return str;
  };

  const quoteBn = "”অনলাইন রেজিষ্ট্রেশন ফর্ম পুরণ করলেই থাকছে অরিয়েন্টেশন ক্লাসে অংশগ্রহন করার সুযোগ”";
  const quoteEn = "”Completing the online registration form grants you the opportunity to attend the orientation class!”";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-screen pb-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
        {/* Page Title Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-2">
            {language === 'bn' ? 'অনলাইন রেজিষ্ট্রেশন ফরম' : 'Online Registration Form'}
          </h1>
        </div>

        {/* Feature Quote / Reminder Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative overflow-hidden bg-gradient-to-r from-amber-500/10 via-[#fc6625]/15 to-[#0047AB]/10 border-2 border-[#fc6625]/40 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl backdrop-blur-md mb-8 max-w-4xl mx-auto"
        >
          {/* Background Decorative Quote Mark */}
          <div className="absolute -top-4 -left-3 text-[#fc6625]/15 pointer-events-none select-none">
            <Quote size={120} />
          </div>
          <div className="absolute -bottom-6 -right-3 text-[#0047AB]/15 pointer-events-none select-none">
            <Quote size={120} className="rotate-180" />
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="p-3 bg-[#fc6625] text-white rounded-2xl shadow-lg shrink-0 flex items-center justify-center">
              <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 animate-pulse" />
            </div>

            <div className="flex-1 text-center sm:text-left">
              {/* Header row with Special Notice badge and compact Top-Right Countdown Timer */}
              <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-2.5 mb-2">
                <div className="inline-flex items-center gap-1.5 bg-[#fc6625] text-white px-3 py-0.5 rounded-full text-xs font-black tracking-wider uppercase shadow-xs">
                  <Bell size={12} className="animate-bounce" />
                  <span>{language === 'bn' ? 'বিশেষ বার্তা' : 'Special Notice'}</span>
                </div>

                {/* Compact Top-Right Countdown Timer Badge */}
                <div className="bg-slate-900/95 text-white px-3 py-1.5 rounded-xl border border-amber-500/40 shadow-md flex items-center gap-2 shrink-0">
                  <div className="flex items-center gap-1 text-[#fc6625] font-black text-[11px]">
                    <Timer size={14} className="animate-spin text-[#fc6625]" style={{ animationDuration: '6s' }} />
                    <span className="uppercase">{language === 'bn' ? 'বাকি সময়' : 'Ends In'}:</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono font-black text-amber-300 text-xs sm:text-sm">
                    <span className="bg-white/10 px-1.5 py-0.5 rounded">{formatNumber(timeLeft.days)}<span className="text-[9px] font-sans text-gray-300 ml-0.5">{language === 'bn' ? 'দ' : 'd'}</span></span>
                    <span>:</span>
                    <span className="bg-white/10 px-1.5 py-0.5 rounded">{formatNumber(timeLeft.hours)}<span className="text-[9px] font-sans text-gray-300 ml-0.5">{language === 'bn' ? 'ঘ' : 'h'}</span></span>
                    <span>:</span>
                    <span className="bg-white/10 px-1.5 py-0.5 rounded">{formatNumber(timeLeft.minutes)}<span className="text-[9px] font-sans text-gray-300 ml-0.5">{language === 'bn' ? 'মি' : 'm'}</span></span>
                    <span>:</span>
                    <span className="bg-white/10 px-1.5 py-0.5 rounded text-[#fc6625] animate-pulse">{formatNumber(timeLeft.seconds)}<span className="text-[9px] font-sans text-gray-300 ml-0.5">{language === 'bn' ? 'সে' : 's'}</span></span>
                  </div>
                </div>
              </div>

              {/* Main Quote Text */}
              <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-slate-900 leading-snug sm:leading-relaxed tracking-tight my-1 text-balance">
                {language === 'bn' ? quoteBn : quoteEn}
              </h2>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-4">
                <span className="inline-flex items-center gap-2 bg-gradient-to-r from-[#fc6625] to-[#e05316] text-white font-extrabold text-sm sm:text-base px-4 py-2 rounded-xl shadow-md border border-white/30 transform hover:scale-105 transition-all">
                  <CheckCircle2 size={18} className="text-white animate-pulse" />
                  <span>{language === 'bn' ? 'বিনামূল্যে অরিয়েন্টেশন ক্লাসে অংশগ্রহন' : 'Free Orientation Class Opportunity'}</span>
                </span>
              </div>

              {/* Orientation Class Details Cards */}
              <div className="mt-5 pt-4 border-t border-[#fc6625]/20 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-800">
                <div className="bg-white/85 backdrop-blur-xs p-3.5 rounded-xl border border-amber-200 shadow-2xs flex flex-col gap-1 text-left">
                  <div className="flex items-center gap-1.5 font-black text-[#0047AB] text-sm sm:text-base">
                    <Music size={16} className="text-[#fc6625]" />
                    <span>{language === 'bn' ? 'সঙ্গীত (Music) অরিয়েন্টেশন' : 'Music Orientation'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 font-bold mt-1">
                    <Calendar size={14} className="text-emerald-600 shrink-0" />
                    <span>14 August 2026</span>
                    <Clock size={14} className="text-emerald-600 shrink-0 ml-1" />
                    <span>9.30 AM</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-slate-600 font-semibold text-xs mt-1">
                    <MapPin size={13} className="text-[#fc6625] shrink-0 mt-0.5" />
                    <span>School Of The Nation, Banasree, Dhaka</span>
                  </div>
                </div>

                <div className="bg-white/85 backdrop-blur-xs p-3.5 rounded-xl border border-amber-200 shadow-2xs flex flex-col gap-1 text-left">
                  <div className="flex items-center gap-1.5 font-black text-[#0047AB] text-sm sm:text-base">
                    <Theater size={16} className="text-[#fc6625]" />
                    <span>{language === 'bn' ? 'অভিনয় (Acting) অরিয়েন্টেশন' : 'Acting Orientation'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 font-bold mt-1">
                    <Calendar size={14} className="text-emerald-600 shrink-0" />
                    <span>15 August 2026</span>
                    <Clock size={14} className="text-emerald-600 shrink-0 ml-1" />
                    <span>9.30 AM</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-slate-600 font-semibold text-xs mt-1">
                    <MapPin size={13} className="text-[#fc6625] shrink-0 mt-0.5" />
                    <span>School Of The Nation, Banasree, Dhaka</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Embedded Google Form Section */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-white min-h-[600px]">
          {!iframeLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 text-slate-600 gap-3 z-10 p-6 text-center">
              <div className="w-10 h-10 border-4 border-[#0047AB] border-t-transparent rounded-full animate-spin" />
              <p className="font-bold text-sm">
                {language === 'bn' ? 'অনলাইন ভর্তি ফরম লোড হচ্ছে...' : 'Loading Admission Form...'}
              </p>
            </div>
          )}

          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSfnfGskVIOJKKZNGIQS83-piJNso-4FCNWVW1-1hjb5tSXSrA/viewform?embedded=true"
            className="w-full h-[7000px] md:h-[5500px] border-none"
            title="Admission Form"
            scrolling="no"
            onLoad={() => setIframeLoaded(true)}
          >
            Loading…
          </iframe>
        </div>
      </div>
    </motion.div>
  );
};

