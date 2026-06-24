import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  ClipboardList, 
  Image as ImageIcon, 
  Bell, 
  UserCircle, 
  MessageSquare, 
  Settings as SettingsIcon,
  LogOut,
  Music,
  Music2,
  Mic2,
  Disc
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { auth } from '../../lib/firebase';

interface SidebarProps {
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const { t } = useLanguage();

  const menuItems = [
    { icon: LayoutDashboard, label: t.admin.dashboard, path: '/admin' },
    { icon: Users, label: t.admin.students, path: '/admin/students' },
    { icon: BookOpen, label: t.admin.courses, path: '/admin/courses' },
    { icon: ClipboardList, label: t.admin.admissions, path: '/admin/admissions' },
    { icon: ImageIcon, label: t.admin.gallery, path: '/admin/gallery' },
    { icon: Bell, label: t.admin.notices, path: '/admin/notices' },
    { icon: UserCircle, label: t.admin.instructors, path: '/admin/instructors' },
    { icon: MessageSquare, label: t.admin.messages, path: '/admin/messages' },
    { icon: SettingsIcon, label: t.admin.settings, path: '/admin/settings' },
  ];

  return (
    <div className="w-64 bg-primary text-white h-screen flex flex-col shadow-2xl z-50 lg:fixed lg:left-0 lg:top-0">
      <div className="p-8 border-b border-white/10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden border-2 border-secondary">
            <img src="https://i.postimg.cc/BQc1fw58/logo.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-xl font-black tracking-tight leading-none">
            {t.hero.title.split(' ')[0]} <br/>
            <span className="text-xs text-secondary uppercase tracking-widest">Admin</span>
          </span>
        </div>
      </div>

      <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/admin'}
            onClick={onClose}
            className={({ isActive }) => cn(
              "flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-black uppercase tracking-widest text-sm group",
              isActive 
                ? "bg-secondary text-primary shadow-lg scale-105" 
                : "hover:bg-white/10 text-white/70 hover:text-white"
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
              "group-hover:bg-white/20",
              // isActive ? "bg-primary/20" : "" // Removed this to keep active state clean
            )}>
              <item.icon size={20} />
            </div>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <Button 
          variant="ghost" 
          onClick={() => auth.signOut()}
          className="w-full flex items-center justify-start gap-4 px-6 py-6 rounded-2xl text-krishnachura hover:bg-krishnachura hover:text-white transition-all font-black uppercase tracking-widest text-sm"
        >
          <LogOut size={20} />
          {t.admin.logout}
        </Button>
      </div>
    </div>
  );
};
