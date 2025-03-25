
import React from 'react';
import PremiumFeatureTab from '@/components/PremiumFeatureTab';

interface StatisticsTabProps {
  onUpgrade: () => void;
}

const StatisticsTab: React.FC<StatisticsTabProps> = ({ onUpgrade }) => {
  return (
    <PremiumFeatureTab
      title="Statistiques avancées disponibles avec Klyra Premium"
      description="Accédez à des statistiques détaillées, des graphiques de performance et des indicateurs clés pour analyser vos projets en profondeur."
      ctaText="Passer à Premium pour débloquer"
      onUpgrade={onUpgrade}
    />
  );
};

export default StatisticsTab;
