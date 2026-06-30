import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { About } from './components/About';
import { Courses } from './components/Courses';
import { Admission } from './components/Admission';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';
import { NoticeBoard } from './components/NoticeBoard';
import { Admin } from './components/Admin';
import { Toaster } from './components/ui/sonner';
import { NoticeTicker } from './components/NoticeTicker';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowUp } from 'lucide-react';
import { ScrollToTop } from './components/ScrollToTop';
import { Loader } from './components/Loader';
import loaderConfig from './loader.config.json';

function AppContent() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <Loader onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      <motion.div
        animate={{
          filter: loading ? "blur(12px)" : "blur(0px)",
          scale: loading ? 0.98 : 1
        }}
        transition={{
          duration: loaderConfig.fadeOutDuration,
          ease: [0.645, 0.045, 0.355, 1.0]
        }}
        className="min-h-screen flex flex-col bg-accent selection:bg-secondary selection:text-primary relative"
      >
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-blue-900/10 to-transparent" />
      <ScrollToTop />
      {!isAdminPage && <Navbar />}
      {!isAdminPage && (
        <div className="fixed top-[102px] lg:top-[121px] left-0 right-0 z-40 transition-all duration-500">
          <NoticeTicker />
        </div>
      )}
      <main className={`flex-grow ${location.pathname === '/' ? 'pt-0' : 'pt-40 md:pt-48'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Navigate to="/" replace state={{ scrollTo: 'about' }} />} />
          <Route path="/courses" element={<Navigate to="/" replace state={{ scrollTo: 'courses' }} />} />
          <Route path="/admission" element={<Admission />} />
          <Route path="/gallery" element={<Navigate to="/" replace state={{ scrollTo: 'gallery' }} />} />
          <Route path="/notices" element={<NoticeBoard />} />
          <Route path="/contact" element={<Navigate to="/" replace state={{ scrollTo: 'contact' }} />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </main>
      {!isAdminPage && <Footer />}
      
      {/* Floating Back to Top Button */}
      {!isAdminPage && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-40"
        >
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white/30 backdrop-blur-md text-primary p-4 md:p-6 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.15)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)] flex items-center justify-center transition-all duration-300 border border-white/20 group overflow-hidden"
            title="Back to Top"
          >
            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 transition-opacity"></div>
            <ArrowUp size={28} className="text-secondary md:w-8 md:h-8 transition-transform group-hover:-translate-y-1" />
          </motion.button>
        </motion.div>
      )}
      
      <Toaster position="top-center" />
      </motion.div>
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}
