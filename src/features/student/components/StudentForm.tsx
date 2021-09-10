import { Box, Button, CircularProgress } from '@material-ui/core';
import { RadioGroupField } from 'components/FormField';
import { InputField } from 'components/FormField/InputField';
import { SelectFormField } from 'components/FormField/SelectGroupField';
import { selectFormCity } from 'features/city/citySlice';
import { Student } from 'models';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Alert } from '@material-ui/lab';
export interface StudentFormProps {
  inititalValue: Student;
  onSubmit: (formValue: Student) => void;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .test('two-words', 'Enter at least two words', (value) => {
      if (!value) return true;
      const parts = value?.split(' ') || [];
      return parts.filter((x) => Boolean(x)).length >= 2;
    }),
  mark: yup
    .number()
    .min(0, 'Min is 0')
    .max(10, 'Max is 10')
    .typeError('Invaid value')
    .required('Mark is required'),
  city: yup.string().required('Please select city'),
  age: yup
    .number()
    .min(16, 'Min is 16')
    .max(60, 'Max is 60')
    .typeError('Invaid value')
    .required(),
  gender: yup
    .string()
    .oneOf(['male', 'female'])
    .required('Please choose gender'),
});

export default function StudentForm({
  inititalValue,
  onSubmit,
}: StudentFormProps) {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<Student>({
    defaultValues: inititalValue,
    resolver: yupResolver(schema),
  });
  const [error, setError] = React.useState('');
  const handleSubmitForm = async (formValue: Student) => {
    console.log('Submit', formValue);
    try {
      await onSubmit?.(formValue);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  const selectCityOptions = useSelector(selectFormCity);
  return (
    <Box>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <InputField name="name" control={control} label="Full Name" />
        <RadioGroupField
          name="gender"
          control={control}
          label="Gender"
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
        />
        {Array.isArray(selectCityOptions) && selectCityOptions.length > 0 && (
          <SelectFormField
            name="city"
            control={control}
            label="City"
            options={selectCityOptions}
          />
        )}

        <InputField name="mark" control={control} label="Mark" type="number" />
        <InputField name="age" control={control} label="Age" type="number" />
        {error && (
          <Alert severity="error">This is an error alert — check it out!</Alert>
        )}
        <Box mt={3}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting && <CircularProgress size={16} color="secondary" />}
            &nbsp; Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
