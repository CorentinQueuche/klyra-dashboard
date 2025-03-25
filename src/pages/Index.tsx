
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Rocket, Sparkles, LineChart as LineChartIcon, Zap, Bell, Star, Plus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import ProjectOverview from '@/components/ProjectOverview';
import ProgressCard from '@/components/ProgressCard';
import Timeline from '@/components/Timeline';
import UpsellCard from '@/components/UpsellCard';
import GamificationBadge from '@/components/GamificationBadge';
import LevelProgress from '@/components/LevelProgress';
import UpgradeBanner from '@/components/UpgradeBanner';
import AnimatedCard from '@/components/motion/AnimatedCard';

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
  const [showUpgradeBanner, setShowUpgradeBanner] = useState(true);
  const [activeTab, setActiveTab] = useState("progres");
  
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
          <ProjectOverview project={projectData} />
          
          {showUpgradeBanner && (
            <UpgradeBanner
              title="Débloquez tout le potentiel de votre projet"
              description="Passez à Klyra Premium pour accéder à plus de fonctionnalités et d'analyses"
              ctaText="Découvrir Premium"
              onClose={() => setShowUpgradeBanner(false)}
              onCTAClick={() => console.log('Premium upgrade clicked')}
              className="mb-6"
            />
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <AnimatedCard>
                <Tabs 
                  defaultValue="progres" 
                  className="w-full"
                  onValueChange={setActiveTab}
                  value={activeTab}
                >
                  <TabsList className="w-full grid grid-cols-3">
                    <TabsTrigger value="progres">Progrès</TabsTrigger>
                    <TabsTrigger value="chronologie">Chronologie</TabsTrigger>
                    <TabsTrigger value="statistiques">Statistiques</TabsTrigger>
                  </TabsList>
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3 }}
                    >
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
                            />
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="chronologie" className="mt-6">
                        <AnimatedCard>
                          <Card className="glass-card">
                            <CardContent className="p-6">
                              <Timeline items={timelineData} />
                            </CardContent>
                          </Card>
                        </AnimatedCard>
                      </TabsContent>
                      
                      <TabsContent value="statistiques" className="mt-6">
                        <AnimatedCard>
                          <Card className="glass-card">
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
                                      stroke="hsl(var(--klyra-500))" 
                                      strokeWidth={2}
                                      dot={{ fill: "hsl(var(--klyra-600))", r: 4 }}
                                      activeDot={{ r: 6 }}
                                    />
                                  </LineChart>
                                </ResponsiveContainer>
                              </div>
                            </CardContent>
                          </Card>
                        </AnimatedCard>
                      </TabsContent>
                    </motion.div>
                  </AnimatePresence>
                </Tabs>
              </AnimatedCard>
            </div>
            
            <div className="space-y-6">
              <AnimatedCard delay={0.1}>
                <LevelProgress 
                  currentLevel={3}
                  maxLevel={10}
                  xp={650}
                  nextLevelXp={1000}
                />
              </AnimatedCard>
              
              <AnimatedCard delay={0.2}>
                <Card className="glass-card">
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
                      <Dialog>
                        <DialogTrigger asChild>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center justify-center rounded-full border border-dashed border-muted-foreground/50 w-12 h-12 cursor-pointer"
                          >
                            <Plus className="h-5 w-5 text-muted-foreground" />
                          </motion.div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Badges à débloquer</DialogTitle>
                            <DialogDescription>
                              Complétez des tâches et progressez dans votre projet pour débloquer plus de badges.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid grid-cols-2 gap-4 py-4">
                            <div className="flex flex-col items-center gap-2">
                              <GamificationBadge
                                type="platinum"
                                label="Expert"
                                description="Finaliser le projet dans les délais"
                                obtained={false}
                                size="sm"
                              />
                              <span className="text-xs text-muted-foreground">Expert</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                              <GamificationBadge
                                type="diamond"
                                label="Maître"
                                description="Obtenir un site parfait sans révisions"
                                obtained={false}
                                size="sm"
                              />
                              <span className="text-xs text-muted-foreground">Maître</span>
                            </div>
                          </div>
                          <DialogFooter className="sm:justify-start">
                            <Button variant="secondary" type="button">
                              <Star className="mr-2 h-4 w-4" />
                              Voir tous les badges
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>
              
              <AnimatedCard delay={0.3}>
                <UpsellCard 
                  title="Boostez votre SEO" 
                  description="Optimisez votre site pour les moteurs de recherche et augmentez votre visibilité en ligne."
                  ctaText="En savoir plus"
                  icon={<Rocket className="h-5 w-5" />}
                  onClick={() => console.log('SEO upsell clicked')}
                  variant="default"
                />
              </AnimatedCard>
              
              <AnimatedCard delay={0.4}>
                <UpsellCard 
                  title="Contenu Premium" 
                  description="Ajoutez du contenu professionnel à votre site pour attirer plus de clients."
                  ctaText="Découvrir"
                  icon={<Sparkles className="h-5 w-5" />}
                  onClick={() => console.log('Content upsell clicked')}
                  variant="subtle"
                />
              </AnimatedCard>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
