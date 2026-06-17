import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './ui/button';
import { Menu, X, Globe, Music, Music2, Mic2, ShieldCheck, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from './ui/sheet';

export const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') || localStorage.getItem('theme') === 'dark';
    }
    return false;
  });
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const navLinks = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.about, path: '/about' },
    { name: t.nav.courses, path: '/courses' },
    { name: t.nav.gallery, path: '/gallery' },
    { name: t.nav.notices, path: '/notices' },
    { name: t.nav.contact, path: '/contact' },
  ];

  return (
    <nav className={`sticky top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-lg shadow-2xl' : 'bg-accent'}`}>
      {/* Musical Stave Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-krishnachura opacity-50"></div>
      
      <div className="container mx-auto px-6">
        <div className={`flex items-center justify-between transition-all duration-500 relative ${scrolled ? 'h-16 md:h-24' : 'h-18 md:h-32'}`}>
          <Link to="/" className="flex items-center gap-2 md:gap-4 group">
            <div className={`flex items-center justify-center overflow-hidden transition-all group-hover:scale-105 aspect-square ${scrolled ? 'w-[47px] h-[47px] md:w-[63px] md:h-[63px]' : 'w-[71px] h-[71px] md:w-[135px] md:h-[135px]'}`}>
              <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="flex flex-col justify-start">
              <span className={`font-black text-primary uppercase tracking-widest leading-none transition-all org-name ${language === 'en' ? 'org-name-en' : 'org-name-bn'} ${
                scrolled 
                  ? (language === 'en' ? 'text-[14px] md:text-[16px]' : 'text-[18px] md:text-[20px]')
                  : (language === 'en' ? 'text-[18px] md:text-[22px]' : 'text-[22px] md:text-[26px]')
              }`}>
                {language === 'bn' ? 'দুরন্ত কালচারাল একাডেমি' : 'Duronto Cultural Academy'}
              </span>
              <span className={`font-black text-black dark:text-gray-400 uppercase tracking-tighter leading-none transition-all mt-1 org-subtitle ${scrolled ? 'text-[10px] md:text-[12px]' : 'text-[12px] md:text-[14px]'}`}>
                {language === 'bn' ? 'সঙ্গীত ও অভিনয় শিক্ষা কেন্দ্র' : 'Center for Music & Arts'}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <motion.div key={link.path} whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                <Link
                  to={link.path}
                  className={`font-black uppercase tracking-widest transition-all px-3 xl:px-6 py-3 rounded-2xl whitespace-nowrap ${
                    location.pathname === link.path 
                      ? 'bg-[#fc6625] text-white shadow-2xl scale-105' 
                      : link.path === '/courses'
                        ? 'text-black hover:bg-paddy hover:text-white text-xs xl:text-lg'
                        : scrolled 
                          ? 'text-primary hover:bg-primary/5 text-[10px] xl:text-sm' 
                          : 'text-primary hover:bg-white/20 text-xs xl:text-lg'
                  }`}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDark(!isDark)}
              className={`rounded-2xl transition-all ${scrolled ? 'text-primary' : 'text-primary text-xl'}`}
            >
              {isDark ? <Sun size={28} /> : <Moon size={28} />}
            </Button>

            <Button
              variant="ghost"
              size="lg"
              onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
              className={`rounded-2xl font-black flex items-center gap-3 transition-all ${scrolled ? 'text-primary hover:bg-primary/5' : 'text-primary hover:bg-white/20 text-xl'}`}
            >
              <Globe size={scrolled ? 20 : 28} className="text-black dark:text-white" />
              {language === 'bn' ? 'EN' : 'বাংলা'}
            </Button>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild className={`bg-secondary text-white hover:bg-krishnachura rounded-2xl px-12 py-8 font-black shadow-2xl border-none transition-all ${scrolled ? 'text-lg' : 'text-2xl'}`}>
                <Link to="/admission">{t.nav.admission}</Link>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
              className="text-primary hover:bg-secondary/20"
            >
              <Globe size={20} />
            </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-primary hover:bg-secondary/20 transition-colors">
                <Menu size={24} />
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-white dark:bg-slate-900 border-none p-0">
                <div className="flex flex-col h-full">
                  <SheetHeader className="p-8 border-b border-gray-100 dark:border-white/10">
                    <SheetTitle className="text-primary dark:text-white flex flex-col gap-2">
                      <span className="text-4xl font-black">Duronto</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsDark(!isDark)}
                        className="w-fit flex items-center gap-2 text-primary"
                      >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />} Mode
                      </Button>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-2 p-8">
                    {navLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`text-2xl font-bold py-3 transition-colors whitespace-nowrap ${
                          location.pathname === link.path ? 'text-secondary' : 'text-primary/70 dark:text-white/70 hover:text-primary'
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-auto p-8 border-t border-gray-100 dark:border-white/10">
                    <Button asChild className="w-full bg-secondary text-white hover:bg-krishnachura rounded-xl py-6 font-bold text-lg" onClick={() => setIsOpen(false)}>
                      <Link to="/admission">{t.nav.admission}</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};
