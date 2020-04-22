import { CSSReset, ThemeProvider, Box } from '@chakra-ui/core';
import React from 'react';
import ErrorMessage from './components/ErrorMessage';
import Header from './components/Header';
import UserBox from './components/UserBox';
import { AuthProvider } from './hooks/useAuth';
import { customTheme } from './theme';

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <AuthProvider>
        <Header />
        <ErrorMessage />
        <Box minW="500px" w="40%" m="4rem auto">
          <UserBox />
        </Box>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
