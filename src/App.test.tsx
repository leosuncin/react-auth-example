import {
  render,
  screen,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';

import App from './App';
import {
  loginBuild,
  loginHandler,
  registerBuild,
  registerHandler,
  db,
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
    within(screen.getByTestId('register')).getByLabelText(/Name/i),
    data.name,
  );
  userEvent.type(
    within(screen.getByTestId('register')).getByLabelText(/Email/i),
    data.email,
  );
  userEvent.type(
    within(screen.getByTestId('register')).getByLabelText(/Password/i),
    data.password,
  );
  userEvent.click(within(screen.getByTestId('register')).getByRole('button'));

  await waitForElementToBeRemoved(screen.queryByTestId('register'));

  expect(screen.getByRole('img', { name: data.name })).toBeInTheDocument();
  expect(screen.getByText(data.name)).toBeInTheDocument();
});

test('show register error message', async () => {
  const data = registerBuild({ overrides: { email: 'john@doe.me' } });

  render(<App />);

  userEvent.type(
    within(screen.getByTestId('register')).getByLabelText(/Name/i),
    data.name,
  );
  userEvent.type(
    within(screen.getByTestId('register')).getByLabelText(/Email/i),
    data.email,
  );
  userEvent.type(
    within(screen.getByTestId('register')).getByLabelText(/Password/i),
    data.password,
  );
  userEvent.click(within(screen.getByTestId('register')).getByRole('button'));

  await expect(
    screen.findByText('The email «john@doe.me» is already register.'),
  ).resolves.toBeInTheDocument();
});

test('login with a user', async () => {
  const data = loginBuild({ overrides: { email: 'john@doe.me' } });

  render(<App />);

  userEvent.click(screen.getByRole('tab', { name: 'Login' }));

  expect(screen.getByRole('tab', { name: 'Login' })).toHaveAttribute(
    'aria-selected',
    'true',
  );

  userEvent.type(
    within(screen.getByTestId('login')).getByLabelText(/Email/i),
    data.email,
  );
  userEvent.type(
    within(screen.getByTestId('login')).getByLabelText(/Password/i),
    data.password,
  );
  userEvent.click(within(screen.getByTestId('login')).getByRole('button'));

  await waitForElementToBeRemoved(screen.queryByTestId('login'));

  expect(screen.getByRole('img')).toBeInTheDocument();
});

test('show login error message', async () => {
  const data = loginBuild();

  render(<App />);

  userEvent.click(screen.getByRole('tab', { name: 'Login' }));

  userEvent.type(
    within(screen.getByTestId('login')).getByLabelText(/Email/i),
    data.email,
  );
  userEvent.type(
    within(screen.getByTestId('login')).getByLabelText(/Password/i),
    data.password,
  );
  userEvent.click(within(screen.getByTestId('login')).getByRole('button'));

  await expect(
    screen.findByText(`There isn't any user with email: ${data.email}`),
  ).resolves.toBeInTheDocument();
});

test('log out', async () => {
  const user = db.user.create({
    name: 'Kelly Obrien',
    email: 'kelly.obrien@example.com',
  });
  const token = Buffer.from(JSON.stringify(user)).toString('base64');

  localStorage.setItem(AuthStorageEnum.user, JSON.stringify(user));
  localStorage.setItem(AuthStorageEnum.token, token);
  render(<App />);

  expect(screen.getByRole('img', { name: user.name })).toBeInTheDocument();
  expect(screen.getByText(user.name)).toBeInTheDocument();

  userEvent.click(screen.getByText('Log out'));

  expect(localStorage.getItem(AuthStorageEnum.user)).toBeNull();
  expect(localStorage.getItem(AuthStorageEnum.token)).toBeNull();
});
