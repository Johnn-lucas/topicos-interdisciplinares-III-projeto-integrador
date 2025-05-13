
import React from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const FormField = ({ id, name, label, type = "text", placeholder, value, onChange, error, autoComplete, required = false }) => {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="form-label">
        {label} {required && <span className="text-red-400">*</span>}
      </Label>
      <motion.div whileHover={{ scale: 1.005 }} whileTap={{ scale: 0.995 }}>
        <Input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`form-input ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-300/50 focus:border-purple-500 focus:ring-purple-500'}`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      </motion.div>
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-400 pt-0.5" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
  