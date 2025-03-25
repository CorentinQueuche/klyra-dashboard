
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
  duration?: number;
  children: React.ReactNode;
}

export const AnimatedCard = ({ 
  delay = 0, 
  duration = 0.5, 
  children, 
  className,
  ...props
}: AnimatedCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ 
        duration: duration,
        delay: delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
