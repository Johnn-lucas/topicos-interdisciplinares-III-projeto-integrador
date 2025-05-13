
import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn, Mail, Lock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import FormFieldWithIcon from '@/components/forms/FormFieldWithIcon';

const LoginPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'E-mail é obrigatório.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Formato de e-mail inválido.';
    }
    if (!password) {
      newErrors.password = 'Senha é obrigatória.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast({
        title: 'Erro de Validação',
        description: 'Por favor, corrija os erros no formulário.',
        variant: 'destructive',
      });
      return;
    }

    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (storedUserData && storedUserData.email === email && storedUserData.password === password) {
      localStorage.setItem('authToken', 'dummyUserToken'); 
      toast({
        title: 'Login bem-sucedido!',
        description: 'Redirecionando para o painel...',
        className: 'bg-green-600 border-green-700 text-white' // Keep success toast distinctive
      });
      navigate('/'); 
    } else {
      toast({
        title: 'Erro de Login',
        description: 'E-mail ou senha inválidos. Verifique seus dados ou cadastre-se.',
        variant: 'destructive',
      });
      setErrors({ general: 'E-mail ou senha inválidos.'});
    }
  };

  return (
     <div className="mobile-full-width auth-container">
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <Card className="shadow-xl">
          <CardHeader className="text-center space-y-3 pb-4">
            <motion.div
              className="mx-auto bg-primary/10 p-3 rounded-full w-fit ring-2 ring-primary/20"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <LogIn className="h-10 w-10 text-primary" />
            </motion.div>
            <CardTitle className="text-3xl font-bold text-foreground">Acessar Conta</CardTitle>
            <CardDescription className="text-muted-foreground text-sm">
              Bem-vindo de volta ao CuidaBem!
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-2 pb-4">
            <form onSubmit={handleSubmit} className="space-y-5">
              <FormFieldWithIcon
                id="email"
                name="email"
                label="E-mail"
                type="email"
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors(p => ({...p, email: null, general: null})); }}
                error={errors.email}
                autoComplete="email"
                required
                icon={<Mail className="h-5 w-5 text-muted-foreground" />}
              />
              <FormFieldWithIcon
                id="password"
                name="password"
                label="Senha"
                type="password"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors(p => ({...p, password: null, general: null})); }}
                error={errors.password}
                autoComplete="current-password"
                required
                icon={<Lock className="h-5 w-5 text-muted-foreground" />}
              />
              {errors.general && (
                <p className="text-xs text-destructive pt-0.5 text-center" role="alert">
                  {errors.general}
                </p>
              )}
              <motion.div
                className="pt-3"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 text-base shadow-lg hover:shadow-primary/40 transition-all duration-300">
                  Entrar
                </Button>
              </motion.div>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col items-center space-y-3 pt-4">
            <p className="text-sm text-muted-foreground">
              Não tem uma conta?{' '}
              <Link
                to="/cadastro"
                className="font-medium text-primary hover:text-primary/80 hover:underline focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-1 focus:ring-offset-background rounded-sm"
              >
                Cadastre-se
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;
  