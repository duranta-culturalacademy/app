import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Youtube, Mail, Phone, MapPin, Music, Music2, Mic2, Disc, Radio, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-white py-24 rounded-t-[5rem] mt-20 border-t-[16px] border-secondary relative overflow-hidden">
      <div className="absolute top-0 left-0 opacity-5 pointer-events-none">
        <Disc size={300} className="animate-spin-slow" />
      </div>
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-20 relative z-10">
        <div className="space-y-8">
          <div className="w-[103px] h-[103px] flex items-center justify-center overflow-hidden mb-8 relative group">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="w-full h-full object-cover relative z-10"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.parentElement?.querySelector('.fallback-icon');
                if (fallback) (fallback as HTMLElement).style.display = 'flex';
              }}
              referrerPolicy="no-referrer"
            />
            <div className="fallback-icon hidden w-full h-full items-center justify-center bg-secondary text-krishnachura relative z-10">
              <Music size={40} className="animate-bounce" />
            </div>
          </div>
          <h3 className="text-4xl font-black text-[#fc6625] leading-tight flex items-center gap-4">
            {t.hero.title} <Music2 className="text-white animate-pulse" />
          </h3>
          <p className="text-xl text-white/80 leading-relaxed font-black">
            {t.hero.subtitle}
          </p>
            <div className="flex gap-6 mt-8">
              {[
                { icon: <Facebook size={32} />, color: "bg-sky", href: "https://www.facebook.com/duranta.culturalacademy.2012" },
                { icon: <Linkedin size={32} />, color: "bg-blue-600", href: "#" },
                { icon: <Youtube size={32} />, color: "bg-black", href: "https://www.youtube.com/@duranta.culturalacademy" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${social.color} p-4 rounded-2xl hover:scale-110 transition-transform shadow-lg flex items-center justify-center`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
  
          <div className="space-y-8">
            <h4 className="text-3xl font-black text-white uppercase tracking-widest">Quick Links</h4>
            <ul className="grid grid-cols-1 gap-4">
              <li>
                <Link to="/about" className="text-xl font-black text-white/80 hover:text-secondary transition-colors underline decoration-secondary/30 underline-offset-8 decoration-4">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-xl font-black text-white/80 hover:text-secondary transition-colors underline decoration-secondary/30 underline-offset-8 decoration-4">
                  {t.nav.gallery}
                </Link>
              </li>
              <li>
                <Link to="/notices" className="text-xl font-black text-white/80 hover:text-secondary transition-colors underline decoration-secondary/30 underline-offset-8 decoration-4">
                  {t.nav.notices}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-xl font-black text-white/80 hover:text-secondary transition-colors underline decoration-secondary/30 underline-offset-8 decoration-4">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>
  
          <div className="space-y-8">
            <h4 className="text-3xl font-black text-white uppercase tracking-widest flex items-center gap-4">
              <Radio className="text-secondary" /> {t.nav.courses}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                  <Music size={20} />
                </div>
                <span className="text-2xl font-black text-white/80 group-hover:text-secondary transition-colors">{t.courses.music.title}</span>
              </li>
              <li className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 bg-sky rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                  <Mic2 size={20} />
                </div>
                <span className="text-2xl font-black text-white/80 group-hover:text-sky transition-colors">{t.courses.acting.title}</span>
              </li>
            </ul>
            <div className="pt-10">
              <Link to="/admin" className="inline-flex items-center gap-2 text-white/40 hover:text-secondary transition-colors text-sm font-black uppercase tracking-widest group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                  <ShieldCheck size={16} />
                </div>
                {t.nav.admin} Access
              </Link>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-24 pt-12 border-t border-white/10 text-center">
        <p className="text-xl font-black text-white/40 uppercase tracking-[0.3em]">
          &copy; {new Date().getFullYear()} {t.hero.title}
        </p>
        <p className="text-sm font-black text-white/20 mt-4 uppercase tracking-widest">
          Made with Love for Kids
        </p>
      </div>
    </footer>
  );
};
