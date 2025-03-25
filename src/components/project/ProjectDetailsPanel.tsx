
import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Project } from '@/lib/types';
import AnimatedCard from '@/components/motion/AnimatedCard';

interface ProjectDetailsPanelProps {
  project: Project;
  completedTasksCount: number;
  totalTasksCount: number;
  onAddTask?: () => void;
}

const ProjectDetailsPanel: React.FC<ProjectDetailsPanelProps> = ({
  project,
  completedTasksCount,
  totalTasksCount,
  onAddTask
}) => {
  return (
    <AnimatedCard>
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold">Détails du projet</h3>
            <Button size="sm" variant="outline" onClick={onAddTask}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Ajouter une tâche
            </Button>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Description</h4>
              <p>{project.description || "Aucune description disponible"}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Statut actuel</h4>
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${
                  project.status === 'completed' ? 'bg-green-500' :
                  project.status === 'in-progress' ? 'bg-klyra-500' :
                  project.status === 'delayed' ? 'bg-orange-500' :
                  'bg-gray-500'
                }`}></div>
                <span className="capitalize">
                  {project.status === 'in-progress' ? 'En cours' :
                   project.status === 'completed' ? 'Terminé' :
                   project.status === 'pending' ? 'En attente' :
                   project.status === 'delayed' ? 'Retardé' :
                   project.status === 'live' ? 'En ligne' : project.status}
                </span>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Progression</h4>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-1">
                <div className="bg-klyra-500 h-2.5 rounded-full" style={{ 
                  width: `${totalTasksCount > 0 ? (completedTasksCount / totalTasksCount) * 100 : 0}%` 
                }}></div>
              </div>
              <span className="text-sm text-muted-foreground">
                {completedTasksCount} sur {totalTasksCount} tâches terminées
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </AnimatedCard>
  );
};

export default ProjectDetailsPanel;
