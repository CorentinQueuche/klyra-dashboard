
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UpsellCardProps {
  title: string;
  description: string;
  ctaText: string;
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
  variant?: 'default' | 'subtle' | 'outlined';
}

export const UpsellCard: React.FC<UpsellCardProps> = ({
  title,
  description,
  ctaText,
  icon,
  onClick,
  className,
  variant = 'default',
}) => {
  const variantClasses = {
    default: 'bg-gradient-to-br from-klyra-50 to-klyra-100 border-klyra-200',
    subtle: 'bg-card border',
    outlined: 'bg-transparent border border-dashed',
  };
  
  return (
    <Card 
      className={cn(
        'overflow-hidden card-hover transition-all duration-300',
        variantClasses[variant],
        className
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          <div className="text-klyra-500">{icon}</div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Button 
          variant="ghost" 
          className="ml-auto text-klyra-600 hover:text-klyra-700 hover:bg-klyra-50 p-0 h-auto" 
          onClick={onClick}
        >
          <span className="mr-1">{ctaText}</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UpsellCard;
