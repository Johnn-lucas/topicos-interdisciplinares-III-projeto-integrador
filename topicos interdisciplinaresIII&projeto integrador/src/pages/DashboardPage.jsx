
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, ListChecks, Clock, Edit3, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const features = [
    { title: "Registro de Rotinas", icon: ListChecks, path: "/rotinas", description: "Acompanhe as atividades diárias dos idosos." },
    { title: "Controle de Ponto", icon: Clock, path: "/ponto", description: "Registre suas entradas e saídas do trabalho." },
    { title: "Observações Gerais", icon: Edit3, path: "/observacoes", description: "Adicione notas importantes sobre os cuidados." },
    { title: "Relatórios do Sistema", icon: BarChart2, path: "/relatorios", description: "Visualize dados e análises gerais." },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <Card className="bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Bem-vindo ao CuidaBem!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">Seu sistema de gerenciamento de cuidados a idosos.</p>
          <p className="mt-2 text-primary-foreground/80">Utilize os links abaixo para navegar pelas funcionalidades.</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Link to={feature.path} className="block h-full">
              <Card className="h-full hover:shadow-primary/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:border-primary/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-semibold text-foreground">{feature.title}</CardTitle>
                  <feature.icon className="h-8 w-8 text-primary" />
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-muted-foreground">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DashboardPage;
  