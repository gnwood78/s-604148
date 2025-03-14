
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  href?: string;
}

const NavItem = ({ icon: Icon, label, isActive = false, onClick, href }: NavItemProps) => {
  const location = useLocation();
  
  // Determine if this item is active based on either prop or current route
  const active = isActive || (href && location.pathname === href);
  
  const content = (
    <div 
      className={cn(
        "group flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 ease-apple",
        active 
          ? "bg-sidebar-primary text-sidebar-primary-foreground" 
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
    >
      <Icon className={cn(
        "sidebar-icon transition-all duration-300",
        active ? "translate-x-0" : "group-hover:translate-x-1"
      )} />
      <span className="transition-opacity duration-300">{label}</span>
    </div>
  );

  if (href) {
    return (
      <Link 
        to={href} 
        className="block w-full transition-transform duration-300 hover:translate-x-1"
      >
        {content}
      </Link>
    );
  }

  return (
    <button 
      onClick={onClick} 
      className="block w-full text-left transition-transform duration-300 hover:translate-x-1"
      type="button"
    >
      {content}
    </button>
  );
};

export default NavItem;
