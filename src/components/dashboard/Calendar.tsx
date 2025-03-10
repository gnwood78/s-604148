
import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { format, addDays, isSameDay, isSameMonth, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths } from 'date-fns';
import { cn } from '@/lib/utils';

interface CalendarProps {
  className?: string;
}

interface ScheduledPost {
  id: number;
  date: Date;
  platform: 'instagram' | 'twitter' | 'facebook' | 'linkedin';
  content: string;
}

const PLATFORM_COLORS = {
  instagram: 'bg-instagram',
  twitter: 'bg-twitter',
  facebook: 'bg-facebook',
  linkedin: 'bg-linkedin'
};

// Sample data
const samplePosts: ScheduledPost[] = [
  {
    id: 1,
    date: addDays(new Date(), 1),
    platform: 'instagram',
    content: 'New product announcement'
  },
  {
    id: 2,
    date: addDays(new Date(), 1),
    platform: 'twitter',
    content: 'Industry news update'
  },
  {
    id: 3,
    date: addDays(new Date(), 3),
    platform: 'facebook',
    content: 'Customer success story'
  },
  {
    id: 4,
    date: addDays(new Date(), 5),
    platform: 'linkedin',
    content: 'Job posting'
  },
  {
    id: 5,
    date: addDays(new Date(), 6),
    platform: 'instagram',
    content: 'Behind the scenes'
  }
];

const Calendar: React.FC<CalendarProps> = ({ className }) => {
  const [month, setMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  const days = eachDayOfInterval({
    start: startOfMonth(month),
    end: endOfMonth(month)
  });
  
  const previousMonth = () => {
    setMonth(subMonths(month, 1));
  };
  
  const nextMonth = () => {
    setMonth(addMonths(month, 1));
  };

  const getPostsForDate = (date: Date) => {
    return samplePosts.filter(post => isSameDay(post.date, date));
  };

  const selectedDatePosts = getPostsForDate(selectedDate);

  return (
    <div className={cn("rounded-xl bg-white border shadow-sm overflow-hidden", className)}>
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-medium">Content Schedule</h3>
          <button className="flex items-center text-xs font-medium text-primary gap-1 hover:underline">
            <Plus className="h-3.5 w-3.5" />
            Schedule Post
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 p-4">
        <div className="col-span-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium">{format(month, 'MMMM yyyy')}</h4>
            <div className="flex items-center gap-1.5">
              <button
                onClick={previousMonth}
                className="p-1.5 rounded-full hover:bg-secondary transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={nextMonth}
                className="p-1.5 rounded-full hover:bg-secondary transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 text-center">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-xs font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1 mt-1">
            {days.map((day) => {
              const posts = getPostsForDate(day);
              const isSelected = isSameDay(day, selectedDate);
              const isCurrentMonth = isSameMonth(day, month);
              
              return (
                <button
                  key={day.toString()}
                  onClick={() => setSelectedDate(day)}
                  className={cn(
                    "aspect-square py-1.5 focus:outline-none rounded-md transition-all duration-200",
                    isSelected ? "bg-primary text-primary-foreground" : "hover:bg-secondary",
                    !isCurrentMonth && "opacity-40"
                  )}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <span className={cn(
                      "text-xs",
                      isSelected ? "font-semibold" : ""
                    )}>
                      {format(day, 'd')}
                    </span>
                    
                    {posts.length > 0 && (
                      <div className="flex gap-0.5 mt-1">
                        {posts.slice(0, 3).map(post => (
                          <div
                            key={post.id}
                            className={cn(
                              "h-1.5 w-1.5 rounded-full",
                              isSelected ? "bg-primary-foreground" : PLATFORM_COLORS[post.platform]
                            )}
                          />
                        ))}
                        {posts.length > 3 && (
                          <div className={cn(
                            "h-1.5 w-1.5 rounded-full text-[8px] flex items-center justify-center",
                            isSelected ? "bg-primary-foreground" : "bg-gray-400"
                          )}>
                            +
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        
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
      </div>
    </div>
  );
};

export default Calendar;
