
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, BookOpen } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const activityTypes = [
  { value: "alimentacao", label: "Alimentação" },
  { value: "medicacao", label: "Medicação" },
  { value: "banho", label: "Banho" },
  { value: "higiene_pessoal", label: "Higiene Pessoal" },
  { value: "mobilidade", label: "Mobilidade/Exercícios" },
  { value: "socializacao", label: "Socialização/Lazer" },
  { value: "sono_repouso", label: "Sono/Repouso" },
  { value: "saude_acompanhamento", label: "Saúde/Acompanhamento Médico" },
  { value: "outros", label: "Outros" },
];

const RoutineLogPage = () => {
  const { toast } = useToast();
  const [activityType, setActivityType] = React.useState('');
  const [dateTime, setDateTime] = React.useState(new Date().toISOString().slice(0, 16));
  const [observations, setObservations] = React.useState('');
  const [routines, setRoutines] = React.useState([]);

  React.useEffect(() => {
    const storedRoutines = JSON.parse(localStorage.getItem('routineEntries')) || [];
    setRoutines(storedRoutines.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime)));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!activityType || !dateTime) {
      toast({
        title: "Campos obrigatórios",
        description: "Tipo de atividade e data/hora são necessários.",
        variant: "destructive",
      });
      return;
    }
    const routineEntry = { 
      activityType, 
      activityLabel: activityTypes.find(at => at.value === activityType)?.label || activityType,
      dateTime, 
      observations, 
      id: Date.now() 
    };
    const updatedRoutines = [routineEntry, ...routines];
    localStorage.setItem('routineEntries', JSON.stringify(updatedRoutines));
    setRoutines(updatedRoutines.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime)));
    
    toast({
      title: "Rotina Registrada!",
      description: `Atividade '${routineEntry.activityLabel}' salva com sucesso.`,
      className: 'bg-green-600 border-green-700 text-white'
    });
    setActivityType('');
    setDateTime(new Date().toISOString().slice(0, 16));
    setObservations('');
  };

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
            <PlusCircle className="h-7 w-7 text-primary" />
            <CardTitle className="text-2xl font-semibold text-foreground">Registrar Nova Rotina</CardTitle>
          </div>
          <CardDescription className="text-muted-foreground">
            Selecione o tipo de atividade, data, hora e adicione observações se necessário.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <Label htmlFor="activityType" className="form-label">Tipo de Atividade <span className="text-destructive">*</span></Label>
              <Select value={activityType} onValueChange={setActivityType}>
                <SelectTrigger id="activityType" className="form-input">
                  <SelectValue placeholder="Selecione o tipo de atividade" />
                </SelectTrigger>
                <SelectContent>
                  {activityTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="dateTime" className="form-label">Data e Hora <span className="text-destructive">*</span></Label>
              <Input 
                id="dateTime" 
                type="datetime-local" 
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="form-input" 
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="observations" className="form-label">Observações Adicionais (Opcional)</Label>
              <Textarea 
                id="observations" 
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                placeholder="Detalhes sobre a atividade, estado do idoso, intercorrências, etc." 
                className="form-input"
                rows={4} 
              />
            </div>
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 text-base shadow-md hover:shadow-primary/30">
                Salvar Rotina
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>

      {routines.length > 0 && (
        <Card>
          <CardHeader>
             <div className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl font-semibold text-foreground">Rotinas Registradas</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {routines.map(routine => (
              <motion.div 
                key={routine.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-4 border rounded-md bg-card hover:shadow-md transition-shadow">
                  <p className="font-semibold text-primary">{routine.activityLabel}</p>
                  <p className="text-sm text-muted-foreground">{new Date(routine.dateTime).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</p>
                  {routine.observations && <p className="mt-1 text-sm text-foreground whitespace-pre-wrap">{routine.observations}</p>}
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};

export default RoutineLogPage;
  