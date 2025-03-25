
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Project, Task, Message, TimelineItem } from '@/lib/types';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import ProjectOverview from '@/components/ProjectOverview';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale/fr';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import UpgradeBanner from '@/components/UpgradeBanner';

// Import refactored components
import ProjectDetailsPanel from '@/components/project/ProjectDetailsPanel';
import TaskList from '@/components/project/TaskList';
import ProgressTab from '@/components/project/ProgressTab';
import TimelineTab from '@/components/project/TimelineTab';
import StatisticsTab from '@/components/project/StatisticsTab';
import MessagesTab from '@/components/project/MessagesTab';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [sendingMessage, setSendingMessage] = useState(false);
  const [showUpgradeBanner, setShowUpgradeBanner] = useState(true);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Rediriger vers la page d'authentification si l'utilisateur n'est pas connecté
  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate, loading]);

  // Charger les données du projet
  useEffect(() => {
    if (!id || !user) return;

    const fetchProjectData = async () => {
      try {
        setLoading(true);
        
        // Récupérer les détails du projet
        const { data: projectData, error: projectError } = await supabase
          .from('projects')
          .select('*')
          .eq('id', id)
          .single();

        if (projectError) {
          throw projectError;
        }

        setProject(projectData as Project);

        // Récupérer les tâches du projet
        const { data: tasksData, error: tasksError } = await supabase
          .from('tasks')
          .select('*')
          .eq('project_id', id)
          .order('created_at', { ascending: false });

        if (tasksError) {
          throw tasksError;
        }

        setTasks(tasksData as Task[]);

        // Récupérer les messages du projet
        const { data: messagesData, error: messagesError } = await supabase
          .from('messages')
          .select('*')
          .eq('project_id', id)
          .order('created_at', { ascending: true });

        if (messagesError) {
          throw messagesError;
        }

        setMessages(messagesData as Message[]);
      } catch (error: any) {
        console.error('Erreur lors du chargement des données du projet:', error);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de charger les données du projet. Veuillez réessayer.",
        });
        navigate('/projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [id, user, navigate, toast]);

  // Convertir les tâches en éléments de timeline
  const timelineItems: TimelineItem[] = tasks.map(task => ({
    id: task.id,
    title: task.title,
    date: task.due_date ? format(new Date(task.due_date), 'dd MMMM yyyy', { locale: fr }) : 'Non défini',
    description: task.description || 'Aucune description',
    status: task.status as any
  }));

  const handleSendMessage = async (content: string) => {
    if (!user || !id) return;

    try {
      setSendingMessage(true);
      
      const { data, error } = await supabase
        .from('messages')
        .insert([
          {
            project_id: id,
            sender_id: user.id,
            content
          }
        ])
        .select();

      if (error) {
        throw error;
      }

      // Ajouter le nouveau message à la liste
      setMessages(prev => [...prev, data[0] as Message]);
    } catch (error: any) {
      console.error('Erreur lors de l\'envoi du message:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'envoyer le message. Veuillez réessayer.",
      });
      throw error;
    } finally {
      setSendingMessage(false);
    }
  };

  const handleUpgradeClick = () => {
    toast({
      title: "Abonnement Premium",
      description: "Vous allez être redirigé vers la page d'abonnement...",
    });
    // Ici, vous pourriez rediriger vers une page d'abonnement
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 container py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-klyra-500 mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Chargement du projet...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 container py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Projet introuvable</h2>
            <p className="text-muted-foreground mb-4">Le projet que vous recherchez n'existe pas ou vous n'y avez pas accès.</p>
            <Button onClick={() => navigate('/projects')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux projets
            </Button>
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
          {showUpgradeBanner && (
            <UpgradeBanner
              title="Débloquez tout le potentiel de votre projet"
              description="Passez à Klyra Premium pour accéder à plus de fonctionnalités et d'analyses"
              ctaText="Découvrir Premium"
              onClose={() => setShowUpgradeBanner(false)}
              onCTAClick={handleUpgradeClick}
              className="mb-6"
            />
          )}

          <div className="flex items-center mb-6">
            <Button variant="ghost" className="mr-4" onClick={() => navigate('/projects')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
            <h1 className="text-3xl font-bold">{project.title}</h1>
          </div>

          <ProjectOverview 
            project={{
              title: project.title,
              status: project.status as any,
              startDate: format(new Date(project.start_date || new Date()), 'dd MMMM yyyy', { locale: fr }),
              estimatedEndDate: project.end_date ? format(new Date(project.end_date), 'dd MMMM yyyy', { locale: fr }) : 'Non défini',
              completedTasks: tasks.filter(t => t.status === 'completed').length,
              totalTasks: tasks.length,
              level: 3, // À personnaliser selon votre logique de gamification
              description: project.description || 'Aucune description disponible'
            }} 
          />

          <Tabs 
            defaultValue="overview" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="grid grid-cols-5">
              <TabsTrigger value="overview">Aperçu</TabsTrigger>
              <TabsTrigger value="progress">Progrès</TabsTrigger>
              <TabsTrigger value="timeline">Chronologie</TabsTrigger>
              <TabsTrigger value="statistics">Statistiques</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="col-span-2">
                      <ProjectDetailsPanel 
                        project={project}
                        completedTasksCount={tasks.filter(t => t.status === 'completed').length}
                        totalTasksCount={tasks.length}
                      />
                      
                      <TaskList 
                        tasks={tasks}
                      />
                    </div>
                    
                    <div>
                      <div className="glass-card p-6 rounded-lg shadow-sm">
                        <h3 className="text-xl font-semibold mb-4">Messages récents</h3>
                        {messages.length > 0 ? (
                          <div className="space-y-4">
                            {messages.slice(-3).map((message) => (
                              <div key={message.id} className="flex items-start space-x-2">
                                <div className="w-8 h-8 rounded-full bg-klyra-100 flex items-center justify-center">
                                  <MessageSquare className="h-4 w-4 text-klyra-500" />
                                </div>
                                <div className="flex-1">
                                  <div className="bg-muted p-3 rounded-lg">
                                    <div className="text-xs text-muted-foreground mb-1">
                                      {format(new Date(message.created_at), 'dd/MM/yyyy HH:mm', { locale: fr })}
                                    </div>
                                    <p className="text-sm">{message.content}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-4">
                            <p className="text-muted-foreground">Aucun message pour le moment</p>
                          </div>
                        )}
                        <div className="mt-4">
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => setActiveTab('messages')}
                          >
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Voir tous les messages
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="progress">
                  <ProgressTab 
                    completedTasks={tasks.filter(t => t.status === 'completed').length}
                    totalTasks={tasks.length}
                    onUpgrade={handleUpgradeClick}
                  />
                </TabsContent>
                
                <TabsContent value="timeline">
                  <TimelineTab 
                    timelineItems={timelineItems}
                  />
                </TabsContent>
                
                <TabsContent value="statistics">
                  <StatisticsTab onUpgrade={handleUpgradeClick} />
                </TabsContent>
                
                <TabsContent value="messages">
                  <MessagesTab 
                    messages={messages}
                    userId={user?.id}
                    onSendMessage={handleSendMessage}
                    isSending={sendingMessage}
                  />
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
};

export default ProjectDetail;
