
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input'; // Added Input import
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Added Select components import
import { Edit3, FileText, BookText } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ObservationsPage = () => {
  const { toast } = useToast();
  const [observationText, setObservationText] = React.useState('');
  const [observations, setObservations] = React.useState([]);
  const [isDissertative, setIsDissertative] = React.useState(true); // Default to dissertative
  const [objectiveQuestion, setObjectiveQuestion] = React.useState('');
  const [objectiveAnswer, setObjectiveAnswer] = React.useState('');


  const objectiveQuestionsOptions = [
    "Como está o humor do idoso hoje?",
    "O idoso se alimentou bem?",
    "O idoso tomou a medicação corretamente?",
    "Houve alguma intercorrência?",
    "O idoso participou de atividades de lazer?",
  ];

  React.useEffect(() => {
    const storedObservations = JSON.parse(localStorage.getItem('careObservations')) || [];
    setObservations(storedObservations.sort((a,b) => new Date(b.date) - new Date(a.date)));
  }, []);

  const handleAddObservation = (e) => {
    e.preventDefault();
    let newObservation;

    if (isDissertative) {
      if (!observationText.trim()) {
        toast({
          title: "Observação vazia",
          description: "Por favor, escreva algo antes de adicionar.",
          variant: "destructive",
        });
        return;
      }
      newObservation = {
        id: Date.now(),
        type: 'dissertative',
        text: observationText,
        date: new Date().toISOString(),
      };
    } else {
      if (!objectiveQuestion || !objectiveAnswer) {
         toast({
          title: "Campos obrigatórios",
          description: "Por favor, selecione uma pergunta e forneça uma resposta.",
          variant: "destructive",
        });
        return;
      }
      newObservation = {
        id: Date.now(),
        type: 'objective',
        question: objectiveQuestion,
        answer: objectiveAnswer,
        text: observationText, // Optional additional notes for objective
        date: new Date().toISOString(),
      };
    }
    
    const updatedObservations = [newObservation, ...observations];
    setObservations(updatedObservations.sort((a,b) => new Date(b.date) - new Date(a.date)));
    localStorage.setItem('careObservations', JSON.stringify(updatedObservations));
    
    setObservationText('');
    setObjectiveQuestion('');
    setObjectiveAnswer('');

    toast({
      title: "Observação Adicionada!",
      description: "Sua nota foi salva com sucesso.",
      className: 'bg-green-600 border-green-700 text-white'
    });
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
            <Edit3 className="h-7 w-7 text-primary" />
            <CardTitle className="text-2xl font-semibold text-foreground">Adicionar Observação</CardTitle>
          </div>
           <CardDescription className="text-muted-foreground">
            Registre notas sobre o estado de saúde do idoso, medicamentos, ou outras informações relevantes. 
            Você pode escolher entre perguntas objetivas ou um campo de texto livre.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex space-x-2">
            <Button onClick={() => setIsDissertative(true)} variant={isDissertative ? 'default' : 'outline'} className={`flex-1 ${isDissertative ? 'bg-primary text-primary-foreground' : ''}`}>Texto Livre</Button>
            <Button onClick={() => setIsDissertative(false)} variant={!isDissertative ? 'default' : 'outline'} className={`flex-1 ${!isDissertative ? 'bg-primary text-primary-foreground' : ''}`}>Pergunta Objetiva</Button>
          </div>

          <form onSubmit={handleAddObservation} className="space-y-4">
            {!isDissertative && (
              <>
                <div className="space-y-1.5">
                  <Label htmlFor="objectiveQuestion" className="form-label">Pergunta Objetiva <span className="text-destructive">*</span></Label>
                  <Select value={objectiveQuestion} onValueChange={setObjectiveQuestion}>
                    <SelectTrigger id="objectiveQuestion" className="form-input">
                      <SelectValue placeholder="Selecione uma pergunta" />
                    </SelectTrigger>
                    <SelectContent>
                      {objectiveQuestionsOptions.map((q, index) => (
                        <SelectItem key={index} value={q}>
                          {q}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                 <div className="space-y-1.5">
                  <Label htmlFor="objectiveAnswer" className="form-label">Sua Resposta <span className="text-destructive">*</span></Label>
                  <Input 
                    id="objectiveAnswer" 
                    value={objectiveAnswer}
                    onChange={(e) => setObjectiveAnswer(e.target.value)}
                    placeholder="Sua resposta para a pergunta selecionada" 
                    className="form-input" 
                  />
                </div>
              </>
            )}
            
            <div className="space-y-1.5">
              <Label htmlFor="observationText" className="form-label">
                {isDissertative ? "Observação Dissertativa" : "Notas Adicionais (Opcional)"}
                {isDissertative && <span className="text-destructive">*</span>}
              </Label>
              <Textarea
                id="observationText"
                placeholder={isDissertative ? "Digite suas observações detalhadas aqui..." : "Adicione notas complementares à resposta objetiva, se necessário..."}
                value={observationText}
                onChange={(e) => setObservationText(e.target.value)}
                rows={isDissertative ? 5 : 3}
                className="form-input"
              />
            </div>
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 text-base shadow-md hover:shadow-primary/30">
                Salvar Observação
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>

      {observations.length > 0 && (
        <Card>
           <CardHeader>
            <div className="flex items-center space-x-2">
                <BookText className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl font-semibold text-foreground">Observações Recentes</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {observations.map(obs => (
              <motion.div
                key={obs.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-4 border rounded-md bg-card hover:shadow-md transition-shadow">
                  {obs.type === 'objective' && (
                    <>
                      <p className="font-semibold text-primary">{obs.question}</p>
                      <p className="italic text-foreground">Resposta: {obs.answer}</p>
                       {obs.text && <p className="mt-1 text-sm text-foreground whitespace-pre-wrap">Notas: {obs.text}</p>}
                    </>
                  )}
                  {obs.type === 'dissertative' && (
                    <p className="text-foreground whitespace-pre-wrap">{obs.text}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(obs.date).toLocaleString('pt-BR', {dateStyle: 'short', timeStyle: 'short'})}
                  </p>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      )}
       {observations.length === 0 && (
         <Card className="border-dashed border-border">
            <CardContent className="p-6 text-center">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">Nenhuma observação registrada ainda.</p>
                <p className="text-sm text-muted-foreground/80">Use o formulário acima para adicionar sua primeira observação.</p>
            </CardContent>
         </Card>
       )}
    </motion.div>
  );
};

export default ObservationsPage;
  