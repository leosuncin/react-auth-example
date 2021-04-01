import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from '@chakra-ui/react';
import { Fragment } from 'react';

import { useAuth } from '../hooks/useAuth';

function ErrorMessage() {
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
    <Fragment />
  );
}

export default ErrorMessage;
