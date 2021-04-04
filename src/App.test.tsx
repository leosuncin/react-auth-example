import { queries, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';

import App from './App';
import {
  loginBuild,
  loginHandler,
  registerBuild,
  registerHandler,
  userBuild,
} from './testUtils';
import { AuthStorageEnum } from './types/AuthStorageEnum';

const server = setupServer(registerHandler, loginHandler);

beforeAll(() => {
  server.listen();
});

beforeEach(() => {
  localStorage.clear();
});

afterAll(() => {
  server.close();
});

test('renders "React App" in App', () => {
  render(<App />);

  const element = screen.getByText(/React App/i);
  expect(element).toBeInTheDocument();
});

test('register a new user', async () => {
  const data = registerBuild();

  render(<App />);

  userEvent.type(
    queries.getByLabelText(screen.getByTestId('register'), /Name/i),
    data.name,
  );
  userEvent.type(
    queries.getByLabelText(screen.getByTestId('register'), /Email/i),
    data.email,
  );
  userEvent.type(
    queries.getByLabelText(screen.getByTestId('register'), /Password/i),
    data.password,
  );
  userEvent.click(queries.getByRole(screen.getByTestId('register'), 'button'));

  await waitFor(() =>
    expect(screen.queryByTestId('register')).not.toBeInTheDocument(),
  );

  expect(screen.getByRole('img', { name: data.name })).toBeInTheDocument();
  expect(screen.getByText(data.name)).toBeInTheDocument();
});

test('show register error message', async () => {
  const data = registerBuild({ overrides: { email: 'john@doe.me' } });

  render(<App />);

  userEvent.type(
    queries.getByLabelText(screen.getByTestId('register'), /Name/i),
    data.name,
  );
  userEvent.type(
    queries.getByLabelText(screen.getByTestId('register'), /Email/i),
    data.email,
  );
  userEvent.type(
    queries.getByLabelText(screen.getByTestId('register'), /Password/i),
    data.password,
  );
  userEvent.click(queries.getByRole(screen.getByTestId('register'), 'button'));

  await expect(
    screen.findByText('The email «john@doe.me» is already register.'),
  ).resolves.toBeInTheDocument();
});

test('login with a user', async () => {
  const data = loginBuild({ overrides: { email: 'john@doe.me' } });

  render(<App />);

  userEvent.click(screen.getByRole('tab', { name: 'Login' }));

  userEvent.type(
    queries.getByLabelText(screen.getByTestId('login'), /Email/i),
    data.email,
  );
  userEvent.type(
    queries.getByLabelText(screen.getByTestId('login'), /Password/i),
    data.password,
  );
  userEvent.click(queries.getByRole(screen.getByTestId('login'), 'button'));

  await waitFor(() =>
    expect(screen.queryByTestId('login')).not.toBeInTheDocument(),
  );

  expect(screen.getByRole('img')).toBeInTheDocument();
});

test('show login error message', async () => {
  const data = loginBuild();

  render(<App />);

  userEvent.click(screen.getByRole('tab', { name: 'Login' }));

  userEvent.type(
    queries.getByLabelText(screen.getByTestId('login'), /Email/i),
    data.email,
  );
  userEvent.type(
    queries.getByLabelText(screen.getByTestId('login'), /Password/i),
    data.password,
  );
  userEvent.click(queries.getByRole(screen.getByTestId('login'), 'button'));

  await expect(
    screen.findByText(`There isn't any user with email: ${data.email}`),
  ).resolves.toBeInTheDocument();
});

test('log out', async () => {
  const user = userBuild();
  const token = btoa(JSON.stringify(user));

  localStorage.setItem(AuthStorageEnum.user, JSON.stringify(user));
  localStorage.setItem(AuthStorageEnum.token, token);
  render(<App />);

  expect(screen.getByRole('img', { name: user.name })).toBeInTheDocument();
  expect(screen.getByText(user.name)).toBeInTheDocument();

  userEvent.click(screen.getByText('Log out'));

  await waitFor(() =>
    expect(screen.queryByText('Log out')).not.toBeInTheDocument(),
  );

  expect(localStorage.getItem(AuthStorageEnum.user)).toBeNull();
  expect(localStorage.getItem(AuthStorageEnum.token)).toBeNull();
});
