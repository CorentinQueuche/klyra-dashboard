
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, FileText, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Project } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale/fr';
import Navbar from '@/components/Navbar';
import StatusBadge from '@/components/StatusBadge';
import { useToast } from '@/hooks/use-toast';
import AnimatedCard from '@/components/motion/AnimatedCard';

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const navigate = useNavigate();
  
  return (
    <AnimatedCard delay={index * 0.1}>
      <Card className="h-full hover:shadow-md transition-shadow glass-card cursor-pointer" onClick={() => navigate(`/project/${project.id}`)}>
        <CardHeader className="pb-2">
          <div className="flex justify-between">
            <CardTitle className="line-clamp-1">{project.title}</CardTitle>
            <StatusBadge status={project.status as any} />
          </div>
          <CardDescription className="line-clamp-2">
            {project.description || "Aucune description disponible"}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-2 h-4 w-4" />
              Début: {format(new Date(project.start_date), 'dd MMMM yyyy', { locale: fr })}
            </div>
            {project.end_date && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-2 h-4 w-4" />
                Fin prévue: {format(new Date(project.end_date), 'dd MMMM yyyy', { locale: fr })}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" size="sm" className="w-full" onClick={() => navigate(`/project/${project.id}`)}>
            <FileText className="mr-2 h-4 w-4" />
            Voir les détails
          </Button>
        </CardFooter>
      </Card>
    </AnimatedCard>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Rediriger vers la page d'authentification si l'utilisateur n'est pas connecté
  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate, loading]);

  // Charger les projets
  useEffect(() => {
    if (!user) return;

    const fetchProjects = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        setProjects(data as Project[]);
      } catch (error: any) {
        console.error('Erreur lors du chargement des projets:', error);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de charger les projets. Veuillez réessayer.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user, toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 container py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-klyra-500 mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Chargement des projets...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container py-8 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Vos Projets</h1>
            <Button onClick={() => navigate('/new-project')}>
              <Plus className="mr-2 h-4 w-4" />
              Nouveau Projet
            </Button>
          </div>

          {projects.length === 0 ? (
            <Card className="glass-card">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Aucun projet pour le moment</h3>
                <p className="text-muted-foreground text-center mb-6">
                  Commencez par créer votre premier projet pour suivre son avancement
                </p>
                <Button onClick={() => navigate('/new-project')}>
                  <Plus className="mr-2 h-4 w-4" />
                  Créer un projet
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Projects;
