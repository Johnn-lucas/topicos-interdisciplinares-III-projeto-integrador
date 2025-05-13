
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Home, ListChecks, Clock, Edit3, BarChart2, LogOut, Menu, X, ShieldCheck, UserPlus, LogIn } from 'lucide-react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const UserPlusIconComponent = (props) => <UserPlus {...props} />;
const LogInIconComponent = (props) => <LogIn {...props} />;

const navItems = [
  { name: 'Início', path: '/', icon: Home, protected: true },
  { name: 'Registro de Rotinas', path: '/rotinas', icon: ListChecks, protected: true },
  { name: 'Controle de Ponto', path: '/ponto', icon: Clock, protected: true },
  { name: 'Observações', path: '/observacoes', icon: Edit3, protected: true },
  { name: 'Relatórios', path: '/relatorios', icon: BarChart2, protected: true },
  { name: 'Cadastro', path: '/cadastro', icon: UserPlusIconComponent, protected: false },
  { name: 'Login', path: '/login', icon: LogInIconComponent, protected: false },
];

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = () => localStorage.getItem('authToken') !== null;

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const getPageTitle = () => {
    if (location.pathname === '/login') return 'Acessar Conta';
    if (location.pathname === '/cadastro') return 'Criar Nova Conta';
    const currentNavItem = navItems.find(item => item.path === location.pathname);
    return currentNavItem ? currentNavItem.name : 'CuidaBem';
  };
  
  const availableNavItems = isAuthenticated() 
    ? navItems.filter(item => item.protected || item.path === '/')
    : navItems.filter(item => !item.protected);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="py-3 px-4 sm:px-6 lg:px-8 bg-card shadow-md sticky top-0 z-50 border-b border-border"
      >
        <div className="container mx-auto flex items-center justify-between content-container">
          <Link to="/" className="flex items-center space-x-3">
            <ShieldCheck className="h-9 w-9 text-primary" />
            <h1 className="text-2xl font-bold text-foreground tracking-tight hidden sm:block">CuidaBem</h1>
          </Link>
          <div className="sm:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-foreground/70 hover:text-primary hover:bg-accent/10">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
          <nav className="hidden sm:flex items-center space-x-1">
            {availableNavItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out flex items-center space-x-2 ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-sm scale-105'
                      : 'text-foreground/70 hover:bg-accent/10 hover:text-primary'
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </NavLink>
            ))}
            {isAuthenticated() && (
             <Button onClick={handleLogout} variant="ghost" className="text-foreground/70 hover:bg-destructive/10 hover:text-destructive flex items-center space-x-2 px-3 py-2">
                <LogOut size={18} /> <span>Sair</span>
             </Button>
            )}
          </nav>
        </div>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden mt-3 space-y-1 pb-2 border-t border-border pt-2"
          >
            {availableNavItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2.5 rounded-md text-base font-medium transition-colors flex items-center space-x-3 ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground/80 hover:bg-accent/10 hover:text-primary'
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                 <span>{item.name}</span>
              </NavLink>
            ))}
            {isAuthenticated() && (
             <Button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} variant="ghost" className="w-full text-left text-foreground/80 hover:bg-destructive/10 hover:text-destructive flex items-center space-x-3 px-3 py-2.5">
                <LogOut size={18} /> <span>Sair</span>
             </Button>
            )}
          </motion.div>
        )}
      </motion.header>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 bg-secondary/50 border-b border-border shadow-sm content-container">
        <h2 className="text-xl sm:text-2xl font-semibold text-foreground tracking-wide">{getPageTitle()}</h2>
      </div>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 content-container">
        {children}
      </main>

      <motion.footer
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        className="py-6 px-4 sm:px-6 lg:px-8 text-center bg-card mt-auto border-t border-border"
      >
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} CuidaBem. Todos os direitos reservados. Desenvolvido por Hostinger Horizons.
        </p>
      </motion.footer>
    </div>
  );
};

export default Layout;
  