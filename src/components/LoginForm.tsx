import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Login } from '../types/Login';

type LoginFormProps = {
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
const LoginForm: React.FC<LoginFormProps> = props => {
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
        variantColor="teal"
        mt={4}
        isLoading={formState.isSubmitting}
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
