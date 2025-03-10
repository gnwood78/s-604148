
import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  className?: string;
}

const AnalyticsCard = ({ title, value, change, changeLabel, icon, className }: AnalyticsCardProps) => {
  const showChange = change !== undefined;
  const isPositive = showChange && change > 0;
  const isNegative = showChange && change < 0;

  return (
    <div className={cn(
      "rounded-xl p-6 bg-white border shadow-sm card-transition card-hover", 
      className
    )}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="stat-value mt-1">{value}</p>
          
          {showChange && (
            <div className="flex items-center mt-2">
              <div className={cn(
                "flex items-center text-xs font-medium rounded-full px-1.5 py-0.5",
                isPositive && "text-green-600 bg-green-50",
                isNegative && "text-red-600 bg-red-50",
                !isPositive && !isNegative && "text-gray-600 bg-gray-50"
              )}>
                {isPositive && <ArrowUp className="h-3 w-3 mr-0.5" />}
                {isNegative && <ArrowDown className="h-3 w-3 mr-0.5" />}
                {Math.abs(change)}%
              </div>
              {changeLabel && (
                <span className="text-xs text-muted-foreground ml-1.5">
                  {changeLabel}
                </span>
              )}
            </div>
          )}
        </div>
        {icon && (
          <div className="h-9 w-9 rounded-full flex items-center justify-center bg-primary/10">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsCard;
