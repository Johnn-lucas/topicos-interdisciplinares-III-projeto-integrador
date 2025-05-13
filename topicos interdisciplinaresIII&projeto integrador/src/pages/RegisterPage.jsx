
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import RegisterForm from '@/components/auth/RegisterForm';
import RegisterPageHeaderContent from '@/components/auth/RegisterPageHeaderContent';
import RegisterPageFooterContent from '@/components/auth/RegisterPageFooterContent';

const RegisterPage = () => {
  const { toast } = useToast();

  const handleRegisterSuccess = (data) => {
    console.log('Form data submitted:', data);
    localStorage.setItem('userData', JSON.stringify(data));
    toast({
      title: 'Cadastro realizado com sucesso!',
      description: 'Seus dados foram salvos. Você pode fazer login agora.',
      variant: 'default', 
      className: 'bg-green-600 border-green-700 text-white' // Keep success toast distinctive
    });
  };

  const handleRegisterError = (errors) => {
     toast({
      title: 'Erro de Validação',
      description: 'Por favor, corrija os erros no formulário.',
      variant: 'destructive',
    });
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
            <RegisterPageHeaderContent />
          </CardHeader>
          <CardContent className="pt-2 pb-4">
            <RegisterForm 
              onSuccess={handleRegisterSuccess} 
              onError={handleRegisterError} 
            />
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-3 pt-4">
            <RegisterPageFooterContent />
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
  