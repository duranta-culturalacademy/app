import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { collection, query, onSnapshot, orderBy, deleteDoc, doc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { handleFirestoreError, OperationType } from '../../lib/firestore-errors';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { CheckCircle, XCircle, PhoneCall, Trash2, ClipboardList } from 'lucide-react';
import { toast } from 'sonner';

export const AdmissionManagement: React.FC = () => {
  const { t } = useLanguage();
  const [admissions, setAdmissions] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'registrations'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAdmissions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'registrations'));
    return () => unsubscribe();
  }, []);

  const handleStatus = async (id: string, status: string, data?: any) => {
    try {
      await updateDoc(doc(db, 'registrations', id), { status });
      
      if (status === 'approved' && data) {
        // Create student record
        await addDoc(collection(db, 'students'), {
          name: data.name,
          phone: data.phone,
          email: data.email || '',
          course: data.course,
          status: 'active',
          enrolledAt: serverTimestamp()
        });
        toast.success("Admission approved and student enrolled!");
      } else {
        toast.success(`Status updated to ${status}`);
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this application?")) return;
    try {
      await deleteDoc(doc(db, 'registrations', id));
      toast.success("Application deleted");
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="space-y-12">
      <Card className="rounded-[3.5rem] shadow-2xl border-8 border-white overflow-hidden bg-white">
        <CardHeader className="cultural-header-pattern text-white p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <CardTitle className="text-4xl font-black uppercase tracking-[0.2em] relative z-10 flex items-center gap-4">
            <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-primary shadow-lg">
              <ClipboardList size={28} />
            </div>
            {t.admin.admissions}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-secondary/10">
                <TableRow className="border-b-4 border-primary/10">
                  <TableHead className="p-8 text-lg font-black text-primary uppercase tracking-widest">Date</TableHead>
                  <TableHead className="p-8 text-lg font-black text-primary uppercase tracking-widest">Applicant</TableHead>
                  <TableHead className="p-8 text-lg font-black text-primary uppercase tracking-widest">Course</TableHead>
                  <TableHead className="p-8 text-lg font-black text-primary uppercase tracking-widest">Status</TableHead>
                  <TableHead className="p-8 text-lg font-black text-primary uppercase tracking-widest text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admissions.map((reg, idx) => (
                  <TableRow key={reg.id} className={cn(
                    "border-b-2 border-primary/5 hover:bg-secondary/5 transition-all group",
                    idx % 2 === 0 ? "bg-white" : "bg-accent/30"
                  )}>
                    <TableCell className="p-8 text-lg font-black text-primary/40">
                      {reg.createdAt?.toDate().toLocaleDateString()}
                    </TableCell>
                    <TableCell className="p-8">
                      <div className="flex flex-col">
                        <span className="text-xl font-black text-primary group-hover:text-secondary transition-colors">{reg.name}</span>
                        <span className="text-sm font-black text-primary/40">{reg.phone}</span>
                      </div>
                    </TableCell>
                    <TableCell className="p-8 text-lg font-black text-primary/60">{reg.course}</TableCell>
                    <TableCell className="p-8">
                      <Badge className={cn(
                        "rounded-full px-4 py-1 text-xs font-black uppercase tracking-widest",
                        reg.status === 'approved' ? "bg-paddy/10 text-paddy" : 
                        reg.status === 'rejected' ? "bg-krishnachura/10 text-krishnachura" :
                        reg.status === 'contacted' ? "bg-marigold/10 text-marigold" : "bg-primary/10 text-primary"
                      )}>
                        {reg.status || 'pending'}
                      </Badge>
                    </TableCell>
                    <TableCell className="p-8 text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="w-12 h-12 rounded-xl text-paddy hover:bg-paddy/10"
                          onClick={() => handleStatus(reg.id, 'approved', reg)}
                        >
                          <CheckCircle size={24} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="w-12 h-12 rounded-xl text-marigold hover:bg-marigold/10"
                          onClick={() => handleStatus(reg.id, 'contacted')}
                        >
                          <PhoneCall size={24} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="w-12 h-12 rounded-xl text-krishnachura hover:bg-krishnachura/10"
                          onClick={() => handleStatus(reg.id, 'rejected')}
                        >
                          <XCircle size={24} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="w-12 h-12 rounded-xl text-primary/20 hover:bg-primary/10"
                          onClick={() => handleDelete(reg.id)}
                        >
                          <Trash2 size={24} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {admissions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="p-20 text-center text-primary/20 font-black uppercase tracking-widest">
                      No applications found
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
