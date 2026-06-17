import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestore-errors';
import { Card, CardContent } from './ui/card';
import { motion } from 'motion/react';
import { Bell, Calendar, Search, Filter } from 'lucide-react';
import { Input } from './ui/input';

export const NoticeBoard: React.FC = () => {
  const { t, language } = useLanguage();
  const [notices, setNotices] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'notices'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNotices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, 'notices');
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredNotices = notices.filter(notice => {
    const title = language === 'bn' ? notice.titleBn : notice.titleEn;
    const content = language === 'bn' ? notice.contentBn : notice.contentEn;
    return title?.toLowerCase().includes(search.toLowerCase()) || 
           content?.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="min-h-screen pt-32 pb-20 bg-accent relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-marigold/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky/10 rounded-full -ml-48 -mb-48 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-6 py-2 bg-white rounded-full shadow-xl border-4 border-white text-marigold font-black"
            >
              <Bell size={20} className="animate-ring" /> {language === 'bn' ? 'একাডেমি নোটিশ' : 'Academy Updates'}
            </motion.div>
            <h1 className="text-5xl md:text-8xl font-black text-primary leading-none uppercase tracking-tight">
              {language === 'bn' ? 'নোটিশ বোর্ড' : 'Notice Board'}
            </h1>
            <p className="text-xl md:text-2xl text-primary/60 font-black max-w-2xl mx-auto">
              {language === 'bn' 
                ? 'সঙ্গীত ও সংস্কৃতি একাডেমির সকল প্রকার সর্বশেষ আপডেট এবং নোটিশ এখানে পাবেন।' 
                : 'Stay updated with the latest news, events, and announcements from the Academy.'}
            </p>
          </div>

          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/30" />
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={language === 'bn' ? 'সার্চ করুন...' : 'Search notices...'}
              className="w-full h-18 rounded-[2rem] bg-white border-8 border-white shadow-2xl pl-16 pr-8 font-black text-xl placeholder:text-primary/20 focus-visible:ring-secondary transition-all"
            />
          </div>

          <div className="grid grid-cols-1 gap-8 md:gap-12">
            {loading ? (
              <div className="flex justify-center p-20">
                <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : filteredNotices.map((notice, index) => (
              <motion.div
                key={notice.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="rounded-[3rem] md:rounded-[4rem] shadow-2xl border-[8px] md:border-[12px] border-white overflow-hidden bg-white group hover:scale-[1.02] transition-all">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-48 bg-marigold flex flex-col items-center justify-center p-8 text-black">
                      <Calendar size={40} className="mb-2" />
                      <div className="text-3xl font-black">{notice.date.split('-')[2]}</div>
                      <div className="text-sm font-black uppercase tracking-widest opacity-60">
                        {new Date(notice.date).toLocaleDateString('default', { month: 'short' })}
                      </div>
                      <div className="text-sm font-black opacity-30 mt-1">{notice.date.split('-')[0]}</div>
                    </div>
                    <CardContent className="flex-grow p-8 md:p-14 space-y-6">
                      <div className="flex justify-between items-start">
                        <h2 className="text-3xl md:text-5xl font-black text-primary leading-tight group-hover:text-secondary transition-colors">
                          {language === 'bn' ? notice.titleBn : notice.titleEn}
                        </h2>
                      </div>
                      <div className="w-20 h-2 bg-secondary rounded-full"></div>
                      <p className="text-lg md:text-2xl text-primary/70 leading-relaxed font-black whitespace-pre-line">
                        {language === 'bn' ? notice.contentBn : notice.contentEn}
                      </p>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}

            {!loading && filteredNotices.length === 0 && (
              <div className="text-center p-20 bg-white rounded-[3rem] shadow-xl border-8 border-white">
                <p className="text-3xl font-black text-primary/20 uppercase tracking-widest">
                  {language === 'bn' ? 'কোন নোটিশ পাওয়া যায়নি' : 'No notices found'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
