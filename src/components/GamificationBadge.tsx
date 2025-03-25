
import React from 'react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Trophy, Star, Award, Zap, Medal } from 'lucide-react';

export type BadgeType = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

interface GamificationBadgeProps {
  type: BadgeType;
  label: string;
  description: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  obtained?: boolean;
}

const BadgeConfig: Record<BadgeType, { icon: React.ElementType; color: string }> = {
  bronze: { 
    icon: Medal, 
    color: 'text-amber-700 bg-amber-50 border-amber-200' 
  },
  silver: { 
    icon: Star, 
    color: 'text-slate-500 bg-slate-50 border-slate-200' 
  },
  gold: { 
    icon: Trophy, 
    color: 'text-yellow-600 bg-yellow-50 border-yellow-200' 
  },
  platinum: { 
    icon: Zap, 
    color: 'text-sky-600 bg-sky-50 border-sky-200' 
  },
  diamond: { 
    icon: Award, 
    color: 'text-indigo-600 bg-indigo-50 border-indigo-200' 
  },
};

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
};

export const GamificationBadge: React.FC<GamificationBadgeProps> = ({ 
  type, 
  label, 
  description, 
  className,
  size = 'md',
  obtained = false 
}) => {
  const { icon: BadgeIcon, color } = BadgeConfig[type];
  const sizeClass = sizeClasses[size];
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div 
            className={cn(
              'relative flex items-center justify-center rounded-full border p-1 transition-all',
              color,
              sizeClass,
              obtained ? 'opacity-100 shadow-sm' : 'opacity-50 grayscale',
              className
            )}
          >
            <BadgeIcon className={cn(
              'w-1/2 h-1/2',
              obtained ? 'animate-pulse-slow' : ''
            )} />
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="center" className="max-w-[200px] text-center">
          <div className="space-y-1 p-1">
            <p className="font-medium">{label}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
            {!obtained && (
              <p className="text-xs italic text-muted-foreground">Non obtenu</p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default GamificationBadge;
