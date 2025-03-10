
import React, { useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { cn } from '@/lib/utils';

// Sample data
const data = [
  { date: 'Jan', instagram: 4000, twitter: 2400, facebook: 2400, linkedin: 1200 },
  { date: 'Feb', instagram: 3000, twitter: 1398, facebook: 2800, linkedin: 1600 },
  { date: 'Mar', instagram: 2000, twitter: 9800, facebook: 3200, linkedin: 1900 },
  { date: 'Apr', instagram: 2780, twitter: 3908, facebook: 2900, linkedin: 2100 },
  { date: 'May', instagram: 1890, twitter: 4800, facebook: 3500, linkedin: 2800 },
  { date: 'Jun', instagram: 2390, twitter: 3800, facebook: 4100, linkedin: 2900 },
  { date: 'Jul', instagram: 3490, twitter: 4300, facebook: 4500, linkedin: 3200 },
];

const platformOptions = [
  { id: 'instagram', name: 'Instagram', color: '#E1306C' },
  { id: 'twitter', name: 'Twitter', color: '#1DA1F2' },
  { id: 'facebook', name: 'Facebook', color: '#4267B2' },
  { id: 'linkedin', name: 'LinkedIn', color: '#0077B5' },
];

interface EngagementChartProps {
  className?: string;
  title?: string;
}

const EngagementChart: React.FC<EngagementChartProps> = ({ className, title }) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState(platformOptions.map(p => p.id));

  const togglePlatform = (platformId: string) => {
    if (selectedPlatforms.includes(platformId)) {
      setSelectedPlatforms(selectedPlatforms.filter(id => id !== platformId));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platformId]);
    }
  };

  return (
    <div className={cn("chart-container", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-medium">{title || 'Engagement Over Time'}</h3>
        <div className="flex gap-2">
          {platformOptions.map((platform) => (
            <button
              key={platform.id}
              className={cn(
                "text-xs rounded-full px-2 py-1 transition-all",
                selectedPlatforms.includes(platform.id)
                  ? `bg-${platform.id}/10 text-${platform.id} ring-1 ring-${platform.id}/30`
                  : "bg-gray-100 text-gray-500"
              )}
              onClick={() => togglePlatform(platform.id)}
              style={{
                backgroundColor: selectedPlatforms.includes(platform.id) 
                  ? `${platform.color}10` 
                  : undefined,
                color: selectedPlatforms.includes(platform.id) 
                  ? platform.color 
                  : undefined,
                boxShadow: selectedPlatforms.includes(platform.id) 
                  ? `0 0 0 1px ${platform.color}30` 
                  : undefined
              }}
            >
              {platform.name}
            </button>
          ))}
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            {platformOptions.map((platform) => (
              <linearGradient key={platform.id} id={`color${platform.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={platform.color} stopOpacity={0.2} />
                <stop offset="95%" stopColor={platform.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <XAxis 
            dataKey="date" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#888' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#888' }}
          />
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              border: '1px solid #eee',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              padding: '8px 12px',
              fontSize: '12px'
            }} 
          />
          
          {platformOptions.map((platform) => (
            selectedPlatforms.includes(platform.id) && (
              <Area
                key={platform.id}
                type="monotone"
                dataKey={platform.id}
                stroke={platform.color}
                fillOpacity={1}
                fill={`url(#color${platform.id})`}
                strokeWidth={2}
                activeDot={{ r: 5, strokeWidth: 0 }}
              />
            )
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EngagementChart;
