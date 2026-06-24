import React, { useState } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { LogIn, Music, Music2, Mic2, Disc, Mail, Lock, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { ErrorBoundary } from './ErrorBoundary';

import { Sidebar } from './admin/Sidebar';
import { Topbar } from './admin/Topbar';
import { DashboardHome } from './admin/DashboardHome';
import { StudentManagement } from './admin/StudentManagement';
import { CourseManagement } from './admin/CourseManagement';
import { AdmissionManagement } from './admin/AdmissionManagement';
import { MessageManagement } from './admin/MessageManagement';
import { NoticeManagement } from './admin/NoticeManagement';

export const Admin: React.FC = () => {
  const { user, adminRole, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const emailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
    setLoginLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful! Let's make some music. 🎹");
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.code === 'auth/operation-not-allowed') {
        toast.error("Email/Password login is disabled in Firebase. Please enable it in the console.");
      } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        toast.error("Invalid email or password.");
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } finally {
      setLoginLoading(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-screen bg-accent musical-vibe">
      <div className="relative">
        <div className="w-24 h-24 border-8 border-primary border-t-secondary rounded-full animate-spin"></div>
        <Music className="absolute inset-0 m-auto text-primary animate-bounce" size={32} />
      </div>
    </div>
  );

  if (!user || !adminRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-accent musical-vibe p-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 opacity-5 pointer-events-none">
          <Disc size={400} className="animate-spin-slow" />
        </div>
        <div className="max-w-xl w-full relative z-10 space-y-8">
          <Link to="/" className="inline-flex items-center gap-2 text-primary font-black hover:text-krishnachura transition-colors group">
            <div className="bg-white p-2 rounded-xl group-hover:-translate-x-1 transition-transform">
              <LogIn className="rotate-180" size={20} />
            </div>
            <span className="uppercase tracking-widest">Back to Home</span>
          </Link>

          <Card className="w-full rounded-[3rem] shadow-2xl border-8 border-white overflow-hidden transition-all duration-500">
            <CardHeader className="bg-primary text-white py-12 text-center relative">
              <div className="absolute top-4 right-4 text-secondary/20">
                <Sparkles size={40} className="animate-pulse" />
              </div>
              <div className="w-24 h-24 bg-white rounded-2xl mx-auto mb-6 flex items-center justify-center overflow-hidden border-4 border-secondary shadow-lg relative group">
                <div className="absolute inset-0 bg-secondary/10 alpana-pattern"></div>
                <img src="https://i.postimg.cc/BQc1fw58/logo.png" alt="Logo" className="w-full h-full object-cover relative z-10" />
              </div>
              <CardTitle className="text-3xl md:text-4xl font-black uppercase tracking-widest flex items-center justify-center gap-3">
                <Mic2 size={24} className="text-secondary" /> Admin Access
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 md:p-12">
              <p className="mb-10 text-xl font-black text-primary/60 leading-relaxed text-center">
                {!user 
                  ? "This is a private area. Only authorized staff can enter the studio! 🔐" 
                  : "Your account is not on the VIP guest list for this panel. 🛑"}
              </p>
              
              {!user ? (
                <form onSubmit={emailLogin} className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-lg font-black text-primary/60 ml-2">GMAIL ADDRESS</Label>
                    <div className="relative">
                      <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/30" size={24} />
                      <Input 
                        type="email"
                        placeholder="maestro@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-16 h-16 rounded-2xl border-4 border-accent focus:border-primary text-xl font-black"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-lg font-black text-primary/60 ml-2">OWN PASSWORD</Label>
                    <div className="relative">
                      <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/30" size={24} />
                      <Input 
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-16 h-16 rounded-2xl border-4 border-accent focus:border-primary text-xl font-black"
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    disabled={loginLoading}
                    className="w-full h-16 text-xl font-black rounded-2xl bg-krishnachura text-white hover:bg-paddy transition-colors shadow-lg uppercase tracking-widest"
                  >
                    {loginLoading ? "Verifying..." : "Login to Studio"}
                  </Button>
                </form>
              ) : (
                <div className="text-center space-y-6">
                  <p className="text-krishnachura font-black text-lg p-4 bg-krishnachura/10 rounded-2xl">
                    Logged in as: {user.email}
                  </p>
                  <Button 
                    onClick={() => auth.signOut()}
                    variant="outline"
                    className="w-full h-16 text-xl font-black rounded-2xl border-4 border-primary text-primary hover:bg-primary/5 transition-colors uppercase tracking-widest"
                  >
                    Switch Account
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-accent">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <div className="lg:pl-64 flex flex-col min-h-screen">
          <Topbar />
          <main className="flex-grow p-4 md:p-12">
            <Routes>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/students" element={<StudentManagement />} />
              <Route path="/courses" element={<CourseManagement />} />
              <Route path="/admissions" element={<AdmissionManagement />} />
              <Route path="/messages" element={<MessageManagement />} />
              <Route path="/gallery" element={<div className="p-10 md:p-20 text-center text-primary/20 font-black uppercase tracking-widest bg-white rounded-[2rem] md:rounded-[3rem] border-4 md:border-8 border-white shadow-2xl">Gallery Management Coming Soon</div>} />
              <Route path="/notices" element={<NoticeManagement />} />
              <Route path="/instructors" element={<div className="p-10 md:p-20 text-center text-primary/20 font-black uppercase tracking-widest bg-white rounded-[2rem] md:rounded-[3rem] border-4 md:border-8 border-white shadow-2xl">Instructor Management Coming Soon</div>} />
              <Route path="/settings" element={<div className="p-10 md:p-20 text-center text-primary/20 font-black uppercase tracking-widest bg-white rounded-[2rem] md:rounded-[3rem] border-4 md:border-8 border-white shadow-2xl">Settings Coming Soon</div>} />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
};
