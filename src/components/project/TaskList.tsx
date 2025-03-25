
import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale/fr';
import { Task } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';
import AnimatedCard from '@/components/motion/AnimatedCard';

interface TaskListProps {
  tasks: Task[];
  onAddTask?: () => void;
  onViewAllTasks?: () => void;
  limit?: number;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onAddTask, 
  onViewAllTasks,
  limit = 3
}) => {
  const displayTasks = tasks.slice(0, limit);
  
  if (tasks.length === 0) {
    return (
      <AnimatedCard delay={0.1}>
        <Card className="glass-card mt-6">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Aucune tâche pour le moment</h3>
            <p className="text-muted-foreground mb-4">Commencez par ajouter des tâches à votre projet</p>
            <Button onClick={onAddTask}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Ajouter une tâche
            </Button>
          </CardContent>
        </Card>
      </AnimatedCard>
    );
  }

  return (
    <AnimatedCard delay={0.1}>
      <Card className="glass-card mt-6">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">Tâches récentes</h3>
          <div className="space-y-4">
            {displayTasks.map((task) => (
              <div key={task.id} className="border-b pb-3 last:border-b-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">{task.title}</h4>
                  <div className={`px-2 py-1 text-xs rounded-full ${
                    task.status === 'completed' ? 'bg-green-100 text-green-800' :
                    task.status === 'in-progress' ? 'bg-klyra-100 text-klyra-800' :
                    task.status === 'delayed' ? 'bg-orange-100 text-orange-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {task.status === 'in-progress' ? 'En cours' :
                     task.status === 'completed' ? 'Terminé' :
                     task.status === 'pending' ? 'En attente' :
                     task.status === 'delayed' ? 'Retardé' : task.status}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{task.description || "Aucune description"}</p>
                {task.due_date && (
                  <div className="text-xs text-muted-foreground mt-2">
                    Échéance: {format(new Date(task.due_date), 'dd MMMM yyyy', { locale: fr })}
                  </div>
                )}
              </div>
            ))}
          </div>
          {tasks.length > limit && (
            <div className="mt-4 text-center">
              <Button variant="ghost" size="sm" onClick={onViewAllTasks}>
                Voir toutes les tâches
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </AnimatedCard>
  );
};

export default TaskList;
