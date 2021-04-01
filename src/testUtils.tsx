import { ChakraProvider, theme } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';

import { AuthProvider } from './hooks/useAuth';
import type { AuthContext } from './types/AuthContext';

function wrapWithProviders(context: AuthContext = {} as AuthContext) {
  return ({ children }: React.PropsWithChildren<{}>) => (
    <ChakraProvider theme={theme}>
      <AuthProvider value={context}>{children}</AuthProvider>
    </ChakraProvider>
  );
}

function customRender(ui: Parameters<typeof render>[0], context?: AuthContext) {
  return render(ui, { wrapper: wrapWithProviders(context) });
}
export { customRender as render, screen };
