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
  const { handleSubmit, errors, register, formState } = useForm<Register>();

  return (
    <form onSubmit={handleSubmit((body) => props.onSubmit(body))}>
      <FormControl isInvalid={Boolean(errors.name)}>
        <FormLabel htmlFor="name">Name: </FormLabel>
        <Input
          type="text"
          id="name"
          name="name"
          ref={register(validations.name)}
        />
        {errors.name && (
          <FormErrorMessage>{errors.name.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={Boolean(errors.email)}>
        <FormLabel htmlFor="email">Email: </FormLabel>
        <Input
          type="email"
          id="email"
          name="email"
          ref={register(validations.email)}
        />
        {errors.email && (
          <FormErrorMessage>{errors.email.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={Boolean(errors.password)}>
        <FormLabel htmlFor="password">Password: </FormLabel>
        <Input
          type="password"
          id="password"
          name="password"
          ref={register(validations.password)}
        />
        {errors.password && (
          <FormErrorMessage>{errors.password.message}</FormErrorMessage>
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
