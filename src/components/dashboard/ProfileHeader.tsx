
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronDown } from 'lucide-react';

interface ProfileHeaderProps {
  name: string;
  role: string;
  avatarUrl?: string;
}

const ProfileHeader = ({ name, role, avatarUrl }: ProfileHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <Avatar className="h-9 w-9 border shadow-sm">
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
      <button className="p-1.5 rounded-full hover:bg-muted transition-colors">
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </button>
    </div>
  );
};

export default ProfileHeader;
