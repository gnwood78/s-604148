
import React from 'react';
import { format, isSameDay, isSameMonth } from 'date-fns';
import { cn } from '@/lib/utils';
import { ScheduledPost, PLATFORM_COLORS } from './types/calendar';

interface CalendarGridProps {
  days: Date[];
  month: Date;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  getPostsForDate: (date: Date) => ScheduledPost[];
}

const CalendarGrid = ({ days, month, selectedDate, onSelectDate, getPostsForDate }: CalendarGridProps) => {
  return (
    <>
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
              onClick={() => onSelectDate(day)}
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
    </>
  );
};

export default CalendarGrid;
