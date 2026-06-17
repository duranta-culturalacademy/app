import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Phone, MapPin, Send, Sparkles, Copy } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { motion } from 'motion/react';
import { toast } from 'sonner';

export const Contact: React.FC = () => {
  const { t } = useLanguage();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`Copied to clipboard: ${text}`);
  };

  return (
    <div className="container mx-auto px-4 py-16 alpana-pattern">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-16 md:mb-24"
      >
        <h1 className="text-4xl sm:text-6xl md:text-9xl font-black mb-6 md:mb-8 text-heading">
          {t.nav.contact}
        </h1>
        <p className="text-lg md:text-2xl max-w-2xl mx-auto font-black px-4 text-body">
          Have a question? Want to join the Academy? Send us a message!
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 max-w-6xl mx-auto">
        {/* Info */}
        <div className="space-y-12 md:space-y-16">
          <div className="grid grid-cols-1 gap-8 md:gap-12">
            {[
              { icon: <MapPin className="w-8 h-8 md:w-12 md:h-12" />, title: "Where We Are", content: t.contact.address, color: "bg-sky text-white" },
              { icon: <Phone className="w-8 h-8 md:w-12 md:h-12" />, title: "Call Us", content: t.contact.phone, color: "bg-krishnachura text-white" },
              { icon: <Mail className="w-8 h-8 md:w-12 md:h-12" />, title: "Email Us", content: t.contact.email, color: "bg-black text-white" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", bounce: 0.4, delay: i * 0.1 }}
                whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
                className="bg-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 md:gap-10 group border-[8px] md:border-[12px] border-white shadow-2xl"
              >
                <div className={`w-16 h-16 md:w-24 md:h-24 ${item.color} rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center shrink-0 group-hover:rotate-12 transition-transform shadow-xl`}>
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-2xl md:text-3xl font-black mb-2 text-heading">{item.title}</h4>
                  {item.title === "Where We Are" ? (
                    <div className="text-lg md:text-2xl leading-relaxed font-medium text-body">
                      <p><strong className="text-krishnachura font-bold">School of the Nation (SON)</strong></p>
                      <p>Block # F, House # 8, Road No. 3, Banasree, Dhaka 1219</p>
                      <a 
                        href="https://www.google.com/maps/dir//Block+%23+F,+School+of+the+Nation+%28SON%29,+House+%23+8,+Road+No.+3,+Dhaka+1219/@23.7612702,90.4360101,112m/data=!3m1!1e3!4m17!1m7!3m6!1s0x3755b96a7ded6a25:0xa96164893b8b2463!2sSchool+of+the+Nation+%28SON%29!8m2!3d23.7612498!4d90.43675!16s%2Fg%2F11trdr55ky!4m8!1m0!1m5!1m1!1s0x3755b96a7ded6a25:0xa96164893b8b2463!2m2!1d90.4367501!2d23.7612504!3e0?entry=ttu&g_ep=EgoyMDI2MDUxNy4wIKXMDSoASAFQAw%3D%3D" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="mt-2 inline-block bg-krishnachura text-white font-bold py-3 px-6 rounded-xl hover:bg-paddy transition-colors shadow-lg"
                      >
                        Get Direction
                      </a>
                    </div>
                  ) : item.title === "Call Us" ? (
                    <div className="flex flex-col gap-2">
                       <button onClick={() => handleCopy("+880 1805 545053")} className="text-primary hover:text-krishnachura transition-colors font-bold text-left flex items-center gap-2">
                         +880 1805 545053 <Copy size={16} />
                       </button>
                       <button onClick={() => handleCopy("+880 1805 545055")} className="text-primary hover:text-krishnachura transition-colors font-bold text-left flex items-center gap-2">
                         +880 1805 545055 <Copy size={16} />
                       </button>
                       <a href="https://wa.me/8801805545053" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block bg-krishnachura text-white font-bold py-3 px-6 rounded-xl hover:bg-paddy transition-colors shadow-lg">WhatsApp Us</a>
                    </div>
                  ) : item.title === "Email Us" ? (
                    <a href="mailto:durantaculturalacademy@gmail.com" className="mt-2 inline-block bg-krishnachura text-white font-bold py-3 px-6 rounded-xl hover:bg-paddy transition-colors shadow-lg">Go To Gmail</a>
                  ) : (
                    <p className="text-lg md:text-2xl leading-relaxed font-black text-body">{item.content}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white p-10 md:p-24 rounded-[3rem] md:rounded-[5rem] shadow-2xl border-[8px] md:border-[16px] border-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 md:p-16 text-krishnachura/10 pointer-events-none">
            <Sparkles size={100} className="md:w-[200px] md:h-[200px]" />
          </div>
          
          <form className="space-y-8 md:space-y-12 relative z-10">
            <div className="space-y-4">
              <label className="text-lg md:text-xl font-black uppercase tracking-widest ml-6 input-label">Your Name</label>
              <Input placeholder="What's your name?" className="rounded-[1.5rem] md:rounded-[2.5rem] h-16 md:h-20 bg-accent dark:bg-slate-800 border-none focus:ring-4 focus:ring-krishnachura text-xl md:text-2xl px-6 md:px-10 font-black placeholder:text-primary/20 dark:placeholder:text-white/20 input-text" />
            </div>
            <div className="space-y-4">
              <label className="text-lg md:text-xl font-black uppercase tracking-widest ml-6 input-label">Email Address</label>
              <Input type="email" placeholder="Email address" className="rounded-[1.5rem] md:rounded-[2.5rem] h-16 md:h-20 bg-accent dark:bg-slate-800 border-none focus:ring-4 focus:ring-krishnachura text-xl md:text-2xl px-6 md:px-10 font-black placeholder:text-primary/20 dark:placeholder:text-white/20 input-text" />
            </div>
            <div className="space-y-4">
              <label className="text-lg md:text-xl font-black uppercase tracking-widest ml-6 input-label">Your Message</label>
              <Textarea placeholder="What do you want to say?" className="rounded-[2rem] md:rounded-[3rem] min-h-[180px] md:min-h-[250px] bg-accent dark:bg-slate-800 border-none focus:ring-4 focus:ring-krishnachura p-8 md:p-10 text-xl md:text-2xl font-black placeholder:text-primary/20 dark:placeholder:text-white/20 input-text" />
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="w-full bg-krishnachura text-white hover:bg-paddy transition-all py-8 md:py-12 rounded-[2rem] md:rounded-[3rem] text-2xl md:text-3xl font-black shadow-2xl shadow-krishnachura/40 border-none flex items-center justify-center gap-4 md:gap-6 uppercase tracking-widest">
                <Send className="w-8 h-8 md:w-10 md:h-10" /> Send!
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
