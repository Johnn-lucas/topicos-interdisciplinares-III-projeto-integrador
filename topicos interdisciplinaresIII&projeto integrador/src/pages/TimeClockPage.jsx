
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, MapPin,LogIn, LogOut } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const TimeClockPage = () => {
  const { toast } = useToast();
  const [lastClockIn, setLastClockIn] = React.useState(null);
  const [lastClockOut, setLastClockOut] = React.useState(null);
  const [currentLocation, setCurrentLocation] = React.useState(null);
  const [isClockedIn, setIsClockedIn] = React.useState(false);
  const [locationError, setLocationError] = React.useState('');

  React.useEffect(() => {
    const storedClockData = JSON.parse(localStorage.getItem('timeClockData')) || {};
    if (storedClockData.lastClockIn && !storedClockData.lastClockOut) {
      setIsClockedIn(true);
      setLastClockIn(new Date(storedClockData.lastClockIn));
      if(storedClockData.lastClockInLocation) setCurrentLocation(storedClockData.lastClockInLocation);
    } else if (storedClockData.lastClockIn && storedClockData.lastClockOut) {
        setLastClockIn(new Date(storedClockData.lastClockIn));
        setLastClockOut(new Date(storedClockData.lastClockOut));
        if(storedClockData.lastClockOutLocation) setCurrentLocation(storedClockData.lastClockOutLocation);
         else if(storedClockData.lastClockInLocation) setCurrentLocation(storedClockData.lastClockInLocation);
    }
  }, []);

  const getLocation = () => {
    setLocationError('');
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const err = "Geolocalização não é suportada pelo seu navegador.";
        setLocationError(err);
        reject(err);
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const loc = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            setCurrentLocation(loc);
            resolve(loc);
          },
          (error) => {
            let errMsg = "Não foi possível obter a localização. ";
            switch(error.code) {
              case error.PERMISSION_DENIED:
                errMsg += "Permissão negada.";
                break;
              case error.POSITION_UNAVAILABLE:
                errMsg += "Informação de localização indisponível.";
                break;
              case error.TIMEOUT:
                errMsg += "Tempo esgotado para obter localização.";
                break;
              default:
                errMsg += "Ocorreu um erro desconhecido.";
                break;
            }
            setLocationError(errMsg);
            reject(errMsg);
          },
          { timeout: 10000, enableHighAccuracy: true }
        );
      }
    });
  };

  const handleClockIn = async () => {
    try {
      const location = await getLocation();
      const now = new Date();
      const clockInData = { time: now, location };
      
      const storedData = JSON.parse(localStorage.getItem('timeClockData')) || {};
      storedData.lastClockIn = now.toISOString();
      storedData.lastClockInLocation = location;
      storedData.lastClockOut = null; 
      storedData.lastClockOutLocation = null;
      localStorage.setItem('timeClockData', JSON.stringify(storedData));
      
      const entries = JSON.parse(localStorage.getItem('timeClockEntries')) || [];
      entries.push({ type: 'in', ...clockInData });
      localStorage.setItem('timeClockEntries', JSON.stringify(entries));

      setLastClockIn(now);
      setLastClockOut(null);
      setIsClockedIn(true);
      toast({ title: "Ponto Registrado!", description: `Entrada às ${now.toLocaleTimeString()}`, className: 'bg-green-600 border-green-700 text-white' });
    } catch (error) {
      toast({ title: "Erro de Localização", description: typeof error === 'string' ? error : "Falha ao obter localização.", variant: "destructive" });
    }
  };

  const handleClockOut = async () => {
     try {
      const location = await getLocation();
      const now = new Date();
      const clockOutData = { time: now, location };

      const storedData = JSON.parse(localStorage.getItem('timeClockData')) || {};
      storedData.lastClockOut = now.toISOString();
      storedData.lastClockOutLocation = location;
      localStorage.setItem('timeClockData', JSON.stringify(storedData));
      
      const entries = JSON.parse(localStorage.getItem('timeClockEntries')) || [];
      entries.push({ type: 'out', ...clockOutData });
      localStorage.setItem('timeClockEntries', JSON.stringify(entries));
      
      setLastClockOut(now);
      setIsClockedIn(false);
      toast({ title: "Ponto Registrado!", description: `Saída às ${now.toLocaleTimeString()}`, className: 'bg-blue-600 border-blue-700 text-white' });
    } catch (error) {
      toast({ title: "Erro de Localização", description: typeof error === 'string' ? error : "Falha ao obter localização.", variant: "destructive" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
           <div className="flex items-center space-x-2">
            <Clock className="h-7 w-7 text-primary" />
            <CardTitle className="text-2xl font-semibold text-foreground">Controle de Ponto</CardTitle>
          </div>
          <CardDescription className="text-muted-foreground">
            Registre sua entrada e saída do trabalho. A localização será capturada no momento do registro.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
              <Button 
                onClick={handleClockIn} 
                disabled={isClockedIn}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 text-base shadow-md hover:shadow-green-500/30 disabled:opacity-60"
              >
                <LogIn className="mr-2 h-5 w-5"/> Registrar Entrada
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
              <Button 
                onClick={handleClockOut} 
                disabled={!isClockedIn}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 text-base shadow-md hover:shadow-red-500/30 disabled:opacity-60"
              >
                 <LogOut className="mr-2 h-5 w-5"/> Registrar Saída
              </Button>
            </motion.div>
          </div>
           {locationError && (
            <div className="text-sm text-destructive p-3 bg-destructive/10 rounded-md border border-destructive/30">
              {locationError}
            </div>
           )}
           {currentLocation && !locationError && (
            <div className="text-sm text-foreground p-3 bg-secondary/70 rounded-md border border-border">
              <MapPin className="inline h-4 w-4 mr-1 text-primary" />
              Última Localização Registrada: Latitude: {currentLocation.latitude.toFixed(4)}, Longitude: {currentLocation.longitude.toFixed(4)}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-sm text-muted-foreground pt-4 border-t border-border">
          {lastClockIn && <p>Última entrada: <span className="font-medium text-foreground">{lastClockIn.toLocaleString('pt-BR')}</span></p>}
          {lastClockOut && <p>Última saída: <span className="font-medium text-foreground">{lastClockOut.toLocaleString('pt-BR')}</span></p>}
          {!lastClockIn && !lastClockOut && <p>Nenhum registro de ponto encontrado.</p>}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default TimeClockPage;
  