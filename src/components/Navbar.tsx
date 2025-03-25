
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Bell, LogOut, Menu, Settings, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const getInitials = () => {
    if (!profile) return 'KL';
    
    const firstName = profile.first_name || '';
    const lastName = profile.last_name || '';
    
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-sm bg-background/80">
      <div className="container flex h-16 items-center">
        <Link to="/" className="flex items-center space-x-2">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-klyra-500 text-white rounded-md p-1 font-bold text-lg">KL</div>
          </motion.div>
          <span className="font-bold text-xl">Klyra</span>
        </Link>
        
        <nav className="hidden md:flex gap-6 ml-6">
          <Link 
            to="/" 
            className="text-md font-medium transition-colors hover:text-klyra-500"
          >
            Tableau de bord
          </Link>
          <Link 
            to="/projects" 
            className="text-md font-medium transition-colors hover:text-klyra-500"
          >
            Projets
          </Link>
        </nav>
        
        <div className="ml-auto flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Notifications"
                className="relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-klyra-500"></span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-9 w-9 cursor-pointer">
                    <AvatarImage src={profile?.avatar_url || ''} alt="Photo de profil" />
                    <AvatarFallback className="bg-klyra-100 text-klyra-800">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Paramètres</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Déconnexion</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Button onClick={() => navigate('/auth')}>
              Connexion
            </Button>
          )}
          
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Menu"
                className="md:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-4">
                <Link 
                  to="/" 
                  className="text-md font-medium transition-colors hover:text-klyra-500"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Tableau de bord
                </Link>
                <Link 
                  to="/projects" 
                  className="text-md font-medium transition-colors hover:text-klyra-500"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Projets
                </Link>
                {isAuthenticated ? (
                  <>
                    <Link 
                      to="/profile" 
                      className="text-md font-medium transition-colors hover:text-klyra-500"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Mon Profil
                    </Link>
                    <Link 
                      to="/settings" 
                      className="text-md font-medium transition-colors hover:text-klyra-500"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Paramètres
                    </Link>
                    <button 
                      className="text-md font-medium text-left text-red-500 transition-colors hover:text-red-700"
                      onClick={() => {
                        handleSignOut();
                        setMobileMenuOpen(false);
                      }}
                    >
                      Déconnexion
                    </button>
                  </>
                ) : (
                  <Link 
                    to="/auth" 
                    className="text-md font-medium transition-colors hover:text-klyra-500"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Connexion
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
