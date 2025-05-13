
import React from 'react';
import { Link } from 'react-router-dom';

const RegisterPageFooterContent = () => (
  <p className="text-sm text-muted-foreground">
    Já possui uma conta?{' '}
    <Link
      to="/login"
      className="font-medium text-primary hover:text-primary/80 hover:underline focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-1 focus:ring-offset-background rounded-sm"
    >
      Faça login
    </Link>
  </p>
);

export default RegisterPageFooterContent;
  