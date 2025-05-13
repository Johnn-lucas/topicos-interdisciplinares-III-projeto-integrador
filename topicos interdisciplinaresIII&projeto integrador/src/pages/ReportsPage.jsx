
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart2, Users, Clock, ListChecks, AlertTriangle } from 'lucide-react';

const ReportsPage = () => {
  const [reportData, setReportData] = React.useState([]);
  const [routineEntries, setRoutineEntries] = React.useState([]);
  const [timeClockEntries, setTimeClockEntries] = React.useState([]);

  React.useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    const storedRoutines = JSON.parse(localStorage.getItem('routineEntries')) || [];
    const storedTimeClock = JSON.parse(localStorage.getItem('timeClockEntries')) || [];

    setRoutineEntries(storedRoutines);
    setTimeClockEntries(storedTimeClock);
    
    const caregiversCount = storedUserData ? 1 : 0; // Simplified: assumes one logged-in user is the caregiver
    
    const today = new Date().toDateString();
    const activitiesToday = storedRoutines.filter(entry => new Date(entry.dateTime).toDateString() === today).length;
    
    // Basic work hours calculation (very simplified)
    let totalWorkHours = 0;
    const clockIns = storedTimeClock.filter(e => e.type === 'in').sort((a,b) => new Date(a.time) - new Date(b.time));
    const clockOuts = storedTimeClock.filter(e => e.type === 'out').sort((a,b) => new Date(a.time) - new Date(b.time));

    for (let i = 0; i < clockIns.length; i++) {
      const clockInTime = new Date(clockIns[i].time);
      // Find corresponding clock out
      const clockOutEntry = clockOuts.find(out => new Date(out.time) > clockInTime && (i + 1 === clockIns.length || new Date(out.time) < new Date(clockIns[i+1].time)));
      if (clockOutEntry) {
        const clockOutTime = new Date(clockOutEntry.time);
        const diffMs = clockOutTime - clockInTime;
        totalWorkHours += diffMs / (1000 * 60 * 60); // Convert ms to hours
      }
    }


    setReportData([
      { title: "Cuidadores Registrados", value: caregiversCount, icon: Users, color: "text-primary", unit: "" },
      { title: "Atividades Registradas Hoje", value: activitiesToday, icon: ListChecks, color: "text-green-500", unit: "" },
      { title: "Total de Horas Trabalhadas (Aprox.)", value: totalWorkHours.toFixed(1), icon: Clock, color: "text-orange-500", unit: "h" },
    ]);

  }, []);


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <BarChart2 className="h-7 w-7 text-primary" />
            <CardTitle className="text-2xl font-semibold text-foreground">Relatórios e Análises</CardTitle>
          </div>
           <CardDescription className="text-muted-foreground">
            Visão geral dos dados registrados no sistema. As informações são baseadas nos dados locais do seu navegador.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportData.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-md hover:border-primary/30 transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{item.title}</CardTitle>
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className={`text-3xl font-bold ${item.color}`}>{item.value}{item.unit}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-blue-500/30 bg-blue-500/5">
        <CardHeader>
            <div className="flex items-center space-x-2">
                <AlertTriangle className="h-6 w-6 text-blue-500" />
                <CardTitle className="text-xl font-semibold text-blue-700">Dados Locais e Futuro</CardTitle>
            </div>
        </CardHeader>
        <CardContent>
            <p className="text-blue-600">
                Atualmente, todos os dados (rotinas, ponto, observações) são armazenados localmente no seu navegador. Isso significa que os dados são específicos para este dispositivo e navegador e podem ser perdidos se o cache do navegador for limpo.
            </p>
            <p className="mt-3 text-blue-600">
                Em futuras atualizações, planejamos integrar com um sistema de banco de dados na nuvem (como Supabase) para armazenamento persistente e seguro, permitindo acesso de múltiplos dispositivos e relatórios mais avançados.
            </p>
        </CardContent>
      </Card>

    </motion.div>
  );
};

export default ReportsPage;
  