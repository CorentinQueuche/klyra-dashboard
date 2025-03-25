
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Sparkles } from 'lucide-react';

interface PremiumFeatureTabProps {
  title: string;
  description: string;
  ctaText?: string;
  onUpgrade?: () => void;
}

const PremiumFeatureTab: React.FC<PremiumFeatureTabProps> = ({
  title,
  description,
  ctaText = "Débloquer cette fonctionnalité",
  onUpgrade,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="glass-card">
        <CardContent className="p-8 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-klyra-50 text-klyra-500">
            <Lock className="h-8 w-8" />
          </div>
          <h3 className="mb-3 text-xl font-semibold">{title}</h3>
          <p className="mb-8 text-muted-foreground">{description}</p>
          <Button 
            className="bg-klyra-600 hover:bg-klyra-700 text-white"
            onClick={onUpgrade}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            {ctaText}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PremiumFeatureTab;
