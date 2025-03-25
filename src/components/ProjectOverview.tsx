
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, CalendarDays, CheckCircle2, Zap } from 'lucide-react';
import StatusBadge from './StatusBadge';

interface ProjectOverviewProps {
  project: {
    title: string;
    status: 'pending' | 'in-progress' | 'completed' | 'delayed' | 'live';
    startDate: string;
    estimatedEndDate: string;
    completedTasks: number;
    totalTasks: number;
    level: number;
    description: string;
  };
}

export const ProjectOverview: React.FC<ProjectOverviewProps> = ({ project }) => {
  const progress = Math.round((project.completedTasks / project.totalTasks) * 100);
  
  return (
    <Card className="glass-dark">
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <CardTitle className="text-2xl font-bold">{project.title}</CardTitle>
            <CardDescription className="mt-1 max-w-2xl">{project.description}</CardDescription>
          </div>
          <StatusBadge status={project.status} className="ml-auto" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col space-y-1.5">
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarDays className="mr-1.5 h-4 w-4" />
              Date de début
            </div>
            <div className="font-medium">{project.startDate}</div>
          </div>
          <div className="flex flex-col space-y-1.5">
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarDays className="mr-1.5 h-4 w-4" />
              Date de fin estimée
            </div>
            <div className="font-medium">{project.estimatedEndDate}</div>
          </div>
          <div className="flex flex-col space-y-1.5">
            <div className="flex items-center text-sm text-muted-foreground">
              <CheckCircle2 className="mr-1.5 h-4 w-4" />
              Tâches terminées
            </div>
            <div className="font-medium">{project.completedTasks} / {project.totalTasks} ({progress}%)</div>
          </div>
          <div className="flex flex-col space-y-1.5">
            <div className="flex items-center text-sm text-muted-foreground">
              <Zap className="mr-1.5 h-4 w-4" />
              Niveau de projet
            </div>
            <div className="font-medium">Niveau {project.level}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectOverview;
