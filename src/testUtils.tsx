import { ChakraProvider, theme } from '@chakra-ui/react';
import { build, fake, perBuild } from '@jackfranklin/test-data-bot';
import { factory, primaryKey } from '@mswjs/data';
import { render } from '@testing-library/react';
import { rest } from 'msw';

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

export { screen, waitFor } from '@testing-library/react';
export { customRender as render };

export const loginBuild = build<Login>({
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

export const registerBuild = build<Register>({
  fields: {
    name: fake((f) => f.name.findName()),
    email: fake((f) => f.internet.exampleEmail()),
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

export const db = factory({
  user: {
    id: primaryKey(() => Math.round(Math.random() + Date.now()).toString()),
    name: String,
    email: String,
    createdAt: () => new Date().toISOString(),
    updatedAt: () => new Date().toISOString(),
  },
});
db.user.create({ id: '1', name: 'John Doe', email: 'john@doe.me' });

export const registerHandler = rest.post<Register, never, User>(
  `${process.env.REACT_APP_API_URL}/auth/register`,
  (request, response, context) => {
    const { email, name } = request.body;
    const user = db.user.create({ email, name });
    const token = Buffer.from(JSON.stringify(user)).toString('base64');

    if (email === 'john@doe.me')
      return response(
        context.status(422),
        context.json({
          error: 'Unprocessable Entity',
          message: ['The email «john@doe.me» is already register.'],
          statusCode: 422,
        } as any),
      );

    return response(
      context.delay(Math.round(Math.random() * 1e3)),
      context.status(201),
      context.set('Authorization', `Bearer ${token}`),
      context.cookie('token', token, { httpOnly: true, sameSite: 'strict' }),
      context.json({ ...user, id: Number(user.id) }),
    );
  },
);

export const loginHandler = rest.post<Login, never, User>(
  `${process.env.REACT_APP_API_URL}/auth/login`,
  (request, response, context) => {
    const { email } = request.body;
    const user = db.user.findFirst({ where: { email: { equals: email } } });
    const token = Buffer.from(JSON.stringify(user)).toString('base64');

    if (!user)
      return response(
        context.status(401),
        context.json({
          error: 'Unauthorized',
          message: `There isn't any user with email: ${email}`,
          statusCode: 401,
        } as any),
      );

    return response(
      context.delay(Math.round(Math.random() * 1e3)),
      context.status(200),
      context.set('Authorization', `Bearer ${token}`),
      context.cookie('token', token, { httpOnly: true, sameSite: 'strict' }),
      context.json({ ...user, id: Number(user.id) }),
    );
  },
);
