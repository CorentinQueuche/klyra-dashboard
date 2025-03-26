
import React from 'react';
import { ProgressCard } from '@/components/ProgressCard';
import AnimatedCard from '@/components/motion/AnimatedCard';
import { Card, CardContent } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Clock, Sparkles } from 'lucide-react';

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
  const completedOnTime = completedTasks > 0 ? Math.floor(completedTasks * 0.8) : 0; // Simuler 80% de tâches complétées à temps
  
  // Données de démonstration pour le graphique d'évolution
  const progressData = [
    { jour: 'Lun', progression: 25 },
    { jour: 'Mar', progression: 35 },
    { jour: 'Mer', progression: 45 },
    { jour: 'Jeu', progression: 60 },
    { jour: 'Ven', progression: 75 },
    { jour: 'Sam', progression: 85 },
    { jour: 'Dim', progression: 90 },
  ];
  
  return (
    <div className="space-y-6">
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
        </div>
      </AnimatedCard>
      
      <AnimatedCard delay={0.1}>
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-medium">Évolution du projet</h3>
                <p className="text-sm text-muted-foreground">Progression au cours des 7 derniers jours</p>
              </div>
              <Button variant="outline" size="sm" className="gap-1">
                <Clock className="h-4 w-4" />
                <span>7 jours</span>
              </Button>
            </div>
            
            <div className="h-[250px] w-full">
              <ChartContainer
                config={{
                  progression: {
                    label: "Progression",
                    theme: { light: "#6366f1", dark: "#818cf8" }
                  }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="jour" />
                    <YAxis unit="%" />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="progression"
                      stroke="var(--color-progression)"
                      strokeWidth={2.5}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </AnimatedCard>
      
      <AnimatedCard delay={0.2}>
        <Card className="glass-card bg-gradient-to-br from-klyra-50 to-transparent">
          <CardContent className="p-6">
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-klyra-100 rounded-lg">
                <Sparkles className="h-6 w-6 text-klyra-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-1">Débloquez l'analyse avancée de progression</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Accédez à des analyses détaillées, des graphiques de performance et des prévisions 
                  pour mieux suivre l'avancement de votre projet.
                </p>
                <Button
                  onClick={onUpgrade}
                  className="bg-klyra-600 hover:bg-klyra-700 text-white"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Passer à Premium
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </AnimatedCard>
    </div>
  );
};

export default ProgressTab;
