import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { Crown, Star, Award, Zap, Medal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LevelProgressProps {
  currentLevel: number;
  maxLevel: number;
  xp: number;
  nextLevelXp: number;
  className?: string;
}

export const LevelProgress: React.FC<LevelProgressProps> = ({
  currentLevel,
  maxLevel,
  xp,
  nextLevelXp,
  className
}) => {
  const progress = Math.min((xp / nextLevelXp) * 100, 100);
  
  const getLevelIcon = (level: number) => {
    if (level <= 2) return Medal;
    if (level <= 5) return Star;
    if (level <= 8) return Award;
    if (level <= 12) return Zap;
    return Crown;
  };
  
  const LevelIcon = getLevelIcon(currentLevel);
  
  return (
    <Card className={cn("overflow-hidden glass-card", className)}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative flex items-center justify-center rounded-full bg-gradient-to-br from-klyra-100 to-klyra-200 p-2 h-12 w-12">
            <LevelIcon className="h-6 w-6 text-klyra-700" />
            <motion.div
              className="absolute inset-0 rounded-full bg-klyra-500/20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 0, 0.7]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          <div>
            <h3 className="font-medium text-lg">Niveau {currentLevel}</h3>
            <p className="text-sm text-muted-foreground">
              {xp} / {nextLevelXp} XP
            </p>
          </div>
        </div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative h-2 w-full bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-klyra-400 to-klyra-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p className="text-xs">
                {progress.toFixed(1)}% vers le niveau {currentLevel + 1}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div className="flex justify-between mt-1">
          <span className="text-xs text-muted-foreground">Niveau {currentLevel}</span>
          <span className="text-xs text-muted-foreground">Niveau {Math.min(currentLevel + 1, maxLevel)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default LevelProgress;
