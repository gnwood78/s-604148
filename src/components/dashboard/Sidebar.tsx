
import React, { useState } from 'react';
import NavItem from './NavItem';
import ProfileHeader from './ProfileHeader';
import { cn } from '@/lib/utils';
import { 
  BarChart3, 
  Calendar, 
  Heart, 
  Home, 
  MessagesSquare, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Instagram,
  Twitter,
  Facebook,
  Linkedin
} from 'lucide-react';

const platforms = [
  { icon: Instagram, label: 'Instagram' },
  { icon: Twitter, label: 'Twitter' },
  { icon: Facebook, label: 'Facebook' },
  { icon: Linkedin, label: 'LinkedIn' }
];

const navItems = [
  { icon: Home, label: 'Dashboard' },
  { icon: BarChart3, label: 'Analytics' },
  { icon: Calendar, label: 'Schedule' },
  { icon: Heart, label: 'Engagement' },
  { icon: MessagesSquare, label: 'Messages' },
  { icon: Settings, label: 'Settings' }
];

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState('Dashboard');

  return (
    <div
      className={cn(
        "h-screen flex flex-col border-r bg-sidebar transition-all duration-300 ease-apple sticky top-0 left-0 z-30",
        expanded ? "w-64" : "w-16"
      )}
    >
      <div className="relative">
        <button
          onClick={() => setExpanded(!expanded)}
          className="absolute -right-3 top-12 flex h-6 w-6 items-center justify-center rounded-full border bg-background shadow-sm transition-transform duration-200 ease-apple hover:scale-110"
        >
          {expanded ? 
            <ChevronLeft className="h-3 w-3" /> : 
            <ChevronRight className="h-3 w-3" />
          }
        </button>
      </div>

      {expanded && (
        <div className="py-2 px-3">
          <ProfileHeader 
            name="Jane Doe" 
            role="Social Media Manager" 
          />
        </div>
      )}

      {!expanded && (
        <div className="flex justify-center py-4">
          <Avatar className="h-8 w-8 border shadow-sm">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      )}

      <div className="flex-1 overflow-y-auto py-2 px-3">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={expanded ? item.label : ''}
              isActive={activeItem === item.label}
              onClick={() => setActiveItem(item.label)}
            />
          ))}
        </div>

        {expanded && (
          <>
            <div className="my-6 mx-3">
              <div className="h-px bg-border" />
            </div>
            
            <div className="mb-2">
              <h3 className="px-3 text-xs font-medium text-muted-foreground">
                Platforms
              </h3>
            </div>

            <div className="space-y-1">
              {platforms.map((platform) => (
                <NavItem
                  key={platform.label}
                  icon={platform.icon}
                  label={platform.label}
                  isActive={activeItem === platform.label}
                  onClick={() => setActiveItem(platform.label)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Required for component to compile
const Avatar = ({ className, children }: { className?: string, children?: React.ReactNode }) => (
  <div className={className}>{children}</div>
);

const AvatarFallback = ({ children }: { children?: React.ReactNode }) => (
  <div className="flex h-full w-full items-center justify-center rounded-full bg-muted text-xs font-medium">
    {children}
  </div>
);

export default Sidebar;
