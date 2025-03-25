
import React from 'react';
import { cn } from '@/lib/utils';

type StatusType = 'pending' | 'in-progress' | 'completed' | 'delayed' | 'live';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  'pending': { 
    label: 'En attente', 
    className: 'bg-secondary text-secondary-foreground' 
  },
  'in-progress': { 
    label: 'En cours', 
    className: 'bg-klyra-100 text-klyra-800 border border-klyra-200' 
  },
  'completed': { 
    label: 'Terminé', 
    className: 'bg-green-100 text-green-800 border border-green-200' 
  },
  'delayed': { 
    label: 'Retardé', 
    className: 'bg-amber-100 text-amber-800 border border-amber-200' 
  },
  'live': { 
    label: 'En ligne', 
    className: 'bg-purple-100 text-purple-800 border border-purple-200' 
  }
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const { label, className: statusClassName } = statusConfig[status];
  
  return (
    <span className={cn(
      'badge inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
      statusClassName,
      className
    )}>
      {label}
    </span>
  );
};

export default StatusBadge;
