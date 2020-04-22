import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from '@chakra-ui/core';
import React from 'react';
import { useAuth } from '../hooks/useAuth';

const ErrorMessage: React.FC = () => {
  const { error } = useAuth();

  return error ? (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>{error}</AlertTitle>
      <AlertDescription>
        <CloseButton position="absolute" right="8px" top="8px" />
      </AlertDescription>
    </Alert>
  ) : (
    <React.Fragment />
  );
};

export default ErrorMessage;
