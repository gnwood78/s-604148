
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
  Linkedin,
  LogIn
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleSocialLogin = (platform: string) => {
    // Simulazione di login
    setIsLoggedIn(true);
    toast({
      title: `Accesso effettuato con ${platform}`,
      description: "Sei stato autenticato con successo",
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast({
      title: "Logout effettuato",
      description: "Sei stato disconnesso con successo",
    });
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
            name={isLoggedIn ? "Jane Doe" : "Ospite"} 
            role={isLoggedIn ? "Social Media Manager" : "Accedi per sbloccare funzionalità"} 
          />
        </div>
      )}

      {!expanded && (
        <div className="flex justify-center py-4">
          <Avatar className="h-8 w-8 border shadow-sm ring-2 ring-transparent transition-all hover:ring-sidebar-primary cursor-pointer">
            <AvatarFallback>{isLoggedIn ? "JD" : "G"}</AvatarFallback>
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
              href={item.path}
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
                Piattaforme
              </h3>
            </div>

            <div className="space-y-1 animate-fade-in">
              {platforms.map((platform) => (
                <NavItem
                  key={platform.label}
                  icon={platform.icon}
                  label={platform.label}
                  href={platform.path}
                />
              ))}
            </div>
            
            <div className="my-6 mx-3">
              <div className="h-px bg-border" />
            </div>
            
            <div className="mb-2">
              <h3 className="px-3 text-xs font-medium text-muted-foreground">
                Account
              </h3>
            </div>
            
            <div className="space-y-1 animate-fade-in">
              {!isLoggedIn ? (
                <div className="space-y-2 p-3">
                  <button
                    onClick={() => handleSocialLogin('Instagram')}
                    className="w-full bg-instagram text-white px-4 py-2 rounded flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    <Instagram size={16} />
                    <span>Accedi con Instagram</span>
                  </button>
                  <button
                    onClick={() => handleSocialLogin('Facebook')}
                    className="w-full bg-facebook text-white px-4 py-2 rounded flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    <Facebook size={16} />
                    <span>Accedi con Facebook</span>
                  </button>
                  <button
                    onClick={() => handleSocialLogin('Twitter')}
                    className="w-full bg-twitter text-white px-4 py-2 rounded flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    <Twitter size={16} />
                    <span>Accedi con Twitter</span>
                  </button>
                  <button
                    onClick={() => handleSocialLogin('LinkedIn')}
                    className="w-full bg-linkedin text-white px-4 py-2 rounded flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    <Linkedin size={16} />
                    <span>Accedi con LinkedIn</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLogout}
                  className="w-full text-destructive border border-destructive px-4 py-2 rounded flex items-center justify-center gap-2 hover:bg-destructive/10 transition-colors mx-3"
                >
                  <LogIn size={16} className="rotate-180" />
                  <span>Disconnetti</span>
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
