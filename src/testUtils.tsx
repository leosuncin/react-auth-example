import { ChakraProvider, theme } from '@chakra-ui/react';
import { build, fake, perBuild, sequence } from '@jackfranklin/test-data-bot';
import { render, screen, waitFor } from '@testing-library/react';

import { AuthProvider } from './hooks/useAuth';
import type { AuthContext } from './types/AuthContext';
import type { Login } from './types/Login';
import type { Register } from './types/Register';
import type { User } from './types/User';

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

const registerBuild = build<Register>({
  fields: {
    name: fake((f) => f.name.findName()),
    email: fake((f) => f.internet.email()),
    password: fake((f) => f.internet.password(12)),
  },
  traits: {
    invalid: {
      overrides: {
        name: perBuild(() => Math.random().toString(36).substring(2, 3)),
        email: fake((f) => f.internet.userName()),
        password: fake((f) => f.internet.password(7)),
      },
    },
  },
});

const userBuild = build<User>({
  fields: {
    id: sequence(),
    name: fake((f) => f.name.findName()),
    email: fake((f) => f.internet.exampleEmail()),
    createdAt: fake((f) => f.date.past().toISOString()),
    updatedAt: perBuild(() => new Date().toISOString()),
  },
});

export {
  loginBuild,
  registerBuild,
  customRender as render,
  screen,
  userBuild,
  waitFor,
};
