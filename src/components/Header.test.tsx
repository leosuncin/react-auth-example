import userEvent from '@testing-library/user-event';

import { render, screen } from '../testUtils';
import type { AuthContext } from '../types/AuthContext';
import Header from './Header';

test('is logged out', () => {
  const contextMocked: jest.Mocked<AuthContext> = {
    authenticated: false,
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
  };

  render(<Header />, contextMocked);

  expect(screen.queryByText('Log out')).not.toBeInTheDocument();
});

test('is logged in', () => {
  const contextMocked: jest.Mocked<AuthContext> = {
    authenticated: true,
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
  };

  render(<Header />, contextMocked);

  expect(screen.getByText('Log out')).toBeInTheDocument();

  userEvent.click(screen.getByTitle('Menu'));
  userEvent.click(screen.getByText('Log out'));

  expect(contextMocked.logout).toHaveBeenCalledTimes(1);
});
