
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Rocket, Sparkles, LineChart as LineChartIcon, Zap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import ProjectOverview from '@/components/ProjectOverview';
import ProgressCard from '@/components/ProgressCard';
import Timeline from '@/components/Timeline';
import UpsellCard from '@/components/UpsellCard';
import GamificationBadge from '@/components/GamificationBadge';

// Sample data
const projectData = {
  title: "Site E-commerce Premium",
  status: "in-progress" as const,
  startDate: "1 Mars 2023",
  estimatedEndDate: "30 Juin 2023",
  completedTasks: 14,
  totalTasks: 25,
  level: 3,
  description: "Un site e-commerce de luxe avec catalogue produits, panier d'achat, processus de checkout et intégration de paiement."
};

const timelineData = [
  {
    id: "1",
    title: "Conception UX/UI",
    date: "1 Mars 2023",
    description: "Conception des wireframes, maquettes et design system.",
    status: "completed" as const
  },
  {
    id: "2",
    title: "Développement Frontend",
    date: "15 Mars 2023",
    description: "Intégration des maquettes en HTML/CSS/JS.",
    status: "completed" as const
  },
  {
    id: "3",
    title: "Développement Backend",
    date: "1 Avril 2023",
    description: "Développement des fonctionnalités côté serveur.",
    status: "in-progress" as const
  },
  {
    id: "4",
    title: "Tests & Corrections",
    date: "15 Mai 2023",
    description: "Phase de test et corrections des bugs.",
    status: "pending" as const
  },
  {
    id: "5",
    title: "Mise en production",
    date: "30 Mai 2023",
    description: "Déploiement du site sur le serveur de production.",
    status: "pending" as const
  }
];

const progressData = [
  { 
    title: "Développement Frontend", 
    description: "Pages, composants et intégration responsive", 
    value: 8, 
    total: 10 
  },
  { 
    title: "Développement Backend", 
    description: "API, base de données et logique métier", 
    value: 4, 
    total: 8 
  },
  { 
    title: "Intégration & Tests", 
    description: "Tests unitaires et intégration continue", 
    value: 2, 
    total: 7 
  }
];

const chartData = [
  { day: 'Lun', tasks: 5 },
  { day: 'Mar', tasks: 8 },
  { day: 'Mer', tasks: 6 },
  { day: 'Jeu', tasks: 9 },
  { day: 'Ven', tasks: 3 },
  { day: 'Sam', tasks: 2 },
  { day: 'Dim', tasks: 0 },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container py-8 px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="space-y-6">
          <ProjectOverview project={projectData} />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Tabs defaultValue="progres" className="w-full">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="progres">Progrès</TabsTrigger>
                  <TabsTrigger value="chronologie">Chronologie</TabsTrigger>
                  <TabsTrigger value="statistiques">Statistiques</TabsTrigger>
                </TabsList>
                <TabsContent value="progres" className="space-y-6 mt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {progressData.map((progress, index) => (
                      <ProgressCard
                        key={index}
                        title={progress.title}
                        description={progress.description}
                        value={progress.value}
                        total={progress.total}
                        className="animate-enter"
                        style={{ animationDelay: `${index * 100}ms` }}
                      />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="chronologie" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <Timeline items={timelineData} />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="statistiques" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-medium mb-4">Tâches complétées cette semaine</h3>
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={chartData}>
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Line 
                              type="monotone" 
                              dataKey="tasks" 
                              stroke="hsl(var(--primary))" 
                              strokeWidth={2}
                              dot={{ fill: "hsl(var(--primary))", r: 4 }}
                              activeDot={{ r: 6 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="space-y-6">
              <Card className="glass">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Vos badges</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <GamificationBadge 
                      type="bronze" 
                      label="Premier pas" 
                      description="Démarrer votre premier projet"
                      obtained={true}
                    />
                    <GamificationBadge 
                      type="silver" 
                      label="Explorer" 
                      description="Compléter 5 tâches"
                      obtained={true}
                    />
                    <GamificationBadge 
                      type="gold" 
                      label="Champion" 
                      description="Atteindre 50% d'avancement"
                      obtained={true}
                    />
                    <GamificationBadge 
                      type="platinum" 
                      label="Expert" 
                      description="Finaliser le projet dans les délais"
                      obtained={false}
                    />
                    <GamificationBadge 
                      type="diamond" 
                      label="Maître" 
                      description="Obtenir un site parfait sans révisions"
                      obtained={false}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <UpsellCard 
                title="Boostez votre SEO" 
                description="Optimisez votre site pour les moteurs de recherche et augmentez votre visibilité en ligne."
                ctaText="En savoir plus"
                icon={<Rocket className="h-5 w-5" />}
                onClick={() => console.log('SEO upsell clicked')}
                variant="default"
              />
              
              <UpsellCard 
                title="Contenu Premium" 
                description="Ajoutez du contenu professionnel à votre site pour attirer plus de clients."
                ctaText="Découvrir"
                icon={<Sparkles className="h-5 w-5" />}
                onClick={() => console.log('Content upsell clicked')}
                variant="subtle"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
