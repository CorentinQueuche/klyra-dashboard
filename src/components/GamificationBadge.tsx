
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card';
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

const BadgeConfig: Record<BadgeType, { icon: React.ElementType; color: string; gradient: string }> = {
  bronze: { 
    icon: Medal, 
    color: 'text-amber-700 border-amber-200',
    gradient: 'from-amber-100 to-amber-300'
  },
  silver: { 
    icon: Star, 
    color: 'text-slate-500 border-slate-200',
    gradient: 'from-slate-100 to-slate-300'
  },
  gold: { 
    icon: Trophy, 
    color: 'text-yellow-600 border-yellow-200',
    gradient: 'from-yellow-100 to-yellow-300'
  },
  platinum: { 
    icon: Zap, 
    color: 'text-sky-600 border-sky-200',
    gradient: 'from-sky-100 to-sky-300'
  },
  diamond: { 
    icon: Award, 
    color: 'text-indigo-600 border-indigo-200',
    gradient: 'from-indigo-100 to-indigo-300'
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
  const { icon: BadgeIcon, color, gradient } = BadgeConfig[type];
  const sizeClass = sizeClasses[size];
  
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            'relative flex items-center justify-center rounded-full border p-1 transition-all cursor-pointer',
            obtained ? `bg-gradient-to-br ${gradient} ${color} shadow-sm` : 'bg-gray-50 opacity-50 grayscale',
            sizeClass,
            className
          )}
        >
          <BadgeIcon className={cn(
            'w-1/2 h-1/2',
            obtained && 'text-current'
          )} />
          
          {obtained && (
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: ['0 0 0 0px rgba(255, 255, 255, 0)', '0 0 0 4px rgba(255, 255, 255, 0)'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          )}
        </motion.div>
      </HoverCardTrigger>
      <HoverCardContent side="top" align="center" className="w-64 p-0 glass-card">
        <div className="p-4 space-y-2">
          <div className="flex items-center gap-2">
            <BadgeIcon className="w-5 h-5" />
            <h4 className="font-medium">{label}</h4>
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
          {!obtained && (
            <div className="text-xs italic text-muted-foreground mt-2 pt-2 border-t">
              Complétez cette réalisation pour débloquer ce badge
            </div>
          )}
          {obtained && (
            <div className="text-xs text-emerald-600 font-medium mt-2 pt-2 border-t flex items-center">
              <Star className="w-3 h-3 mr-1" /> Badge obtenu
            </div>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default GamificationBadge;
