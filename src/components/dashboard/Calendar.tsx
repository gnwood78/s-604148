
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { addDays, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, isSameDay } from 'date-fns';
import { CalendarProps, ScheduledPost } from './types/calendar';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import CalendarSidebar from './CalendarSidebar';

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
  
  const previousMonth = () => setMonth(subMonths(month, 1));
  const nextMonth = () => setMonth(addMonths(month, 1));
  
  const getPostsForDate = (date: Date) => {
    return samplePosts.filter(post => isSameDay(post.date, date));
  };

  const selectedDatePosts = getPostsForDate(selectedDate);

  return (
    <div className={cn("rounded-xl bg-white border shadow-sm overflow-hidden", className)}>
      <CalendarHeader
        month={month}
        onPreviousMonth={previousMonth}
        onNextMonth={nextMonth}
      />
      
      <div className="grid grid-cols-7 p-4">
        <div className="col-span-5">
          <CalendarGrid
            days={days}
            month={month}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            getPostsForDate={getPostsForDate}
          />
        </div>
        
        <CalendarSidebar
          selectedDate={selectedDate}
          selectedDatePosts={selectedDatePosts}
        />
      </div>
    </div>
  );
};

export default Calendar;
