import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Youtube, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  Music, 
  Music2, 
  Mic2, 
  Disc, 
  Radio, 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  MessageSquare,
  Sparkles
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();

  // Local configurations for full sitemap translation
  const footerConfig = {
    bn: {
      aboutTitle: "আমাদের পরিচয়",
      sitemapTitle: "সাইটম্যাপ",
      coursesTitle: "আমাদের কোর্সসমূহ",
      contactTitle: "সহায়তা ও যোগাযোগ",
      sitemap: [
        { label: "হোম পেইজ", path: "/" },
        { label: "আমাদের সম্পর্কে", path: "/about" },
        { label: "শিক্ষাক্রম ও কোর্সসমূহ", path: "/courses" },
        { label: "অনলাইন ভর্তি ফরম", path: "/admission" },
        { label: "স্মৃতি গ্যালারি", path: "/gallery" },
        { label: "প্রজ্ঞাপন ও নোটিশ", path: "/notices" },
        { label: "যোগাযোগ করুন", path: "/contact" }
      ],
      admissionStatus: "ভর্তি চলছে!",
      weeklySchedule: "ক্লাসের সময়সূচী",
      weeklyHours: "প্রতি শুক্রবার ও শনিবার (সকাল ৯:৩০ - দুপুর ১২:৩০)",
      tagline: "শিল্প ও সংস্কৃতির বিকাশে আমরা সর্বদা দুরন্ত পদক্ষেপে এগিয়ে চলছি!",
      rights: "সর্বস্বত্ব সংরক্ষিত",
      madeFor: "শিশুদের সুপ্ত প্রতিভা বিকাশে ভালোবাসার একটি প্রয়াস",
      adminLink: "অ্যাডমিন প্যানেল"
    },
    en: {
      aboutTitle: "Duronto Academy",
      sitemapTitle: "Sitemap",
      coursesTitle: "Our Programs",
      contactTitle: "Helpline & Support",
      sitemap: [
        { label: "Home Page", path: "/" },
        { label: "About Academy", path: "/about" },
        { label: "Academic Programs", path: "/courses" },
        { label: "Online Admission", path: "/admission" },
        { label: "Memories Gallery", path: "/gallery" },
        { label: "Official Notices", path: "/notices" },
        { label: "Contact Us", path: "/contact" }
      ],
      admissionStatus: "Admission Open!",
      weeklySchedule: "Class Schedule",
      weeklyHours: "Every Friday & Saturday (9:30 AM - 12:30 PM)",
      tagline: "Stepping forward dynamically to cultivate young art and heritage!",
      rights: "All Rights Reserved",
      madeFor: "Nurturing kids' inner artistry with lots of love",
      adminLink: "Admin Dashboard"
    }
  };

  const config = footerConfig[language as 'bn' | 'en'] || footerConfig.bn;

  // Social handles with pristine styled rings
  const socialHandles = [
    { 
      name: "Facebook",
      icon: <Facebook size={20} />, 
      color: "hover:bg-[#1877F2] hover:text-white border-[#1877F2]/20 hover:border-[#1877F2]", 
      href: "https://www.facebook.com/duranta.culturalacademy.2012",
      tooltip: language === 'bn' ? "আমাদের ফেসবুক পেইজ" : "Join our Facebook Page"
    },
    { 
      name: "YouTube",
      icon: <Youtube size={20} />, 
      color: "hover:bg-[#FF0000] hover:text-white border-[#FF0000]/20 hover:border-[#FF0000]", 
      href: "https://www.youtube.com/@duranta.culturalacademy",
      tooltip: language === 'bn' ? "ইউটিউব চ্যানেল" : "Subscribe on YouTube"
    },
    { 
      name: "Instagram",
      icon: <Instagram size={20} />, 
      color: "hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:text-white border-pink-500/25 hover:border-pink-500", 
      href: "https://www.instagram.com/",
      tooltip: language === 'bn' ? "ইনস্টাগ্রাম প্রোফাইল" : "Follow on Instagram"
    },
    { 
      name: "WhatsApp",
      icon: <MessageSquare size={20} />, 
      color: "hover:bg-[#25D366] hover:text-white border-[#25D366]/20 hover:border-[#25D366]", 
      href: "https://wa.me/8801805545053",
      tooltip: language === 'bn' ? "আমাদের মেসেজ করুন" : "Chat on WhatsApp"
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-[#7DD3FC] via-[#0EA5E9] to-[#0047AB] dark:from-[#0c4a6e] dark:via-[#075985] dark:to-[#0f172a] text-white py-16 md:py-24 rounded-t-[3rem] sm:rounded-t-[5rem] mt-24 border-t-[16px] border-[#FF4D00] relative overflow-hidden transition-all duration-300 shadow-[0_-15px_30px_-15px_rgba(14,165,233,0.4)]">
      
      {/* Glossy Sheen & Light-Blue Glass Reflection Highlights */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 pointer-events-none transform -skew-y-6" />
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_40%)] pointer-events-none" />

      {/* Aesthetic decorative elements */}
      <div className="absolute top-[-50px] right-[-50px] opacity-[0.03] dark:opacity-[0.02] pointer-events-none select-none">
        <Disc size={350} className="animate-spin-slow" />
      </div>
      <div className="absolute bottom-[-100px] left-[-100px] opacity-[0.03] dark:opacity-[0.02] pointer-events-none select-none">
        <Music2 size={400} className="animate-pulse" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Main Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-[80px] h-[78px] flex items-center justify-center overflow-hidden rounded-2xl bg-white/10 p-2 border border-white/20 shadow-md relative group shrink-0">
                <img 
                  src="/logo.png" 
                  alt="Duronto Logo" 
                  className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.parentElement?.querySelector('.fallback-icon');
                    if (fallback) (fallback as HTMLElement).style.display = 'flex';
                  }}
                  referrerPolicy="no-referrer"
                />
                <div className="fallback-icon hidden w-full h-full items-center justify-center bg-[#FF4D00] text-white rounded-lg relative z-10">
                  <Music size={28} className="animate-bounce" />
                </div>
              </div>
              <div>
                <h3 className="font-['Fredoka'] font-black text-xl leading-tight text-[#FF4D00] dark:text-[#ff6a24] flex items-center gap-1.5 uppercase tracking-wide">
                  {t.hero.title}
                </h3>
                <span className="text-xs font-bold text-white/50 tracking-widest uppercase">
                  Est. 2012
                </span>
              </div>
            </div>

            <p className="font-medium text-sm text-white/80 leading-relaxed font-['Hind_Siliguri'] dark:text-slate-300">
              {config.tagline}
            </p>

            {/* Social handles with gorgeous interactive buttons */}
            <div className="pt-2">
              <div className="flex flex-wrap gap-3">
                {socialHandles.map((social, i) => (
                  <a 
                    key={i} 
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-11 h-11 rounded-xl bg-white/5 border text-white/70 ${social.color} transition-all duration-300 flex items-center justify-center shadow-md relative group`}
                    title={social.tooltip}
                  >
                    {social.icon}
                    {/* Tiny visual tooltip line */}
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-lg">
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Extensible Sitemap */}
          <div className="space-y-6">
            <h4 className="text-lg font-black font-['Fredoka'] text-white uppercase tracking-wider relative inline-block">
              {config.sitemapTitle}
              <span className="absolute bottom-[-6px] left-0 w-8 h-1 bg-[#FF4D00] rounded-full"></span>
            </h4>
            <ul className="space-y-2 pt-2">
              {config.sitemap.map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.path} 
                    className="group flex items-center gap-2 text-sm md:text-base font-bold text-white/70 hover:text-[#FF4D00] transition-colors duration-200"
                  >
                    <ArrowRight size={14} className="text-white/30 group-hover:translate-x-1 group-hover:text-[#FF4D00] transition-all shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Featured Courses */}
          <div className="space-y-6">
            <h4 className="text-lg font-black font-['Fredoka'] text-white uppercase tracking-wider relative inline-block">
              {config.coursesTitle}
              <span className="absolute bottom-[-6px] left-0 w-8 h-1 bg-[#FF4D00] rounded-full"></span>
            </h4>
            <ul className="space-y-4 pt-2">
              {/* Music program entry */}
              <li className="flex items-start gap-3.5 group cursor-pointer">
                <div className="w-9 h-9 bg-[#FF4D00]/10 border border-[#FF4D00]/25 rounded-xl flex items-center justify-center text-[#FF4D00] shadow-md shrink-0 group-hover:scale-105 group-hover:bg-[#FF4D00] group-hover:text-white transition-all duration-300">
                  <Music size={16} />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-sm md:text-base font-black text-white/80 group-hover:text-[#FF4D00] transition-colors leading-none">
                      {t.courses.music.title}
                    </span>
                    <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider bg-[#FF4D00] text-white rounded-full leading-none animate-pulse">
                      {config.admissionStatus}
                    </span>
                  </div>
                  <span className="text-xs text-white/50 font-bold mt-1">
                    {language === 'bn' ? 'শনিবার সকাল ৯:৩০ মিনিট' : 'Saturday 9:30 AM'}
                  </span>
                </div>
              </li>

              {/* Acting program entry */}
              <li className="flex items-start gap-3.5 group cursor-pointer">
                <div className="w-9 h-9 bg-[#00CCFF]/10 border border-[#00CCFF]/25 rounded-xl flex items-center justify-center text-[#00CCFF] shadow-md shrink-0 group-hover:scale-105 group-hover:bg-[#00CCFF] group-hover:text-white transition-all duration-300">
                  <Mic2 size={16} />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-sm md:text-base font-black text-white/80 group-hover:text-[#00CCFF] transition-colors leading-none">
                      {t.courses.acting.title}
                    </span>
                    <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider bg-[#00CCFF] text-white rounded-full leading-none">
                      {config.admissionStatus}
                    </span>
                  </div>
                  <span className="text-xs text-white/50 font-bold mt-1">
                    {language === 'bn' ? 'শুক্রবার সকাল ৯:৩০ মিনিট' : 'Friday 9:30 AM'}
                  </span>
                </div>
              </li>
            </ul>

            {/* Helpline badge card inside Column 3 */}
            <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 shadow-md relative overflow-hidden group">
              <div className="absolute top-[-10px] right-[-10px] p-2 text-white/5 pointer-events-none group-hover:text-white/10 transition-colors">
                <Sparkles size={40} />
              </div>
              <Clock size={16} className="text-[#FF4D00] shrink-0 animate-pulse" />
              <div className="flex flex-col">
                <span className="text-xs font-black text-white/90 uppercase tracking-wide">
                  {config.weeklySchedule}
                </span>
                <span className="text-[11px] font-medium text-white/60 leading-normal mt-1 font-['Hind_Siliguri']">
                  {config.weeklyHours}
                </span>
              </div>
            </div>
          </div>

          {/* Column 4: Reach Out */}
          <div className="space-y-6">
            <h4 className="text-lg font-black font-['Fredoka'] text-white uppercase tracking-wider relative inline-block">
              {config.contactTitle}
              <span className="absolute bottom-[-6px] left-0 w-8 h-1 bg-[#FF4D00] rounded-full"></span>
            </h4>
            <div className="space-y-4 pt-2">
              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-white/70">
                  <MapPin size={15} />
                </div>
                <div className="text-xs md:text-sm font-bold text-white/80 leading-relaxed font-['Hind_Siliguri']">
                  <p className="text-white font-black">{language === 'bn' ? 'স্কুল অব দি নেশন (এসওএন)' : 'School of the Nation (SON)'}</p>
                  <p className="opacity-80">Block # F, House # 8, Road No. 3, Banasree, Dhaka 1219</p>
                </div>
              </div>

              {/* Help Line Phone Call Links */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-white/70">
                  <Phone size={15} />
                </div>
                <div className="flex flex-col gap-1 text-xs md:text-sm font-black">
                  <a href="tel:+8801805545053" className="hover:text-[#FF4D05] transition-colors">
                    +880 1805 545053
                  </a>
                  <a href="tel:+8801805545055" className="hover:text-[#FF4D05] transition-colors">
                    +880 1805 545055
                  </a>
                </div>
              </div>

              {/* Email Link */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-white/70">
                  <Mail size={15} />
                </div>
                <a 
                  href="mailto:durantaculturalacademy@gmail.com" 
                  className="text-xs md:text-sm font-bold text-white/80 hover:text-[#FF4D05] transition-colors truncate block max-w-full font-['Fredoka']"
                >
                  durantaculturalacademy@gmail.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Attribution Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-12 gap-6 text-center md:text-left">
          <div className="space-y-1">
            <p className="text-sm font-black text-white/40 uppercase tracking-[0.25em]">
              &copy; {new Date().getFullYear()} {t.hero.title}. {config.rights}.
            </p>
            <p className="text-xs font-black text-white/20 uppercase tracking-widest font-['Hind_Siliguri']">
              {config.madeFor}
            </p>
          </div>
          
          {/* Admin access trigger inside visual glass chip */}
          <div className="shrink-0">
            <Link 
              to="/admin" 
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 hover:text-white px-4 py-2.5 rounded-xl transition-all text-xs font-black uppercase tracking-wider group scale-95 hover:scale-100"
            >
              <ShieldCheck size={14} className="text-[#FF4D00] group-hover:rotate-12 transition-transform" />
              <span>{config.adminLink}</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
