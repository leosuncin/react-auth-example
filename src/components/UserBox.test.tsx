import userEvent from '@testing-library/user-event';

import { render, screen, db } from '../testUtils';
import type { AuthContext } from '../types/AuthContext';
import UserBox from './UserBox';

test('show user details when is authenticated', () => {
  const user = db.user.create({
    name: 'Paul Griffin',
    email: 'paul.griffin@example.com',
  });
  const token = Buffer.from(JSON.stringify(user)).toString('base64');
  const contextMocked: jest.Mocked<AuthContext> = {
    authenticated: true,
    user: { ...user, id: Number(user?.id) },
    token,
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
  };

  render(<UserBox />, contextMocked);

  expect(screen.getByRole('img', { name: user.name })).toBeInTheDocument();
  expect(screen.getByText(user.name)).toBeInTheDocument();
});

test('show forms when is not authenticated', () => {
  const contextMocked: jest.Mocked<AuthContext> = {
    authenticated: false,
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
  };

  render(<UserBox />, contextMocked);

  expect(screen.getByRole('tab', { name: 'Register' })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  expect(screen.getByRole('tab', { name: 'Login' })).toHaveAttribute(
    'aria-selected',
    'false',
  );

  userEvent.click(screen.getByRole('tab', { name: 'Login' }));

  expect(screen.getByRole('tab', { name: 'Register' })).toHaveAttribute(
    'aria-selected',
    'false',
  );
  expect(screen.getByRole('tab', { name: 'Login' })).toHaveAttribute(
    'aria-selected',
    'true',
  );
});
