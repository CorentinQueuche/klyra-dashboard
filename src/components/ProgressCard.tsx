
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ProgressCardProps {
  title: string;
  description: string;
  value: number;
  total: number;
  className?: string;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  description,
  value,
  total,
  className,
}) => {
  const percentage = Math.round((value / total) * 100);
  
  return (
    <Card className={cn('overflow-hidden card-hover', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">{description}</p>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">{value} sur {total}</span>
              <span className="text-sm font-medium">{percentage}%</span>
            </div>
            <Progress className="h-2" value={percentage} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressCard;
