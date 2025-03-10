
import React from 'react';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface CalendarHeaderProps {
  month: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

const CalendarHeader = ({ month, onPreviousMonth, onNextMonth }: CalendarHeaderProps) => {
  const { toast } = useToast();

  const handleSchedulePost = () => {
    toast({
      title: "Programma un nuovo post",
      description: "Funzionalità di programmazione post attivata",
    });
  };

  return (
    <>
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-medium">Pianificazione Contenuti</h3>
          <button 
            onClick={handleSchedulePost}
            className="flex items-center text-xs font-medium text-primary gap-1 hover:underline"
          >
            <Plus className="h-3.5 w-3.5" />
            Programma Post
          </button>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-medium">{format(month, 'MMMM yyyy')}</h4>
        <div className="flex items-center gap-1.5">
          <button
            onClick={onPreviousMonth}
            className="p-1.5 rounded-full hover:bg-secondary transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={onNextMonth}
            className="p-1.5 rounded-full hover:bg-secondary transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
};

export default CalendarHeader;
