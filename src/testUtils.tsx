import { ChakraProvider, theme } from '@chakra-ui/react';
import { build, fake } from '@jackfranklin/test-data-bot';
import { render, screen, waitFor } from '@testing-library/react';

import { AuthProvider } from './hooks/useAuth';
import type { AuthContext } from './types/AuthContext';
import type { Login } from './types/Login';

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

const loginBuild = build<Login>({
  fields: {
    email: fake((f) => f.internet.email()),
    password: fake((f) => f.internet.password(12)),
  },
  traits: {
    invalid: {
      overrides: {
        email: fake((f) => f.internet.userName()),
        password: fake((f) => f.internet.password(7)),
      },
    },
  },
});

export { customRender as render, screen, waitFor, loginBuild };
