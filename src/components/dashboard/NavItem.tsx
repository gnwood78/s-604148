
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  href?: string;
}

const NavItem = ({ icon: Icon, label, isActive = false, onClick, href }: NavItemProps) => {
  const content = (
    <div 
      className={cn(
        "group flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
        isActive 
          ? "bg-sidebar-primary text-sidebar-primary-foreground" 
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
    >
      <Icon className="sidebar-icon" />
      <span>{label}</span>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block w-full">
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className="block w-full text-left">
      {content}
    </button>
  );
};

export default NavItem;
