import { TextField } from '@material-ui/core';
import React, { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
}

export function InputField({
  name,
  control,
  label,
  ...inputProps
}: InputFieldProps) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      inputRef={ref}
      onBlur={onBlur}
      fullWidth
      error={invalid}
      variant="outlined"
      margin="normal"
      helperText={error?.message}
      inputProps={inputProps}
    />
  );
}
