
import React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { ScheduledPost } from './types/calendar';

interface CalendarSidebarProps {
  selectedDate: Date;
  selectedDatePosts: ScheduledPost[];
}

const CalendarSidebar = ({ selectedDate, selectedDatePosts }: CalendarSidebarProps) => {
  return (
    <div className="col-span-2 border-l pl-4 ml-4">
      <div className="mb-3">
        <h4 className="font-medium text-sm">{format(selectedDate, 'EEEE, MMMM d')}</h4>
        <p className="text-xs text-muted-foreground">
          {selectedDatePosts.length} scheduled {selectedDatePosts.length === 1 ? 'post' : 'posts'}
        </p>
      </div>
      
      <div className="space-y-3 overflow-y-auto max-h-[260px] pr-2">
        {selectedDatePosts.length > 0 ? (
          selectedDatePosts.map(post => (
            <div key={post.id} className="p-3 rounded-lg border bg-secondary/50 transition-all hover:bg-secondary">
              <div className={`platform-badge platform-badge-${post.platform} mb-2`}>
                {post.platform.charAt(0).toUpperCase() + post.platform.slice(1)}
              </div>
              <p className="text-xs font-medium">{post.content}</p>
              <p className="text-xs text-muted-foreground mt-1">{format(post.date, 'h:mm a')}</p>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-8 text-center">
            <CalendarIcon className="h-8 w-8 text-muted-foreground/50 mb-2" />
            <p className="text-sm text-muted-foreground">No posts scheduled</p>
            <p className="text-xs text-muted-foreground mt-1">Click "Schedule Post" to create one</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarSidebar;
