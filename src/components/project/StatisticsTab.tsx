
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import AnimatedCard from '@/components/motion/AnimatedCard';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface StatisticsTabProps {
  onUpgrade: () => void;
}

const StatisticsTab: React.FC<StatisticsTabProps> = ({ onUpgrade }) => {
  // Données de démonstration pour les statistiques
  const data = [
    { name: 'Jan', complétées: 4, retardées: 1, enCours: 2 },
    { name: 'Fév', complétées: 3, retardées: 2, enCours: 3 },
    { name: 'Mar', complétées: 5, retardées: 0, enCours: 2 },
    { name: 'Avr', complétées: 2, retardées: 1, enCours: 4 },
    { name: 'Mai', complétées: 6, retardées: 2, enCours: 1 },
    { name: 'Juin', complétées: 8, retardées: 0, enCours: 0 },
  ];

  return (
    <AnimatedCard>
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Statistiques des tâches</h2>
            <p className="text-muted-foreground">Aperçu de la progression des tâches au fil du temps</p>
          </div>
          
          <div className="h-[300px] w-full mb-8">
            <ChartContainer 
              config={{
                complétées: { 
                  label: "Tâches complétées",
                  theme: { light: "#10b981", dark: "#10b981" }
                },
                retardées: { 
                  label: "Tâches retardées", 
                  theme: { light: "#f59e0b", dark: "#f59e0b" }
                },
                enCours: { 
                  label: "Tâches en cours", 
                  theme: { light: "#6366f1", dark: "#6366f1" }
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="complétées" fill="var(--color-complétées)" />
                  <Bar dataKey="retardées" fill="var(--color-retardées)" />
                  <Bar dataKey="enCours" fill="var(--color-enCours)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg border border-dashed">
            <h3 className="font-medium mb-2 flex items-center">
              <Sparkles className="h-4 w-4 text-klyra-500 mr-2" />
              Fonctionnalités Premium
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Débloquez des analyses avancées avec la version Premium: tendances prédictives, 
              analyses de performance, rapports exportables et bien plus.
            </p>
            <Button 
              className="w-full bg-klyra-600 hover:bg-klyra-700 text-white"
              onClick={onUpgrade}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Passer à Premium
            </Button>
          </div>
        </CardContent>
      </Card>
    </AnimatedCard>
  );
};

export default StatisticsTab;
