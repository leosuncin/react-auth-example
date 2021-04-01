import { Box, ChakraProvider } from '@chakra-ui/react';

import ErrorMessage from './components/ErrorMessage';
import Header from './components/Header';
import UserBox from './components/UserBox';
import { AuthProvider } from './hooks/useAuth';
import { customTheme } from './theme';

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <AuthProvider>
        <Header />
        <ErrorMessage />
        <Box minW="500px" w="40%" m="4rem auto">
          <UserBox />
        </Box>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
