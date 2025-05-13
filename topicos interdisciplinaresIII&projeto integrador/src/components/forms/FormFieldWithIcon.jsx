
import React from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const FormFieldWithIcon = ({ id, name, label, type = "text", placeholder, value, onChange, error, autoComplete, required = false, icon }) => {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="form-label">
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <motion.div className="relative" whileHover={{ scale: 1.005 }} whileTap={{ scale: 0.995 }}>
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {React.cloneElement(icon, { className: `${icon.props.className || ''} h-5 w-5 text-muted-foreground` })}
          </div>
        )}
        <Input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`form-input pl-10 ${error ? 'border-destructive focus:border-destructive focus:ring-destructive' : 'focus:border-primary focus:ring-primary'}`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      </motion.div>
      {error && (
        <p id={`${id}-error`} className="text-xs text-destructive pt-0.5" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormFieldWithIcon;
  