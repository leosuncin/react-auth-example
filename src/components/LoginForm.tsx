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

const validations = {
  email: {
    required: 'Email is required',
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Password is too short',
    },
  },
};

function LoginForm(props: React.PropsWithChildren<LoginFormProps>) {
  const { handleSubmit, errors, register, formState } = useForm<Login>();

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <FormControl isInvalid={Boolean(errors.email)}>
        <FormLabel htmlFor="email">Email: </FormLabel>
        <Input type="email" name="email" ref={register(validations.email)} />
        {errors.email && (
          <FormErrorMessage>{errors.email.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={Boolean(errors.password)}>
        <FormLabel htmlFor="password">Password: </FormLabel>
        <Input
          type="password"
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
        Login
      </Button>
    </form>
  );
}

export default LoginForm;
