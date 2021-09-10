import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import * as React from 'react';
import { Control, useController } from 'react-hook-form';

export interface SelectOptions {
  label: string;
  value: string;
}

export interface SelectFormFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  disable?: boolean;
  options: SelectOptions[];
}

export function SelectFormField({
  name,
  label,
  control,
  disable,
  options,
}: SelectFormFieldProps) {
  const {
    field: { onChange, onBlur, value },
    fieldState: { invalid, error },
  } = useController({
    name: name,
    control: control,
  });
  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        label={label}
      >
        {options.map((option) => (
          <MenuItem key={option.label} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error={invalid}>{error?.message}</FormHelperText>
    </FormControl>
  );
}
