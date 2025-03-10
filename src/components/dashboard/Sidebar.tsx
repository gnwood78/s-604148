
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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useNavigate, useLocation } from 'react-router-dom';

const platforms = [
  { icon: Instagram, label: 'Instagram', path: '/instagram' },
  { icon: Twitter, label: 'Twitter', path: '/twitter' },
  { icon: Facebook, label: 'Facebook', path: '/facebook' },
  { icon: Linkedin, label: 'LinkedIn', path: '/linkedin' }
];

const navItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Calendar, label: 'Schedule', path: '/schedule' },
  { icon: Heart, label: 'Engagement', path: '/engagement' },
  { icon: MessagesSquare, label: 'Messages', path: '/messages' },
  { icon: Settings, label: 'Settings', path: '/settings' }
];

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div
      className={cn(
        "h-screen flex flex-col border-r bg-sidebar transition-all duration-500 ease-apple sticky top-0 left-0 z-30",
        expanded ? "w-64" : "w-16"
      )}
    >
      <div className="relative">
        <button
          onClick={() => setExpanded(!expanded)}
          className="absolute -right-3 top-12 flex h-6 w-6 items-center justify-center rounded-full border bg-background shadow-sm transition-all duration-300 ease-apple hover:scale-110 hover:shadow-md"
        >
          {expanded ? 
            <ChevronLeft className="h-3 w-3 transition-transform duration-300 hover:scale-125" /> : 
            <ChevronRight className="h-3 w-3 transition-transform duration-300 hover:scale-125" />
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
          <Avatar className="h-8 w-8 border shadow-sm ring-2 ring-transparent transition-all hover:ring-sidebar-primary cursor-pointer">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      )}

      <div className="flex-1 overflow-y-auto py-2 px-3 transition-all duration-500">
        <div className="space-y-1 animate-fade-in">
          {navItems.map((item) => (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={expanded ? item.label : ''}
              isActive={isActivePath(item.path)}
              onClick={() => handleNavigation(item.path)}
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

            <div className="space-y-1 animate-fade-in">
              {platforms.map((platform) => (
                <NavItem
                  key={platform.label}
                  icon={platform.icon}
                  label={platform.label}
                  isActive={isActivePath(platform.path)}
                  onClick={() => handleNavigation(platform.path)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
