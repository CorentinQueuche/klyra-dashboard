
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { 
  Rocket, 
  Sparkles, 
  Zap, 
  Star, 
  BarChart3, 
  Calendar, 
  CheckCircle, 
  Clock, 
  PlusCircle,
  TrendingUp,
  Trophy,
  Users
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Timeline from '@/components/Timeline';
import UpsellCard from '@/components/UpsellCard';
import GamificationBadge from '@/components/GamificationBadge';
import LevelProgress from '@/components/LevelProgress';
import UpgradeBanner from '@/components/UpgradeBanner';
import AnimatedCard from '@/components/motion/AnimatedCard';
import { ProgressCard } from '@/components/ProgressCard';
import { Status } from '@/lib/types';

const projectData = {
  title: "Site E-commerce Premium",
  status: "in-progress" as Status,
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
    status: "completed" as Status
  },
  {
    id: "2",
    title: "Développement Frontend",
    date: "15 Mars 2023",
    description: "Intégration des maquettes en HTML/CSS/JS.",
    status: "completed" as Status
  },
  {
    id: "3",
    title: "Développement Backend",
    date: "1 Avril 2023",
    description: "Développement des fonctionnalités côté serveur.",
    status: "in-progress" as Status
  },
  {
    id: "4",
    title: "Tests & Corrections",
    date: "15 Mai 2023",
    description: "Phase de test et corrections des bugs.",
    status: "pending" as Status
  },
  {
    id: "5",
    title: "Mise en production",
    date: "30 Mai 2023",
    description: "Déploiement du site sur le serveur de production.",
    status: "pending" as Status
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

const pieData = [
  { name: 'Terminé', value: 14, color: '#10b981' },
  { name: 'En cours', value: 6, color: '#3b82f6' },
  { name: 'En attente', value: 5, color: '#6b7280' },
];

const Index = () => {
  const [showUpgradeBanner, setShowUpgradeBanner] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 font-poppins">
      <Navbar />
      <main className="container pt-8 pb-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* En-tête du projet */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-2">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 leading-none">{projectData.title}</h1>
              <div className="flex items-center mt-2 text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                <span className="text-sm">
                  Début: {projectData.startDate} | Fin estimée: {projectData.estimatedEndDate}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="font-medium">
                <Users className="h-4 w-4 mr-2" />
                Équipe
              </Button>
              <Button className="bg-klyra-600 hover:bg-klyra-700 text-white font-medium">
                <Zap className="h-4 w-4 mr-2" />
                Actions rapides
              </Button>
            </div>
          </div>

          {/* Bannière premium */}
          {showUpgradeBanner && (
            <UpgradeBanner
              title="Débloquez tout le potentiel de votre projet"
              description="Passez à Klyra Premium pour accéder à plus de fonctionnalités et d'analyses"
              ctaText="Découvrir Premium"
              onClose={() => setShowUpgradeBanner(false)}
              onCTAClick={() => console.log('Premium upgrade clicked')}
            />
          )}
          
          {/* Navigation */}
          <Tabs 
            defaultValue="dashboard" 
            className="w-full"
            onValueChange={setActiveTab}
            value={activeTab}
          >
            <div className="border-b">
              <TabsList className="w-full justify-start h-12 bg-transparent p-0 gap-6">
                <TabsTrigger 
                  value="dashboard" 
                  className="h-12 px-4 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-klyra-600 data-[state=active]:shadow-none rounded-none text-base tracking-wide font-medium"
                >
                  Dashboard
                </TabsTrigger>
                <TabsTrigger 
                  value="progres" 
                  className="h-12 px-4 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-klyra-600 data-[state=active]:shadow-none rounded-none text-base tracking-wide font-medium"
                >
                  Progrès
                </TabsTrigger>
                <TabsTrigger 
                  value="chronologie" 
                  className="h-12 px-4 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-klyra-600 data-[state=active]:shadow-none rounded-none text-base tracking-wide font-medium"
                >
                  Chronologie
                </TabsTrigger>
                <TabsTrigger 
                  value="statistiques" 
                  className="h-12 px-4 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-klyra-600 data-[state=active]:shadow-none rounded-none text-base tracking-wide font-medium"
                >
                  Statistiques
                </TabsTrigger>
              </TabsList>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="py-6"
              >
                {/* Dashboard Tab */}
                <TabsContent value="dashboard" className="mt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                      {/* Aperçu du projet */}
                      <AnimatedCard>
                        <Card className="glass-card overflow-hidden border-0 shadow-sm">
                          <div className="h-2 bg-gradient-to-r from-klyra-400 to-klyra-600"></div>
                          <CardContent className="p-6">
                            <div className="flex justify-between items-center mb-4">
                              <div>
                                <h2 className="text-xl font-semibold tracking-wide">Aperçu du projet</h2>
                                <p className="text-muted-foreground text-sm">{projectData.description}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  projectData.status === 'completed' ? 'bg-green-100 text-green-800' :
                                  projectData.status === 'in-progress' ? 'bg-klyra-100 text-klyra-800' :
                                  projectData.status === 'delayed' ? 'bg-orange-100 text-orange-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {projectData.status === 'in-progress' ? 'En cours' :
                                  projectData.status === 'completed' ? 'Terminé' :
                                  projectData.status === 'pending' ? 'En attente' :
                                  projectData.status === 'delayed' ? 'Retardé' : 
                                  projectData.status === 'live' ? 'En ligne' : projectData.status}
                                </div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                              <div className="bg-klyra-50 p-5 rounded-xl">
                                <div className="flex items-center justify-between mb-3">
                                  <h3 className="text-base font-medium text-klyra-900">Progression globale</h3>
                                  <span className="text-klyra-700 font-semibold">{Math.round((projectData.completedTasks / projectData.totalTasks) * 100)}%</span>
                                </div>
                                <div className="w-full bg-white rounded-full h-2.5 mb-2">
                                  <div className="bg-klyra-600 h-2.5 rounded-full" style={{ 
                                    width: `${(projectData.completedTasks / projectData.totalTasks) * 100}%` 
                                  }}></div>
                                </div>
                                <div className="flex justify-between items-center text-xs text-klyra-800">
                                  <span>Tâches: {projectData.completedTasks}/{projectData.totalTasks}</span>
                                  <div className="flex items-center">
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                    <span>+3 cette semaine</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="bg-gray-50 p-5 rounded-xl">
                                <h3 className="text-base font-medium mb-4">Répartition des tâches</h3>
                                <div className="h-[120px]">
                                  <PieChart width={160} height={120} className="mx-auto">
                                    <Pie
                                      data={pieData}
                                      cx="50%"
                                      cy="50%"
                                      innerRadius={30}
                                      outerRadius={55}
                                      paddingAngle={3}
                                      dataKey="value"
                                    >
                                      {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                      ))}
                                    </Pie>
                                  </PieChart>
                                </div>
                                <div className="flex justify-center gap-5 text-xs">
                                  {pieData.map((entry, index) => (
                                    <div key={index} className="flex items-center">
                                      <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: entry.color }}></div>
                                      <span>{entry.name}: {entry.value}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </AnimatedCard>
                      
                      {/* Activité récente */}
                      <AnimatedCard delay={0.1}>
                        <Card className="glass-card shadow-sm">
                          <CardHeader className="p-6 pb-2">
                            <CardTitle className="text-lg font-semibold tracking-wide">Activité cette semaine</CardTitle>
                            <CardDescription>Progression de vos tâches sur les 7 derniers jours</CardDescription>
                          </CardHeader>
                          <CardContent className="p-6">
                            <div className="h-[250px] w-full">
                              <ChartContainer
                                config={{
                                  tasks: {
                                    label: "Tâches complétées",
                                    theme: { light: "hsl(var(--klyra-500))", dark: "hsl(var(--klyra-500))" }
                                  }
                                }}
                              >
                                <ResponsiveContainer width="100%" height="100%">
                                  <LineChart data={chartData}>
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <Tooltip content={<ChartTooltipContent />} />
                                    <Line 
                                      type="monotone" 
                                      dataKey="tasks" 
                                      strokeWidth={3}
                                      dot={{ fill: "hsl(var(--klyra-600))", r: 4 }}
                                      activeDot={{ r: 6 }}
                                      stroke="var(--color-tasks)"
                                    />
                                  </LineChart>
                                </ResponsiveContainer>
                              </ChartContainer>
                            </div>
                          </CardContent>
                        </Card>
                      </AnimatedCard>
                    </div>
                    
                    <div className="space-y-6">
                      {/* Niveau et progression */}
                      <AnimatedCard delay={0.1}>
                        <LevelProgress 
                          currentLevel={3}
                          maxLevel={10}
                          xp={650}
                          nextLevelXp={1000}
                        />
                      </AnimatedCard>
                      
                      {/* Actions et raccourcis */}
                      <AnimatedCard delay={0.2}>
                        <Card className="glass-card shadow-sm">
                          <CardContent className="p-4">
                            <div className="grid grid-cols-2 gap-3">
                              <Button variant="outline" className="h-auto py-4 flex flex-col justify-center items-center gap-2 hover:bg-gray-50">
                                <PlusCircle className="h-5 w-5 text-klyra-600" />
                                <span className="text-xs font-medium">Nouvelle tâche</span>
                              </Button>
                              <Button variant="outline" className="h-auto py-4 flex flex-col justify-center items-center gap-2 hover:bg-gray-50">
                                <Calendar className="h-5 w-5 text-klyra-600" />
                                <span className="text-xs font-medium">Calendrier</span>
                              </Button>
                              <Button variant="outline" className="h-auto py-4 flex flex-col justify-center items-center gap-2 hover:bg-gray-50">
                                <CheckCircle className="h-5 w-5 text-klyra-600" />
                                <span className="text-xs font-medium">Tâches</span>
                              </Button>
                              <Button variant="outline" className="h-auto py-4 flex flex-col justify-center items-center gap-2 hover:bg-gray-50">
                                <BarChart3 className="h-5 w-5 text-klyra-600" />
                                <span className="text-xs font-medium">Rapports</span>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </AnimatedCard>
                      
                      {/* Badges */}
                      <AnimatedCard delay={0.3}>
                        <Card className="glass-card shadow-sm">
                          <CardHeader className="p-6 pb-2">
                            <CardTitle className="text-lg font-semibold tracking-wide">Vos récompenses</CardTitle>
                            <CardDescription>Badges et accomplissements débloqués</CardDescription>
                          </CardHeader>
                          <CardContent className="p-6">
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                  <Trophy className="h-5 w-5 text-yellow-500 mr-3" />
                                  <div>
                                    <h4 className="font-medium text-sm">Premier jalon atteint</h4>
                                    <p className="text-xs text-muted-foreground">50% du projet complété</p>
                                  </div>
                                </div>
                                <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                                  +100 XP
                                </div>
                              </div>
                              
                              <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                  <Clock className="h-5 w-5 text-green-500 mr-3" />
                                  <div>
                                    <h4 className="font-medium text-sm">Livraison rapide</h4>
                                    <p className="text-xs text-muted-foreground">Phases 1 et 2 terminées en avance</p>
                                  </div>
                                </div>
                                <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                                  +75 XP
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-4 grid grid-cols-4 gap-3">
                              <GamificationBadge 
                                type="bronze" 
                                label="Premier pas" 
                                description="Démarrer votre premier projet"
                                obtained={true}
                                size="sm"
                              />
                              <GamificationBadge 
                                type="silver" 
                                label="Explorer" 
                                description="Compléter 5 tâches"
                                obtained={true}
                                size="sm"
                              />
                              <GamificationBadge 
                                type="gold" 
                                label="Champion" 
                                description="Atteindre 50% d'avancement"
                                obtained={true}
                                size="sm"
                              />
                              <GamificationBadge 
                                type="platinum" 
                                label="Expert" 
                                description="Finaliser le projet dans les délais"
                                obtained={false}
                                size="sm"
                              />
                            </div>
                          </CardContent>
                        </Card>
                      </AnimatedCard>
                      
                      {/* Opportunités */}
                      <AnimatedCard delay={0.4}>
                        <UpsellCard 
                          title="Boostez votre SEO" 
                          description="Optimisez votre site pour les moteurs de recherche et augmentez votre visibilité en ligne."
                          ctaText="En savoir plus"
                          icon={<Rocket className="h-5 w-5" />}
                          onClick={() => console.log('SEO upsell clicked')}
                          variant="premium"
                        />
                      </AnimatedCard>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Progrès Tab */}
                <TabsContent value="progres" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                
                {/* Chronologie Tab */}
                <TabsContent value="chronologie" className="mt-0">
                  <AnimatedCard>
                    <Card className="glass-card shadow-sm">
                      <CardContent className="p-6">
                        <h2 className="text-xl font-semibold mb-6 tracking-wide">Chronologie du projet</h2>
                        <Timeline items={timelineData} />
                      </CardContent>
                    </Card>
                  </AnimatedCard>
                </TabsContent>
                
                {/* Statistiques Tab */}
                <TabsContent value="statistiques" className="mt-0">
                  <AnimatedCard>
                    <Card className="glass-card shadow-sm">
                      <CardContent className="p-6">
                        <h2 className="text-xl font-semibold mb-4 tracking-wide">Tâches complétées cette semaine</h2>
                        <div className="h-[300px] w-full">
                          <ChartContainer
                            config={{
                              tasks: {
                                label: "Tâches complétées",
                                theme: { light: "hsl(var(--klyra-500))", dark: "hsl(var(--klyra-500))" }
                              }
                            }}
                          >
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={chartData}>
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip content={<ChartTooltipContent />} />
                                <Line 
                                  type="monotone" 
                                  dataKey="tasks" 
                                  stroke="var(--color-tasks)" 
                                  strokeWidth={3}
                                  dot={{ fill: "hsl(var(--klyra-600))", r: 4 }}
                                  activeDot={{ r: 6 }}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </ChartContainer>
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

export default Index;
