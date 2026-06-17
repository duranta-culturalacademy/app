import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { collection, query, onSnapshot, orderBy, addDoc, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { handleFirestoreError, OperationType } from '../../lib/firestore-errors';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Plus, Edit2, Trash2, Bell, LayoutGrid, List, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { cn } from '@/lib/utils';

export const NoticeManagement: React.FC = () => {
  const { t, language } = useLanguage();
  const [notices, setNotices] = useState<any[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [formData, setFormData] = useState({
    titleBn: '',
    titleEn: '',
    contentBn: '',
    contentEn: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    const q = query(collection(db, 'notices'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNotices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'notices'));
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.titleBn.trim() || !formData.titleEn.trim()) {
      toast.error("Title is required in both languages");
      return;
    }

    try {
      if (editingId) {
        await updateDoc(doc(db, 'notices', editingId), {
          ...formData,
          updatedAt: serverTimestamp()
        });
        toast.success("Notice updated successfully!");
      } else {
        await addDoc(collection(db, 'notices'), {
          ...formData,
          createdAt: serverTimestamp()
        });
        toast.success("Notice posted successfully!");
      }
      setIsAddOpen(false);
      setEditingId(null);
      setFormData({ titleBn: '', titleEn: '', contentBn: '', contentEn: '', date: new Date().toISOString().split('T')[0] });
    } catch (error) {
      toast.error(editingId ? "Failed to update notice" : "Failed to post notice");
    }
  };

  const handleEdit = (notice: any) => {
    setFormData({
      titleBn: notice.titleBn || '',
      titleEn: notice.titleEn || '',
      contentBn: notice.contentBn || '',
      contentEn: notice.contentEn || '',
      date: notice.date || new Date().toISOString().split('T')[0]
    });
    setEditingId(notice.id);
    setIsAddOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this notice?")) return;
    try {
      await deleteDoc(doc(db, 'notices', id));
      toast.success("Notice deleted");
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="space-y-12">
      <Card className="rounded-[3.5rem] shadow-2xl border-8 border-white overflow-hidden bg-white">
        <CardHeader className="cultural-header-pattern text-white p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
            <CardTitle className="text-4xl font-black uppercase tracking-[0.2em] flex items-center gap-4">
              <div className="w-12 h-12 bg-marigold rounded-xl flex items-center justify-center text-primary shadow-lg">
                <Bell size={28} />
              </div>
              {t.admin.notices}
            </CardTitle>
            <div className="flex items-center gap-4 bg-white/10 p-2 rounded-2xl backdrop-blur-md">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setViewMode('grid')}
                className={cn("w-12 h-12 rounded-xl text-white hover:bg-white/20", viewMode === 'grid' && "bg-white/20")}
              >
                <LayoutGrid size={24} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setViewMode('table')}
                className={cn("w-12 h-12 rounded-xl text-white hover:bg-white/20", viewMode === 'table' && "bg-white/20")}
              >
                <List size={24} />
              </Button>
              <div className="w-px h-8 bg-white/20 mx-2"></div>
              <Dialog open={isAddOpen} onOpenChange={(open) => {
                setIsAddOpen(open);
                if (!open) {
                  setEditingId(null);
                  setFormData({ titleBn: '', titleEn: '', contentBn: '', contentEn: '', date: new Date().toISOString().split('T')[0] });
                }
              }}>
                <DialogTrigger asChild>
                  <Button 
                    className="rounded-xl h-12 px-6 bg-secondary text-primary font-black flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
                  >
                    <Plus size={20} /> {t.admin.add}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl rounded-[3rem] border-none shadow-2xl p-12 overflow-y-auto max-h-[90vh]">
                  <DialogHeader>
                    <DialogTitle className="text-4xl font-black text-primary mb-8">
                      {editingId ? "Edit Notice" : "Post New Notice"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-10">
                    <Tabs defaultValue="bn" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 h-16 rounded-2xl bg-accent p-2">
                        <TabsTrigger value="bn" className="rounded-xl font-black text-lg data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-lg transition-all">বাংলা (Bengali)</TabsTrigger>
                        <TabsTrigger value="en" className="rounded-xl font-black text-lg data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-lg transition-all">English</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="bn" className="mt-8 space-y-8 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="space-y-4">
                          <Label className="font-black uppercase tracking-widest text-primary flex items-center gap-2">Title (Bengali)</Label>
                          <Input 
                            value={formData.titleBn} 
                            onChange={e => setFormData({...formData, titleBn: e.target.value})} 
                            className="rounded-2xl h-16 bg-accent border-none font-black text-xl px-6" 
                            placeholder="যেমন: ছুটির নোটিশ"
                            required 
                          />
                        </div>
                        <div className="space-y-4">
                          <Label className="font-black uppercase tracking-widest text-primary">Content (Bengali)</Label>
                          <Textarea 
                            value={formData.contentBn} 
                            onChange={e => setFormData({...formData, contentBn: e.target.value})} 
                            className="rounded-3xl min-h-[160px] bg-accent border-none font-black text-lg p-6" 
                            placeholder="বিস্তারিত এখানে লিখুন..."
                            required 
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="en" className="mt-8 space-y-8 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="space-y-4">
                          <Label className="font-black uppercase tracking-widest text-primary">Title (English)</Label>
                          <Input 
                            value={formData.titleEn} 
                            onChange={e => setFormData({...formData, titleEn: e.target.value})} 
                            className="rounded-2xl h-16 bg-accent border-none font-black text-xl px-6" 
                            placeholder="e.g., Holiday Notice"
                            required 
                          />
                        </div>
                        <div className="space-y-4">
                          <Label className="font-black uppercase tracking-widest text-primary">Content (English)</Label>
                          <Textarea 
                            value={formData.contentEn} 
                            onChange={e => setFormData({...formData, contentEn: e.target.value})} 
                            className="rounded-3xl min-h-[160px] bg-accent border-none font-black text-lg p-6" 
                            placeholder="Details in English..."
                            required 
                          />
                        </div>
                      </TabsContent>
                    </Tabs>

                    <div className="p-8 rounded-[2.5rem] bg-secondary/5 border-4 border-dashed border-secondary/20">
                      <div className="space-y-4">
                        <Label className="font-black uppercase tracking-widest text-primary/40 flex items-center gap-2">
                          <Calendar size={16} /> Date
                        </Label>
                        <Input 
                          type="date"
                          value={formData.date} 
                          onChange={e => setFormData({...formData, date: e.target.value})} 
                          className="rounded-2xl h-14 bg-white border-none font-black shadow-inner" 
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button type="submit" className="flex-grow h-18 rounded-3xl bg-primary text-white font-black text-xl shadow-2xl">
                        {editingId ? "Update Notice" : "Post Notice"}
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)} className="h-18 px-10 rounded-3xl border-4 border-primary/10 font-black text-xl">Cancel</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {viewMode === 'table' ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-secondary/10">
                  <TableRow className="border-b-4 border-primary/10">
                    <TableHead className="p-8 text-lg font-black text-primary uppercase tracking-widest">Title</TableHead>
                    <TableHead className="p-8 text-lg font-black text-primary uppercase tracking-widest">Date</TableHead>
                    <TableHead className="p-8 text-lg font-black text-primary uppercase tracking-widest text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notices.map((notice, idx) => (
                    <TableRow key={notice.id} className={cn(
                      "border-b-2 border-primary/5 hover:bg-secondary/5 transition-all group",
                      idx % 2 === 0 ? "bg-white" : "bg-accent/30"
                    )}>
                      <TableCell className="p-8">
                        <span className="text-xl font-black text-primary group-hover:text-secondary transition-colors">
                          {language === 'bn' ? notice.titleBn : notice.titleEn}
                        </span>
                      </TableCell>
                      <TableCell className="p-8 text-lg font-black text-primary/60">{notice.date}</TableCell>
                      <TableCell className="p-8 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" className="w-12 h-12 rounded-xl text-sky hover:bg-sky/10" onClick={() => handleEdit(notice)}>
                            <Edit2 size={24} />
                          </Button>
                          <Button variant="ghost" size="icon" className="w-12 h-12 rounded-xl text-krishnachura hover:bg-krishnachura/10" onClick={() => handleDelete(notice.id)}>
                            <Trash2 size={24} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="p-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              {notices.map((notice) => (
                <Card key={notice.id} className="rounded-[3rem] shadow-xl border-8 border-white overflow-hidden bg-white group hover:scale-105 transition-transform">
                  <div className="h-4 bg-marigold"></div>
                  <CardContent className="p-10">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-primary shadow-inner">
                        <Bell size={32} />
                      </div>
                      <span className="text-sm font-black text-marigold px-4 py-2 bg-marigold/10 rounded-full">{notice.date}</span>
                    </div>
                    <h3 className="text-2xl font-black text-primary mb-4">
                      {language === 'bn' ? notice.titleBn : notice.titleEn}
                    </h3>
                    <p className="text-primary/60 font-black text-sm line-clamp-3 mb-8">
                      {language === 'bn' ? notice.contentBn : notice.contentEn}
                    </p>
                    <div className="flex justify-end gap-2 pt-6 border-t border-primary/5">
                      <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl text-sky hover:bg-sky/10" onClick={() => handleEdit(notice)}>
                        <Edit2 size={20} />
                      </Button>
                      <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl text-krishnachura hover:bg-krishnachura/10" onClick={() => handleDelete(notice.id)}>
                        <Trash2 size={20} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {notices.length === 0 && (
                <div className="col-span-full text-center p-20 text-primary/20 font-black uppercase tracking-widest border-4 border-dashed border-primary/5 rounded-[3rem]">
                  No notices posted yet
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
