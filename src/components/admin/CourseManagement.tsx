import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { collection, query, onSnapshot, orderBy, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { handleFirestoreError, OperationType } from '../../lib/firestore-errors';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Plus, Edit2, Trash2, BookOpen, LayoutGrid, List, Languages } from 'lucide-react';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { cn } from '@/lib/utils';

export const CourseManagement: React.FC = () => {
  const { t, language } = useLanguage();
  const [courses, setCourses] = useState<any[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [formData, setFormData] = useState({
    titleBn: '',
    titleEn: '',
    descriptionBn: '',
    descriptionEn: '',
    duration: '',
    fee: '',
    instructor: ''
  });

  useEffect(() => {
    const q = query(collection(db, 'courses'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setCourses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'courses'));
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.titleBn.trim() || !formData.titleEn.trim()) {
      toast.error("Title is required in both languages");
      return;
    }
    if (!formData.instructor.trim()) {
      toast.error("Instructor name is required");
      return;
    }
    if (!formData.duration.trim()) {
      toast.error("Course duration is required");
      return;
    }

    try {
      if (editingId) {
        await updateDoc(doc(db, 'courses', editingId), formData);
        toast.success("Course updated successfully!");
      } else {
        await addDoc(collection(db, 'courses'), formData);
        toast.success("Course added successfully!");
      }
      setIsAddOpen(false);
      setEditingId(null);
      setFormData({ titleBn: '', titleEn: '', descriptionBn: '', descriptionEn: '', duration: '', fee: '', instructor: '' });
    } catch (error) {
      toast.error(editingId ? "Failed to update course" : "Failed to add course");
    }
  };

  const handleEdit = (course: any) => {
    setFormData({
      titleBn: course.titleBn || '',
      titleEn: course.titleEn || '',
      descriptionBn: course.descriptionBn || '',
      descriptionEn: course.descriptionEn || '',
      duration: course.duration || '',
      fee: course.fee || '',
      instructor: course.instructor || ''
    });
    setEditingId(course.id);
    setIsAddOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this course?")) return;
    try {
      await deleteDoc(doc(db, 'courses', id));
      toast.success("Course deleted");
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
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-primary shadow-lg">
                <BookOpen size={28} />
              </div>
              {t.admin.courses}
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
                  setFormData({ titleBn: '', titleEn: '', descriptionBn: '', descriptionEn: '', duration: '', fee: '', instructor: '' });
                }
              }}>
                <DialogTrigger asChild>
                  <Button 
                    onClick={() => {
                      setEditingId(null);
                      setFormData({ titleBn: '', titleEn: '', descriptionBn: '', descriptionEn: '', duration: '', fee: '', instructor: '' });
                    }}
                    className="rounded-xl h-12 px-6 bg-secondary text-primary font-black flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
                  >
                    <Plus size={20} /> {t.admin.add}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl rounded-[3rem] border-none shadow-2xl p-12 overflow-y-auto max-h-[90vh]">
                  <DialogHeader>
                    <DialogTitle className="text-4xl font-black text-primary mb-8">
                      {editingId ? "Edit Course" : "Add New Course"}
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
                          <Label className="font-black uppercase tracking-widest text-primary flex items-center gap-2">
                            <span className="w-2 h-2 bg-secondary rounded-full"></span>
                            Course Title (Bengali)
                          </Label>
                          <Input 
                            value={formData.titleBn} 
                            onChange={e => setFormData({...formData, titleBn: e.target.value})} 
                            className="rounded-2xl h-16 bg-accent border-none font-black text-xl px-6 focus:ring-4 focus:ring-secondary/20 transition-all" 
                            placeholder="যেমন: উচ্চাঙ্গ সঙ্গীত"
                            required 
                          />
                        </div>
                        <div className="space-y-4">
                          <Label className="font-black uppercase tracking-widest text-primary flex items-center gap-2">
                            <span className="w-2 h-2 bg-secondary rounded-full"></span>
                            Description (Bengali)
                          </Label>
                          <Textarea 
                            value={formData.descriptionBn} 
                            onChange={e => setFormData({...formData, descriptionBn: e.target.value})} 
                            className="rounded-3xl min-h-[160px] bg-accent border-none font-black text-lg p-6 focus:ring-4 focus:ring-secondary/20 transition-all leading-relaxed" 
                            placeholder="কোর্সের বিস্তারিত এখানে লিখুন..."
                            required 
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="en" className="mt-8 space-y-8 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="space-y-4">
                          <Label className="font-black uppercase tracking-widest text-primary flex items-center gap-2">
                            <span className="w-2 h-2 bg-secondary rounded-full"></span>
                            Course Title (English)
                          </Label>
                          <Input 
                            value={formData.titleEn} 
                            onChange={e => setFormData({...formData, titleEn: e.target.value})} 
                            className="rounded-2xl h-16 bg-accent border-none font-black text-xl px-6 focus:ring-4 focus:ring-secondary/20 transition-all" 
                            placeholder="e.g., Classical Vocal"
                            required 
                          />
                        </div>
                        <div className="space-y-4">
                          <Label className="font-black uppercase tracking-widest text-primary flex items-center gap-2">
                            <span className="w-2 h-2 bg-secondary rounded-full"></span>
                            Description (English)
                          </Label>
                          <Textarea 
                            value={formData.descriptionEn} 
                            onChange={e => setFormData({...formData, descriptionEn: e.target.value})} 
                            className="rounded-3xl min-h-[160px] bg-accent border-none font-black text-lg p-6 focus:ring-4 focus:ring-secondary/20 transition-all leading-relaxed" 
                            placeholder="Course details in English..."
                            required 
                          />
                        </div>
                      </TabsContent>
                    </Tabs>

                    <div className="p-8 rounded-[2.5rem] bg-secondary/5 border-4 border-dashed border-secondary/20 space-y-8">
                      <h4 className="text-xl font-black text-primary uppercase tracking-widest flex items-center gap-2">
                        <Plus className="text-secondary" /> General Information
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-4">
                          <Label className="font-black uppercase tracking-widest text-primary/40">Duration</Label>
                          <Input value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} className="rounded-2xl h-14 bg-white border-none font-black shadow-inner" placeholder="e.g., 6 Months" required />
                        </div>
                        <div className="space-y-4">
                          <Label className="font-black uppercase tracking-widest text-primary/40">Course Fee</Label>
                          <Input value={formData.fee} onChange={e => setFormData({...formData, fee: e.target.value})} className="rounded-2xl h-14 bg-white border-none font-black shadow-inner" placeholder="e.g., 500 BDT" />
                        </div>
                        <div className="space-y-4">
                          <Label className="font-black uppercase tracking-widest text-primary/40">Instructor</Label>
                          <Input value={formData.instructor} onChange={e => setFormData({...formData, instructor: e.target.value})} className="rounded-2xl h-14 bg-white border-none font-black shadow-inner" placeholder="Instructor name" required />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button type="submit" className="flex-grow h-18 rounded-3xl bg-primary text-white font-black text-xl shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all">
                        {editingId ? "Update Course Details" : "Create New Course"}
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)} className="h-18 px-10 rounded-3xl border-4 border-primary/10 font-black text-xl hover:bg-accent transition-colors">Cancel</Button>
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
                    <TableHead className="p-8 text-lg font-black text-primary uppercase tracking-widest">Instructor</TableHead>
                    <TableHead className="p-8 text-lg font-black text-primary uppercase tracking-widest">Duration</TableHead>
                    <TableHead className="p-8 text-lg font-black text-primary uppercase tracking-widest">Fee</TableHead>
                    <TableHead className="p-8 text-lg font-black text-primary uppercase tracking-widest text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((course, idx) => (
                    <TableRow key={course.id} className={cn(
                      "border-b-2 border-primary/5 hover:bg-secondary/5 transition-all group",
                      idx % 2 === 0 ? "bg-white" : "bg-accent/30"
                    )}>
                      <TableCell className="p-8">
                        <div className="flex flex-col">
                          <span className="text-xl font-black text-primary group-hover:text-secondary transition-colors">
                            {language === 'bn' ? course.titleBn : course.titleEn}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="p-8 text-lg font-black text-primary/60">{course.instructor}</TableCell>
                      <TableCell className="p-8 text-lg font-black text-primary/60">{course.duration}</TableCell>
                      <TableCell className="p-8 text-lg font-black text-krishnachura">{course.fee}</TableCell>
                      <TableCell className="p-8 text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="w-12 h-12 rounded-xl text-sky hover:bg-sky/10"
                            onClick={() => handleEdit(course)}
                          >
                            <Edit2 size={24} />
                          </Button>
                          <Button variant="ghost" size="icon" className="w-12 h-12 rounded-xl text-krishnachura hover:bg-krishnachura/10" onClick={() => handleDelete(course.id)}>
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
            <div className="p-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <Card key={course.id} className="rounded-[3rem] shadow-xl border-8 border-white overflow-hidden bg-white group hover:scale-105 transition-transform">
                  <div className="h-4 cultural-header-pattern"></div>
                  <CardContent className="p-10">
                    <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:rotate-12 transition-transform shadow-inner">
                      <BookOpen size={32} />
                    </div>
                    <h3 className="text-2xl font-black text-primary mb-4">
                      {language === 'bn' ? course.titleBn : course.titleEn}
                    </h3>
                    <p className="text-primary/60 font-black text-sm line-clamp-3 mb-8">
                      {language === 'bn' ? course.descriptionBn : course.descriptionEn}
                    </p>
                    <div className="flex justify-between items-center pt-6 border-t border-primary/5">
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-primary/20 uppercase tracking-widest">Fee</span>
                        <span className="text-lg font-black text-krishnachura">{course.fee}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="w-10 h-10 rounded-xl text-sky hover:bg-sky/10"
                          onClick={() => handleEdit(course)}
                        >
                          <Edit2 size={20} />
                        </Button>
                        <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl text-krishnachura hover:bg-krishnachura/10" onClick={() => handleDelete(course.id)}>
                          <Trash2 size={20} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
