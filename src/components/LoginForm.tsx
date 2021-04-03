import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import type { Login } from '../types/Login';

export type LoginFormProps = {
  onSubmit: (payload: Login) => Promise<void>;
};

export const validations = {
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

function LoginForm(props: React.PropsWithChildren<LoginFormProps>) {
  const { handleSubmit, errors, register, formState } = useForm<Login>();

  return (
    <form
      data-testid="login"
      onSubmit={handleSubmit((body) => props.onSubmit(body))}
    >
      <FormControl isInvalid={Boolean(errors.email)}>
        <FormLabel htmlFor="login-email">Email: </FormLabel>
        <Input
          type="email"
          name="email"
          id="login-email"
          autoComplete="email"
          ref={register(validations.email)}
        />
        {errors.email && (
          <FormErrorMessage>{errors.email.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={Boolean(errors.password)}>
        <FormLabel htmlFor="login-password">Password: </FormLabel>
        <Input
          type="password"
          name="password"
          id="login-password"
          autoComplete="current-password"
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
        Login
      </Button>
    </form>
  );
}

export default LoginForm;
