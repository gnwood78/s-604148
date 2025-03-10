
import React from 'react';
import { cn } from '@/lib/utils';
import { Clock, Instagram, Twitter, Facebook, Linkedin, MoreHorizontal } from 'lucide-react';
import { format } from 'date-fns';

interface PostPreviewProps {
  platform: 'instagram' | 'twitter' | 'facebook' | 'linkedin';
  content: string;
  imageUrl?: string;
  scheduledDate: Date;
  status: 'scheduled' | 'draft' | 'published';
  className?: string;
}

const PLATFORM_CONFIG = {
  instagram: {
    name: 'Instagram',
    icon: Instagram,
    badge: 'platform-badge-instagram'
  },
  twitter: {
    name: 'Twitter',
    icon: Twitter,
    badge: 'platform-badge-twitter'
  },
  facebook: {
    name: 'Facebook',
    icon: Facebook,
    badge: 'platform-badge-facebook'
  },
  linkedin: {
    name: 'LinkedIn',
    icon: Linkedin,
    badge: 'platform-badge-linkedin'
  }
};

const STATUS_STYLES = {
  scheduled: 'bg-amber-50 text-amber-700 border-amber-200',
  draft: 'bg-gray-50 text-gray-700 border-gray-200',
  published: 'bg-green-50 text-green-700 border-green-200'
};

const PostPreview: React.FC<PostPreviewProps> = ({
  platform,
  content,
  imageUrl,
  scheduledDate,
  status,
  className
}) => {
  const config = PLATFORM_CONFIG[platform];
  const Icon = config.icon;
  const statusStyle = STATUS_STYLES[status];
  
  return (
    <div className={cn(
      "p-4 rounded-xl bg-white border shadow-sm card-transition card-hover",
      className
    )}>
      <div className="flex justify-between items-center mb-3">
        <div className={`platform-badge ${config.badge}`}>
          <Icon className="mr-1 h-3.5 w-3.5" />
          {config.name}
        </div>
        <div className="flex items-center gap-2">
          <div className={cn("text-xs px-2 py-0.5 rounded-full border", statusStyle)}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </div>
          <button className="p-1 rounded-full hover:bg-gray-100">
            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>
      
      <div className="mt-3 mb-3">
        <p className="text-sm line-clamp-3">{content}</p>
      </div>
      
      {imageUrl && (
        <div className="mt-3 mb-3 rounded-md overflow-hidden border bg-gray-50 aspect-video flex items-center justify-center">
          <img 
            src={imageUrl} 
            alt="Post preview" 
            className="object-cover w-full h-full"
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/600x400/e2e8f0/64748b?text=Image';
            }}
          />
        </div>
      )}
      
      <div className="flex items-center text-xs text-muted-foreground mt-3">
        <Clock className="h-3.5 w-3.5 mr-1.5" />
        {status === 'scheduled'
          ? `Scheduled for ${format(scheduledDate, 'MMM d, h:mm a')}`
          : status === 'published'
            ? `Published on ${format(scheduledDate, 'MMM d, h:mm a')}`
            : `Last edited on ${format(scheduledDate, 'MMM d, h:mm a')}`
        }
      </div>
    </div>
  );
};

export default PostPreview;
