
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProfileHeaderProps {
  name: string;
  role: string;
  avatarUrl?: string;
}

const ProfileHeader = ({ name, role, avatarUrl }: ProfileHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative">
      <div className="flex items-center justify-between p-4 transition-all duration-300 hover:bg-sidebar-accent/20 rounded-md">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border shadow-sm ring-2 ring-transparent transition-all hover:ring-sidebar-primary">
            <AvatarImage src={avatarUrl} alt={name} className="object-cover" />
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              {name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-sm font-medium">{name}</p>
            <p className="text-xs text-muted-foreground">{role}</p>
          </div>
        </div>
        <button 
          className={cn(
            "p-1.5 rounded-full hover:bg-muted transition-all duration-300", 
            isMenuOpen && "bg-muted rotate-180"
          )}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-300" />
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-md bg-popover border shadow-md animate-scale-in">
          <div className="p-2 space-y-1">
            <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent transition-colors duration-200">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>Profile</span>
            </button>
            <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent transition-colors duration-200">
              <Settings className="h-4 w-4 text-muted-foreground" />
              <span>Settings</span>
            </button>
            <div className="h-px bg-border my-1"></div>
            <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors duration-200">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
