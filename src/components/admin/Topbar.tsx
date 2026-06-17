import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';
import { Globe, User, Menu } from 'lucide-react';
import { auth } from '../../lib/firebase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Sidebar } from './Sidebar';

export const Topbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="h-20 bg-white border-b border-primary/5 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40 backdrop-blur-md bg-white/80">
      <div className="flex items-center gap-4">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden text-primary">
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 border-none">
            <Sidebar onClose={() => setIsOpen(false)} />
          </SheetContent>
        </Sheet>
        <h2 className="text-xl md:text-2xl font-black text-primary uppercase tracking-widest truncate max-w-[150px] sm:max-w-none">
          {t.admin.dashboard}
        </h2>
      </div>

      <div className="flex items-center gap-6">
        <Button
          variant="ghost"
          onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
          className="flex items-center gap-2 font-black text-primary hover:bg-secondary/20 rounded-xl"
        >
          <Globe size={20} />
          {language === 'bn' ? 'EN' : 'BN'}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger className="relative h-12 w-12 rounded-full border-2 border-primary/10 p-0 overflow-hidden hover:bg-accent transition-colors cursor-pointer">
            <Avatar className="h-full w-full">
              <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || 'Admin'} />
              <AvatarFallback className="bg-secondary text-primary font-black">
                {user?.email?.charAt(0).toUpperCase() || 'A'}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 rounded-2xl border-none shadow-2xl p-2" align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-black leading-none text-primary">{user?.displayName || 'Admin'}</p>
                  <p className="text-xs leading-none text-primary/40 font-black">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-primary/5" />
              <DropdownMenuItem className="rounded-xl p-3 font-black text-primary/60 focus:text-primary focus:bg-secondary/20 cursor-pointer">
                <User className="mr-2 h-4 w-4" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => auth.signOut()}
                className="rounded-xl p-3 font-black text-krishnachura focus:text-white focus:bg-krishnachura cursor-pointer"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
