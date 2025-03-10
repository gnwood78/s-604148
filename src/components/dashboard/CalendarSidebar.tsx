
import React from 'react';
import { format } from 'date-fns';
import { CalendarIcon, Plus } from 'lucide-react';
import { ScheduledPost, PLATFORM_COLORS } from './types/calendar';
import { useToast } from '@/hooks/use-toast';

interface CalendarSidebarProps {
  selectedDate: Date;
  selectedDatePosts: ScheduledPost[];
}

const CalendarSidebar = ({ selectedDate, selectedDatePosts }: CalendarSidebarProps) => {
  const { toast } = useToast();

  const handleSchedulePost = () => {
    toast({
      title: "Programma un nuovo post",
      description: `Nuovo post programmato per il ${format(selectedDate, 'dd/MM/yyyy')}`,
    });
  };

  const handleEditPost = (postId: number) => {
    toast({
      title: "Modifica post",
      description: `Stai modificando il post #${postId}`,
    });
  };

  return (
    <div className="col-span-2 border-l pl-4 ml-4">
      <div className="mb-3 flex justify-between items-center">
        <div>
          <h4 className="font-medium text-sm">{format(selectedDate, 'EEEE, MMMM d')}</h4>
          <p className="text-xs text-muted-foreground">
            {selectedDatePosts.length} {selectedDatePosts.length === 1 ? 'post programmato' : 'post programmati'}
          </p>
        </div>
        <button
          onClick={handleSchedulePost}
          className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Nuovo</span>
        </button>
      </div>
      
      <div className="space-y-3 overflow-y-auto max-h-[260px] pr-2">
        {selectedDatePosts.length > 0 ? (
          selectedDatePosts.map(post => (
            <div 
              key={post.id} 
              className="p-3 rounded-lg border bg-secondary/50 transition-all hover:bg-secondary cursor-pointer"
              onClick={() => handleEditPost(post.id)}
            >
              <div className={`text-xs font-medium px-2 py-0.5 rounded inline-flex items-center ${PLATFORM_COLORS[post.platform].replace('bg-', 'bg-opacity-20 text-')} mb-2`}>
                <span className={`w-2 h-2 rounded-full ${PLATFORM_COLORS[post.platform]} mr-1.5`}></span>
                {post.platform.charAt(0).toUpperCase() + post.platform.slice(1)}
              </div>
              <p className="text-xs font-medium">{post.content}</p>
              <p className="text-xs text-muted-foreground mt-1">{format(post.date, 'h:mm a')}</p>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-8 text-center">
            <CalendarIcon className="h-8 w-8 text-muted-foreground/50 mb-2" />
            <p className="text-sm text-muted-foreground">Nessun post programmato</p>
            <p className="text-xs text-muted-foreground mt-1">Clicca "Nuovo" per crearne uno</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarSidebar;
