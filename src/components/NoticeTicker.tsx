import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { collection, query, onSnapshot, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Bell, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NoticeTicker: React.FC = () => {
  const { language } = useLanguage();
  const [notices, setNotices] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'notices'), orderBy('date', 'desc'), limit(5));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNotices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      console.error("Failed to fetch ticker notices:", error);
    });
    return () => unsubscribe();
  }, []);

  // Standard elegant general notices if none are present in Firestore
  const defaultNotices = language === 'bn' ? [
    'আগামী ০১ জুলাই ২০২৬ থেকে শুরু হচ্ছে দুরন্ত কালচারাল একাডেমির সঙ্গীত ও অভিনয় কোর্সের নতুন ব্যাচের রেজিস্ট্রেশন | বিস্তারিত জানতে আমাদের ফেসবুক পেজের সাথে যুক্ত থাকুন |'
  ] : [
    'Registration for the new batch of Music and Acting courses at Duronto Cultural Academy starts on July 01, 2026 | Follow our Facebook page to learn more |'
  ];

  const displayedNotices = notices.length > 0 
    ? notices.map(n => language === 'bn' ? n.titleBn : n.titleEn)
    : defaultNotices;

  const formatNoticeText = (text: string) => {
    if (text.includes("ফেসবুক পেজের")) {
      const parts = text.split("ফেসবুক পেজের");
      return (
        <span className="text-white">
          {parts[0]}
          <a 
            href="https://www.facebook.com/duranta.culturalacademy.2012" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-300 hover:text-blue-100 hover:underline font-black mx-1 inline-block"
            onClick={(e) => e.stopPropagation()}
          >
            ফেসবুক পেজের
          </a>
          {parts[1]}
        </span>
      );
    }
    if (text.includes("Facebook page")) {
      const parts = text.split("Facebook page");
      return (
        <span className="text-white">
          {parts[0]}
          <a 
            href="https://www.facebook.com/duranta.culturalacademy.2012" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-300 hover:text-blue-100 hover:underline font-black mx-1 inline-block"
            onClick={(e) => e.stopPropagation()}
          >
            Facebook page
          </a>
          {parts[1]}
        </span>
      );
    }
    return <span className="text-white">{text}</span>;
  };

  return (
    <div className="w-full max-w-[calc(100%-2rem)] md:max-w-[calc(100%-6rem)] lg:w-[1200px] mx-auto px-1 sm:px-0 z-40 relative select-none">
      <div 
        style={{ backgroundColor: '#826b50' }} 
        className="flex items-center backdrop-blur-md border border-white/20 rounded-full h-11 sm:h-12 shadow-md overflow-hidden pl-1 pr-4"
      >
        {/* notice tag */}
        <div 
          style={{ backgroundColor: '#f75113' }}
          className="text-white font-black text-xs sm:text-sm uppercase tracking-wider px-3 sm:px-5 py-1.5 sm:py-2 rounded-full flex items-center gap-1.5 shrink-0 z-10 shadow-sm"
        >
          <Bell size={14} className="animate-bounce shrink-0" />
          <span>
            {language === 'bn' ? 'নোটিশ' : 'Notice'}
          </span>
          <span className="hidden sm:inline w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
        </div>

        {/* separator icon */}
        <Sparkles size={14} className="text-amber-200 mx-2 animate-pulse shrink-0" />

        {/* native marquee tag with modern parameters */}
        <Link 
          to="/notices" 
          className="flex-grow font-['Anek_Bangla'] font-bold text-xs sm:text-base text-white overflow-hidden leading-none hover:text-white/95 transition-colors cursor-pointer"
        >
          {React.createElement(
            'marquee',
            {
              behavior: 'scroll',
              direction: 'left',
              scrollamount: '5',
              onMouseOver: (e: any) => e.currentTarget.stop(),
              onMouseOut: (e: any) => e.currentTarget.start(),
              className: 'w-full block pt-[4px]'
            } as any,
            displayedNotices.map((notice, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span className="mx-4 text-amber-200">✦</span>}
                {formatNoticeText(notice)}
              </React.Fragment>
            ))
          )}
        </Link>
      </div>
    </div>
  );
};
