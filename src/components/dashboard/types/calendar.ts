
export interface ScheduledPost {
  id: number;
  date: Date;
  platform: 'instagram' | 'twitter' | 'facebook' | 'linkedin';
  content: string;
}

export interface CalendarProps {
  className?: string;
}

export const PLATFORM_COLORS = {
  instagram: 'bg-instagram',
  twitter: 'bg-twitter',
  facebook: 'bg-facebook',
  linkedin: 'bg-linkedin'
} as const;
