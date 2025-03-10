
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
  instagram: 'bg-purple-500',
  twitter: 'bg-blue-400',
  facebook: 'bg-blue-600',
  linkedin: 'bg-blue-800'
} as const;
