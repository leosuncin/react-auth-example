import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import type { Register } from '../types/Register';

export type RegisterFormProps = {
  onSubmit: (payload: Register) => Promise<void>;
};

export const validations = {
  name: {
    required: 'Name is required',
    minLength: {
      value: 2,
      message: 'Name is too short',
    },
  },
  email: {
    required: 'Email is required',
    pattern: {
      message: 'Email is not a valid e-mail address',
      value: /^[\w.!#$%&'*+\\/=?^`{|}~-]+@[a-zA-Z\d](?:[a-zA-Z\d-]{0,61}[a-zA-Z\d])?(?:\.[a-zA-Z\d](?:[a-zA-Z\d-]{0,61}[a-zA-Z\d])?)*$/,
    },
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Password is too short',
    },
  },
} as const;

function RegisterForm(props: React.PropsWithChildren<RegisterFormProps>) {
  const { handleSubmit, register, formState } = useForm<Register>();

  return (
    <form
      data-testid="register"
      onSubmit={handleSubmit((body) => props.onSubmit(body))}
    >
      <FormControl isInvalid={Boolean(formState.errors.name)}>
        <FormLabel htmlFor="register-name">Name: </FormLabel>
        <Input
          type="text"
          id="register-name"
          autoComplete="name"
          {...register('name', validations.name)}
        />
        {formState.errors.name && (
          <FormErrorMessage>{formState.errors.name.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={Boolean(formState.errors.email)}>
        <FormLabel htmlFor="register-email">Email: </FormLabel>
        <Input
          type="email"
          id="register-email"
          autoComplete="email"
          {...register('email', validations.email)}
        />
        {formState.errors.email && (
          <FormErrorMessage>{formState.errors.email.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={Boolean(formState.errors.password)}>
        <FormLabel htmlFor="register-password">Password: </FormLabel>
        <Input
          type="password"
          id="register-password"
          autoComplete="new-password"
          {...register('password', validations.password)}
        />
        {formState.errors.password && (
          <FormErrorMessage>
            {formState.errors.password.message}
          </FormErrorMessage>
        )}
      </FormControl>
      <Button
        type="submit"
        colorScheme="teal"
        mt={4}
        isLoading={formState.isSubmitting}
      >
        Register
      </Button>
    </form>
  );
}

export default RegisterForm;
