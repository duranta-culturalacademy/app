import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { collection, query, onSnapshot, orderBy, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { handleFirestoreError, OperationType } from '../../lib/firestore-errors';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Search, Edit2, Trash2, UserPlus, Users } from 'lucide-react';
import { toast } from 'sonner';

export const StudentManagement: React.FC = () => {
  const { t } = useLanguage();
  const [students, setStudents] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'students'), orderBy('enrolledAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setStudents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'students'));
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deleteDoc(doc(db, 'students', id));
      toast.success("Student removed");
    } catch (error) {
      toast.error("Failed to remove student");
    }
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/20" size={24} />
          <Input 
            placeholder={t.admin.search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-[2rem] h-16 pl-16 bg-white border-4 border-primary/5 focus:border-secondary transition-all text-xl font-black"
          />
        </div>
        <Button className="rounded-2xl h-16 px-10 vibrant-gradient text-white font-black text-xl flex items-center gap-4 shadow-xl hover:scale-105 transition-transform">
          <UserPlus size={24} /> {t.admin.add}
        </Button>
      </div>

      <Card className="rounded-[3.5rem] shadow-2xl border-8 border-white overflow-hidden bg-white">
        <CardHeader className="cultural-header-pattern text-white p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <CardTitle className="text-4xl font-black uppercase tracking-[0.2em] relative z-10 flex items-center gap-4">
            <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-primary shadow-lg">
              <Users size={28} />
            </div>
            {t.admin.students}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-secondary/10">
                <TableRow className="border-b-4 border-primary/10">
                  <TableHead className="p-8 text-lg font-black text-primary uppercase tracking-widest">Name</TableHead>
                  <TableHead className="p-8 text-lg font-black text-primary uppercase tracking-widest">Course</TableHead>
                  <TableHead className="p-8 text-lg font-black text-primary uppercase tracking-widest">Status</TableHead>
                  <TableHead className="p-8 text-lg font-black text-primary uppercase tracking-widest">Phone</TableHead>
                  <TableHead className="p-8 text-lg font-black text-primary uppercase tracking-widest">Email</TableHead>
                  <TableHead className="p-8 text-lg font-black text-primary uppercase tracking-widest text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student, idx) => (
                  <TableRow key={student.id} className={cn(
                    "border-b-2 border-primary/5 hover:bg-secondary/5 transition-all group",
                    idx % 2 === 0 ? "bg-white" : "bg-accent/30"
                  )}>
                    <TableCell className="p-8">
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-xl shadow-md group-hover:rotate-6 transition-transform">
                          {student.name.charAt(0)}
                        </div>
                        <span className="text-xl font-black text-primary group-hover:text-secondary transition-colors">{student.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="p-8 text-lg font-black text-primary/60">{student.course}</TableCell>
                    <TableCell className="p-8">
                      <Badge className={cn(
                        "rounded-full px-4 py-1 text-xs font-black uppercase tracking-widest",
                        student.status === 'active' ? "bg-paddy/10 text-paddy" : "bg-krishnachura/10 text-krishnachura"
                      )}>
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="p-8 text-lg font-black text-primary/80">{student.phone}</TableCell>
                    <TableCell className="p-8 text-lg font-black text-primary/60 italic">{student.email || 'N/A'}</TableCell>
                    <TableCell className="p-8 text-right">
                      <div className="flex justify-end gap-4">
                        <Button variant="ghost" size="icon" className="w-12 h-12 rounded-xl text-sky hover:bg-sky/10">
                          <Edit2 size={24} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="w-12 h-12 rounded-xl text-krishnachura hover:bg-krishnachura/10"
                          onClick={() => handleDelete(student.id)}
                        >
                          <Trash2 size={24} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredStudents.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="p-20 text-center text-primary/20 font-black uppercase tracking-widest">
                      No students found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
