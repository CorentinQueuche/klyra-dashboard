
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Timeline from '@/components/Timeline';
import AnimatedCard from '@/components/motion/AnimatedCard';
import { TimelineItem } from '@/lib/types';

interface TimelineTabProps {
  timelineItems: TimelineItem[];
  onAddTask?: () => void;
}

const TimelineTab: React.FC<TimelineTabProps> = ({ timelineItems, onAddTask }) => {
  return (
    <AnimatedCard>
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">Chronologie du projet</h2>
              <p className="text-muted-foreground">Visualisez les étapes et l'avancement de votre projet</p>
            </div>
            {onAddTask && (
              <Button onClick={onAddTask}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Ajouter une tâche
              </Button>
            )}
          </div>
          
          {timelineItems.length > 0 ? (
            <Timeline items={timelineItems} />
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-muted rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Aucune tâche dans la chronologie</h3>
              <p className="text-muted-foreground mb-4">Ajoutez des tâches à votre projet pour voir la chronologie</p>
              {onAddTask && (
                <Button onClick={onAddTask}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Ajouter une tâche
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </AnimatedCard>
  );
};

export default TimelineTab;
