
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Globe, Code, BarChart3, Lock, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import UpsellCard from '@/components/UpsellCard';
import UpgradeBanner from '@/components/UpgradeBanner';

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  icon: React.ReactNode;
  isPremium?: boolean;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  price,
  icon,
  isPremium = false,
  onClick,
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="h-10 w-10 rounded-full bg-klyra-50 flex items-center justify-center text-klyra-500">
              {icon}
            </div>
            {isPremium && (
              <div className="bg-gradient-to-r from-amber-400 to-amber-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                PREMIUM
              </div>
            )}
          </div>
          <CardTitle className="mt-4 text-xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="text-2xl font-semibold">{price}</div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={onClick}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Sélectionner
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const Marketplace = () => {
  const [showUpgradeBanner, setShowUpgradeBanner] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleServiceSelect = (isPremium: boolean) => {
    if (isPremium) {
      toast({
        title: "Fonctionnalité Premium",
        description: "Cette option nécessite un abonnement Premium pour être débloquée.",
        variant: "default",
      });
    } else {
      // Simuler un processus d'achat
      toast({
        title: "Service ajouté",
        description: "Votre nouveau projet va être créé...",
      });
      
      // Rediriger vers les projets après un court délai
      setTimeout(() => {
        navigate('/projects');
      }, 1500);
    }
  };

  const handleUpgradeClick = () => {
    toast({
      title: "Abonnement Premium",
      description: "Vous allez être redirigé vers la page d'abonnement...",
    });
    // Ici, vous pourriez rediriger vers une page d'abonnement
  };

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
              title="Déverrouillez tout le potentiel de votre projet"
              description="Passez à Klyra Premium pour accéder à plus de fonctionnalités et d'analyses"
              ctaText="Découvrir Premium"
              onClose={() => setShowUpgradeBanner(false)}
              onCTAClick={handleUpgradeClick}
              className="mb-6"
            />
          )}

          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Marketplace de services</h1>
          </div>

          <Tabs defaultValue="web" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 md:w-auto">
              <TabsTrigger value="web">Sites Web</TabsTrigger>
              <TabsTrigger value="ecommerce">E-commerce</TabsTrigger>
              <TabsTrigger value="marketing">Marketing</TabsTrigger>
            </TabsList>

            <TabsContent value="web" className="space-y-6">
              <p className="text-muted-foreground">Créez une présence en ligne professionnelle avec nos services de conception et de développement de sites Web.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ServiceCard
                  title="Site Vitrine"
                  description="Un site Web professionnel pour présenter votre entreprise, vos produits ou services."
                  price="990 €"
                  icon={<Globe className="h-5 w-5" />}
                  onClick={() => handleServiceSelect(false)}
                />
                <ServiceCard
                  title="Site Premium"
                  description="Un site Web haut de gamme avec des fonctionnalités avancées et un design sur mesure."
                  price="2 490 €"
                  icon={<Globe className="h-5 w-5" />}
                  onClick={() => handleServiceSelect(false)}
                />
                <ServiceCard
                  title="Application Web"
                  description="Une application web complète avec authentification, paiements et fonctionnalités spécifiques."
                  price="4 990 €"
                  isPremium={true}
                  icon={<Code className="h-5 w-5" />}
                  onClick={() => handleServiceSelect(true)}
                />
              </div>
            </TabsContent>

            <TabsContent value="ecommerce" className="space-y-6">
              <p className="text-muted-foreground">Lancez votre boutique en ligne avec nos solutions e-commerce complètes.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ServiceCard
                  title="E-commerce Standard"
                  description="Une boutique en ligne complète avec panier d'achat et processus de paiement."
                  price="1 990 €"
                  icon={<ShoppingCart className="h-5 w-5" />}
                  onClick={() => handleServiceSelect(false)}
                />
                <ServiceCard
                  title="E-commerce Premium"
                  description="Une boutique en ligne haut de gamme avec catalogue produits, processus de checkout et intégration de paiement."
                  price="3 990 €"
                  icon={<ShoppingCart className="h-5 w-5" />}
                  onClick={() => handleServiceSelect(false)}
                />
                <ServiceCard
                  title="E-commerce Enterprise"
                  description="Solution e-commerce complète avec gestion d'inventaire, multi-devises, et intégrations avancées."
                  price="8 990 €"
                  isPremium={true}
                  icon={<ShoppingCart className="h-5 w-5" />}
                  onClick={() => handleServiceSelect(true)}
                />
              </div>
            </TabsContent>

            <TabsContent value="marketing" className="space-y-6">
              <p className="text-muted-foreground">Développez votre audience et augmentez vos conversions avec nos services marketing.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ServiceCard
                  title="SEO Standard"
                  description="Optimisation de base pour les moteurs de recherche pour améliorer votre visibilité."
                  price="790 €"
                  icon={<BarChart3 className="h-5 w-5" />}
                  onClick={() => handleServiceSelect(false)}
                />
                <ServiceCard
                  title="Marketing Digital"
                  description="Stratégie marketing complète incluant SEO, publicités et réseaux sociaux."
                  price="1 490 €"
                  icon={<BarChart3 className="h-5 w-5" />}
                  onClick={() => handleServiceSelect(false)}
                />
                <ServiceCard
                  title="Growth Hacking"
                  description="Stratégies avancées de croissance et d'acquisition client avec analyses détaillées."
                  price="3 990 €"
                  isPremium={true}
                  icon={<BarChart3 className="h-5 w-5" />}
                  onClick={() => handleServiceSelect(true)}
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-12 space-y-4">
            <h2 className="text-2xl font-semibold">Services complémentaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <UpsellCard
                title="Optimisation SEO"
                description="Boostez votre visibilité sur les moteurs de recherche et augmentez votre trafic organique."
                ctaText="Boostez votre SEO"
                icon={<BarChart3 className="h-5 w-5" />}
                onClick={handleUpgradeClick}
              />
              <UpsellCard
                title="Maintenance Premium"
                description="Maintenance technique et mises à jour régulières pour assurer la performance de votre site."
                ctaText="Voir les options"
                icon={<Lock className="h-5 w-5" />}
                onClick={handleUpgradeClick}
                variant="subtle"
              />
              <UpsellCard
                title="Support prioritaire"
                description="Accédez à notre équipe de support en priorité avec un temps de réponse garanti."
                ctaText="Activer"
                icon={<Sparkles className="h-5 w-5" />}
                onClick={handleUpgradeClick}
                variant="outlined"
              />
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Marketplace;
