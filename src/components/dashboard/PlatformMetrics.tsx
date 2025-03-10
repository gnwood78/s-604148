
import React from 'react';
import { cn } from '@/lib/utils';
import { Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';

interface PlatformCardProps {
  platform: 'instagram' | 'twitter' | 'facebook' | 'linkedin';
  followers: number;
  engagement: number;
  posts: number;
  likes: number;
  className?: string;
}

const PLATFORM_CONFIG = {
  instagram: {
    name: 'Instagram',
    icon: Instagram,
    color: 'instagram',
    badge: 'platform-badge-instagram'
  },
  twitter: {
    name: 'Twitter',
    icon: Twitter,
    color: 'twitter',
    badge: 'platform-badge-twitter'
  },
  facebook: {
    name: 'Facebook',
    icon: Facebook,
    color: 'facebook',
    badge: 'platform-badge-facebook'
  },
  linkedin: {
    name: 'LinkedIn',
    icon: Linkedin,
    color: 'linkedin',
    badge: 'platform-badge-linkedin'
  }
};

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

const PlatformMetrics: React.FC<PlatformCardProps> = ({
  platform,
  followers,
  engagement,
  posts,
  likes,
  className
}) => {
  const config = PLATFORM_CONFIG[platform];
  const Icon = config.icon;
  
  return (
    <div className={cn(
      "p-6 rounded-xl bg-white border shadow-sm card-transition card-hover",
      className
    )}>
      <div className="flex justify-between items-center mb-5">
        <div className={`platform-badge ${config.badge}`}>
          <Icon className="mr-1 h-3.5 w-3.5" />
          {config.name}
        </div>
        <button className="text-xs text-primary hover:underline">View Details</button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="stat-label">Followers</p>
          <p className="stat-value text-2xl">{formatNumber(followers)}</p>
        </div>
        <div>
          <p className="stat-label">Engagement</p>
          <p className="stat-value text-2xl">{engagement}%</p>
        </div>
        <div>
          <p className="stat-label">Posts</p>
          <p className="stat-value text-2xl">{formatNumber(posts)}</p>
        </div>
        <div>
          <p className="stat-label">Likes</p>
          <p className="stat-value text-2xl">{formatNumber(likes)}</p>
        </div>
      </div>
    </div>
  );
};

export default PlatformMetrics;
