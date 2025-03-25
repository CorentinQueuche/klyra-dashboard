
import React from 'react';
import { ProgressCard } from '@/components/ProgressCard';
import PremiumFeatureTab from '@/components/PremiumFeatureTab';
import AnimatedCard from '@/components/motion/AnimatedCard';

interface ProgressTabProps {
  completedTasks: number;
  totalTasks: number;
  onUpgrade: () => void;
}

const ProgressTab: React.FC<ProgressTabProps> = ({
  completedTasks,
  totalTasks,
  onUpgrade
}) => {
  const completedOnTime = 0; // You would need to calculate this based on due dates
  
  return (
    <AnimatedCard>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProgressCard
          title="Avancement des tâches"
          description="Nombre de tâches terminées par rapport au nombre total"
          value={completedTasks}
          total={totalTasks}
        />
        <ProgressCard
          title="Respect des délais"
          description="Pourcentage de tâches terminées dans les délais"
          value={completedOnTime}
          total={completedTasks || 1}
        />
        <div className="md:col-span-2">
          <PremiumFeatureTab
            title="Débloquez l'analyse avancée de progression"
            description="Accédez à des analyses détaillées, des graphiques de performance et des prévisions pour mieux suivre l'avancement de votre projet."
            onUpgrade={onUpgrade}
          />
        </div>
      </div>
    </AnimatedCard>
  );
};

export default ProgressTab;
