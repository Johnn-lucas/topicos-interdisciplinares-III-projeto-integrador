
import React from 'react';
import { motion } from 'framer-motion';
import { CardTitle, CardDescription } from '@/components/ui/card';
import { UserPlus } from 'lucide-react';

const RegisterPageHeaderContent = () => (
  <>
    <motion.div
      className="mx-auto bg-primary/10 p-3 rounded-full w-fit ring-2 ring-primary/20"
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
    >
      <UserPlus className="h-10 w-10 text-primary" />
    </motion.div>
    <CardTitle className="text-3xl font-bold text-foreground">Crie sua Conta</CardTitle>
    <CardDescription className="text-muted-foreground text-sm">
      Preencha os campos abaixo para se registrar no CuidaBem.
    </CardDescription>
  </>
);

export default RegisterPageHeaderContent;
  