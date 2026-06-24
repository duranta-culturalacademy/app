import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { collection, query, onSnapshot, limit, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { handleFirestoreError, OperationType } from '../../lib/firestore-errors';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Music, Music2, Mic2, TrendingUp, Disc, Radio, Bell } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { motion } from 'motion/react';

export const DashboardHome: React.FC = () => {
  const { t } = useLanguage();
  const [stats, setStats] = useState({
    students: 0,
    courses: 0,
    admissions: 0,
    notices: 0,
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    const unsubStudents = onSnapshot(collection(db, 'students'), (s) => {
      setStats(prev => ({ ...prev, students: s.size }));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'students'));
    const unsubCourses = onSnapshot(collection(db, 'courses'), (s) => {
      setStats(prev => ({ ...prev, courses: s.size }));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'courses'));
    const unsubAdmissions = onSnapshot(collection(db, 'registrations'), (s) => {
      setStats(prev => ({ ...prev, admissions: s.size }));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'registrations'));
    const unsubNotices = onSnapshot(collection(db, 'notices'), (s) => {
      setStats(prev => ({ ...prev, notices: s.size }));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'notices'));

    const q = query(collection(db, 'registrations'), orderBy('createdAt', 'desc'), limit(5));
    const unsubRecent = onSnapshot(q, (s) => {
      setRecentActivity(s.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'registrations_recent'));

    return () => {
      unsubStudents();
      unsubCourses();
      unsubAdmissions();
      unsubNotices();
      unsubRecent();
    };
  }, []);

  const chartData = [
    { name: 'Mon', admissions: 4 },
    { name: 'Tue', admissions: 7 },
    { name: 'Wed', admissions: 5 },
    { name: 'Thu', admissions: 12 },
    { name: 'Fri', admissions: 9 },
    { name: 'Sat', admissions: 15 },
    { name: 'Sun', admissions: 10 },
  ];

  const statCards = [
    { title: t.admin.totalStudents, value: stats.students, icon: Music, color: 'bg-primary', border: 'border-primary' },
    { title: t.admin.totalCourses, value: stats.courses, icon: Music2, color: 'bg-secondary text-primary', border: 'border-secondary' },
    { title: t.admin.newAdmissions, value: stats.admissions, icon: Mic2, color: 'bg-krishnachura', border: 'border-krishnachura' },
    { title: 'Total Notices', value: stats.notices, icon: Bell, color: 'bg-marigold', border: 'border-marigold' },
  ];

  return (
    <div className="space-y-8 md:space-y-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {statCards.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className={cn("rounded-[2rem] md:rounded-[2.5rem] shadow-xl border-4 overflow-hidden bg-white", stat.border)}>
              <CardContent className="p-6 md:p-8 flex items-center gap-4 md:gap-6">
                <div className={cn("p-3 md:p-4 rounded-xl md:rounded-2xl text-white shadow-lg shrink-0", stat.color)}>
                  <stat.icon size={24} className="md:w-8 md:h-8" />
                </div>
                <div>
                  <p className="text-[10px] md:text-sm font-black text-primary/40 uppercase tracking-widest">{stat.title}</p>
                  <h3 className="text-2xl md:text-4xl font-black text-primary">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        <Card className="rounded-[2rem] md:rounded-[3rem] shadow-2xl border-[8px] md:border-[12px] border-white overflow-hidden bg-white">
          <CardHeader className="cultural-header-pattern text-white p-6 md:p-10 border-b border-primary/5">
            <CardTitle className="text-xl md:text-2xl font-black uppercase tracking-widest flex items-center gap-4">
              <Radio className="animate-pulse shrink-0" /> Admissions Rhythm
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-10 h-[300px] md:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorAdmissions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0047AB" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0047AB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#0047AB', fontWeight: 'bold', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#0047AB', fontWeight: 'bold', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="admissions" stroke="#0047AB" fillOpacity={1} fill="url(#colorAdmissions)" strokeWidth={4} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] md:rounded-[3rem] shadow-2xl border-[8px] md:border-[12px] border-white overflow-hidden bg-white">
          <CardHeader className="cultural-header-pattern text-white p-6 md:p-10 border-b border-primary/5">
            <CardTitle className="text-xl md:text-2xl font-black uppercase tracking-widest flex items-center gap-4">
              <Music2 className="animate-bounce shrink-0" /> {t.admin.recentActivity}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-primary/5">
              {recentActivity.map((activity, i) => (
                <div key={activity.id} className="p-6 md:p-8 flex items-center gap-4 md:gap-6 hover:bg-secondary/10 transition-colors group">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-primary text-white flex items-center justify-center font-black text-lg md:text-xl shadow-lg group-hover:rotate-12 transition-transform shrink-0">
                    <Music size={20} className="md:w-6 md:h-6" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-base md:text-lg font-black text-primary group-hover:text-krishnachura transition-colors truncate">{activity.name}</p>
                    <p className="text-[10px] md:text-sm font-black text-primary/40 uppercase tracking-widest flex items-center gap-2 truncate">
                      <Disc size={10} className="animate-spin-slow shrink-0" /> {activity.course}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[10px] md:text-sm font-black text-krishnachura">New</p>
                    <p className="text-[10px] md:text-xs font-black text-primary/20">
                      {(() => {
                        if (!activity.createdAt) return '';
                        if (typeof activity.createdAt.toDate === 'function') {
                          try {
                            return activity.createdAt.toDate().toLocaleDateString();
                          } catch (e) {
                            console.warn("Error converting createdAt to Date:", e);
                          }
                        }
                        const d = new Date(activity.createdAt);
                        return !isNaN(d.getTime()) ? d.toLocaleDateString() : '';
                      })()}
                    </p>
                  </div>
                </div>
              ))}
              {recentActivity.length === 0 && (
                <div className="p-10 md:p-20 text-center text-primary/20 font-black uppercase tracking-widest">
                  No recent activity
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Helper for class names
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
