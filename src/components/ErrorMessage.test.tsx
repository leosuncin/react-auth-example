import { render, screen } from '../testUtils';
import type { AuthContext } from '../types/AuthContext';
import ErrorMessage from './ErrorMessage';

test('render nothing when no error', () => {
  const contextMocked: jest.Mocked<AuthContext> = {
    authenticated: false,
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
  };

  const { container } = render(<ErrorMessage />, contextMocked);

  expect(container).toBeEmptyDOMElement();
});

test('show error message', () => {
  const contextMocked: jest.Mocked<AuthContext> = {
    authenticated: false,
    error: 'error message',
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
  };

  render(<ErrorMessage />, contextMocked);

  expect(screen.getByText(contextMocked.error!)).toBeInTheDocument();
});
