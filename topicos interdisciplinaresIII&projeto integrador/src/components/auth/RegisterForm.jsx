
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import FormFieldWithIcon from '@/components/forms/FormFieldWithIcon';

const PasswordField = ({ id, name, label, value, onChange, error, placeholder, autoComplete, showPassword, onToggleShowPassword }) => (
  <div className="space-y-1.5">
    <Label htmlFor={id} className="form-label">
      {label} <span className="text-destructive">*</span>
    </Label>
    <motion.div className="relative" whileHover={{ scale: 1.005 }} whileTap={{ scale: 0.995 }}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Lock className="h-5 w-5 text-muted-foreground" />
      </div>
      <Input
        id={id}
        name={name}
        type={showPassword ? "text" : "password"}
        autoComplete={autoComplete}
        required
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`form-input pl-10 ${error ? 'border-destructive focus:border-destructive focus:ring-destructive' : 'focus:border-primary focus:ring-primary'}`}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground"
        onClick={onToggleShowPassword}
        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </Button>
    </motion.div>
    {error && (
      <p id={`${id}-error`} className="text-xs text-destructive pt-0.5" role="alert">
        {error}
      </p>
    )}
  </div>
);


const RegisterForm = ({ onSuccess, onError }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Nome completo é obrigatório.';
    else if (formData.fullName.trim().length < 3) newErrors.fullName = 'Nome deve ter pelo menos 3 caracteres.';
    
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Formato de e-mail inválido.';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (onSuccess) onSuccess(formData);
      setFormData({ fullName: '', email: '', password: '', confirmPassword: '' }); 
    } else {
      if (onError) onError(errors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <fieldset className="space-y-4">
        <legend className="sr-only">Informações de Cadastro</legend>

        <FormFieldWithIcon
          id="fullName"
          name="fullName"
          label="Nome Completo"
          type="text"
          placeholder="Seu nome completo"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          autoComplete="name"
          required
          icon={<User className="h-5 w-5 text-muted-foreground" />}
        />

        <FormFieldWithIcon
          id="email"
          name="email"
          label="E-mail"
          type="email"
          placeholder="seu.email@exemplo.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          autoComplete="email"
          required
          icon={<Mail className="h-5 w-5 text-muted-foreground" />}
        />
        
        <PasswordField
          id="password"
          name="password"
          label="Senha"
          placeholder="Crie uma senha forte"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete="new-password"
          showPassword={showPassword}
          onToggleShowPassword={() => setShowPassword(!showPassword)}
        />

        <PasswordField
          id="confirmPassword"
          name="confirmPassword"
          label="Confirmar Senha"
          placeholder="Repita a senha"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          autoComplete="new-password"
          showPassword={showConfirmPassword}
          onToggleShowPassword={() => setShowConfirmPassword(!showConfirmPassword)}
        />
      </fieldset>

      <motion.div
        className="pt-3"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 text-base shadow-lg hover:shadow-primary/40 transition-all duration-300"
        >
          Criar Conta
        </Button>
      </motion.div>
    </form>
  );
};

export default RegisterForm;
  