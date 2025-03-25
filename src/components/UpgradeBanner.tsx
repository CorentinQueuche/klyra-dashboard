
import React from 'react';
import { motion } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface UpgradeBannerProps {
  title: string;
  description: string;
  ctaText: string;
  onClose: () => void;
  onCTAClick: () => void;
  className?: string;
}

export const UpgradeBanner = ({
  title,
  description,
  ctaText,
  onClose,
  onCTAClick,
  className,
}: UpgradeBannerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={cn("relative", className)}
    >
      <Card className="border-0 overflow-hidden bg-gradient-to-r from-klyra-50 to-klyra-100 shadow-lg">
        <CardContent className="p-4 md:p-6">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-6 w-6 rounded-full"
            onClick={onClose}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Fermer</span>
          </Button>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-shrink-0 hidden sm:flex items-center justify-center h-12 w-12 rounded-full bg-klyra-100 text-klyra-700">
              <Sparkles className="h-6 w-6" />
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(125, 211, 252, 0.4)',
                    '0 0 0 8px rgba(125, 211, 252, 0)',
                  ],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              />
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-semibold text-klyra-900">{title}</h3>
              <p className="text-sm mt-1 text-klyra-700">{description}</p>
            </div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={onCTAClick}
                className="bg-klyra-600 hover:bg-klyra-700 text-white"
              >
                {ctaText}
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UpgradeBanner;
