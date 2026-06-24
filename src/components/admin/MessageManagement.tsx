import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { collection, query, onSnapshot, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { handleFirestoreError, OperationType } from '../../lib/firestore-errors';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { MessageSquare, Trash2, Mail } from 'lucide-react';
import { toast } from 'sonner';

export const MessageManagement: React.FC = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'messages'));
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await deleteDoc(doc(db, 'messages', id));
      toast.success("Message deleted");
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="space-y-12">
      <h2 className="text-4xl font-black text-primary uppercase tracking-widest">{t.admin.messages}</h2>
      
      <div className="grid grid-cols-1 gap-8">
        {messages.map((msg) => (
          <Card key={msg.id} className="rounded-[2.5rem] shadow-xl border-4 border-white overflow-hidden bg-white hover:border-secondary transition-all">
            <CardContent className="p-10 flex flex-col md:flex-row gap-8 items-start">
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-primary shrink-0">
                <Mail size={32} />
              </div>
              <div className="flex-grow space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="text-2xl font-black text-primary">{msg.name}</h3>
                    <p className="text-sm font-black text-primary/40 uppercase tracking-widest">{msg.email}</p>
                  </div>
                  <span className="text-sm font-black text-primary/20">
                    {(() => {
                      if (!msg.createdAt) return '';
                      if (typeof msg.createdAt.toDate === 'function') {
                        try {
                          return msg.createdAt.toDate().toLocaleString();
                        } catch (e) {
                          console.warn("Error converting createdAt to Date:", e);
                        }
                      }
                      const d = new Date(msg.createdAt);
                      return !isNaN(d.getTime()) ? d.toLocaleString() : '';
                    })()}
                  </span>
                </div>
                <div className="bg-accent/50 p-6 rounded-2xl border-2 border-primary/5">
                  <p className="text-lg font-black text-primary/80 leading-relaxed">{msg.content}</p>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="ghost" size="icon" className="w-14 h-14 rounded-2xl text-krishnachura hover:bg-krishnachura/10" onClick={() => handleDelete(msg.id)}>
                  <Trash2 size={28} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {messages.length === 0 && (
          <div className="p-40 text-center bg-white rounded-[3rem] border-8 border-white shadow-2xl">
            <div className="w-24 h-24 bg-accent rounded-3xl mx-auto mb-8 flex items-center justify-center text-primary/20">
              <MessageSquare size={48} />
            </div>
            <p className="text-2xl font-black text-primary/20 uppercase tracking-widest">No messages yet</p>
          </div>
        )}
      </div>
    </div>
  );
};
