import userEvent from '@testing-library/user-event';

import { loginBuild, render, screen, waitFor } from '../testUtils';
import LoginForm, { validations } from './LoginForm';

test('submit login form', async () => {
  const handleSubmitSpy = jest
    .fn()
    .mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 750)),
    );
  const data = loginBuild();

  render(<LoginForm onSubmit={handleSubmitSpy} />);

  userEvent.type(screen.getByLabelText(/Email/i), data.email);
  userEvent.type(screen.getByLabelText(/Password/i), data.password);
  userEvent.click(screen.getByRole('button', { name: 'Login' }));

  await waitFor(() => expect(screen.getByRole('button')).not.toBeDisabled());

  expect(handleSubmitSpy).toHaveBeenCalledWith(data);
});

test('validate login form', async () => {
  const handleSubmitSpy = jest
    .fn()
    .mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(resolve, Math.round(Math.random() * 1e3)),
        ),
    );
  const data = loginBuild({ traits: 'invalid' });

  render(<LoginForm onSubmit={handleSubmitSpy} />);

  userEvent.click(screen.getByRole('button', { name: 'Login' }));

  await expect(
    screen.findByText(validations.email.required),
  ).resolves.toBeInTheDocument();
  await expect(
    screen.findByText(validations.password.required),
  ).resolves.toBeInTheDocument();

  userEvent.type(screen.getByLabelText(/Email/i), data.email);
  userEvent.type(screen.getByLabelText(/Password/i), data.password);
  userEvent.click(screen.getByRole('button', { name: 'Login' }));

  await expect(
    screen.findByText(validations.email.pattern.message),
  ).resolves.toBeInTheDocument();
  await expect(
    screen.findByText(validations.password.minLength.message),
  ).resolves.toBeInTheDocument();

  expect(handleSubmitSpy).not.toHaveBeenCalled();
});
