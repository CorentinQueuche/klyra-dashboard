
import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import StatusBadge from './StatusBadge';

export type TimelineItemStatus = 'completed' | 'in-progress' | 'pending' | 'delayed';

interface TimelineItem {
  id: string;
  title: string;
  date: string;
  description: string;
  status: TimelineItemStatus;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

const statusIcons: Record<TimelineItemStatus, React.ReactNode> = {
  completed: <CheckCircle className="h-5 w-5 text-green-500" />,
  'in-progress': <Clock className="h-5 w-5 text-klyra-500 animate-pulse-slow" />,
  pending: <Clock className="h-5 w-5 text-muted-foreground" />,
  delayed: <AlertCircle className="h-5 w-5 text-amber-500" />,
};

export const Timeline: React.FC<TimelineProps> = ({ items, className }) => {
  return (
    <div className={cn('space-y-6', className)}>
      {items.map((item, index) => (
        <div key={item.id} className="animate-enter" style={{ animationDelay: `${index * 100}ms` }}>
          <div className="relative flex gap-4">
            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-background">
                {statusIcons[item.status]}
              </div>
              {index < items.length - 1 && (
                <div className={cn(
                  "w-px grow",
                  item.status === 'completed' ? 'bg-green-200' : 'bg-border'
                )} />
              )}
            </div>
            <div className="flex flex-col pb-6">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-base">{item.title}</h4>
                <StatusBadge status={item.status === 'delayed' ? 'delayed' : 
                  item.status === 'completed' ? 'completed' : 
                  item.status === 'in-progress' ? 'in-progress' : 'pending'} />
              </div>
              <time className="text-xs text-muted-foreground mt-0.5">{item.date}</time>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
