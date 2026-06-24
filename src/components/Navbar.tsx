import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
      try {
        return document.documentElement.classList.contains('dark') || localStorage.getItem('theme') === 'dark';
      } catch (e) {
        console.warn("localStorage is not available:", e);
        return document.documentElement.classList.contains('dark');
      }
    }
    return false;
  });
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      try {
        localStorage.setItem('theme', 'dark');
      } catch (e) {
        console.warn("localStorage is not available:", e);
      }
    } else {
      document.documentElement.classList.remove('dark');
      try {
        localStorage.setItem('theme', 'light');
      } catch (e) {
        console.warn("localStorage is not available:", e);
      }
    }
  }, [isDark]);

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const sections = ['hero', 'about', 'courses', 'gallery', 'contact'];
    
    const handleScrollSpy = () => {
      let currentActive = 'hero';
      const scrollPosition = window.scrollY + 250; // offset threshold for active state
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentActive = section;
          }
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScrollSpy);
    handleScrollSpy();
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [location.pathname]);

  const navLinks = [
    { name: t.nav.home, path: '/', sectionId: 'hero' },
    { name: t.nav.about, path: '/about', sectionId: 'about' },
    { name: t.nav.courses, path: '/courses', sectionId: 'courses' },
    { name: t.nav.gallery, path: '/gallery', sectionId: 'gallery' },
    { name: t.nav.notices, path: '/notices', sectionId: '' },
    { name: t.nav.contact, path: '/contact', sectionId: 'contact' },
  ];

  const handleNavClick = (link: typeof navLinks[0], e: React.MouseEvent) => {
    if (link.sectionId) {
      e.preventDefault();
      
      if (location.pathname === '/') {
        const element = document.getElementById(link.sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        try {
          sessionStorage.setItem('pendingScrollSection', link.sectionId);
        } catch (e) {
          console.warn("sessionStorage is not available:", e);
        }
        navigate('/');
      }
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed top-6 z-50 transition-all duration-500 rounded-full bg-white/30 backdrop-blur-md border border-white/20 pl-[4px] pr-[8px] pb-[5px] pt-[5px] max-w-[calc(100%-2rem)] md:max-w-[calc(100%-6rem)] lg:max-w-full lg:left-1/2 lg:-translate-x-1/2 lg:right-auto lg:w-[1200px] lg:h-[93px] h-[76px] left-4 right-4 md:left-12 md:right-12 ${scrolled ? 'shadow-2xl' : 'shadow-lg'}`}>
      
      <div className="container mx-auto px-2">
        <div className="flex items-center justify-between transition-all duration-500 relative mt-[6px] lg:mt-0 h-16 lg:h-20">
          <Link to="/" onClick={(e) => {
            if (location.pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }} className="flex items-center gap-2 md:gap-4 group transition-all duration-500 lg:w-[290px] lg:h-[100px] w-auto h-auto">
            <div className="flex items-center justify-center transition-all group-hover:scale-105">
              <img 
                src="https://i.postimg.cc/BQc1fw58/logo.png" 
                alt="Logo" 
                className="object-cover transition-all duration-500 pl-[2px] pb-[4px] lg:pl-[0px] lg:pb-[0px] w-[50px] h-[47px] sm:w-[65px] sm:h-[61px] md:w-[78px] md:h-[74px] lg:w-[90px] lg:h-[85px] ml-[12px] lg:ml-[15px]" 
                referrerPolicy="no-referrer" 
              />
            </div>
            <div className="flex flex-col justify-start">
              <span className={`font-['Anek_Bangla'] font-bold text-left block text-primary uppercase tracking-widest transition-all org-name w-[114px] pb-0 pt-0 leading-[14px] lg:w-[185px] lg:text-[22px] lg:leading-[30px] lg:h-auto ${language === 'bn' ? 'h-[33px] text-[15px]' : 'h-[42px] text-[14px]'}`}>
                {language === 'bn' ? 'দুরন্ত কালচারাল একাডেমি' : 'Duronto Cultural Academy'}
              </span>
              <span className="font-black text-[#041122] uppercase tracking-tighter leading-none transition-all mt-0 org-subtitle lg:text-[12px] text-[8px] sm:text-[11px] md:text-[14px]">
                {language === 'bn' ? 'শিল্প ও সংস্কৃতি চর্চায় আমরা দুরন্ত' : 'Center for Music & Arts'}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {navLinks.map((link, index) => {
              const isActive = (location.pathname === '/' && link.sectionId && activeSection === link.sectionId) || 
                (location.pathname !== '/' && location.pathname === link.path) ||
                (link.sectionId === 'hero' && location.pathname === '/' && activeSection === '');

              return (
                <motion.div key={link.path} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to={link.path}
                    onClick={(e) => handleNavClick(link, e)}
                    className={`font-bold uppercase tracking-wide transition-all px-3 py-2 rounded-full whitespace-nowrap text-xs xl:text-sm ${
                      index === 0 
                        ? 'border-0' 
                        : ''
                    } ${
                      isActive 
                        ? 'bg-gradient-to-r from-orange-400 to-pink-500 text-white shadow-sm' 
                        : 'text-blue-600 hover:bg-orange-100/50 hover:text-orange-600'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDark(!isDark)}
              className="rounded-full text-blue-600"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
              className="font-bold flex items-center gap-1.5 border border-solid border-[1px] rounded-[6.35544px] bg-[#ff7d31] text-white hover:bg-[#ff7d31]/90"
            >
              <Globe size={18} />
              {language === 'bn' ? 'EN' : 'বাংলা'}
            </Button>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild className="bg-gradient-to-r from-green-400 to-emerald-600 text-white hover:from-green-500 hover:to-emerald-700 rounded-full px-5 py-2 font-bold text-sm shadow-md border-none transition-all">
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
                      {navLinks.map((link) => {
                        const isActive = (location.pathname === '/' && link.sectionId && activeSection === link.sectionId) || 
                          (location.pathname !== '/' && location.pathname === link.path) ||
                          (link.sectionId === 'hero' && location.pathname === '/' && activeSection === '');

                        return (
                          <Link
                            key={link.path}
                            to={link.path}
                            onClick={(e) => {
                              handleNavClick(link, e);
                            }}
                            className={`text-xl font-black py-4 px-6 rounded-full transition-all duration-300 flex items-center gap-3 ${
                              isActive 
                                ? 'bg-gradient-to-r from-orange-400 to-pink-500 text-white shadow-md' 
                                : 'text-blue-600 hover:bg-orange-100 hover:text-orange-600'
                            }`}
                          >
                            {link.name}
                          </Link>
                        );
                      })}
                  </div>
                  <div className="mt-auto p-8 border-t border-gray-100 dark:border-white/10">
                    <Button asChild className="w-full bg-gradient-to-r from-green-400 to-emerald-600 text-white hover:from-green-500 hover:to-emerald-700 rounded-full py-6 font-black text-lg" onClick={() => setIsOpen(false)}>
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
