
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Project, Task, Message } from '@/lib/types';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import ProjectOverview from '@/components/ProjectOverview';
import Timeline from '@/components/Timeline';
import { format } from 'date-fns';
import fr from 'date-fns/locale/fr';
import { ArrowLeft, MessageSquare, PlusCircle, Send } from 'lucide-react';
import AnimatedCard from '@/components/motion/AnimatedCard';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [newMessage, setNewMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
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
  const timelineItems = tasks.map(task => ({
    id: task.id,
    title: task.title,
    date: task.due_date ? format(new Date(task.due_date), 'dd MMMM yyyy', { locale: fr }) : 'Non défini',
    description: task.description || 'Aucune description',
    status: task.status as any
  }));

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !user || !id) return;

    try {
      setSendingMessage(true);
      
      const { data, error } = await supabase
        .from('messages')
        .insert([
          {
            project_id: id,
            sender_id: user.id,
            content: newMessage.trim(),
          }
        ])
        .select();

      if (error) {
        throw error;
      }

      // Ajouter le nouveau message à la liste
      setMessages(prev => [...prev, data[0] as Message]);
      setNewMessage('');
    } catch (error: any) {
      console.error('Erreur lors de l\'envoi du message:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'envoyer le message. Veuillez réessayer.",
      });
    } finally {
      setSendingMessage(false);
    }
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
              startDate: format(new Date(project.start_date), 'dd MMMM yyyy', { locale: fr }),
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
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="overview">Aperçu</TabsTrigger>
              <TabsTrigger value="timeline">Chronologie</TabsTrigger>
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
                      <AnimatedCard>
                        <Card className="glass-card">
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                              <h3 className="text-xl font-semibold">Détails du projet</h3>
                              <Button size="sm" variant="outline">
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
                                    width: `${tasks.length > 0 ? (tasks.filter(t => t.status === 'completed').length / tasks.length) * 100 : 0}%` 
                                  }}></div>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                  {tasks.filter(t => t.status === 'completed').length} sur {tasks.length} tâches terminées
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </AnimatedCard>
                      
                      {tasks.length > 0 ? (
                        <AnimatedCard delay={0.1}>
                          <Card className="glass-card mt-6">
                            <CardContent className="p-6">
                              <h3 className="text-xl font-semibold mb-4">Tâches récentes</h3>
                              <div className="space-y-4">
                                {tasks.slice(0, 3).map((task, index) => (
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
                              {tasks.length > 3 && (
                                <div className="mt-4 text-center">
                                  <Button variant="ghost" size="sm">Voir toutes les tâches</Button>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </AnimatedCard>
                      ) : (
                        <AnimatedCard delay={0.1}>
                          <Card className="glass-card mt-6">
                            <CardContent className="p-6 text-center">
                              <h3 className="text-xl font-semibold mb-2">Aucune tâche pour le moment</h3>
                              <p className="text-muted-foreground mb-4">Commencez par ajouter des tâches à votre projet</p>
                              <Button>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Ajouter une tâche
                              </Button>
                            </CardContent>
                          </Card>
                        </AnimatedCard>
                      )}
                    </div>
                    
                    <div>
                      <AnimatedCard delay={0.2}>
                        <Card className="glass-card">
                          <CardContent className="p-6">
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
                          </CardContent>
                        </Card>
                      </AnimatedCard>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="timeline">
                  <AnimatedCard>
                    <Card className="glass-card">
                      <CardContent className="p-6">
                        {timelineItems.length > 0 ? (
                          <Timeline items={timelineItems} />
                        ) : (
                          <div className="text-center py-12">
                            <h3 className="text-xl font-semibold mb-2">Aucune tâche dans la chronologie</h3>
                            <p className="text-muted-foreground mb-4">Ajoutez des tâches à votre projet pour voir la chronologie</p>
                            <Button>
                              <PlusCircle className="mr-2 h-4 w-4" />
                              Ajouter une tâche
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </AnimatedCard>
                </TabsContent>
                
                <TabsContent value="messages">
                  <AnimatedCard>
                    <Card className="glass-card">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-4">Messages</h3>
                        <div className="flex flex-col h-[400px]">
                          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                            {messages.length > 0 ? (
                              messages.map((message) => (
                                <div 
                                  key={message.id} 
                                  className={`flex items-start space-x-2 ${
                                    message.sender_id === user?.id ? 'justify-end' : 'justify-start'
                                  }`}
                                >
                                  {message.sender_id !== user?.id && (
                                    <div className="w-8 h-8 rounded-full bg-klyra-100 flex items-center justify-center">
                                      <MessageSquare className="h-4 w-4 text-klyra-500" />
                                    </div>
                                  )}
                                  <div className="max-w-[70%]">
                                    <div className={`p-3 rounded-lg ${
                                      message.sender_id === user?.id 
                                        ? 'bg-klyra-500 text-white' 
                                        : 'bg-muted'
                                    }`}>
                                      <div className="text-xs text-opacity-80 mb-1">
                                        {format(new Date(message.created_at), 'dd/MM/yyyy HH:mm', { locale: fr })}
                                      </div>
                                      <p className="text-sm">{message.content}</p>
                                    </div>
                                  </div>
                                  {message.sender_id === user?.id && (
                                    <div className="w-8 h-8 rounded-full bg-klyra-500 flex items-center justify-center">
                                      <MessageSquare className="h-4 w-4 text-white" />
                                    </div>
                                  )}
                                </div>
                              ))
                            ) : (
                              <div className="flex items-center justify-center h-full">
                                <p className="text-muted-foreground">Aucun message pour le moment. Commencez la conversation !</p>
                              </div>
                            )}
                          </div>
                          
                          <form onSubmit={handleSendMessage} className="flex gap-2">
                            <Input
                              value={newMessage}
                              onChange={(e) => setNewMessage(e.target.value)}
                              placeholder="Tapez votre message..."
                              disabled={sendingMessage}
                            />
                            <Button 
                              type="submit" 
                              disabled={!newMessage.trim() || sendingMessage}
                            >
                              <Send className="h-4 w-4" />
                            </Button>
                          </form>
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedCard>
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
